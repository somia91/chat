// Firebase Configuration for Real-time Messaging
// Replace with your actual Firebase config

const firebaseConfig = {
    apiKey: "AIzaSyDemo-Replace-With-Your-Key",
    authDomain: "chatapp-demo.firebaseapp.com",
    databaseURL: "https://chatapp-demo-default-rtdb.firebaseio.com",
    projectId: "chatapp-demo",
    storageBucket: "chatapp-demo.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Simple Firebase alternative using localStorage + polling
class SimpleFirebase {
    constructor() {
        this.listeners = new Map();
        this.pollInterval = 2000; // Poll every 2 seconds
        this.isPolling = false;
    }

    // Initialize the service
    init() {
        console.log('SimpleFirebase initialized');
        return Promise.resolve();
    }

    // Set data
    async set(path, data) {
        const key = `firebase_${path.replace(/\//g, '_')}`;
        const timestamp = Date.now();
        const record = {
            data: data,
            timestamp: timestamp,
            path: path
        };
        
        localStorage.setItem(key, JSON.stringify(record));
        
        // Trigger listeners
        this.triggerListeners(path, data);
        
        return Promise.resolve();
    }

    // Get data
    async get(path) {
        const key = `firebase_${path.replace(/\//g, '_')}`;
        const stored = localStorage.getItem(key);
        
        if (stored) {
            const record = JSON.parse(stored);
            return Promise.resolve({
                exists: () => true,
                val: () => record.data
            });
        }
        
        return Promise.resolve({
            exists: () => false,
            val: () => null
        });
    }

    // Listen for changes
    on(path, callback) {
        if (!this.listeners.has(path)) {
            this.listeners.set(path, []);
        }
        this.listeners.get(path).push(callback);
        
        // Start polling if not already started
        if (!this.isPolling) {
            this.startPolling();
        }
        
        // Return initial data
        this.get(path).then(snapshot => {
            if (snapshot.exists()) {
                callback(snapshot);
            }
        });
    }

    // Remove listener
    off(path, callback) {
        if (this.listeners.has(path)) {
            const callbacks = this.listeners.get(path);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    // Start polling for changes
    startPolling() {
        if (this.isPolling) return;
        
        this.isPolling = true;
        this.lastCheck = Date.now();
        
        setInterval(() => {
            this.checkForUpdates();
        }, this.pollInterval);
    }

    // Check for updates
    checkForUpdates() {
        const now = Date.now();
        
        // Check all stored keys for updates
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('firebase_')) {
                const stored = localStorage.getItem(key);
                if (stored) {
                    const record = JSON.parse(stored);
                    if (record.timestamp > this.lastCheck) {
                        const path = record.path;
                        this.triggerListeners(path, record.data);
                    }
                }
            }
        }
        
        this.lastCheck = now;
    }

    // Trigger listeners for a path
    triggerListeners(path, data) {
        if (this.listeners.has(path)) {
            const callbacks = this.listeners.get(path);
            const snapshot = {
                exists: () => true,
                val: () => data
            };
            
            callbacks.forEach(callback => {
                try {
                    callback(snapshot);
                } catch (error) {
                    console.error('Error in listener callback:', error);
                }
            });
        }
    }

    // Push data (add with auto-generated key)
    async push(path, data) {
        const key = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
        const fullPath = `${path}/${key}`;
        await this.set(fullPath, data);
        return { key: key };
    }

    // Remove data
    async remove(path) {
        const key = `firebase_${path.replace(/\//g, '_')}`;
        localStorage.removeItem(key);
        
        // Trigger listeners with null data
        this.triggerListeners(path, null);
        
        return Promise.resolve();
    }
}

// Create global instance
window.simpleFirebase = new SimpleFirebase();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SimpleFirebase, firebaseConfig };
}

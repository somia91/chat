# 🔧 حل خطأ Google OAuth - "OAuth client was not found"

## ❌ **الخطأ الذي تواجهه:**
```
تم حظر إمكانية الوصول: خطأ في منح الإذن
The OAuth client was not found.
خطأ 401: invalid_client
```

## 🎯 **السبب:**
- Client ID غير صحيح أو غير موجود
- النطاق (somia91.github.io) غير مُضاف في Google Console
- إعدادات OAuth غير مكتملة

---

## 🚀 **الحل الكامل خطوة بخطوة:**

### **الخطوة 1: إنشاء مشروع Google Cloud جديد**

#### **1. اذهب إلى:**
```
https://console.cloud.google.com
```

#### **2. إنشاء مشروع:**
```
1. اضغط على اسم المشروع في الأعلى
2. اضغط "New Project"
3. Project name: "ChatApp-Somia"
4. اضغط "Create"
5. انتظر حتى ينتهي الإنشاء
```

### **الخطوة 2: تفعيل APIs المطلوبة**

#### **1. تفعيل Google Sign-In:**
```
1. في القائمة الجانبية: "APIs & Services" → "Library"
2. ابحث عن: "Google Sign-In API"
3. اضغط عليه ثم "Enable"
4. انتظر حتى يتم التفعيل
```

### **الخطوة 3: إعداد OAuth Consent Screen**

#### **1. إعداد شاشة الموافقة:**
```
1. "APIs & Services" → "OAuth consent screen"
2. اختر "External"
3. اضغط "Create"
```

#### **2. ملء المعلومات الأساسية:**
```
App information:
- App name: ChatApp
- User support email: elrashedysomia@gmail.com
- App logo: (اتركه فارغ)

App domain (اتركها فارغة للآن):
- Application home page: (فارغ)
- Application privacy policy link: (فارغ)
- Application terms of service link: (فارغ)

Developer contact information:
- Email addresses: elrashedysomia@gmail.com

اضغط "Save and Continue"
```

#### **3. Scopes (النطاقات):**
```
1. اضغط "Save and Continue" (لا تضيف شيء)
```

#### **4. Test users:**
```
1. اضغط "Add Users"
2. أضف: elrashedysomia@gmail.com
3. اضغط "Save and Continue"
```

#### **5. Summary:**
```
1. راجع المعلومات
2. اضغط "Back to Dashboard"
```

### **الخطوة 4: إنشاء OAuth 2.0 Client ID**

#### **1. إنشاء Credentials:**
```
1. "APIs & Services" → "Credentials"
2. اضغط "Create Credentials"
3. اختر "OAuth 2.0 Client ID"
```

#### **2. تكوين Client:**
```
Application type: Web application
Name: ChatApp-Web-Client

Authorized JavaScript origins:
- https://somia91.github.io

Authorized redirect URIs:
- https://somia91.github.io/chat

اضغط "Create"
```

#### **3. نسخ Client ID:**
```
ستظهر نافذة مع:
- Client ID: 123456789-abcdefghijk.apps.googleusercontent.com
- Client Secret: (لا نحتاجه)

انسخ Client ID واحفظه!
```

### **الخطوة 5: تحديث الكود**

#### **1. افتح index.html:**
```
ابحث عن هذا السطر:
data-client_id="YOUR_GOOGLE_CLIENT_ID"
```

#### **2. استبدل بـ Client ID الحقيقي:**
```
مثال:
data-client_id="123456789-abcdefghijk.apps.googleusercontent.com"
```

#### **3. احفظ الملف وارفعه على GitHub**

---

## 🧪 **الاختبار:**

### **1. افتح التطبيق:**
```
https://somia91.github.io/chat
```

### **2. جرب تسجيل الدخول:**
```
1. اضغط زر Google Sign-In
2. يجب أن تظهر نافذة Google
3. اختر حساب elrashedysomia@gmail.com
4. يجب أن يعمل بدون أخطاء
```

---

## 🔧 **حل المشاكل الإضافية:**

### **مشكلة: "This app isn't verified"**
```
الحل:
1. اضغط "Advanced"
2. اضغط "Go to ChatApp (unsafe)"
3. هذا طبيعي للتطبيقات الجديدة
```

### **مشكلة: "Access blocked"**
```
الحل:
1. تأكد من إضافة النطاق الصحيح: https://somia91.github.io
2. تأكد من إضافة بريدك في Test users
3. انتظر 5-10 دقائق لتحديث الإعدادات
```

### **مشكلة: "Invalid domain"**
```
الحل:
1. تأكد من كتابة النطاق بدون أخطاء
2. لا تضع / في النهاية
3. استخدم https وليس http
```

---

## 📋 **قائمة تحقق:**

### **تأكد من:**
- [ ] إنشاء مشروع Google Cloud جديد
- [ ] تفعيل Google Sign-In API
- [ ] إعداد OAuth Consent Screen كاملاً
- [ ] إضافة النطاق: https://somia91.github.io
- [ ] إضافة بريدك في Test users
- [ ] نسخ Client ID الصحيح
- [ ] تحديث index.html بـ Client ID الجديد
- [ ] رفع الملف المحدث على GitHub

---

## 🎯 **مثال Client ID صحيح:**

```html
<!-- مثال لـ Client ID صحيح -->
<div id="g_id_onload"
     data-client_id="123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback="handleCredentialResponse"
     data-auto_prompt="false">
</div>
```

---

## 📞 **إذا استمرت المشكلة:**

### **تحقق من:**
1. **Console في المتصفح** - ابحث عن أخطاء JavaScript
2. **Network tab** - تحقق من طلبات Google APIs
3. **Google Cloud Console** - تأكد من حالة المشروع

### **جرب:**
1. **متصفح آخر** أو وضع التصفح الخفي
2. **مسح الكاش** والكوكيز
3. **الانتظار 10-15 دقيقة** بعد تحديث الإعدادات

---

## 🎉 **بعد الحل:**

### **ستتمكن من:**
- ✅ تسجيل الدخول بحساب Google
- ✅ رؤية اسمك وصورتك في التطبيق
- ✅ إنشاء غرف بهوية موثقة
- ✅ الاستعداد لإعداد Firebase للمزامنة

---

## 📝 **ملاحظات مهمة:**

### **للتطوير:**
- استخدم http://localhost:8000 للاختبار المحلي
- أضف النطاق المحلي في Google Console

### **للإنتاج:**
- استخدم https://somia91.github.io فقط
- تأكد من أن الموقع يعمل على HTTPS

### **الأمان:**
- لا تشارك Client Secret مع أحد
- Client ID آمن للمشاركة العامة

**اتبع الخطوات بالترتيب وستحل المشكلة! 🚀**

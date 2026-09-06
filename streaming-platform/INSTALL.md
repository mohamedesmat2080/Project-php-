# دليل التثبيت - ستريم إكس

## المتطلبات
- Node.js 18+
- pnpm أو npm
- قاعدة بيانات SQLite (مضمنة)

## خطوات التثبيت

### 1. تحميل المشروع
```bash
git clone <repository-url>
cd streaming-platform
```

### 2. تثبيت الاعتماديات
```bash
pnpm install
```

### 3. إعداد قاعدة البيانات
```bash
# إنشاء قاعدة البيانات
export DATABASE_URL="file:./dev.db"
bash node_modules/.bin/prisma db push

# إضافة بيانات تجريبية
node prisma/seed.js
node prisma/seed-users.js
```

### 4. تشغيل المشروع
```bash
npm run dev
```

الموقع سيعمل على: **http://localhost:3001**

## بيانات الدخول

### مدير النظام
- البريد: `admin@streamx.com`
- كلمة المرور: `admin123`

### مستخدم تجريبي
- البريد: `user@test.com`
- كلمة المرور: `user123`

## الإعدادات بعد التثبيت

### 1. تغيير اسم الموقع
1. ادخل كمدير
2. اذهب إلى `/admin/advanced`
3. اضغط "إعدادات الموقع"
4. غير "اسم الموقع" واحفظ

### 2. تغيير الشعار
1. ارفع صورة الشعار على أي استضافة
2. في الإعدادات، ضع رابط الصورة في "رابط الشعار"

### 3. تغيير الألوان
1. في الإعدادات، اختر اللون الرئيسي
2. أو اكتب كود اللون يدوياً

### 4. إضافة محتوى
**طريقة 1: يدوياً**
1. اذهب إلى `/admin/advanced` ← "الفيديوهات"
2. اضغط "إضافة فيديو"
3. املأ البيانات

**طريقة 2: استيراد JSON**
1. اذهب إلى `/admin/advanced` ← "استيراد"
2. الصق JSON
3. اضغط "استيراد الآن"

## هيكل JSON للاستيراد

```json
[
  {
    "title": "عنوان الفيلم",
    "description": "وصف الفيلم",
    "thumbnail": "https://example.com/poster.jpg",
    "videoUrl": "https://example.com/video.mp4",
    "embed": "<iframe src='...'></iframe>",
    "duration": 120,
    "type": "movie",
    "genre": "أكشن",
    "rating": "8.5",
    "releaseYear": 2024,
    "maturityRating": "PG-13"
  }
]
```

## النشر على الإنتاج

### Vercel
1. ارفع الكود على GitHub
2. استورد في Vercel
3. أضف متغيرات البيئة:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
4. انشر

### استضافة أخرى
1. شغل `npm run build`
2. انشر مجلد `.next` و `public` و `package.json`
3. شغل `npm start`

## الدعم

للمساعدة، تواصل معنا.
# ستريم إكس - منصة بث احترافية

منصة بث فيديو احترافية متكاملة مبنية بـ Next.js 16، جاهزة للبيع كمنتج.

## الميزات

### للمستخدمين
- تسجيل دخول/تسجيل جديد
- تصفح الأفلام والمسلسلات
- مشاهدة مع تتبع التقدم
- قائمة مشاهدة شخصية
- سجل المشاهدة
- بحث وفلتر

### للأدمن
- لوحة تحكم متقدمة
- إدارة الفيديوهات والأفلام
- إدارة المسلسلات والحلقات
- إدارة الفئات
- استيراد محتوى من JSON
- إعدادات الموقع الكاملة
- إحصائيات

### للمنتج
- تغيير اسم الموقع والشعار
- تخصيص الألوان
- SEO كامل
- نظام embeds للفيديوهات
- تصميم متجاوب RTL
- كود منظم وسهل التعديل

## التقنيات

- Next.js 16 + TypeScript
- Tailwind CSS v4
- Prisma ORM + SQLite
- NextAuth.js v5
- Lucide Icons

## التثبيت

```bash
# 1. استنساخ المشروع
git clone <repository-url>
cd streaming-platform

# 2. تثبيت الاعتماديات
pnpm install

# 3. إعداد قاعدة البيانات
export DATABASE_URL="file:./dev.db"
bash node_modules/.bin/prisma db push
node prisma/seed.js
node prisma/seed-users.js

# 4. تشغيل السيرفر
npm run dev
```

## بيانات الدخول التجريبية

### مدير النظام
- البريد: admin@streamx.com
- كلمة المرور: admin123

### مستخدم تجريبي
- البريد: user@test.com
- كلمة المرور: user123

## هيكل المشروع

```
src/
├── app/
│   ├── admin/advanced/ - لوحة تحكم الأدمن
│   ├── auth/ - تسجيل دخول/خروج
│   ├── dashboard/ - داشبورد المستخدم
│   ├── browse/ - تصفح المحتوى
│   ├── landing/ - صفحة الهبوط
│   ├── watch/ - صفحة المشاهدة
│   ├── profile/ - الملف الشخصي
│   └── api/ - API routes
├── components/ - مكونات الواجهة
├── lib/ - utilities و config
└── prisma/ - schema و seed
```

## الصفحات

- `/` - الصفحة الرئيسية
- `/landing` - صفحة هبوط المنتج
- `/browse` - تصفح المحتوى العام
- `/demo` - عرض تجريبي
- `/auth/signin` - تسجيل دخول
- `/auth/signup` - إنشاء حساب
- `/dashboard` - داشبورد المستخدم
- `/dashboard/history` - سجل المشاهدة
- `/dashboard/watchlist` - قائمتي
- `/profile` - الملف الشخصي
- `/admin/advanced` - لوحة تحكم الأدمن
- `/admin/advanced/episodes` - إدارة الحلقات
- `/admin/advanced/categories` - إدارة الفئات

## API Endpoints

- `GET /api/videos` - جلب الفيديوهات
- `POST /api/admin/videos` - إضافة/تعديل فيديو
- `DELETE /api/admin/videos` - حذف فيديو
- `GET /api/admin/categories` - جلب الفئات
- `POST /api/admin/categories` - إضافة فئة
- `PUT /api/admin/categories` - تعديل فئة
- `DELETE /api/admin/categories` - حذف فئة
- `POST /api/admin/import` - استيراد محتوى
- `GET /api/admin/settings` - جلب الإعدادات
- `POST /api/admin/settings` - حفظ الإعدادات
- `GET /api/watchlist` - قائمة المشاهدة
- `POST /api/watchlist` - إضافة للقائمة
- `DELETE /api/watchlist` - حذف من القائمة
- `GET /api/watch-history` - سجل المشاهدة
- `POST /api/watch-history` - تحديث التقدم

## التخصيص

### تغيير اسم الموقع
اذهب إلى `/admin/advanced` ← الإعدادات ← اسم الموقع

### تغيير الألوان
اذهب إلى `/admin/advanced` ← الإعدادات ← اللون الرئيسي

### إضافة محتوى
1. اذهب إلى `/admin/advanced`
2. اضغط "إضافة فيديو"
3. املأ البيانات أو استورد JSON

## الترخيص

هذا المشروع للبيع كمنتج. يمنح المشتري ترخيص استخدام للمشروع الواحد.

## الدعم

للحصول على الدعم الفني، يرجى التواصل عبر البريد الإلكتروني أو منصة البيع.
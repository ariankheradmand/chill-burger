# راهنمای Deploy در Vercel با Prisma

## مرحله 1: آماده‌سازی پروژه (انجام شده ✅)

### فایل‌های اضافه شده:
- ✅ `vercel.json` - تنظیمات Vercel
- ✅ `deploy-setup.js` - اسکریپت راه‌اندازی
- ✅ `package.json` - اسکریپت‌های بروزرسانی شده

## مرحله 2: Deploy در Vercel

### 2.1 Push کردن کد

```bash
git add .
git commit -m "Prepare for Vercel deployment with Prisma"
git push origin main
```

### 2.2 اتصال به Vercel

1. به https://vercel.com بروید
2. با GitHub وارد شوید
3. "New Project" را بزنید
4. Repository خود را انتخاب کنید
5. "Import" را بزنید

### 2.3 تنظیم Environment Variables

در داشبورد Vercel:

1. به Settings > Environment Variables بروید
2. این متغیرها را اضافه کنید:

```
DATABASE_URL = postgresql://your-connection-string
```

⚠️ **مهم:** Connection string PostgreSQL خود را از Neon/Supabase کپی کنید

### 2.4 Deploy کردن

1. "Deploy" را بزنید
2. منتظر بمانید تا build تمام شود (2-3 دقیقه)

## مرحله 3: راه‌اندازی دیتابیس

### 3.1 اجرای Migration

بعد از deploy موفق، در ترمینال محلی:

```bash
# اتصال به دیتابیس production
npx prisma migrate deploy

# یا اگر migration وجود ندارد
npx prisma db push
```

### 3.2 Seed کردن دیتابیس

```bash
# Seed آیتم‌های منو
npx prisma db seed

# Seed کاربر ادمین
node prisma/seed-admin.js
```

## مرحله 4: تست کردن

### 4.1 بررسی سایت

1. به URL سایت خود بروید (مثل: https://your-app.vercel.app)
2. بررسی کنید که آیتم‌ها نمایش داده می‌شوند
3. به `/login` بروید و وارد شوید:
   - Username: `admin`
   - Password: `admin123`
4. پنل ادمین را تست کنید

### 4.2 بررسی لاگ‌ها

اگر مشکلی بود:
1. در Vercel Dashboard > Functions
2. لاگ‌های API را بررسی کنید

## مرحله 5: بروزرسانی‌های آینده

### 5.1 تغییرات Schema

اگر schema تغییر کرد:

```bash
# ایجاد migration جدید
npx prisma migrate dev --name your_change_name

# Push به Git
git add .
git commit -m "Database schema update"
git push

# اجرای migration در production
npx prisma migrate deploy
```

### 5.2 بروزرسانی کد

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel به صورت خودکار دوباره deploy می‌کند!

## عیب‌یابی

### خطا: "PrismaClientInitializationError"

**راه‌حل:**
1. بررسی کنید که `DATABASE_URL` در Vercel تنظیم شده
2. Connection string صحیح باشد
3. دیتابیس در دسترس باشد

### خطا: "Table doesn't exist"

**راه‌حل:**
```bash
npx prisma migrate deploy
# یا
npx prisma db push
```

### خطا: "Build failed"

**راه‌حل:**
1. لاگ‌های build را بررسی کنید
2. مطمئن شوید که `prisma generate` در build اجرا می‌شود
3. `postinstall` script موجود باشد

### خطا: "Function timeout"

**راه‌حل:**
- `vercel.json` تنظیم شده که timeout را افزایش می‌دهد
- اگر باز هم مشکل بود، API calls را بهینه کنید

## نکات مهم

✅ **انجام شده:**
- Prisma Client تولید خودکار
- Binary targets برای Vercel
- Environment variables
- Timeout تنظیمات

⚠️ **مراقب باشید:**
- هرگز `.env` را commit نکنید
- Connection string را فقط در Vercel تنظیم کنید
- Migration‌ها را قبل از deploy تست کنید

🎉 **بعد از deploy موفق:**
- سایت شما آنلاین است
- دیتابیس PostgreSQL متصل است
- پنل ادمین کار می‌کند
- همه API‌ها فعال هستند

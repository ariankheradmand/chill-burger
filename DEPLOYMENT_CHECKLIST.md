# ✅ Checklist Deploy در Vercel

## قبل از Deploy

- [ ] PostgreSQL database آماده است (Neon/Supabase/etc.)
- [ ] Connection string دریافت شده
- [ ] کد در Git push شده
- [ ] `.env` در `.gitignore` است

## مراحل Deploy

### 1. Vercel Setup
- [ ] وارد https://vercel.com شدم
- [ ] Repository را import کردم
- [ ] Environment Variables تنظیم شد:
  - [ ] `DATABASE_URL` اضافه شد

### 2. اولین Deploy
- [ ] Deploy button زده شد
- [ ] Build موفق بود (سبز شد)
- [ ] سایت باز می‌شود

### 3. Database Setup
```bash
# در ترمینال محلی اجرا کنید:
npx prisma migrate deploy
npx prisma db seed
node prisma/seed-admin.js
```

- [ ] Migration اجرا شد
- [ ] Seed موفق بود
- [ ] Admin user ساخته شد

## تست نهایی

### صفحه اصلی
- [ ] سایت باز می‌شود: `https://your-app.vercel.app`
- [ ] آیتم‌های منو نمایش داده می‌شوند
- [ ] عکس‌ها لود می‌شوند
- [ ] انیمیشن‌ها کار می‌کنند

### پنل ادمین
- [ ] `/login` باز می‌شود
- [ ] با `admin` / `admin123` وارد می‌شوم
- [ ] پنل ادمین باز می‌شود
- [ ] لیست آیتم‌ها نمایش داده می‌شود

### عملکرد ادمین
- [ ] اضافه کردن آیتم جدید
- [ ] ویرایش آیتم موجود
- [ ] غیرفعال کردن آیتم
- [ ] فعال کردن آیتم غیرفعال
- [ ] حذف کامل آیتم

### Health Check
- [ ] `/api/health` پاسخ می‌دهد
- [ ] Status: "healthy" نمایش می‌دهد
- [ ] آمار دیتابیس صحیح است

## اگر مشکلی بود

### Build Error
1. به Vercel Dashboard > Deployments بروید
2. روی deployment ناموفق کلیک کنید
3. لاگ‌های build را بررسی کنید
4. خطا را برطرف کنید و دوباره push کنید

### Runtime Error
1. به Functions > View Function Logs بروید
2. خطاهای API را بررسی کنید
3. معمولاً مربوط به DATABASE_URL است

### Database Error
```bash
# بررسی connection
npx prisma db pull

# اجرای مجدد migration
npx prisma migrate deploy

# بررسی داده‌ها
npx prisma studio
```

## بعد از Deploy موفق

### امنیت
- [ ] رمز عبور ادمین تغییر کرد
- [ ] Environment variables امن هستند
- [ ] `.env` commit نشده

### عملکرد
- [ ] سایت سریع لود می‌شود
- [ ] API‌ها پاسخ می‌دهند
- [ ] دیتابیس متصل است

### مانیتورینگ
- [ ] Vercel Analytics فعال شد
- [ ] Error tracking تنظیم شد
- [ ] Health check کار می‌کند

## آدرس‌های مهم

- 🌐 سایت: `https://your-app.vercel.app`
- 🔐 ادمین: `https://your-app.vercel.app/login`
- 🏥 Health: `https://your-app.vercel.app/api/health`
- 📊 Vercel Dashboard: `https://vercel.com/dashboard`

## دستورات مفید

```bash
# مشاهده لاگ‌های Vercel
vercel logs

# Deploy محلی برای تست
vercel dev

# بروزرسانی environment variables
vercel env add DATABASE_URL

# Pull کردن env variables
vercel env pull .env.local
```

---

🎉 **تبریک! سایت شما آنلاین است!** 🎉
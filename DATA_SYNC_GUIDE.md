# راهنمای همگام‌سازی داده‌ها

## نحوه کار سیستم Refetch خودکار

### معماری
سیستم از یک Context API به نام `DataContext` استفاده می‌کند که در پنل ادمین فعال است.

### فایل‌های مرتبط
- `contexts/DataContext.js` - Context اصلی
- `app/admin/page.js` - صفحه ادمین که DataProvider را فراهم می‌کند
- `components/admin/AddingItems.js` - استفاده از triggerRefresh
- `components/admin/ManagingItems.js` - استفاده از triggerRefresh
- `components/admin/DisabledItems.js` - استفاده از triggerRefresh

## چگونه کار می‌کند؟

### 1. DataProvider
```javascript
<DataProvider>
  <AddingItems />
  <ManagingItems />
  <DisabledItems />
</DataProvider>
```

همه کامپوننت‌های ادمین داخل DataProvider قرار دارند.

### 2. useData Hook
هر کامپوننت از hook زیر استفاده می‌کند:
```javascript
const { refreshTrigger, triggerRefresh } = useData();
```

- `refreshTrigger`: یک عدد که با هر تغییر افزایش می‌یابد
- `triggerRefresh()`: تابعی که refreshTrigger را افزایش می‌دهد

### 3. useEffect با Dependency
```javascript
useEffect(() => {
  fetchItems();
  fetchCategories();
}, [refreshTrigger]);
```

وقتی `refreshTrigger` تغییر می‌کند، همه کامپوننت‌ها دوباره داده‌ها را fetch می‌کنند.

## عملیات‌هایی که Refetch را فعال می‌کنند

### ✅ اضافه کردن آیتم جدید
```javascript
if (response.ok) {
  triggerRefresh(); // همه کامپوننت‌ها refetch می‌کنند
}
```

### ✅ ویرایش آیتم
```javascript
if (response.ok) {
  setEditingItem(null);
  triggerRefresh(); // بروزرسانی همه لیست‌ها
}
```

### ✅ غیرفعال کردن آیتم
```javascript
if (response.ok) {
  triggerRefresh(); // آیتم از لیست فعال حذف و به غیرفعال اضافه می‌شود
}
```

### ✅ فعال کردن آیتم
```javascript
if (response.ok) {
  triggerRefresh(); // آیتم از لیست غیرفعال حذف و به فعال اضافه می‌شود
}
```

### ✅ حذف کامل آیتم
```javascript
if (response.ok) {
  triggerRefresh(); // آیتم از همه لیست‌ها حذف می‌شود
}
```

## مزایا

1. **همگام‌سازی خودکار**: تمام کامپوننت‌ها به صورت خودکار بروزرسانی می‌شوند
2. **بدون تکرار کد**: نیازی به فراخوانی دستی fetch در هر کامپوننت نیست
3. **سازگاری داده**: همه کامپوننت‌ها همیشه آخرین داده‌ها را نمایش می‌دهند
4. **عملکرد بهینه**: فقط زمانی که تغییری رخ می‌دهد، refetch انجام می‌شود

## نحوه افزودن کامپوننت جدید

اگر می‌خواهید کامپوننت جدیدی اضافه کنید که باید با تغییرات همگام شود:

```javascript
import { useData } from "@/contexts/DataContext";

function NewComponent() {
  const { refreshTrigger, triggerRefresh } = useData();
  
  useEffect(() => {
    fetchData();
  }, [refreshTrigger]); // وابسته به refreshTrigger
  
  const handleUpdate = async () => {
    // انجام عملیات
    if (response.ok) {
      triggerRefresh(); // فعال‌سازی refetch در همه کامپوننت‌ها
    }
  };
}
```

## نکات مهم

- ⚠️ DataProvider فقط در پنل ادمین فعال است
- ⚠️ صفحه اصلی (main page) مستقل است و نیازی به این سیستم ندارد
- ⚠️ همیشه بعد از عملیات موفق، `triggerRefresh()` را فراخوانی کنید
- ✅ تمام کامپوننت‌های ادمین به صورت خودکار همگام می‌شوند

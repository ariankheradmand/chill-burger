"use client";
import React, { useState, useEffect } from 'react';
import { useData } from "@/contexts/DataContext";

function AddingItems() {
  const { triggerRefresh } = useData();
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    taste: '',
    ingredients: '',
    allergyWarning: '',
    categoryId: '',
    disabled: false
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const ingredientsArray = formData.ingredients.split('،').map(i => i.trim());
      
      const response = await fetch('/api/admin/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ingredients: ingredientsArray,
          categoryId: parseInt(formData.categoryId)
        })
      });

      if (response.ok) {
        setShowModal(false);
        setFormData({
          name: '',
          price: '',
          taste: '',
          ingredients: '',
          allergyWarning: '',
          categoryId: '',
          disabled: false
        });
        triggerRefresh();
        alert('آیتم با موفقیت اضافه شد');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('خطا در اضافه کردن آیتم');
    }
  };

  return (
    <div className='w-full flex-cc'>
      <span className='text-black w-full text-right text-sm'>مدیریت منو</span>
      
      <button 
        onClick={() => setShowModal(true)}
        className='bg-primary-red px-2 py-2 rounded-[10px] shadow-rb text-white'
      >
        + اضافه کردن آیتم
      </button>

      {showModal && (
        <div className="fixed inset-0 text-black placeholder:text-black/50 bg-black/50 flex-cc z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white p-6 rounded-[10px] w-11/12 max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl mb-4 text-right">اضافه کردن آیتم جدید</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border rounded-[10px] text-right"
                placeholder="نام آیتم"
                required
              />
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full p-2 border rounded-[10px] text-right"
                placeholder="قیمت (مثال: 250 ت)"
                required
              />
              <textarea
                value={formData.taste}
                onChange={(e) => setFormData({...formData, taste: e.target.value})}
                className="w-full p-2 border rounded-[10px] text-right"
                placeholder="طعم"
                required
              />
              <textarea
                value={formData.ingredients}
                onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                className="w-full p-2 border rounded-[10px] text-right"
                placeholder="مواد اولیه (با ویرگول جدا کنید)"
                required
              />
              <textarea
                value={formData.allergyWarning}
                onChange={(e) => setFormData({...formData, allergyWarning: e.target.value})}
                className="w-full p-2 border rounded-[10px] text-right"
                placeholder="هشدار حساسیت"
                required
              />
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                className="w-full p-2 border rounded-[10px] text-right"
                required
              >
                <option value="">انتخاب دسته‌بندی</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.header}</option>
                ))}
              </select>
              <label className="flex items-center gap-2 justify-end">
                <span>غیرفعال</span>
                <input
                  type="checkbox"
                  checked={formData.disabled}
                  onChange={(e) => setFormData({...formData, disabled: e.target.checked})}
                />
              </label>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-Secondary-lightblue text-white py-2 rounded-[10px]">
                  اضافه کردن
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-300 py-2 rounded-[10px]">
                  لغو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddingItems;
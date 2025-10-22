"use client";
import { Pencil, Search } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { useData } from "@/contexts/DataContext";

function DisabledItems() {
  const { refreshTrigger, triggerRefresh } = useData();
  const [disabledItems, setDisabledItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showEnableModal, setShowEnableModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchDisabledItems();
    fetchCategories();
  }, [refreshTrigger]);

  const fetchDisabledItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      
      const items = data.flatMap((category) =>
        category.slice(3)
          .filter((obj) => obj.items.disabled === true)
          .map((obj) => obj.items)
      );
      setDisabledItems(items);
    } catch (error) {
      console.error('Error fetching disabled items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleEnableClick = (item) => {
    setSelectedItem(item);
    setShowEnableModal(true);
  };

  const handleEnable = async () => {
    try {
      const response = await fetch('/api/admin/items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedItem.id, disabled: false })
      });

      if (response.ok) {
        setShowEnableModal(false);
        setSelectedItem(null);
        triggerRefresh();
      }
    } catch (error) {
      console.error('Error enabling item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem({
      ...item,
      ingredients: Array.isArray(item.ingredients) 
        ? item.ingredients.join('، ') 
        : item.ingredients
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const ingredientsArray = typeof editingItem.ingredients === 'string'
        ? editingItem.ingredients.split('،').map(i => i.trim())
        : editingItem.ingredients;

      const response = await fetch('/api/admin/items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingItem,
          ingredients: ingredientsArray
        })
      });

      if (response.ok) {
        setEditingItem(null);
        triggerRefresh();
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Filter search results (live)
  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term
      ? disabledItems.filter((item) =>
          item.name.toLowerCase().includes(term)
        )
      : disabledItems;
  }, [search, disabledItems]);

  // Limit visible list to 5
  const visibleItems = filteredItems.slice(0, 5);

  if (loading) {
    return <div className="w-full text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <span className="text-black w-full text-right text-sm">
        آیتم‌های غیر فعال
      </span>

      {/* Enable Confirmation Modal */}
      {showEnableModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex-cc z-50" onClick={() => setShowEnableModal(false)}>
          <div className="bg-white p-6 rounded-[10px] w-11/12 max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl mb-4 text-right text-black">آیا مطمئن هستید؟</h3>
            <p className="text-right mb-6 text-gray-700">
              آیتم {selectedItem.name} فعال شود؟
            </p>
            <div className="flex gap-3">
              <button 
                onClick={handleEnable}
                className="flex-1 bg-Secondary-lightblue text-white py-3 rounded-[10px] shadow-rb"
              >
                بله، فعال شود
              </button>
              <button 
                onClick={() => setShowEnableModal(false)}
                className="flex-1 bg-gray-300 text-black py-3 rounded-[10px]"
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex-cc z-50" onClick={() => setEditingItem(null)}>
          <div className="bg-white p-6 rounded-[10px] w-11/12 max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl mb-4 text-right text-black">ویرایش آیتم غیرفعال</h3>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                className="w-full p-2 border rounded-[10px] text-right text-black"
                placeholder="نام آیتم"
                required
              />
              <input
                type="text"
                value={editingItem.price}
                onChange={(e) => setEditingItem({...editingItem, price: e.target.value})}
                className="w-full p-2 border rounded-[10px] text-right text-black"
                placeholder="قیمت"
                required
              />
              <textarea
                value={editingItem.taste}
                onChange={(e) => setEditingItem({...editingItem, taste: e.target.value})}
                className="w-full p-2 border rounded-[10px] text-right text-black"
                placeholder="طعم"
                rows="2"
                required
              />
              <textarea
                value={editingItem.ingredients}
                onChange={(e) => setEditingItem({...editingItem, ingredients: e.target.value})}
                className="w-full p-2 border rounded-[10px] text-right text-black"
                placeholder="مواد اولیه (با ویرگول جدا کنید)"
                rows="2"
                required
              />
              <textarea
                value={editingItem.allergyWarning}
                onChange={(e) => setEditingItem({...editingItem, allergyWarning: e.target.value})}
                className="w-full p-2 border rounded-[10px] text-right text-black"
                placeholder="هشدار حساسیت"
                rows="2"
                required
              />
              <select
                value={editingItem.categoryId}
                onChange={(e) => setEditingItem({...editingItem, categoryId: parseInt(e.target.value)})}
                className="w-full p-2 border rounded-[10px] text-right text-black"
                required
              >
                <option value="">انتخاب دسته‌بندی</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.header}</option>
                ))}
              </select>
              <label className="flex items-center gap-2 justify-end text-black">
                <span>غیرفعال</span>
                <input
                  type="checkbox"
                  checked={editingItem.disabled}
                  onChange={(e) => setEditingItem({...editingItem, disabled: e.target.checked})}
                />
              </label>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-Secondary-lightblue text-white py-2 rounded-[10px]">
                  ذخیره
                </button>
                <button type="button" onClick={() => setEditingItem(null)} className="flex-1 bg-gray-300 py-2 rounded-[10px]">
                  لغو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search box */}
      <div className="w-full flex flex-row-reverse items-center bg-primary-white shadow-rb rounded-[10px] px-3 py-3">
        <input
          type="text"
          placeholder="جستجو بین آیتم‌های غیرفعال"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-black text-right outline-none placeholder:text-gray-500"
        />
        <Search className="text-gray-600" size={18} />
      </div>

      {/* Item list */}
      <div className="flex flex-col w-full gap-4">
        {visibleItems.map((item, index) => (
          <div key={index} className="flex items-center w-full ">
            {/* Action buttons */}
            <div className="w-4/12 flex items-center gap-4 justify-center">
              {/* Enable button */}
              <div 
                onClick={() => handleEnableClick(item)}
                className="w-9 h-9 bg-Secondary-lightblue text-lg rounded-full shadow-rb flex items-center justify-center cursor-pointer"
              >
                +
              </div>
              {/* Edit button - now enabled */}
              <div 
                onClick={() => handleEdit(item)}
                className="w-9 h-9 bg-primary-white rounded-full shadow-rb flex items-center justify-center cursor-pointer"
              >
                <Pencil color="black" />
              </div>
            </div>

            {/* Item info */}
            <div className="w-8/12">
              <div className="w-full flex items-center text-black bg-primary-white px-2 shadow-rb py-4 rounded-[10px]">
                <div className="w-4/12 text-center text-gray-500">
                  {item.price}
                </div>
                <div className="w-8/12 text-right text-gray-700">
                  {item.name}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* If nothing matches */}
        {visibleItems.length === 0 && (
          <div className="w-full text-center text-gray-500 text-sm">
            آیتم غیرفعالی پیدا نشد
          </div>
        )}
      </div>
    </div>
  );
}

export default DisabledItems;

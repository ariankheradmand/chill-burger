"use client";

import AddingItems from "@/components/admin/AddingItems";
import DisabledItems from "@/components/admin/DisabledItems";
import ManagingItems from "@/components/admin/ManagingItems";
import Popular from "@/components/admin/Popular";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataProvider } from "@/contexts/DataContext";

function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/login');
  };

  if (!isAuthenticated) {
    return <div className="w-full h-screen flex-cc">در حال بارگذاری...</div>;
  }

  return (
    <DataProvider>
      <div className="flex-cc font-lalezar gap-4 bg-black/20 pb-6">
        <Navbar />
        <div className="w-full px-4 flex items-center justify-between">
          <button 
            onClick={handleLogout}
            className="bg-primary-red text-white px-4 py-2 rounded-[10px] shadow-rb"
          >
            خروج
          </button>
          <span className="text-black">پنل مدیریت</span>
        </div>
        <div className="w-full px-4 flex-cc gap-7">
          <Popular />
          <AddingItems />
          <ManagingItems />
          <DisabledItems />
        </div>
      </div>
    </DataProvider>
  );
}

export default Page;

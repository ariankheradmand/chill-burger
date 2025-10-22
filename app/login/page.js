"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        router.push("/admin");
      } else {
        setError(data.error || "خطا در ورود");
      }
    } catch (err) {
      setError("خطا در اتصال به سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-red w-full h-screen flex-cc font-lalezar gap-5">
      <Image src={"/MainLogo.svg"} className="z-10" height={100} width={100} alt="Logo" />

      <span>صفحه ی مدیریت چیل برگر</span>

      <form onSubmit={handleSubmit} className="flex-cc gap-5 w-full">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-9/12 text-primary-black placeholder:text-black/60 bg-primary-white py-3 px-2 shadow-rb rounded-[10px]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-9/12 text-primary-black placeholder:text-black/60 bg-primary-white py-3 px-2 shadow-rb rounded-[10px]"
          required
        />
        
        {error && (
          <div className="text-white bg-black/30 px-4 py-2 rounded-[10px] w-9/12 text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-Secondary-lightblue px-4 py-3 w-6/12 rounded-[10px] shadow-rb disabled:opacity-50"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
}

export default Page;

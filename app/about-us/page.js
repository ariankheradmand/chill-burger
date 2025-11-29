"use client";

import React, { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Star, Flame, Heart } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            // Hero Text Animation
            const tl = gsap.timeline();
            tl.from(".hero-text-1", {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            })
                .from(
                    ".hero-text-2",
                    {
                        y: 100,
                        opacity: 0,
                        duration: 1,
                        ease: "power4.out",
                    },
                    "-=0.8"
                )
                .from(
                    ".hero-desc",
                    {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.5"
                );

            // Philosophy Section Animation
            gsap.from(".philosophy-content", {
                scrollTrigger: {
                    trigger: ".philosophy-section",
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
            });

            // Quality Section Cards Animation
            gsap.utils.toArray(".quality-card").forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "back.out(1.7)",
                });
            });

            // Parallax Effect for Backgrounds
            gsap.to(".parallax-bg", {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                },
                y: 100,
            });
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="font-lalezar min-h-screen bg-primary-white flex flex-col overflow-x-hidden"
        >
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            {/* Hero Section */}
            <section className="relative h-screen w-full flex-cc overflow-hidden">
                <div className="absolute inset-0 z-0">

                    <div className="absolute inset-0 bg-primary-black"/>
                </div>

                <div className="relative z-10 text-center text-white flex flex-col items-center gap-4 px-4">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl drop-shadow-lg hero-text-1 text-primary-red">
                        داستان ما
                    </h1>
                    <h2 className="text-4xl md:text-6xl drop-shadow-md hero-text-2">
                        فراتر از یک همبرگر
                    </h2>
                    <p className="text-lg md:text-2xl max-w-2xl mt-4 text-gray-200 hero-desc leading-relaxed">
                        ما در چیل برگر فقط غذا سرو نمی‌کنیم، ما لحظات خوشمزه و خاطره‌انگیز
                        می‌سازیم. جایی برای رها شدن از دغدغه‌ها و لذت بردن از طعم واقعی.
                    </p>
                </div>

                <div className="absolute bottom-10 animate-bounce text-white">
                    <ArrowLeft className="-rotate-90 size-8" />
                </div>
            </section>

            {/* Philosophy / Vibe Section */}
            <section className="philosophy-section relative py-20 bg-primary-black text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image src={'/background-texture.svg'} alt="texture" fill className="object-cover" />
                </div>

                <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 philosophy-content">
                        <div className="relative w-full aspect-video rounded-[20px] overflow-hidden shadow-2xl border-2 border-primary-red/30">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src="/Footer.mkv" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-primary-red/10 mix-blend-overlay"></div>
                        </div>
                    </div>

                    <div dir="rtl" className="w-full md:w-1/2 flex flex-col gap-6 philosophy-content">
                        <div className="flex items-center gap-3 text-primary-red">
                            <Flame size={32} />
                            <h3 className="text-4xl">وایب چیل</h3>
                        </div>
                        <p  className="text-xl leading-8 text-gray-300 text-justify">
                            فلسفه ما ساده است: <span className="text-primary-red">کیفیت</span>، <span className="text-Secondary-gold">تازگی</span> و <span className="text-Secondary-lightblue">آرامش</span>.
                            ما معتقدیم غذا باید با عشق آماده شود و در محیطی سرو شود که شما احساس راحتی کنید.
                            هر آیتم در منوی ما با دقت و وسواس انتخاب شده تا تجربه‌ای متفاوت را برای شما رقم بزند.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                                موزیک خوب
                            </div>
                            <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                                فضای دوستانه
                            </div>
                            <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                                طعم اصیل
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality Section */}
            <section dir="rtl" className="py-24 bg-primary-white relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-5xl text-primary-black mb-4">چرا چیل برگر؟</h3>
                        <div className="w-24 h-1 bg-primary-red mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                        {/* Card 1 */}
                        <div className="quality-card bg-white p-8 rounded-[20px] shadow-rb hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-center text-center gap-4 group">
                            <div className="p-4 bg-primary-red/10 rounded-full text-primary-red group-hover:bg-primary-red group-hover:text-white transition-colors duration-300">
                                <Heart size={40} />
                            </div>
                            <h4 className="text-2xl text-primary-black">عشق به غذا</h4>
                            <p className="text-gray-600">
                                ما عاشق کاری هستیم که انجام می‌دهیم و این عشق در هر گازی که می‌زنید حس می‌شود.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="quality-card bg-white p-8 rounded-[20px] shadow-rb hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-center text-center gap-4 group">
                            <div className="p-4 bg-Secondary-gold/20 rounded-full text-Secondary-gold group-hover:bg-Secondary-gold group-hover:text-black transition-colors duration-300">
                                <Star size={40} />
                            </div>
                            <h4 className="text-2xl text-primary-black">مواد اولیه تازه</h4>
                            <p className="text-gray-600">
                                استفاده از گوشت گرم روز و سبزیجات تازه خط قرمز ماست. کیفیت اتفاقی نیست.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="quality-card bg-white p-8 rounded-[20px] shadow-rb hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-center text-center gap-4 group">
                            <div className="p-4 bg-Secondary-lightblue/20 rounded-full text-Secondary-lightblue group-hover:bg-Secondary-lightblue group-hover:text-white transition-colors duration-300">
                                <Flame size={40} />
                            </div>
                            <h4 className="text-2xl text-primary-black">طعم دودی خاص</h4>
                            <p className="text-gray-600">
                                سس‌های دست‌ساز و روش پخت خاص ما، طعمی را می‌سازد که هیچ‌جا تجربه نکرده‌اید.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary-red text-white text-center relative overflow-hidden">
                <Image src={'/background-texture.svg'} alt="texture" fill className="object-cover opacity-20 mix-blend-multiply" />
                <div className="relative z-10 flex flex-col items-center gap-8">
                    <h2 className="text-4xl md:text-6xl">هوس یه برگر واقعی کردی؟</h2>
                    <Link href="/">
                        <button className="bg-white text-primary-red px-8 py-4 rounded-[15px] text-2xl hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
                            همین الان سفارش بده
                            <ArrowLeft size={24} />
                        </button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}

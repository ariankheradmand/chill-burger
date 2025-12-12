import { Geist, Geist_Mono, Lalezar } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import Analytics from "./analytics";

const geistLalezar = Lalezar({
  variable: "--font-geist-lalezar",
  weight: "400",
  subsets: ["arabic"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "چیل برگر کرمانشاه | بهترین فست فود و همبرگر کرمانشاه",
  description:
    "چیل برگر کرمانشاه - بهترین و خوشمزه‌ترین همبرگر، پیتزا، سیب زمینی و فست فود کرمانشاه. سفارش آنلاین با تحویل سریع.",
  keywords:
    "چیل برگر, فست فود کرمانشاه, همبرگر کرمانشاه, پیتزا کرمانشاه, سفارش آنلاین",
  openGraph: {
    title: "چیل برگر کرمانشاه | بهترین فست فود و همبرگر",
    description:
      "بهترین و خوشمزه‌ترین همبرگر و فست فود کرمانشاه در چیل برگر. سفارش آنلاین با کیفیت عالی.",
    url: "https://www.chillburger.info/",
    siteName: "چیل برگر کرمانشاه",
    images: [{ url: "https://www.chillburger.info/public/MainLogo.svg" }],
    locale: "fa_IR",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className={`${geistLalezar.variable} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GQ4JRRT24K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GQ4JRRT24K');
          `}
        </Script>

        <LoadingScreen />
        <Analytics />
        {children}
      </body>
    </html >
  );
}

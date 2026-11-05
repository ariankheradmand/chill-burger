const Menu_items = [
  [
    { header: "برگرها" },
    { imgsrc: "/HeaderImage/pexels-roman-odintsov-5836783 2.webp" },
    { colorScheme: "--color-primary-red" },

    {
      items: {
        name: "چیل برگر",
        price: { single: "700 ت", double: "845 ت" },
        taste: "تند ملایم با عطر چیل",
        ingredients: [
          "نان دست‌ساز",
          "۷۰ گرم گوشت گوساله (سینگل) / ۱۴۰ گرم (دابل)",
          "پنیر گودا",
          "سس چیل",
          "کاهو",
          "خیارشور",
        ],
        allergyWarning: "حاوی لبنیات و گلوتن",
        picture: "/ItemsImage/burger.webp",
      },
    },

    {
      items: {
        name: "اسموکی برگر",
        price: { single: "711 ت", double: "855 ت" },
        taste: "دودی و عمیق با سس اسموکی",
        ingredients: [
          "نان دست‌ساز",
          "۷۰ گرم گوشت گوساله (سینگل) / ۱۴۰ گرم (دابل)",
          "پنیر دودی",
          "سس اسموکی",
          "کاهو",
          "خیارشور",
        ],
        allergyWarning: "حاوی لبنیات و گلوتن",
      },
    },

    {
      items: {
        name: "هات چیل برگر",
        price: { single: "711 ت", double: "855 ت" },
        taste: "تند واقعی با طعم هالوپینو و سس هات",
        ingredients: [
          "نان دست‌ساز",
          "۷۰ گرم گوشت گوساله (سینگل) / ۱۴۰ گرم (دابل)",
          "پنیر گودای فلفلی",
          "فلفل هالوپینو",
          "سس هات",
          "کاهو",
          "خیارشور",
        ],
        allergyWarning: "حاوی لبنیات و گلوتن",
        isSpicy: true,
      },
    },

    {
      items: {
        name: "چیزی چیل برگر",
        price: { single: "700 ت", double: "846 ت" },
        taste: "ترکیب چیل و پنیر با طعمی خامه‌ای و متعادل",
        ingredients: [
          "نان دست‌ساز",
          "۷۰ گرم گوشت گوساله (سینگل) / ۱۴۰ گرم (دابل)",
          "پنیر گودا",
          "کاهو",
          "خیارشور",
          "دیپ چدار",
          "سس چیل",
        ],
        allergyWarning: "حاوی لبنیات و گلوتن",
      },
    },

    {
      items: {
        name: "گارلیک",
        price: { single: "711 ت", double: "855 ت" },
        taste: "سیر-محور، خامه‌ای و بسیار معطر",
        ingredients: [
          "نان دست‌ساز",
          "۷۰ گرم گوشت گوساله (سینگل) / ۱۴۰ گرم (دابل)",
          "پنیر قارچ و پارمزان",
          "سس سیر دست‌ساز",
          "کاهو",
          "خیارشور",
        ],
        allergyWarning: "حاوی لبنیات و گلوتن",
      },
    },

    {
      items: {
        name: "ترافل (پریمیوم)",
        price: { single: "741 ت", double: "890 ت" },
        taste: "خامه‌ای، معطر و رستورانی با سس ترافل",
        ingredients: [
          "نان دست‌ساز",
          "۷۰ گرم گوشت گوساله (سینگل) / ۱۴۰ گرم (دابل)",
          "پنیر قارچ و پارمزان",
          "سس ترافل دست‌ساز",
          "کاهو",
          "خیارشور",
        ],
        allergyWarning: "حاوی لبنیات و گلوتن",
      },
    },
  ],

  [
    { header: "کومبو" },
    { imgsrc: "/HeaderImage/pexels-roman-odintsov-5836783 2.webp" },
    { colorScheme: "--color-primary-red" },

    {
      items: {
        name: "چیل سینگل",
        price: "989 ت",
        taste: "چیل برگر تک همراه با فرایز",
        ingredients: ["چیل برگر سینگل", "فرایز"],
        allergyWarning: "حاوی لبنیات و گلوتن",
        badge: "کمبو برگر + فرایز",
        picture: "/ItemsImage/combo-single.webp",
      },
    },

    {
      items: {
        name: "چیل دبل",
        price: "1100 ت",
        taste: "چیل برگر دوبل همراه با فرایز",
        ingredients: ["چیل برگر دابل", "فرایز"],
        allergyWarning: "حاوی لبنیات و گلوتن",
        badge: "کمبو برگر + فرایز",
        picture: "/ItemsImage/combo-double.webp",
      },
    },
  ],

  [
    { header: "ترتیلا" },
    { imgsrc: "/HeaderImage/pexels-yesehoon-31682885 2.webp" },
    { colorScheme: "--color-primary-red" },

    {
      items: {
        name: "چیل اسنک اسموکی",
        price: "371 ت",
        taste: "ترتیلا ترد به همراه دیپ چدار دودی و نوشابه رایگان",
        ingredients: ["ترتیلا", "دیپ چدار دودی", "نوشابه رایگان"],
        allergyWarning: "حاوی لبنیات و گلوتن",
        badge: "+ نوشابه رایگان",
        picture: "/ItemsImage/tortilla-cheddar-combo.webp",
      },
    },

    {
      items: {
        name: "چیل اسنک سالسا",
        price: "371 ت",
        taste: "ترتیلا ترد به همراه دیپ سالسا خامه‌ای و نوشابه رایگان",
        ingredients: ["ترتیلا", "دیپ سالسا خامه‌ای", "نوشابه رایگان"],
        allergyWarning: "حاوی لبنیات و گلوتن",
        badge: "+ نوشابه رایگان",
        picture: "/ItemsImage/tortilla-salsa-combo.webp",
      },
    },
  ],

  [
    { header: "پیش‌غذاها" },
    { imgsrc: "/HeaderImage/pexels-kei-photo-1420806-2741461 2.webp" },
    { colorScheme: "--color-primary-white" },

    {
      items: {
        name: "فرایز",
        price: "299 ت",
        taste: "ترد، نمکی و کلاسیک",
        ingredients: ["سیب‌زمینی", "روغن", "نمک"],
        allergyWarning: "فاقد مواد حساسیت‌زای اصلی",
        picture: "/ItemsImage/fries.webp",
      },
    },

    {
      items: {
        name: "فرایز با دیپ",
        price: "320 ت",
        taste: "کش‌دار، گرم و پنیرمال",
        ingredients: ["سیب‌زمینی", "پنیر چدار", "سس مخصوص"],
        allergyWarning: "حاوی لبنیات",
        picture: "/ItemsImage/fries-ch.webp",
      },
    },

    {
      items: {
        name: "چیل فرایز",
        price: "450 ت",
        taste: "فرایز + ۷۰ گرم گوشت اسمش شده + پنیر چدار",
        ingredients: ["سیب‌زمینی", "۷۰ گرم گوشت اسمش شده", "پنیر چدار"],
        allergyWarning: "حاوی لبنیات و گلوتن",
      },
    },
  ],

  [
    { header: "نوشیدنی ها" },
    { imgsrc: "/HeaderImage/pexels-ron-lach-8879622 1.webp" },
    { colorScheme: "--color-primary-black" },

    {
      items: {
        name: "آب معدنی",
        price: "20 ت",
        taste: "خنک و طبیعی",
        ingredients: ["آب معدنی طبیعی"],
        allergyWarning: "",
      },
    },
    {
      items: {
        name: "نوشابه دستساز",
        price: "98 ت",
        taste: "زیرو / لیموناد / کوکا",
        ingredients: ["عصاره طبیعی", "آب گازدار"],
        allergyWarning: "",
        picture: "/ItemsImage/soda.webp",
      },
    },
  ],

  [
    { header: "تاپینگ ها" },
    { imgsrc: "/HeaderImage/set-of-five-dip-sauces-shot-from 2.webp" },
    { colorScheme: "--color-Secondary-gold" },

    {
      items: {
        name: "سس چیل",
        price: "55 ت",
        taste: "تند و آتشین",
        ingredients: ["فلفل چیلی", "ادویه مخصوص"],
        allergyWarning: "",
      },
    },
    {
      items: {
        name: "سس اسموکی",
        price: "55 ت",
        taste: "دودی و باربیکیو",
        ingredients: ["عصاره دود", "گوجه فرنگی"],
        allergyWarning: "",
      },
    },
    {
      items: {
        name: "سس هات",
        price: "55 ت",
        taste: "بسیار تند",
        ingredients: ["فلفل قرمز", "سیر"],
        allergyWarning: "",
      },
    },
    {
      items: {
        name: "سس گارلیک",
        price: "55 ت",
        taste: "سیر و سبزیجات",
        ingredients: ["سیر", "مایونز", "سبزیجات معطر"],
        allergyWarning: "حاوی تخم مرغ",
      },
    },
    {
      items: {
        name: "سس ترافل",
        price: "55 ت",
        taste: "عطر ترافل",
        ingredients: ["قارچ ترافل", "سس مخصوص"],
        allergyWarning: "حاوی تخم مرغ",
      },
    },
  ],

  [
    { header: "افزودنی" },
    { imgsrc: "/HeaderImage/set-of-five-dip-sauces-shot-from 2.webp" },
    { colorScheme: "--color-Secondary-gold" },

    {
      items: {
        name: "۳۰ گرم دیپ پنیر",
        price: "60 ت",
        taste: "",
        ingredients: ["پنیر"],
        allergyWarning: "حاوی لبنیات",
      },
    },
    {
      items: {
        name: "پنیر (دودی - گودا)",
        price: "25 ت",
        taste: "",
        ingredients: ["پنیر دودی یا گودا"],
        allergyWarning: "حاوی لبنیات",
      },
    },
    {
      items: {
        name: "گوشت اضافه",
        price: "200 ت",
        taste: "",
        ingredients: ["گوشت گوساله"],
        allergyWarning: "",
      },
    },
    {
      items: {
        name: "فلفل هالوپینو",
        price: "15 ت",
        taste: "",
        ingredients: ["فلفل هالوپینو"],
        allergyWarning: "",
      },
    },
    {
      items: {
        name: "کاهو / خیارشور",
        price: "15 ت",
        taste: "",
        ingredients: ["کاهو", "خیارشور"],
        allergyWarning: "",
      },
    },
    {
      items: {
        name: "دیپ سالسا خامه‌ای",
        price: "120 ت",
        taste: "دیپ سالسا خامه‌ای دست‌ساز",
        ingredients: ["سس سالسا", "خامه", "ادویه مخصوص"],
        allergyWarning: "حاوی لبنیات",
      },
    },
    {
      items: {
        name: "دیپ چدار دودی",
        price: "120 ت",
        taste: "دیپ پنیر چدار دودی غنی",
        ingredients: ["پنیر چدار دودی", "شیر", "ادویه مخصوص"],
        allergyWarning: "حاوی لبنیات",
      },
    },
  ],
];

export default Menu_items;

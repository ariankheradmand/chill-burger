const Menu_items = [
  [
    { header: "برگرها" },
    { imgsrc: "/HeaderImage/pexels-roman-odintsov-5836783 2.webp" },
    { colorScheme: "--color-primary-red" },

    {
      items: {
        name: "چیل برگر",
        price: "385 ت",
        taste: "تند ملایم با عطر چیل",
        ingredients: [
          "نان دست‌ساز",
          "۱۴۰ گرم گوشت گوساله",
          "پنیر گودا",
          "سس چیل",
          "کاهو",
          "خیارشور",
        ],
        allergyWarning: "حاوی لبنیات و گلوتن",
        picture: "/ItemsImage/burger.webp"
      },
    },

    {
      items: {
        name: "اسموکی برگر",
        price: "395 ت",
        taste: "دودی و عمیق با سس اسموکی",
        ingredients: [
          "نان دست‌ساز",
          "۱۴۰ گرم گوشت گوساله",
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
        name: "گارلیک برگر",
        price: "395 ت",
        taste: "سیر-محور، خامه‌ای و بسیار معطر",
        ingredients: [
          "نان دست‌ساز",
          "۱۴۰ گرم گوشت گوساله",
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
        name: "هات چیل برگر",
        price: "385 ت",
        taste: "تند واقعی با طعم هالوپینو و سس هات",
        ingredients: [
          "نان دست‌ساز",
          "۱۴۰ گرم گوشت گوساله",
          "پنیر گودای فلفلی",
          "فلفل هالوپینو",
          "سس هات",
          "کاهو",
          "خیارشور",
        ],
        allergyWarning: "حاوی لبنیات و گلوتن",
      },
    },

    {
      items: {
        name: "ترافل چیل",
        price: "420 ت",
        taste: "خامه‌ای، معطر و رستورانی با سس ترافل",
        ingredients: [
          "نان دست‌ساز",
          "۱۴۰ گرم گوشت گوساله",
          "پنیر قارچ و پارمزان",
          "سس قارچ دست‌ساز",
          "کاهو",
          "خیارشور",
        ],
        allergyWarning: "حاوی لبنیات و گلوتن",

      },
    },
  ], [
    { header: "پیش‌غذاها" },
    { imgsrc: "/HeaderImage/pexels-kei-photo-1420806-2741461 2.webp" },
    { colorScheme: "--color-primary-white" },

    {
      items: {
        name: "فرایز",
        price: "170 ت",
        taste: "ترد، نمکی و کلاسیک",
        ingredients: ["سیب‌زمینی", "روغن", "نمک"],
        allergyWarning: "فاقد مواد حساسیت‌زای اصلی",
        picture: "/ItemsImage/fries.webp"
      },
    },

    {
      items: {
        name: "فرایز با دیپ چدار",
        price: "210 ت",
        taste: "کش‌دار، گرم و پنیرمال",
        ingredients: ["سیب‌زمینی", "پنیر چدار", "سس مخصوص"],
        allergyWarning: "حاوی لبنیات",
        picture: "/ItemsImage/fries-ch.webp"
      },
    },
  ],
  [
    { header: "سالادها" },
    { imgsrc: "/HeaderImage/pexels-cottonbro-3298060 2.webp" },
    { colorScheme: "--color-Secondary-lightblue" },

    {
      items: {
        name: "سالاد ریحان و گوجه",
        price: "310 ت",
        taste: "تازه، معطر و سبک با رایحه ریحان ایتالیایی",
        ingredients: [
          "ریحان ایتالیایی",
          "درسینگ عسل",
          "گوجه گیلاسی",
          "پیاز قرمز",
          "پنیر فتا",
        ],
        allergyWarning: "حاوی لبنیات",
        picture: "/ItemsImage/grecce.webp"
      },
    },

    {
      items: {
        name: "سالاد بیبی اسفناج",
        price: "295 ت",
        taste: "ترکیب لیمویی، تازه و سبک",
        ingredients: ["بیبی اسفناج", "درسینگ لیمو", "پیاز قرمز", "پنیر فتا"],
        allergyWarning: "حاوی لبنیات",
        picture: "/ItemsImage/reyhan.webp"
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
        price: "15 ت",
        taste: "خنک و طبیعی",
        ingredients: ["آب معدنی طبیعی"],
        allergyWarning: "",
      },
    },
    {
      items: {
        name: "نوشابه دستساز",
        price: "60 ت",
        taste: "لیموناد , زیرو , کوکاکولا",
        ingredients: ["عصاره طبیعی", "آب گازدار"],
        allergyWarning: "",
      },
    },
  ],
  [
    { header: "تاپینگ ها" },
    { imgsrc: "/HeaderImage/set-of-five-dip-sauces-shot-from 2.webp" },
    { colorScheme: "--color-Secondary-gold" },

    {
      items: {
        name: "سس گارلیک",
        price: "50 ت",
        taste: "سیر و سبزیجات",
        ingredients: ["سیر", "مایونز", "سبزیجات معطر"],
        allergyWarning: "حاوی تخم مرغ",
      },
    },
    {
      items: {
        name: "سس ترافل",
        price: "50 ت",
        taste: "عطر ترافل",
        ingredients: ["قارچ ترافل", "سس مخصوص"],
        allergyWarning: "حاوی تخم مرغ",
      },
    },
    {
      items: {
        name: "سس چیل",
        price: "50 ت",
        taste: "تند و آتشین",
        ingredients: ["فلفل چیلی", "ادویه مخصوص"],
        allergyWarning: "",
      },
    },
    {
      items: {
        name: "سس اسموکی",
        price: "50 ت",
        taste: "دودی و باربیکیو",
        ingredients: ["عصاره دود", "گوجه فرنگی"],
        allergyWarning: "",
      },
    },
    {
      items: {
        name: "سس هات",
        price: "50 ت",
        taste: "بسیار تند",
        ingredients: ["فلفل قرمز", "سیر"],
        allergyWarning: "",
      },
    },
  ],

];

export default Menu_items;

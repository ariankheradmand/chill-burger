const Menu_items = [
  [
    { header: "پیش‌غذاها" },
    { imgsrc: "/HeaderImage/pexels-kei-photo-1420806-2741461 2.jpg" },
    { colorScheme: "--color-primary-white" },
    {
      items: {
        name: "سوپ",
        price: "120 ت",
        taste: "ملایم و گرم، با طعم سبزیجات تازه",
        ingredients: ["هویج", "سیب‌زمینی", "جعفری", "کره", "خامه"],
        allergyWarning: "حاوی لبنیات",
      },
    },
    {
      items: {
        name: "سیب‌زمینی سرخ‌کرده",
        price: "100 ت",
        taste: "نمکی و ترد",
        ingredients: ["سیب‌زمینی", "روغن سرخ‌کردنی", "نمک"],
        allergyWarning: "ممکن است در مجاورت گلوتن سرخ شود",
      },
    },
    {
      items: {
        name: "نان سیر",
        price: "140 ت",
        taste: "معطر با طعم سیر و کره",
        ingredients: ["نان باگت", "سیر", "کره", "پنیر پیتزا"],
        allergyWarning: "حاوی گلوتن و لبنیات",
      },
    },
    {
      items: {
        name: "چیپس و پنیر",
        price: "150 ت",
        taste: "کش‌دار، چرب و خوش‌نمک",
        ingredients: ["چیپس سیب‌زمینی", "پنیر چدار", "سس مخصوص"],
        allergyWarning: "حاوی لبنیات",
      },
    },
    {
      items: {
        name: "قارچ سوخاری",
        price: "160 ت",
        taste: "ترد با مغز نرم قارچ",
        ingredients: ["قارچ", "آرد سوخاری", "تخم‌مرغ", "ادویه"],
        allergyWarning: "ممکن است حاوی تخم‌مرغ و گلوتن باشد",
      },
    },
    {
      items: {
        name: "پیاز سوخاری",
        price: "130 ت",
        taste: "تند و ترد",
        ingredients: ["پیاز", "آرد", "پودر سیر", "ادویه"],
        allergyWarning: "ممکن است برای افراد با حساسیت گلوتن یا پیاز نامناسب باشد",
      },
    },
  ],
  [
    { header: "سالادها" },
    { imgsrc: "/HeaderImage/pexels-cottonbro-3298060 2.jpg" },
    { colorScheme: "--color-Secondary-lightblue" },
    {
      items: {
        name: "سالاد فصل",
        price: "110 ت",
        taste: "تازه و خنک",
        ingredients: ["کاهو", "خیار", "گوجه", "هویج", "سس لیمو"],
        allergyWarning: "فاقد مواد حساسیت‌زا",
      },
    },
    {
      items: {
        name: "سالاد سزار",
        price: "180 ت",
        taste: "کرم‌دار و لذیذ با طعم پارمزان",
        ingredients: ["کاهو", "نان تست", "سس سزار", "پنیر پارمزان", "مرغ گریل"],
        allergyWarning: "حاوی گلوتن، لبنیات و تخم‌مرغ",
      },
    },
    {
      items: {
        name: "سالاد یونانی",
        price: "170 ت",
        taste: "ترش و تازه با طعم زیتون",
        ingredients: ["خیار", "گوجه", "پنیر فتا", "زیتون", "روغن زیتون"],
        allergyWarning: "حاوی لبنیات",
      },
    },
    {
      items: {
        name: "سالاد کلم",
        price: "100 ت",
        taste: "شیرین و خامه‌ای",
        ingredients: ["کلم سفید", "هویج", "سس مایونز"],
        allergyWarning: "حاوی تخم‌مرغ",
      },
    },
    {
      items: {
        name: "سالاد مرغ",
        price: "190 ت",
        taste: "ملایم با طعم مرغ گریل و سس مایونز",
        ingredients: ["مرغ", "کاهو", "مایونز", "ذرت"],
        allergyWarning: "حاوی تخم‌مرغ و لبنیات",
      },
    },
    {
      items: {
        name: "سالاد تن ماهی",
        price: "200 ت",
        taste: "طعمی شور و دریایی",
        ingredients: ["تن ماهی", "سیب‌زمینی", "زیتون", "سس مخصوص"],
        allergyWarning: "حاوی ماهی و تخم‌مرغ",
      },
    },
  ],
  [
    { header: "سوخاری‌ها" },
    { imgsrc: "/HeaderImage/pexels-yesehoon-31682885 2.jpg" },
    { colorScheme: "--color-Secondary-gold" },
    {
      items: {
        name: "فیله سوخاری",
        price: "250 ت",
        taste: "ترد با طعم ادویه‌دار مرغ",
        ingredients: ["مرغ", "آرد سوخاری", "ادویه مخصوص"],
        allergyWarning: "حاوی گلوتن",
      },
    },
    {
      items: {
        name: "بال سوخاری",
        price: "220 ت",
        taste: "تند و ترد",
        ingredients: ["بال مرغ", "آرد", "سس اسپایسی"],
        allergyWarning: "ممکن است حاوی گلوتن باشد",
      },
    },
    {
      items: {
        name: "پاچین سوخاری",
        price: "230 ت",
        taste: "تند و آبدار",
        ingredients: ["پاچین مرغ", "ادویه کاری", "آرد سوخاری"],
        allergyWarning: "ممکن است حاوی گلوتن باشد",
      },
    },
    {
      items: {
        name: "میگو سوخاری",
        price: "280 ت",
        taste: "تند با طعم دریایی",
        ingredients: ["میگو", "آرد سوخاری", "تخم‌مرغ"],
        allergyWarning: "برای افراد حساس به میگو خطرناک است",
      },
    },
    {
      items: {
        name: "مرغ سوخاری",
        price: "240 ت",
        taste: "ترد و خوش‌طعم",
        ingredients: ["مرغ", "آرد", "ادویه مخصوص"],
        allergyWarning: "حاوی گلوتن",
      },
    },
    {
      items: {
        name: "کوردون بلو",
        price: "300 ت",
        taste: "کرم‌دار، با پنیر آب‌شده درون مرغ",
        ingredients: ["مرغ", "ژامبون", "پنیر", "آرد"],
        allergyWarning: "حاوی گلوتن و لبنیات",
      },
    },
  ],
  [
    { header: "برگرها" },
    { imgsrc: "/HeaderImage/pexels-roman-odintsov-5836783 2.jpg" },
    { colorScheme: "--color-primary-red" },
    {
      items: {
        name: "چیزبرگر",
        price: "250 ت",
        taste: "آبدار و پنیرمال",
        ingredients: ["گوشت گوساله", "پنیر چدار", "نان برگر", "سس"],
        allergyWarning: "حاوی لبنیات و گلوتن",
      },
    },
    {
      items: {
        name: "دوبل برگر",
        price: "360 ت",
        taste: "سنگین و آبدار با دوبل گوشت",
        ingredients: ["دو لایه گوشت", "نان برگر", "پنیر", "سس"],
        allergyWarning: "حاوی لبنیات و گلوتن",
      },
    },
    {
      items: {
        name: "ماشروم برگر",
        price: "270 ت",
        taste: "نرم و خامه‌ای با عطر قارچ",
        ingredients: ["گوشت", "قارچ", "پنیر", "سس سفید"],
        allergyWarning: "حاوی لبنیات و گلوتن",
      },
    },
    {
      items: {
        name: "چیکن برگر",
        price: "230 ت",
        taste: "سبک‌تر با طعم مرغ و ادویه ملایم",
        ingredients: ["مرغ چرخ‌شده", "نان", "سس", "کاهو"],
        allergyWarning: "حاوی گلوتن",
      },
    },
    {
      items: {
        name: "بیکن برگر",
        price: "340 ت",
        taste: "دودی و لذیذ",
        ingredients: ["گوشت", "بیکن", "پنیر", "سس"],
        allergyWarning: "حاوی لبنیات و گلوتن",
      },
    },
    {
      items: {
        name: "وجی برگر",
        price: "200 ت",
        taste: "گیاهی با طعم سبزیجات گریل",
        ingredients: ["نخود", "لوبیا", "نان گندم", "سس مخصوص"],
        allergyWarning: "ممکن است حاوی گلوتن باشد",
      },
    },
  ],
];

export default Menu_items;

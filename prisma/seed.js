const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
        disabled: false,
      },
    },
    {
      items: {
        name: "سیب‌زمینی سرخ‌کرده",
        price: "100 ت",
        taste: "نمکی و ترد",
        ingredients: ["سیب‌زمینی", "روغن سرخ‌کردنی", "نمک"],
        allergyWarning: "ممکن است در مجاورت گلوتن سرخ شود",
        disabled: false
      },
    },
    {
      items: {
        name: "نان سیر",
        price: "140 ت",
        taste: "معطر با طعم سیر و کره",
        ingredients: ["نان باگت", "سیر", "کره", "پنیر پیتزا"],
        allergyWarning: "حاوی گلوتن و لبنیات",
        disabled: false
      },
    },
    {
      items: {
        name: "چیپس و پنیر",
        price: "150 ت",
        taste: "کش‌دار، چرب و خوش‌نمک",
        ingredients: ["چیپس سیب‌زمینی", "پنیر چدار", "سس مخصوص"],
        allergyWarning: "حاوی لبنیات",
        disabled: false
      },
    },
    {
      items: {
        name: "قارچ سوخاری",
        price: "160 ت",
        taste: "ترد با مغز نرم قارچ",
        ingredients: ["قارچ", "آرد سوخاری", "تخم‌مرغ", "ادویه"],
        allergyWarning: "ممکن است حاوی تخم‌مرغ و گلوتن باشد",
        disabled: false
      },
    },
    {
      items: {
        name: "پیاز سوخاری",
        price: "130 ت",
        taste: "تند و ترد",
        ingredients: ["پیاز", "آرد", "پودر سیر", "ادویه"],
        allergyWarning: "ممکن است برای افراد با حساسیت گلوتن یا پیاز نامناسب باشد",
        disabled: false
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
        disabled: false
      },
    },
    {
      items: {
        name: "سالاد سزار",
        price: "180 ت",
        taste: "کرم‌دار و لذیذ با طعم پارمزان",
        ingredients: ["کاهو", "نان تست", "سس سزار", "پنیر پارمزان", "مرغ گریل"],
        allergyWarning: "حاوی گلوتن، لبنیات و تخم‌مرغ",
        disabled: false,
      },
    },
    {
      items: {
        name: "سالاد یونانی",
        price: "170 ت",
        taste: "ترش و تازه با طعم زیتون",
        ingredients: ["خیار", "گوجه", "پنیر فتا", "زیتون", "روغن زیتون"],
        allergyWarning: "حاوی لبنیات",
        disabled: false
      },
    },
    {
      items: {
        name: "سالاد کلم",
        price: "100 ت",
        taste: "شیرین و خامه‌ای",
        ingredients: ["کلم سفید", "هویج", "سس مایونز"],
        allergyWarning: "حاوی تخم‌مرغ",
        disabled: false
      },
    },
    {
      items: {
        name: "سالاد مرغ",
        price: "190 ت",
        taste: "ملایم با طعم مرغ گریل و سس مایونز",
        ingredients: ["مرغ", "کاهو", "مایونز", "ذرت"],
        allergyWarning: "حاوی تخم‌مرغ و لبنیات",
        disabled: false
      },
    },
    {
      items: {
        name: "سالاد تن ماهی",
        price: "200 ت",
        taste: "طعمی شور و دریایی",
        ingredients: ["تن ماهی", "سیب‌زمینی", "زیتون", "سس مخصوص"],
        allergyWarning: "حاوی ماهی و تخم‌مرغ",
        disabled: false
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
        disabled: false
      },
    },
    {
      items: {
        name: "بال سوخاری",
        price: "220 ت",
        taste: "تند و ترد",
        ingredients: ["بال مرغ", "آرد", "سس اسپایسی"],
        allergyWarning: "ممکن است حاوی گلوتن باشد",
        disabled: false
      },
    },
    {
      items: {
        name: "پاچین سوخاری",
        price: "230 ت",
        taste: "تند و آبدار",
        ingredients: ["پاچین مرغ", "ادویه کاری", "آرد سوخاری"],
        allergyWarning: "ممکن است حاوی گلوتن باشد",
        disabled: false
      },
    },
    {
      items: {
        name: "میگو سوخاری",
        price: "280 ت",
        taste: "تند با طعم دریایی",
        ingredients: ["میگو", "آرد سوخاری", "تخم‌مرغ"],
        allergyWarning: "برای افراد حساس به میگو خطرناک است",
        disabled: false
      },
    },
    {
      items: {
        name: "مرغ سوخاری",
        price: "240 ت",
        taste: "ترد و خوش‌طعم",
        ingredients: ["مرغ", "آرد", "ادویه مخصوص"],
        allergyWarning: "حاوی گلوتن",
        disabled: false
      },
    },
    {
      items: {
        name: "کوردون بلو",
        price: "300 ت",
        taste: "کرم‌دار، با پنیر آب‌شده درون مرغ",
        ingredients: ["مرغ", "ژامبون", "پنیر", "آرد"],
        allergyWarning: "حاوی گلوتن و لبنیات",
        disabled: false
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
        disabled: false
      },
    },
    {
      items: {
        name: "دوبل برگر",
        price: "360 ت",
        taste: "سنگین و آبدار با دوبل گوشت",
        ingredients: ["دو لایه گوشت", "نان برگر", "پنیر", "سس"],
        allergyWarning: "حاوی لبنیات و گلوتن",
        disabled: false
      },
    },
    {
      items: {
        name: "ماشروم برگر",
        price: "270 ت",
        taste: "نرم و خامه‌ای با عطر قارچ",
        ingredients: ["گوشت", "قارچ", "پنیر", "سس سفید"],
        allergyWarning: "حاوی لبنیات و گلوتن",
        disabled: false
      },
    },
    {
      items: {
        name: "چیکن برگر",
        price: "230 ت",
        taste: "سبک‌تر با طعم مرغ و ادویه ملایم",
        ingredients: ["مرغ چرخ‌شده", "نان", "سس", "کاهو"],
        allergyWarning: "حاوی گلوتن",
        disabled: true,
      },
    },
    {
      items: {
        name: "بیکن برگر",
        price: "340 ت",
        taste: "دودی و لذیذ",
        ingredients: ["گوشت", "بیکن", "پنیر", "سس"],
        allergyWarning: "حاوی لبنیات و گلوتن",
        disabled: false
      },
    },
    {
      items: {
        name: "وجی برگر",
        price: "200 ت",
        taste: "گیاهی با طعم سبزیجات گریل",
        ingredients: ["نخود", "لوبیا", "نان گندم", "سس مخصوص"],
        allergyWarning: "ممکن است حاوی گلوتن باشد",
        disabled: true
      },
    },
  ],
];

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();

  // Seed categories and items
  for (let i = 0; i < Menu_items.length; i++) {
    const category = Menu_items[i];
    const header = category[0].header;
    const imgsrc = category[1].imgsrc;
    const colorScheme = category[2].colorScheme;

    const createdCategory = await prisma.category.create({
      data: {
        header,
        imgsrc,
        colorScheme,
        order: i,
      },
    });

    console.log(`Created category: ${header}`);

    // Create items for this category
    for (let j = 3; j < category.length; j++) {
      const item = category[j].items;
      await prisma.item.create({
        data: {
          name: item.name,
          price: item.price,
          taste: item.taste,
          ingredients: JSON.stringify(item.ingredients),
          allergyWarning: item.allergyWarning,
          disabled: item.disabled,
          categoryId: createdCategory.id,
        },
      });
    }

    console.log(`Created ${category.length - 3} items for ${header}`);
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.products": "Products",
    "nav.partners": "Partners",
    "nav.contact": "Contact",

    // Footer
    "footer.standout": "Standout",
    "footer.marquee": "Premium Label Printing ✦ PE · PP · Thermal · Metallized ✦ UV Coating & Lamination ✦ IML In-Mold Labels ✦ Alexandria, Egypt ✦ Arts Label",
    "footer.crafted": "Crafted with",
    "footer.by": "by",
    "footer.rights2": "© {year} ArtsLabel. All rights reserved.",

    // Announcement Strip
    "strip.text": "Your product deserves a better label.",

    // Scroll Animation
    "scroll.step1.text": "Excellent product, but no branding.",
    "scroll.step1.sub": "Your product deserves to be seen.",
    "scroll.step2.text": "Fully customizable branding.",
    "scroll.step2.sub": "Labels designed to perfection.",
    "scroll.step3.text": "Let your product stand out.",
    "scroll.step3.sub": "From shelf to spotlight.",
    "scroll.indicator": "Scroll",

    // Text Rotate
    "rotate.prefix": "Arts makes it",
    "rotate.word1": "faster",
    "rotate.word2": "better",
    "rotate.word3": "exceptional",

    // Products
    "products.title": "Our Products",
    "products.subtitle": "Everything you need to make your brand unforgettable.",
    "products.cosmetics.name": "Cosmetics & Personal Care",
    "products.food.name": "Food & Beverage",
    "products.detergents.name": "Detergents & Cleaning Products",
    "products.chemicals.name": "Chemicals",
    "products.pesticides.name": "Pesticides & Fertilizers",
    "products.pharma.name": "Pharmaceuticals",

    // Label Quality
    "label.quality": "Highest Quality Label",

    // Partners
    "partners.title": "Our Partners",
    "partners.subtitle": "Trusted by leading brands worldwide.",

    // Image Comparison
    "comparison.title": "The Art of Labeling",
    "comparison.subtitle": "Drag the slider to see the transformation from plain product to branded masterpiece.",

    // Before/After
    "beforeafter.title": "Before & After",
    "beforeafter.subtitle": "See how our labels transform ordinary products into shelf-ready brands.",
    "beforeafter.before": "Before",
    "beforeafter.after": "After",

    // Materials
    "materials.title": "Our Materials & Finishing",
    "materials.subtitle": "We use only premium-grade substrates and finishes to ensure every label performs as good as it looks.",
    "materials.substrates": "Label Substrates",
    "materials.finishing": "Finishing Options",
    "materials.pe": "PE (Polyethylene)",
    "materials.pe.desc": "Flexible and moisture-resistant, ideal for squeezable bottles and containers.",
    "materials.pp": "PP (Polypropylene)",
    "materials.pp.desc": "Durable, water-resistant film perfect for food, beverage, and personal care labels.",
    "materials.thermal": "Thermal Paper",
    "materials.thermal.desc": "High-speed printable paper used for logistics, barcodes, and retail tagging.",
    "materials.semiglossy": "Semi-Glossy Paper",
    "materials.semiglossy.desc": "Balanced sheen for a refined look — great for premium consumer goods.",
    "materials.metallizedpaper": "Metallized Paper",
    "materials.metallizedpaper.desc": "A reflective paper substrate that adds a luxurious metallic effect to any label.",
    "materials.metallizedfilm": "Metallized Film",
    "materials.metallizedfilm.desc": "High-gloss film with a mirror-like finish for standout shelf presence.",
    "materials.transparent": "Transparent Film",
    "materials.transparent.desc": "No-label look that makes your design appear printed directly on the product.",
    "materials.iml": "IML (In-Mold Labels)",
    "materials.iml.desc": "Labels integrated directly during molding for a seamless, permanent bond.",
    "materials.lamination": "Lamination",
    "materials.lamination.desc": "Protective coating available in matte, gloss, or soft-touch for durability and feel.",
    "materials.uv": "UV Coating",
    "materials.uv.desc": "Spot or full UV gloss for striking visual contrast and surface protection.",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Ready to elevate your brand? Let's talk.",
    "contact.email": "Ahmed@artslabels.com · Sales@artslabels.com",
    "contact.phone": "012 26613862",
    "contact.location": "Alexandria, Ring Road, Sewage Station Entrance, Egypt",
    "contact.name.placeholder": "Your name",
    "contact.email.placeholder": "Your email",
    "contact.message.placeholder": "Tell us about your project...",
    "contact.submit": "Send Message",

    // Footer
    "footer.brand": "Artslabel.",
    "footer.rights": "© {year} ArtsLabel. All rights reserved.",
  },
  ar: {
    // Navbar
    "nav.products": "المنتجات",
    "nav.partners": "الشركاء",
    "nav.contact": "تواصل معنا",

    // Footer
    "footer.standout": "تميّز",
    "footer.marquee": "طباعة ليبل احترافية ✦ PE · PP · حراري · معدني ✦ طلاء UV والتغليف ✦ ليبل داخل القالب IML ✦ الإسكندرية، مصر ✦ آرتسليبل",
    "footer.crafted": "صُنع بـ",
    "footer.by": "بواسطة",
    "footer.rights2": "© {year} آرتسليبل. جميع الحقوق محفوظة.",

    // Announcement Strip
    "strip.text": "منتجك يستحق ليبل أفضل",

    // Scroll Animation
    "scroll.step1.text": "منتج ممتاز، لكن بدون علامة تجارية.",
    "scroll.step1.sub": "منتجك يستحق أن يُرى.",
    "scroll.step2.text": "علامة تجارية قابلة للتخصيص بالكامل.",
    "scroll.step2.sub": "ليبول مُصمَّم بإتقان.",
    "scroll.step3.text": "اجعل منتجك يبرز.",
    "scroll.step3.sub": "من الرف إلى الضوء.",
    "scroll.indicator": "مرر للأسفل",

    // Text Rotate
    "rotate.prefix": "ارتس بتعملها",
    "rotate.word1": "اسرع",
    "rotate.word2": "احسن",
    "rotate.word3": "استثنائيه",

    // Products
    "products.title": "منتجاتنا",
    "products.subtitle": "كل ما تحتاجه لجعل علامتك التجارية لا تُنسى.",
    "products.cosmetics.name": "مستحضرات التجميل والعناية الشخصية",
    "products.food.name": "الأغذية والمشروبات",
    "products.detergents.name": "المنظفات ومنتجات التنظيف",
    "products.chemicals.name": "المواد الكيميائية",
    "products.pesticides.name": "المبيدات والأسمدة",
    "products.pharma.name": "الأدوية",

    // Label Quality
    "label.quality": "ملصقات بأعلى جودة",

    // Partners
    "partners.title": "شركاؤنا",
    "partners.subtitle": "موثوق بها من قبل العلامات التجارية الرائدة عالميًا.",

    // Image Comparison
    "comparison.title": "ليبل يصنع الفرق",
    "comparison.subtitle": "اسحب شريط التمرير لمشاهدة التحول من منتج عادي إلى تحفة ذات علامة تجارية.",

    // Before/After
    "beforeafter.title": "قبل وبعد",
    "beforeafter.subtitle": "شاهد كيف تحوّل ملصقاتنا المنتجات العادية إلى علامات تجارية جاهزة للعرض.",
    "beforeafter.before": "قبل",
    "beforeafter.after": "بعد",

    // Materials
    "materials.title": "موادنا والتشطيبات",
    "materials.subtitle": "نستخدم ركائز وتشطيبات من الدرجة الأولى لضمان أن كل ليبل يؤدي وظيفته بنفس جودة مظهره.",
    "materials.substrates": "ركائز الليبل",
    "materials.finishing": "خيارات التشطيب",
    "materials.pe": "PE (البولي إيثيلين)",
    "materials.pe.desc": "مرن ومقاوم للرطوبة، مثالي للزجاجات والحاويات القابلة للضغط.",
    "materials.pp": "PP (البولي بروبيلين)",
    "materials.pp.desc": "فيلم متين ومقاوم للماء مثالي لملصقات الأغذية والمشروبات والعناية الشخصية.",
    "materials.thermal": "الورق الحراري",
    "materials.thermal.desc": "ورق قابل للطباعة بسرعة عالية يُستخدم للخدمات اللوجستية والباركود والبيع بالتجزئة.",
    "materials.semiglossy": "ورق شبه لامع",
    "materials.semiglossy.desc": "لمعان متوازن لمظهر راقٍ — رائع للسلع الاستهلاكية المميزة.",
    "materials.metallizedpaper": "ورق معدني",
    "materials.metallizedpaper.desc": "ركيزة ورقية عاكسة تضيف تأثيرًا معدنيًا فاخرًا لأي ليبل.",
    "materials.metallizedfilm": "فيلم معدني",
    "materials.metallizedfilm.desc": "فيلم عالي اللمعان بتشطيب مرآوي لحضور بارز على الرف.",
    "materials.transparent": "فيلم شفاف",
    "materials.transparent.desc": "مظهر بدون ليبل يجعل تصميمك يبدو مطبوعاً مباشرة على المنتج.",
    "materials.iml": "IML (ليبل داخل القالب)",
    "materials.iml.desc": "ليبل مدمجة مباشرة أثناء عملية التشكيل لترابط سلس ودائم.",
    "materials.lamination": "التغليف",
    "materials.lamination.desc": "طلاء واقٍ متاح بتشطيبات مطفأة أو لامعة أو ناعمة اللمس.",
    "materials.uv": "طلاء UV",
    "materials.uv.desc": "UV موضعي أو كامل للتباين البصري المذهل والحماية السطحية.",

    // Contact
    "contact.title": "تواصل معنا",
    "contact.subtitle": "مستعد لرفع مستوى علامتك التجارية؟ لنتحدث.",
    "contact.email": "Ahmed@artslabels.com · Sales@artslabels.com",
    "contact.phone": "012 26613862",
    "contact.location": "الإسكندرية، الطريق الدائري، مدخل محطة الصرف الصحي، مصر",
    "contact.name.placeholder": "اسمك",
    "contact.email.placeholder": "بريدك الإلكتروني",
    "contact.message.placeholder": "أخبرنا عن مشروعك...",
    "contact.submit": "إرسال الرسالة",

    // Footer
    "footer.brand": ".آرتسليبل",
    "footer.rights": "© {year} آرتسليبل. جميع الحقوق محفوظة.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem("lang") as Language) || "en";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang, dir]);

  const t = (key: string) => {
    const val = translations[lang][key];
    if (!val) return key;
    return val.replace("{year}", new Date().getFullYear().toString());
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

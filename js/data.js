// Menu Categories
const categories = [
    {
        id: "1",
        name_en: "Starter",
        name_zh: "前菜",
        name_vi: "Món khai vị",
        name_ms: "Hidangan Pembuka",
        displayOrder: 1
    },
    {
        id: "2",
        name_en: "Bread & Spread",
        name_zh: "面包和酱料",
        name_vi: "Bánh mì và Sốt phết",
        name_ms: "Roti & Sos",
        displayOrder: 2
    },
    {
        id: "3",
        name_en: "Small Vegetable",
        name_zh: "小菜",
        name_vi: "Rau nhỏ",
        name_ms: "Sayuran Kecil",
        displayOrder: 3
    },
    {
        id: "4",
        name_en: "Pasta/Rice",
        name_zh: "意面/饭",
        name_vi: "Mì/Cơm",
        name_ms: "Pasta/Nasi",
        displayOrder: 4
    },
    {
        id: "5",
        name_en: "Mains",
        name_zh: "主菜",
        name_vi: "Món chính",
        name_ms: "Hidangan Utama",
        displayOrder: 5
    },
    {
        id: "6",
        name_en: "Large/Sharing",
        name_zh: "大份/分享",
        name_vi: "Món lớn/Chia sẻ",
        name_ms: "Hidangan Besar/Kongsi",
        displayOrder: 6
    },
    {
        id: "7",
        name_en: "Desserts",
        name_zh: "甜点",
        name_vi: "Tráng miệng",
        name_ms: "Pencuci Mulut",
        displayOrder: 7
    },
    {
        id: "8",
        name_en: "Wine",
        name_zh: "葡萄酒",
        name_vi: "Rượu vang",
        name_ms: "Wain",
        displayOrder: 8
    }
];

// Menu Items
const menuItems = [
    {
        id: "1",
        category: "Starter",
        name_en: "Prosperity Yee Sang",
        name_zh: "发财鱼生",
        name_vi: "Gỏi cá hồi thịnh vượng",
        name_ms: "Yee Sang Kemakmuran",
        description_en: "Herbs, pickle, cold smoked salmon, coconut flake, muralia sesame oil, plum sugar, spices, asam jawa, cherry jam, green lime",
        price: "Market Price",
        pax: "6-8",
        dietary: "pescatarian",
        allergens: ["fish", "sesame"],
        isPopular: true
    },
    {
        id: "2",
        category: "Bread & Spread",
        name_en: "Sourdough with Red Date Butter",
        name_zh: "红枣牛油抹面",
        name_vi: "Bánh mì chua với bơ chà là đỏ",
        name_ms: "Roti Sourdough dengan Mentega Kurma Merah",
        description_en: "Red date, brown sugar, pamplie unsalted butter",
        price: 23,
        dietary: "vegetarian",
        allergens: ["dairy"]
    },
    {
        id: "3",
        category: "Bread & Spread",
        name_en: "Ciabatta with Hummus",
        name_zh: "中东面包配鹰嘴豆泥",
        name_vi: "Bánh mì Ciabatta với Hummus",
        name_ms: "Ciabatta dengan Hummus",
        description_en: "Green olive, Italian flat parsley, red onion, confit garlic, chickpea, paprika powder, sesame, lemon juice",
        price: 25,
        dietary: "vegan",
        allergens: ["sesame"]
    },
    {
        id: "4",
        category: "Bread & Spread",
        name_en: "Smashed Chilli Eggplant Dip",
        name_zh: "雪板茄子",
        name_vi: "Sốt cà tím ớt băm",
        name_ms: "Sos Terung Cili",
        description_en: "Roasted eggplant & charleston chili, garlic, sesame oil, soy sauce, vinegar (served with sourdough/ciabatta)",
        price: 28,
        dietary: "vegan",
        allergens: ["sesame", "soy", "gluten"]
    }
    // Add more menu items as needed
];

// Language configurations
const languages = {
    en: {
        code: "en",
        name: "English",
        searchPlaceholder: "Search menu...",
        allCategories: "All",
        popular: "Popular",
        paxLabel: "Serves",
        dietaryLabel: "Dietary",
        allergensLabel: "Allergens"
    },
    zh: {
        code: "zh",
        name: "中文",
        searchPlaceholder: "搜索菜单...",
        allCategories: "全部",
        popular: "热门",
        paxLabel: "份量",
        dietaryLabel: "饮食类型",
        allergensLabel: "过敏原"
    },
    vi: {
        code: "vi",
        name: "Tiếng Việt",
        searchPlaceholder: "Tìm kiếm...",
        allCategories: "Tất cả",
        popular: "Phổ biến",
        paxLabel: "Khẩu phần",
        dietaryLabel: "Chế độ ăn",
        allergensLabel: "Dị ứng"
    },
    ms: {
        code: "ms",
        name: "Bahasa Melayu",
        searchPlaceholder: "Cari menu...",
        allCategories: "Semua",
        popular: "Popular",
        paxLabel: "Hidangan untuk",
        dietaryLabel: "Pemakanan",
        allergensLabel: "Alergen"
    }
};

// Export the data
window.menuData = {
    categories,
    menuItems,
    languages
};

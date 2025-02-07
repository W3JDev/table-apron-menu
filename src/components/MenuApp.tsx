import React, { useState } from 'react';
import { Globe, Filter, Users } from 'lucide-react';

const menuItems = [
  {
    id: 1,
    name: {
      en: "Prosperity Yee Sang",
      zh: "发财鱼生",
      vi: "Gỏi cá hồi thịnh vượng",
      ms: "Yee Sang Kemakmuran"
    },
    description: {
      en: "Herbs, pickle, cold smoked salmon, coconut flake, muralia sesame oil, plum sugar, spices, asam jawa, cherry jam, green lime"
    },
    price: 118,
    pax: "6-8",
    allergens: ['fish', 'sesame'],
    dietary: ['pescatarian'],
    preferences: ['no raw garlic', 'no coriander', 'no spicy'],
    isPopular: true,
    category: "Starter"
  },
  {
    id: 2,
    name: {
      en: "Sourdough with Red Date Butter",
      zh: "红枣牛油抹面",
      vi: "Bánh mì chua với bơ chà là đỏ",
      ms: "Roti Sourdough dengan Mentega Kurma Merah"
    },
    description: {
      en: "Red date, brown sugar, pamplie unsalted butter"
    },
    price: 23,
    allergens: ['dairy'],
    dietary: ['vegetarian'],
    category: "Bread & Spread"
  },
  {
    id: 3,
    name: {
      en: "Ciabatta with Hummus",
      zh: "中东面包配鹰嘴豆泥",
      vi: "Bánh mì Ciabatta với Hummus",
      ms: "Ciabatta dengan Hummus"
    },
    description: {
      en: "Green olive, Italian flat parsley, red onion, confit garlic, chickpea, paprika powder, sesame, lemon juice"
    },
    price: 25,
    allergens: ['sesame'],
    dietary: ['vegan'],
    preferences: ['no raw garlic', 'no coriander', 'no onion'],
    category: "Bread & Spread"
  },
  {
    id: 4,
    name: {
      en: "Smashed Chilli Eggplant Dip",
      zh: "雪板茄子",
      vi: "Sốt cà tím ớt băm",
      ms: "Sos Terung Cili"
    },
    description: {
      en: "Roasted eggplant & charleston chili, garlic, sesame oil, soy sauce, vinegar (served with sourdough/ciabatta)"
    },
    price: 28,
    allergens: ['sesame', 'soy', 'gluten'],
    dietary: ['vegan'],
    preferences: ['no raw garlic', 'no spicy'],
    category: "Bread & Spread"
  },
  {
    id: 8,
    category: 'Pasta/Rice',
    name: {
      en: "Lotus & Celtuce with Scallop Salad",
      zh: "凉拌莴苣莲藕干贝",
      vi: "Gỏi sò điệp với sen và xà lách celtuce",
      ms: "Salad Teratai & Celtuce dengan Skallop"
    },
    description: {
      en: "Celtuce, lotus root, Chinese yam, chili, scallop, flavoured oil dressing, coriander seed, seaweed powder"
    },
    price: 35,
    allergens: ['shellfish'],
    dietary: ['pescatarian'],
    preferences: ['no coriander', 'no spicy'],
    image: "Lotus & Celtuce with Scallop Salad.jpg"
  },
  {
    id: 9,
    category: 'Pasta/Rice',
    name: {
      en: "Casarecce Pasta al Ragu",
      zh: "意大利肉酱面",
      vi: "Mì Casarecce với sốt thịt băm",
      ms: "Pasta Casarecce dengan Ragu"
    },
    description: {
      en: "Pork/beef, Padano cheese, parsley, egg, flour, tomato, carrot, celery, onion"
    },
    price: 45,
    allergens: ['dairy', 'gluten', 'egg'],
    dietary: ['contains meat'],
    preferences: ['no coriander', 'no onion', 'no beef', 'no pork']
  },
  {
    id: 10,
    category: 'Pasta/Rice',
    name: {
      en: "Casarecce Prawn Pasta",
      zh: "虾仁意大利面",
      vi: "Mì Casarecce với tôm",
      ms: "Pasta Casarecce dengan Udang"
    },
    description: {
      en: "Tiger prawn, tomato, prawn oil, prawn stock, bay leaf, chili flake, garlic"
    },
    price: 48,
    allergens: ['shellfish'],
    dietary: ['pescatarian'],
    preferences: ['no spicy']
  },
  {
    id: 11,
    category: 'Pasta/Rice',
    name: {
      en: "Jinhua Ham & Bok Choy Rice",
      zh: "金华火腿白菜饭",
      vi: "Cơm thịt nguội Jinhua với cải thìa",
      ms: "Nasi Ham Jinhua & Pak Choy"
    },
    description: {
      en: "Minced pork, cured pork, white pepper, fish sauce, wasabi, soy sauce, baker, crispy chili oil, soy nigges, lian bills, garlic, shallot"
    },
    price: 38,
    allergens: ['fish', 'soy', 'gluten'],
    dietary: ['contains meat'],
    preferences: ['no raw garlic', 'no spicy', 'no pork'],
    image: "Jinhua ham & Bok Choy Rice 金苹果果酱.jpg"
  },
  {
    id: 12,
    category: 'Mains',
    name: {
      en: "Buckwheat Fried Chicken",
      zh: "荞麦炸鸡",
      vi: "Gà rán kiều mạch",
      ms: "Ayam Goreng Buckwheat"
    },
    description: {
      en: "Buckwheat fried chicken thighs & drums, tail bask"
    },
    price: 42,
    allergens: ['gluten'],
    dietary: ['contains meat'],
    preferences: ['not too fatty']
  },
  {
    id: 13,
    category: 'Mains',
    name: {
      en: "Pork Ribs with Pineapple Glaze",
      zh: "菠萝釉猪排",
      vi: "Sườn heo nướng sốt dứa",
      ms: "Rusuk Babi dengan Sos Nanas"
    },
    description: {
      en: "Ribs, pineapple & ketchup glaze, spiced rub, tamarind & chili dip"
    },
    price: 55,
    dietary: ['contains meat'],
    preferences: ['no spicy', 'no pork']
  },
  {
    id: 14,
    category: 'Large/Sharing',
    name: {
      en: "Roast Tilapia with Harissa",
      zh: "哈里萨烤罗非鱼",
      vi: "Cá rô phi nướng sốt Harissa",
      ms: "Ikan Tilapia Panggang dengan Harissa"
    },
    description: {
      en: "Tilapia/red snapper, harissa paste, pickled onion, ulam & micro herbs (marigold), calamansi, curry leaf oil"
    },
    price: 68,
    allergens: ['fish'],
    dietary: ['pescatarian'],
    preferences: ['no raw onion', 'no spicy'],
    pax: "2-3"
  },
  {
    id: 15,
    category: 'Large/Sharing',
    name: {
      en: "Papillote Red Snapper Fillet",
      zh: "法式纸烤红鲷鱼",
      vi: "Cá hồng phi lê nướng giấy kiểu Pháp",
      ms: "Ikan Merah Papillote"
    },
    description: {
      en: "Red snapper, Shao Xing wine-butter sauce (pickle daikon, kuchai, red onion)"
    },
    price: 75,
    allergens: ['fish', 'dairy', 'alcohol'],
    dietary: ['pescatarian'],
    preferences: ['no raw onion', 'no alcohol'],
    pax: "2-3",
    image: "Papillote red snapper-fillet w Shao Xing beurre blanc 法式纸烤红色.jpg"
  },
  {
    id: 16,
    category: 'Large/Sharing',
    name: {
      en: "Angus Flank Steak with Charred Vegetables",
      zh: "安格斯牛腹肉配炭烤蔬菜",
      vi: "Thăn bò Angus với rau củ nướng",
      ms: "Steak Angus dengan Sayuran Panggang"
    },
    description: {
      en: "Red snapper, Shao Xing wine-baby kailan, butter sauce"
    },
    price: 88,
    allergens: ['dairy'],
    dietary: ['contains meat'],
    preferences: ['no beef', 'no alcohol'],
    pax: "2-3"
  },
  {
    id: 17,
    category: 'Large/Sharing',
    name: {
      en: "Pork Chop with Charred Vegetables",
      zh: "炭烤猪排配蔬菜",
      vi: "Sườn heo với rau củ nướng",
      ms: "Potongan Babi dengan Sayuran Panggang"
    },
    description: {
      en: "Grilled pork chop, chimichurri, dijon mustard, charred kailan & cabbage"
    },
    price: 78,
    allergens: ['mustard'],
    dietary: ['contains meat'],
    preferences: ['no pork'],
    pax: "2-3"
  }
];

const combinedMenuItems = [...menuItems, ...menuItemsSecondBatch];

const dietaryFilters = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'pescatarian', label: 'Pescatarian' },
  { id: 'halal', label: 'Halal' },
  { id: 'glutenFree', label: 'Gluten Free' },
  { id: 'dairyFree', label: 'Dairy Free' },
  { id: 'noRawGarlic', label: 'No Raw Garlic' },
  { id: 'noCoriander', label: 'No Coriander' },
  { id: 'noSpicy', label: 'No Spicy' },
  { id: 'noOnion', label: 'No Onion' }
];

const MenuApp = () => {
  const [language, setLanguage] = useState('en');
  const [filters, setFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [paxFilter, setPaxFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = Array.from(new Set(combinedMenuItems.map(item => item.category))).sort();

  const toggleFilter = (filterId: string) => {
    setFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const filterItems = (items: any[]) => {
    return items.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      
      if (filters.includes('vegetarian') && !item.dietary?.includes('vegetarian')) return false;
      if (filters.includes('vegan') && !item.dietary?.includes('vegan')) return false;
      if (filters.includes('pescatarian') && !item.dietary?.includes('pescatarian')) return false;
      if (filters.includes('glutenFree') && item.allergens?.includes('gluten')) return false;
      if (filters.includes('dairyFree') && item.allergens?.includes('dairy')) return false;
      if (filters.includes('noRawGarlic') && !item.preferences?.includes('no raw garlic')) return false;
      if (filters.includes('noCoriander') && !item.preferences?.includes('no coriander')) return false;
      if (filters.includes('noSpicy') && !item.preferences?.includes('no spicy')) return false;
      if (filters.includes('noOnion') && !item.preferences?.includes('no onion')) return false;
      
      if (paxFilter !== 'all' && item.pax && !item.pax.includes(paxFilter)) return false;
      
      return true;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-serif">TABLE & APRON</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Filter size={20} />
            </button>
            <button 
              onClick={() => setLanguage(prev => prev === 'en' ? 'zh' : 'en')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Globe size={20} />
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 border-b">
          <div className="mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {dietaryFilters.map(filter => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.includes(filter.id)
                    ? 'bg-red-800 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Users size={16} />
            <select
              value={paxFilter}
              onChange={(e) => setPaxFilter(e.target.value)}
              className="border rounded p-1 text-sm"
            >
              <option value="all">Any Size</option>
              <option value="2">2 pax</option>
              <option value="4">4 pax</option>
              <option value="6">6+ pax</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        {filterItems(combinedMenuItems).map((item) => (
          <div key={item.id} className="p-4 border-b">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-lg font-medium">
                  {item.name[language] || item.name.en}
                </h2>
                <p className="text-gray-600 text-sm mt-2 italic">
                  {item.description?.[language] || item.description?.en}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.allergens?.map((allergen: string) => (
                    <span key={allergen} className="px-2 py-1 rounded-full bg-red-50 text-red-800 text-xs">
                      Contains: {allergen}
                    </span>
                  ))}
                  {item.dietary?.map((diet: string) => (
                    <span key={diet} className="px-2 py-1 rounded-full bg-green-50 text-green-800 text-xs">
                      {diet}
                    </span>
                  ))}
                  {item.preferences?.map((pref: string) => (
                    <span key={pref} className="px-2 py-1 rounded-full bg-blue-50 text-blue-800 text-xs">
                      {pref}
                    </span>
                  ))}
                  {item.isPopular && (
                    <span className="px-2 py-1 rounded-full bg-yellow-50 text-yellow-800 text-xs">
                      Popular
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right ml-4">
                <span className="font-medium">RM {item.price}</span>
                {item.pax && (
                  <div className="text-sm text-gray-500">
                    {item.pax} pax
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuApp;

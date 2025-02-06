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
  }
  // Add more items as needed
];

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

  const categories = Array.from(new Set(menuItems.map(item => item.category))).sort();

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
        {filterItems(menuItems).map((item) => (
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
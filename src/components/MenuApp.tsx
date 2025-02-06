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
      en: "Cold smoked salmon, cherry compote, murabba, coconut flakes, sengkuang, pomegranate, alam raja, beetroot, lettuce, carrots, white radish, bunga kantan, kaffir lime leaf, pickles, peanut crumbs and more",
      zh: "冷熏三文鱼配各种配料",
      vi: "Cá hồi hun khói lạnh, mứt anh đào, mứt hoa hồng, vụn dừa, củ sắn, lựu...",
      ms: "Salmon salai sejuk dengan pelbagai bahan"
    },
    price: 118,
    pax: "6-8",
    allergens: ['nuts', 'seafood', 'raw'],
    dietary: ['sharing'],
    isSpicy: false,
    isPopular: true,
    servingNote: "feeds 6-8 pax"
  },
  {
    id: 2,
    name: {
      en: "Ciabatta with Hummus",
      zh: "中东面包配鹰嘴豆泥",
      vi: "Bánh mì Ciabatta với Hummus",
      ms: "Ciabatta dengan Hummus"
    },
    price: 23,
    allergens: ['gluten'],
    dietary: ['vegetarian', 'vegan'],
    isSpicy: false
  }
];

const dietaryFilters = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'halal', label: 'Halal' },
  { id: 'glutenFree', label: 'Gluten Free' },
  { id: 'dairyFree', label: 'Dairy Free' },
  { id: 'nutFree', label: 'Nut Free' },
  { id: 'noSpicy', label: 'No Spicy' }
];

const MenuApp = () => {
  const [language, setLanguage] = useState('en');
  const [filters, setFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [paxFilter, setPaxFilter] = useState('all');

  const toggleFilter = (filterId: string) => {
    setFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const filterItems = (items: any[]) => {
    return items.filter(item => {
      if (filters.includes('vegetarian') && !item.dietary?.includes('vegetarian')) return false;
      if (filters.includes('vegan') && !item.dietary?.includes('vegan')) return false;
      if (filters.includes('glutenFree') && item.allergens?.includes('gluten')) return false;
      if (filters.includes('dairyFree') && item.allergens?.includes('dairy')) return false;
      if (filters.includes('nutFree') && item.allergens?.includes('nuts')) return false;
      if (filters.includes('noSpicy') && item.isSpicy) return false;
      
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
                </div>
              </div>
              <div className="text-right ml-4">
                <span className="font-medium">RM {item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuApp;
import React from 'react';
import { 
  LayoutGrid, 
  AlertTriangle, 
  Landmark, 
  HeartHandshake, 
  GraduationCap, 
  Activity, 
  Utensils 
} from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES_DATA } from '../data/categoriesData';

interface CategoryFilterProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const getCategoryIcon = (iconName: string, isSelected: boolean) => {
    const iconClass = `w-4 h-4 mr-2 shrink-0 ${isSelected ? 'text-white' : 'text-brand-green-600'}`;
    switch (iconName) {
      case 'AlertTriangle': return <AlertTriangle className={iconClass} />;
      case 'Landmark': return <Landmark className={iconClass} />;
      case 'HeartHandshake': return <HeartHandshake className={iconClass} />;
      case 'GraduationCap': return <GraduationCap className={iconClass} />;
      case 'Activity': return <Activity className={iconClass} />;
      case 'Utensils': return <Utensils className={iconClass} />;
      default: return <LayoutGrid className={iconClass} />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
        {CATEGORIES_DATA.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex items-center px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-brand-green-600 text-white border-brand-green-600 shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-brand-green-300 hover:bg-brand-green-50/60'
              }`}
            >
              {getCategoryIcon(cat.iconName, isSelected)}
              <span>{cat.name}</span>
              <span className={`ml-2 px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                isSelected 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

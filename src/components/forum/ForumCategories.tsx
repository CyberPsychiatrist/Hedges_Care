
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForumCategory } from "@/types/forum";

interface ForumCategoriesProps {
  activeCategory: ForumCategory;
  onCategoryChange: (category: ForumCategory) => void;
}

const ForumCategories: React.FC<ForumCategoriesProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  const categories: { value: ForumCategory; label: string }[] = [
    { value: 'all', label: 'All Topics' },
    { value: 'carbon-sequestration', label: 'Carbon Sequestration' },
    { value: 'urban-gardening', label: 'Urban Gardening' },
    { value: 'reforestation', label: 'Reforestation' },
    { value: 'growing-techniques', label: 'Growing Techniques' },
    { value: 'care-tips', label: 'Care Tips' },
    { value: 'plant-identification', label: 'Plant Identification' },
    { value: 'conservation', label: 'Conservation' },
    { value: 'community-projects', label: 'Community Projects' },
  ];

  return (
    <Tabs 
      value={activeCategory} 
      onValueChange={(value) => onCategoryChange(value as ForumCategory)}
      className="mb-6"
    >
      <TabsList className="bg-white/80 h-auto flex flex-wrap p-1 mb-4">
        {categories.map((category) => (
          <TabsTrigger 
            key={category.value}
            value={category.value}
            className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800 px-4 py-2 rounded-md m-1"
          >
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ForumCategories;

import React from 'react';
import { X } from 'lucide-react';

interface SupplierFiltersProps {
  activeFilters: {
    category: string[];
    qualityRange: { min: number; max: number };
    priceRange: { min: number; max: number };
    deliveryTime: string[];
  };
  onFilterChange: (filterType: string, value: any) => void;
  onClearFilters: () => void;
}

const SupplierFilters: React.FC<SupplierFiltersProps> = ({ 
  activeFilters, 
  onFilterChange,
  onClearFilters
}) => {
  const categories = [
    'Technology', 'Office Supplies', 'Logistics', 'Energy', 'Printing',
    'IT Security', 'Facilities', 'Cloud Services', 'Marketing', 'Legal'
  ];
  
  const deliveryTimeOptions = [
    'Same Day', '1-3 Days', '4-7 Days', '1-2 Weeks', '3-4 Weeks', '1+ Month'
  ];

  const handleCategoryToggle = (category: string) => {
    const currentCategories = [...activeFilters.category];
    const categoryIndex = currentCategories.indexOf(category);
    
    if (categoryIndex === -1) {
      currentCategories.push(category);
    } else {
      currentCategories.splice(categoryIndex, 1);
    }
    
    onFilterChange('category', currentCategories);
  };

  const handleDeliveryTimeToggle = (timeRange: string) => {
    const currentTimes = [...activeFilters.deliveryTime];
    const timeIndex = currentTimes.indexOf(timeRange);
    
    if (timeIndex === -1) {
      currentTimes.push(timeRange);
    } else {
      currentTimes.splice(timeIndex, 1);
    }
    
    onFilterChange('deliveryTime', currentTimes);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Filter Suppliers</h3>
        
        <button 
          onClick={onClearFilters}
          className="text-sm text-purple-600 hover:text-purple-800"
        >
          Clear All Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`category-${category}`}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  checked={activeFilters.category.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quality filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Quality Rating</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-600">Minimum Quality</label>
              <input
                type="range"
                min="0"
                max="100"
                value={activeFilters.qualityRange.min}
                onChange={(e) => onFilterChange('qualityRange', {
                  ...activeFilters.qualityRange,
                  min: parseInt(e.target.value)
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-gray-500 mt-1">{activeFilters.qualityRange.min}/100</div>
            </div>
            <div>
              <label className="text-xs text-gray-600">Maximum Quality</label>
              <input
                type="range"
                min="0"
                max="100"
                value={activeFilters.qualityRange.max}
                onChange={(e) => onFilterChange('qualityRange', {
                  ...activeFilters.qualityRange,
                  max: parseInt(e.target.value)
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-gray-500 mt-1">{activeFilters.qualityRange.max}/100</div>
            </div>
          </div>
        </div>
        
        {/* Price filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-600">Min Price ($)</label>
              <input
                type="number"
                min="0"
                value={activeFilters.priceRange.min}
                onChange={(e) => onFilterChange('priceRange', {
                  ...activeFilters.priceRange,
                  min: parseFloat(e.target.value) || 0
                })}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Max Price ($)</label>
              <input
                type="number"
                min="0"
                value={activeFilters.priceRange.max}
                onChange={(e) => onFilterChange('priceRange', {
                  ...activeFilters.priceRange,
                  max: parseFloat(e.target.value) || 10000
                })}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="10000"
              />
            </div>
          </div>
        </div>
        
        {/* Delivery Time filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Delivery Time</h4>
          <div className="space-y-2">
            {deliveryTimeOptions.map(timeRange => (
              <div key={timeRange} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`delivery-${timeRange}`}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  checked={activeFilters.deliveryTime.includes(timeRange)}
                  onChange={() => handleDeliveryTimeToggle(timeRange)}
                />
                <label htmlFor={`delivery-${timeRange}`} className="ml-2 text-sm text-gray-700">
                  {timeRange}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Active filters */}
      {(activeFilters.category.length > 0 || activeFilters.deliveryTime.length > 0) && (
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-700">Active filters:</span>
            
            {activeFilters.category.map((category, index) => (
              <span key={`category-${index}`} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs">
                {category}
                <button 
                  onClick={() => handleCategoryToggle(category)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            
            {activeFilters.deliveryTime.map((time, index) => (
              <span key={`time-${index}`} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs">
                {time}
                <button 
                  onClick={() => handleDeliveryTimeToggle(time)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierFilters;
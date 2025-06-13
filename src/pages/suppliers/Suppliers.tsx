import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Upload, Plus, ChevronDown } from 'lucide-react';
import SupplierCard from '../../components/suppliers/SupplierCard';
import SupplierFilters from '../../components/suppliers/SupplierFilters';
import { mockSuppliers } from '../../data/mockData'; // Import mock data
import toast from 'react-hot-toast';

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    qualityRange: { min: 0, max: 100 },
    priceRange: { min: 0, max: 10000 },
    deliveryTime: [],
  });
  const [sortOption, setSortOption] = useState('Quality (High to Low)'); // Default sort option

  // Use mock data instead of Supabase
  useEffect(() => {
    setSuppliers(mockSuppliers);
    setIsLoading(false);
  }, []);

  // Filter and sort suppliers
  useEffect(() => {
    if (!suppliers.length) {
      console.log('No suppliers data to filter');
      setFilteredSuppliers([]);
      return;
    }
    
    let results = [...suppliers];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        supplier => 
          (supplier as any).name?.toLowerCase().includes(query) ||
          (supplier as any).title?.toLowerCase().includes(query) ||
          (supplier as any).category?.toLowerCase().includes(query) ||
          (supplier as any).contact_email?.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (activeFilters.category.length > 0) {
      results = results.filter(supplier => 
activeFilters.category.includes((supplier as { category: string }).category)
      );
    }
    
    // Apply quality range filter
    results = results.filter(supplier => 
      (supplier as any).quality >= activeFilters.qualityRange.min &&
      (supplier as any).quality <= activeFilters.qualityRange.max
    );
    
    // Apply price range filter
    results = results.filter(supplier => 
      (supplier as any).price >= activeFilters.priceRange.min &&
      (supplier as any).price <= activeFilters.priceRange.max
    );
    
    // Apply delivery time filter
    if (activeFilters.deliveryTime.length > 0) {
      results = results.filter(supplier => {
        const days = (supplier as any).delivery_time;
        return activeFilters.deliveryTime.some(range => {
          switch (range) {
            case 'Same Day': return days === 0;
            case '1-3 Days': return days >= 1 && days <= 3;
            case '4-7 Days': return days >= 4 && days <= 7;
            case '1-2 Weeks': return days >= 8 && days <= 14;
            case '3-4 Weeks': return days >= 15 && days <= 28;
            case '1+ Month': return days > 28;
            default: return false;
          }
        });
      });
    }
    
    // Apply sorting
    results.sort((a, b) => {
      switch (sortOption) {
        case 'Quality (High to Low)':
          return (b as any).quality - (a as any).quality;
        case 'Quality (Low to High)':
          return (a as any).quality - (b as any).quality;
        case 'Price (Low to High)':
          return (a as any).price - (b as any).price;
        case 'Price (High to Low)':
          return (b as any).price - (a as any).price;
        case 'Delivery Time (Fast to Slow)':
          return (a as any).delivery_time - (b as any).delivery_time;
        case 'Name A-Z':
          return (a as any).name.localeCompare((b as any).name);
        case 'Name Z-A':
          return (b as any).name.localeCompare((a as any).name);
        default:
          return 0;
      }
    });

    console.log('Filtered and sorted suppliers:', results); // Debug log
    setFilteredSuppliers(results);
  }, [searchQuery, activeFilters, suppliers, sortOption]);

  const handleFilterChange = (filterType: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      category: [],
      qualityRange: { min: 0, max: 100 },
      priceRange: { min: 0, max: 10000 },
      deliveryTime: [],
    });
    setSearchQuery('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
        
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
            <Plus className="h-4 w-4 mr-1" />
            Add Supplier
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition">
            <Upload className="h-4 w-4 mr-1" />
            Import
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition">
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search suppliers by name, title, category or email..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button 
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-1" />
          Filters
          <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <SupplierFilters 
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
      )}
      
      {/* Results count and sorting */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing <span className="font-medium">{filteredSuppliers.length}</span> suppliers
        </p>
        
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Sort by:</span>
          <select
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Quality (High to Low)</option>
            <option>Quality (Low to High)</option>
            <option>Price (Low to High)</option>
            <option>Price (High to Low)</option>
            <option>Delivery Time (Fast to Slow)</option>
            <option>Name A-Z</option>
            <option>Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Suppliers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSuppliers.map(supplier => (
          <SupplierCard key={(supplier as any).id} supplier={supplier} />
        ))}
      </div>
      
      {filteredSuppliers.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No suppliers found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          {(searchQuery || activeFilters.category.length > 0 || activeFilters.deliveryTime.length > 0) && (
            <button 
              onClick={clearFilters}
              className="mt-4 text-purple-600 hover:text-purple-800 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Suppliers;
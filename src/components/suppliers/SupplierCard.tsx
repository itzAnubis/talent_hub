import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, DollarSign, Star, ChevronRight } from 'lucide-react';

interface SupplierCardProps {
  supplier: any;
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  // Helper to get quality color based on rating
  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'text-green-600 bg-green-50';
    if (quality >= 75) return 'text-blue-600 bg-blue-50';
    if (quality >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  // Helper to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Helper to format delivery time
  const formatDeliveryTime = (days: number) => {
    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    if (days === 7) return '1 week';
    if (days < 30) return `${Math.round(days / 7)} weeks`;
    return `${Math.round(days / 30)} months`;
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
              {supplier.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{supplier.name}</h3>
              <p className="text-sm text-gray-600">{supplier.title}</p>
            </div>
          </div>
          
          <div className={`px-2 py-1 rounded-md text-xs font-medium ${getQualityColor(supplier.quality)}`}>
            {supplier.quality}/100
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <p className="font-medium text-gray-800">{formatPrice(supplier.price)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Delivery</p>
              <p className="font-medium text-gray-800">{formatDeliveryTime(supplier.delivery_time)}</p>
            </div>
          </div>
        </div>

        {supplier.category && (
          <div className="mb-4">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
              {supplier.category}
            </span>
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-600">
          {supplier.contact_email && (
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3" />
              <span className="truncate">{supplier.contact_email}</span>
            </div>
          )}
          
          {supplier.contact_phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              <span>{supplier.contact_phone}</span>
            </div>
          )}
          
          {supplier.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{supplier.address}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-gray-700">Quality: {supplier.quality}%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-400 hover:text-purple-600 rounded-full hover:bg-purple-50" title="Send Email">
              <Mail className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-purple-600 rounded-full hover:bg-purple-50" title="Call">
              <Phone className="h-4 w-4" />
            </button>
            <Link 
              to={`/dashboard/suppliers/${supplier.id}`} 
              className="p-1.5 text-gray-400 hover:text-purple-600 rounded-full hover:bg-purple-50"
              title="View Details"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;
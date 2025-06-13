import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, Clock, 
  Star, Edit, ChevronLeft, ChevronRight, Award, Truck
} from 'lucide-react';
import { mockSuppliers } from '../../data/mockData'; // Import mock data
import toast from 'react-hot-toast';

const SupplierDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchSupplier();
    }
  }, [id]);

  const fetchSupplier = () => {
    try {
      setIsLoading(true);
      const foundSupplier = mockSuppliers.find(s => s.id === (id ? parseInt(id) : -1));
      if (!foundSupplier) throw new Error('Supplier not found');
      setSupplier(foundSupplier);
    } catch (error) {
      console.error('Error fetching supplier:', error);
      toast.error('Failed to load supplier details');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to get quality color based on rating
  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (quality >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (quality >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
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
    if (days === 0) return 'Same day';
    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    if (days === 7) return '1 week';
    if (days < 30) return `${Math.round(days / 7)} weeks`;
    return `${Math.round(days / 30)} months`;
  };

  // Find next and previous suppliers
  const supplierIndex = mockSuppliers.findIndex(s => s.id === (supplier ? parseInt(id) : -1));
  const nextSupplier = supplierIndex < mockSuppliers.length - 1 ? mockSuppliers[supplierIndex + 1] : null;
  const prevSupplier = supplierIndex > 0 ? mockSuppliers[supplierIndex - 1] : null;

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next' && nextSupplier) {
      navigate(`/dashboard/suppliers/${nextSupplier.id}`);
    } else if (direction === 'prev' && prevSupplier) {
      navigate(`/dashboard/suppliers/${prevSupplier.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!supplier) {
    return <div className="text-center py-16">Supplier not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/suppliers" className="p-1 rounded-full hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">{supplier && supplier.name}</h1>
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${supplier && getQualityColor(supplier.quality)}`}>
            Quality: {supplier.quality}/100
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavigation('prev')}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 disabled:text-gray-300"
            disabled={!prevSupplier}
            title="Previous supplier"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 disabled:text-gray-300"
            disabled={!nextSupplier}
            title="Next supplier"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center text-center mb-6 pb-6 border-b">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                {supplier.name.charAt(0)}
              </div>
              <h2 className="text-xl font-semibold">{supplier.name}</h2>
              <p className="text-gray-600">{supplier.title}</p>
              {supplier.category && (
                <span className="mt-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                  {supplier.category}
                </span>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Email</h4>
                  <p className="text-gray-800">{supplier.contact_email || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Phone</h4>
                  <p className="text-gray-800">{supplier.contact_phone || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Address</h4>
                  <p className="text-gray-800">{supplier.address || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Added On</h4>
                  <p className="text-gray-800">{new Date(supplier.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t flex flex-col gap-2">
              <button className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
                <Mail className="h-4 w-4" />
                Send Email
              </button>
              <button className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                <Phone className="h-4 w-4" />
                Call Supplier
              </button>
              <button className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                <Edit className="h-4 w-4" />
                Edit Details
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:w-2/3 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price</h3>
                  <p className="text-2xl font-bold text-gray-800">{formatPrice(supplier.price)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Delivery Time</h3>
                  <p className="text-2xl font-bold text-gray-800">{formatDeliveryTime(supplier.delivery_time)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Award className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Quality Rating</h3>
                  <p className="text-2xl font-bold text-gray-800">{supplier.quality}/100</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quality Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quality Assessment</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Quality</span>
                  <span className="text-sm font-medium text-gray-900">{supplier.quality}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      supplier.quality >= 90 ? 'bg-green-500' :
                      supplier.quality >= 75 ? 'bg-blue-500' :
                      supplier.quality >= 60 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${supplier.quality}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Star className="h-5 w-5 text-amber-500" />
                  <div>
                    <h4 className="font-medium text-gray-800">Product Quality</h4>
                    <p className="text-sm text-gray-600">Excellent materials and craftsmanship</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-gray-800">Delivery Reliability</h4>
                    <p className="text-sm text-gray-600">Consistent on-time delivery</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-medium text-gray-800">Customer Service</h4>
                    <p className="text-sm text-gray-600">Responsive and helpful support</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-500" />
                  <div>
                    <h4 className="font-medium text-gray-800">Value for Money</h4>
                    <p className="text-sm text-gray-600">Competitive pricing structure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Orders/History */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Order History</h3>
            <div className="text-center py-8 text-gray-500">
              <Truck className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No order history available</p>
              <p className="text-sm">Start working with this supplier to see order history here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;
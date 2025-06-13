import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Upload, Plus, ChevronDown } from 'lucide-react';
import CandidateCard from '../../components/candidates/CandidateCard';
import CandidateFilters from '../../components/candidates/CandidateFilters';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';

const Candidates: React.FC = () => {
  const { candidates, isLoading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);
  const [sortOption, setSortOption] = useState('Newest first');
  const [activeFilters, setActiveFilters] = useState({
    status: [],
    department: [],
    skills: [],
    experience: [],
    atsScoreRange: [0, 100], // New filter for ATS score range
  });

  // Filter and sort candidates
  useEffect(() => {
    if (!candidates) return;
    
    let results = [...candidates];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        candidate => 
          candidate.name.toLowerCase().includes(query) || 
          candidate.position.toLowerCase().includes(query) ||
          candidate.email.toLowerCase().includes(query) ||
          candidate.skills.some((skill: string) => skill.toLowerCase().includes(query))
      );
    }
    
    // Apply active filters
    if (activeFilters.status.length > 0) {
      results = results.filter(candidate => activeFilters.status.includes(candidate.status as never));
    }
    
    if (activeFilters.department.length > 0) {
      results = results.filter(candidate => activeFilters.department.includes(candidate.department as never));
    }
    
    if (activeFilters.skills.length > 0) {
      results = results.filter(candidate => 
        candidate.skills.some((skill: string) => activeFilters.skills.includes(skill as never))
      );
    }
    
    if (activeFilters.experience.length > 0) {
      results = results.filter(candidate => activeFilters.experience.includes(candidate.experienceLevel as never));
    }
    
    // Apply ATS score range filter
    results = results.filter(candidate => 
      candidate.atsScore >= activeFilters.atsScoreRange[0] && 
      candidate.atsScore <= activeFilters.atsScoreRange[1]
    );

    // Apply sorting
    switch (sortOption) {
      case 'Newest first':
        results.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
        break;
      case 'Oldest first':
        results.sort((a, b) => new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime());
        break;
      case 'Name A-Z':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name Z-A':
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Rating (High to Low)':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'ATS Score (High to Low)':
        results.sort((a, b) => b.atsScore - a.atsScore);
        break;
    }
    
    setFilteredCandidates(results);
  }, [searchQuery, activeFilters, candidates, sortOption]);

  const handleFilterChange = (filterType: string, values: string[] | number[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      status: [],
      department: [],
      skills: [],
      experience: [],
      atsScoreRange: [0, 100],
    });
    setSearchQuery('');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading candidates...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Candidates</h1>
        
        <div className="flex items-center gap-2">
          <Link to="/dashboard/candidates/new" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            <Plus className="h-4 w-4 mr-1" />
            Add Candidate
          </Link>
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
            placeholder="Search candidates by name, position, email or skills..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <CandidateFilters 
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
      )}
      
      {/* Results count and sorting */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing <span className="font-medium">{filteredCandidates.length}</span> candidates
        </p>
        
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Sort by:</span>
          <select 
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Newest first</option>
            <option>Oldest first</option>
            <option>Name A-Z</option>
            <option>Name Z-A</option>
            <option>Rating (High to Low)</option>
            <option>ATS Score (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Candidates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCandidates.map(candidate => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
      
      {filteredCandidates.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No candidates found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          {(searchQuery || Object.values(activeFilters).some(filter => filter.length > 0 || filter[0] !== 0 || filter[1] !== 100)) && (
            <button 
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Candidates;
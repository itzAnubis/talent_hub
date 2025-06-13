import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase,
  Award, Star, Edit, Download, UserX,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import CommunicationTimeline from '../../components/communications/CommunicationTimeline';
import CandidateNotes from '../../components/candidates/CandidateNotes';
import CandidateDocuments from '../../components/candidates/CandidateDocuments';
import { useData } from '../../contexts/DataContext';
import StatusBadge from '../../components/candidates/StatusBadge';

interface Candidate {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  appliedDate: string;
  experienceLevel: string;
  status: string;
  skills: string[];
  rating: number;
  atsScore: number;
  about?: string;
  experience?: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
  process?: Array<{
    name: string;
    completed: boolean;
    date?: string;
    scheduled?: boolean;
  }>;
}

const CandidateDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCandidateById, candidates } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [candidate, setCandidate] = useState<Candidate | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const foundCandidate = getCandidateById(id);
      if (foundCandidate) {
        setCandidate(foundCandidate);
      }
    }
  }, [id, getCandidateById]);

  // Find next and previous candidates
  const candidateIndex = candidates.findIndex(c => c.id === (candidate?.id || 0));
  const nextCandidate = candidateIndex < candidates.length - 1 ? candidates[candidateIndex + 1] : null;
  const prevCandidate = candidateIndex > 0 ? candidates[candidateIndex - 1] : null;

  if (!candidate) {
    return <div className="text-center py-16">Candidate not found</div>;
  }

  const handleStatusChange = (newStatus: string) => {
    const updatedCandidates = candidates.map(c =>
      c.id === candidate.id ? { ...c, status: newStatus } : c
    );
    // Update the mock data in the context or globally if needed
    // Assuming useData manages the global state, update it here
    // For now, we'll update the local candidates array
    Object.assign(candidates, updatedCandidates);
    setCandidate(prev => prev ? { ...prev, status: newStatus } : prev);
  };

  const renderStarRating = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next' && nextCandidate) {
      navigate(`/dashboard/candidates/${nextCandidate.id}`);
    } else if (direction === 'prev' && prevCandidate) {
      navigate(`/dashboard/candidates/${prevCandidate.id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/candidates" className="p-1 rounded-full hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">{candidate.name}</h1>
          <div className="flex items-center gap-2">
            <StatusBadge status={candidate.status} />
            <select
              value={candidate.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Mirroring">Mirroring</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavigation('prev')}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 disabled:text-gray-300"
            disabled={!prevCandidate}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 disabled:text-gray-300"
            disabled={!nextCandidate}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/3 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center text-center mb-6 pb-6 border-b">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                  {renderStarRating(candidate.rating)}
                </div>
              </div>
              <h2 className="text-xl font-semibold mt-4">{candidate.name}</h2>
              <p className="text-gray-600">{candidate.position}</p>
              <p className="text-gray-500 text-sm">{candidate.department}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Email</h4>
                  <p className="text-gray-800">{candidate.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Phone</h4>
                  <p className="text-gray-800">{candidate.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Location</h4>
                  <p className="text-gray-800">{candidate.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Applied On</h4>
                  <p className="text-gray-800">{candidate.appliedDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Experience</h4>
                  <p className="text-gray-800">{candidate.experienceLevel}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">ATS Score</h4>
                  <p className="text-gray-800">{candidate.atsScore}%</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t flex flex-col gap-2">
              <button className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                <Mail className="h-4 w-4" />
                Send Email
              </button>
              <button className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                <Download className="h-4 w-4" />
                Download CV
              </button>
              <button className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
              <button className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition">
                <UserX className="h-4 w-4" />
                Reject Candidate
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:w-2/3 space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="border-b">
              <nav className="flex">
                {['profile', 'communications', 'notes', 'documents'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-3 font-medium text-sm relative ${activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                      }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <p className="text-gray-700">{candidate.about || "No information provided."}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Work Experience</h3>
                    {candidate.experience?.map((exp, index) => (
                      <div key={index} className="mb-4 pb-4 border-b last:border-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{exp.title}</h4>
                          <span className="text-sm text-gray-500">{exp.period}</span>
                        </div>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Education</h3>
                    {candidate.education?.map((edu, index) => (
                      <div key={index} className="mb-4 pb-4 border-b last:border-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{edu.degree}</h4>
                          <span className="text-sm text-gray-500">{edu.period}</span>
                        </div>
                        <p className="text-gray-600">{edu.institution}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Recruitment Process</h3>
                    <div className="relative">
                      <div className="absolute top-0 bottom-0 left-3.5 w-0.5 bg-gray-200 z-0"></div>
                      {candidate.process?.map((step, index) => (
                        <div key={index} className="relative z-10 flex gap-4 mb-4 pb-4">
                          <div className={`h-7 w-7 rounded-full flex items-center justify-center z-10 
                            ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`}>
                            <span className="text-white text-xs">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{step.name}</h4>
                            <p className="text-sm text-gray-500">
                              {step.completed
                                ? `Completed on ${step.date}`
                                : step.scheduled
                                  ? `Scheduled for ${step.date}`
                                  : 'Not scheduled'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'communications' && id && <CommunicationTimeline candidateId={id} />}
              {activeTab === 'notes' && id && <CandidateNotes candidateId={id} />}
              {activeTab === 'documents' && id && <CandidateDocuments candidateId={id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
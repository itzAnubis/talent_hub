import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

import {
  mockCandidates,
  mockTimelineData,
  mockFunnelData,
  mockActivities,
  mockDepartmentMetrics,
  mockCommunications,
  mockNotes,
  mockDocuments
} from '../data/mockData';

import { supabase } from '../lib/supabase';

interface DataContextType {
  candidates: any[];
  stats: any;
  timelineData: any[];
  funnelData: any[];
  activities: any[];
  departmentMetrics: any[];
  communications: any[];
  notes: any[];
  documents: any[];
  isLoading: boolean;
  getCandidateById: (id: string) => any;
  addCommunication: (communication: any) => void;
  addNote: (note: any) => void;
  updateNote: (id: string, updates: any) => void;
  deleteNote: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [stats, setStats] = useState<any>(null);
  const [timelineData] = useState(mockTimelineData);
  const [funnelData] = useState(mockFunnelData);
  const [activities] = useState(mockActivities);
  const [departmentMetrics] = useState(mockDepartmentMetrics);
  const [communications, setCommunications] = useState(mockCommunications);
  const [notes, setNotes] = useState(mockNotes);
  const [documents] = useState(mockDocuments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [totalCandidatesRes, activePositionsRes, hiredRes] = await Promise.all([
          supabase.from('candidates').select('*', { count: 'exact', head: true }),
          supabase.from('candidates').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('candidates').select('*', { count: 'exact', head: true }).eq('status', 'hired'),
        ]);

        const totalCandidates = totalCandidatesRes.count ?? 0;
        const activePositions = activePositionsRes.count ?? 0;
        const hired = hiredRes.count ?? 0;

        setStats({
          totalCandidates,
          activePositions,
          hired,
          timeToHire: 14, // TODO: Replace with calculated value if needed
          candidatesChange: '+5%',
          positionsChange: '+3%',
          timeToHireChange: '-2 days',
          hiredChange: '+2',
        });
      } catch (error) {
        console.error('Failed to fetch stats:', (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const getCandidateById = (id: string) => {
    return candidates.find(candidate => candidate.id === parseInt(id));
  };

  const addCommunication = (communication: any) => {
    const newCommunication = {
      ...communication,
      id: communications.length + 1,
    };
    setCommunications([...communications, newCommunication]);
  };

  const addNote = (note: any) => {
    const newNote = {
      ...note,
      id: notes.length + 1,
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, updates: any) => {
    setNotes(notes.map(note =>
      note.id === parseInt(id) ? { ...note, ...updates } : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== parseInt(id)));
  };

  return (
    <DataContext.Provider
      value={{
        candidates,
        stats,
        timelineData,
        funnelData,
        activities,
        departmentMetrics,
        communications,
        notes,
        documents,
        isLoading,
        getCandidateById,
        addCommunication,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

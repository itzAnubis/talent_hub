export const mockCandidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    position: "Senior React Developer",
    department: "Engineering",
    location: "New York, NY",
    status: "Interviewing",
    appliedDate: "2025-03-10",
    experienceLevel: "Senior",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    rating: 4,
    atsScore: Math.floor(Math.random() * 101),
    about: "Full-stack developer with 7+ years of experience specializing in React and Node.js. Previously worked at top tech companies and led multiple successful projects.",
    experience: [
      {
        title: "Lead Frontend Developer",
        company: "TechCorp Inc.",
        period: "2022 - Present",
        description: "Led a team of 5 developers in building responsive web applications using React and TypeScript."
      },
      {
        title: "Senior Developer",
        company: "WebSolutions Ltd.",
        period: "2019 - 2022",
        description: "Developed and maintained multiple client projects using React, Redux, and Node.js."
      }
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        institution: "Stanford University",
        period: "2017 - 2019"
      },
      {
        degree: "B.S. Computer Science",
        institution: "UC Berkeley",
        period: "2013 - 2017"
      }
    ],
    process: [
      {
        name: "Application Review",
        completed: true,
        date: "Mar 12, 2025"
      },
      {
        name: "Phone Screening",
        completed: true,
        date: "Mar 15, 2025"
      },
      {
        name: "Technical Interview",
        completed: true,
        date: "Mar 20, 2025"
      },
      {
        name: "Team Interview",
        completed: false,
        scheduled: true,
        date: "Mar 28, 2025"
      },
      {
        name: "Offer & Negotiation",
        completed: false,
        scheduled: false
      }
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "+1 (555) 987-6543",
    position: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    status: "Assessment",
    appliedDate: "2025-03-12",
    experienceLevel: "Mid Level",
    skills: ["Product Management", "Agile", "User Research", "Data Analysis", "Wireframing"],
    rating: 5,
    atsScore: Math.floor(Math.random() * 101)
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "+1 (555) 234-5678",
    position: "Marketing Specialist",
    department: "Marketing",
    location: "Chicago, IL",
    status: "New",
    appliedDate: "2025-03-15",
    experienceLevel: "Entry Level",
    skills: ["Social Media", "Content Creation", "SEO", "Analytics", "Copywriting"],
    rating: 3,
    atsScore: Math.floor(Math.random() * 101)
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.k@example.com",
    phone: "+1 (555) 876-5432",
    position: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    status: "Screening",
    appliedDate: "2025-03-08",
    experienceLevel: "Senior",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
    rating: 4,
    atsScore: Math.floor(Math.random() * 101)
  },
  {
    id: 5,
    name: "Jessica Brown",
    email: "jessica.b@example.com",
    phone: "+1 (555) 345-6789",
    position: "UX/UI Designer",
    department: "Product",
    location: "Seattle, WA",
    status: "Offered",
    appliedDate: "2025-03-05",
    experienceLevel: "Senior",
    skills: ["Figma", "User Research", "Prototyping", "Information Architecture", "Adobe Suite"],
    rating: 5,
    atsScore: Math.floor(Math.random() * 101)
  },
  {
    id: 6,
    name: "Robert Taylor",
    email: "robert.t@example.com",
    phone: "+1 (555) 456-7890",
    position: "Sales Manager",
    department: "Sales",
    location: "Boston, MA",
    status: "Hired",
    appliedDate: "2025-02-28",
    experienceLevel: "Manager",
    skills: ["B2B Sales", "CRM", "Sales Strategy", "Team Management", "Client Relations"],
    rating: 4,
    atsScore: Math.floor(Math.random() * 101)
  },
  {
    id: 7,
    name: "Amanda Lee",
    email: "amanda.l@example.com",
    phone: "+1 (555) 567-8901",
    position: "Data Scientist",
    department: "Engineering",
    location: "Remote",
    status: "Rejected",
    appliedDate: "2025-03-07",
    experienceLevel: "Mid Level",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics"],
    rating: 3,
    atsScore: Math.floor(Math.random() * 101)
  }
];

// Mock Suppliers Data
export const mockSuppliers = [
  {
    id: 1,
    name: "TechSupply Inc.",
    title: "Technology Equipment Provider",
    category: "Electronics",
    contact_email: "sales@techsupply.com",
    contact_phone: "+1-555-0101",
    address: "123 Tech Lane, Silicon Valley, CA",
    created_at: "2024-12-01T10:00:00Z",
    price: 150.50,
    delivery_time: 3,
    quality: 85,
    is_active: true
  },
  {
    id: 2,
    name: "GreenGoods Co.",
    title: "Sustainable Materials Supplier",
    category: "Eco-Friendly",
    contact_email: "info@greengoods.com",
    contact_phone: "+1-555-0102",
    address: "456 Green Road, Portland, OR",
    created_at: "2024-11-15T14:30:00Z",
    price: 75.00,
    delivery_time: 7,
    quality: 92,
    is_active: true
  },
  {
    id: 3,
    name: "FastFreight Ltd.",
    title: "Logistics and Shipping",
    category: "Transportation",
    contact_email: "contact@fastfreight.com",
    contact_phone: "+1-555-0103",
    address: "789 Speed Ave, Chicago, IL",
    created_at: "2024-10-20T09:15:00Z",
    price: 200.00,
    delivery_time: 1,
    quality: 78,
    is_active: true
  },
  {
    id: 4,
    name: "OfficeEssentials",
    title: "Office Supplies Distributor",
    category: "Office",
    contact_email: "support@officeessentials.com",
    contact_phone: "+1-555-0104",
    address: "321 Paper St, Austin, TX",
    created_at: "2024-09-10T13:45:00Z",
    price: 50.25,
    delivery_time: 14,
    quality: 65,
    is_active: true
  },
  {
    id: 5,
    name: "LuxuryImports",
    title: "High-End Product Importer",
    category: "Luxury",
    contact_email: "sales@luxuryimports.com",
    contact_phone: "+1-555-0105",
    address: "654 Elite Blvd, Miami, FL",
    created_at: "2024-08-05T16:20:00Z",
    price: 500.00,
    delivery_time: 30,
    quality: 95,
    is_active: true
  }
];

// Mock Dashboard Stats
export const mockStats = {
  totalCandidates: 127,
  candidatesChange: 15,
  activePositions: 24,
  positionsChange: 8,
  timeToHire: 28,
  timeToHireChange: -3,
  hired: 12,
  hiredChange: 33
};

// Mock Timeline Data
export const mockTimelineData = [
  { month: 'Jan', applications: 42, interviews: 25, offers: 10, hires: 8 },
  { month: 'Feb', applications: 38, interviews: 22, offers: 12, hires: 10 },
  { month: 'Mar', applications: 56, interviews: 34, offers: 15, hires: 12 },
  { month: 'Apr', applications: 52, interviews: 30, offers: 18, hires: 14 },
  { month: 'May', applications: 48, interviews: 28, offers: 13, hires: 11 },
  { month: 'Jun', applications: 60, interviews: 40, offers: 20, hires: 16 }
];

// Mock Recruitment Funnel Data
export const mockFunnelData = [
  { name: 'Applications', count: 230, color: 'bg-blue-500' },
  { name: 'Screening', count: 150, color: 'bg-purple-500' },
  { name: 'Interviews', count: 90, color: 'bg-indigo-500' },
  { name: 'Assessments', count: 60, color: 'bg-amber-500' },
  { name: 'Offers', count: 30, color: 'bg-green-500' },
  { name: 'Hires', count: 22, color: 'bg-emerald-500' }
];

// Mock Activity Feed
export const mockActivities = [
  {
    id: 1,
    type: 'email',
    description: '<strong>HR Team</strong> sent an interview invitation to <strong>Sarah Johnson</strong>',
    date: '2025-03-17T09:30:00Z'
  },
  {
    id: 2,
    type: 'status_change',
    description: '<strong>Michael Chen</strong> moved from <span class="text-purple-600">Screening</span> to <span class="text-amber-600">Assessment</span>',
    date: '2025-03-17T08:45:00Z'
  },
  {
    id: 3,
    type: 'document',
    description: '<strong>Jessica Brown</strong> uploaded a portfolio document',
    date: '2025-03-16T15:20:00Z'
  },
  {
    id: 4,
    type: 'interview',
    description: 'Technical interview scheduled with <strong>David Kim</strong> for tomorrow at 11:00 AM',
    date: '2025-03-16T14:10:00Z'
  },
  {
    id: 5,
    type: 'hired',
    description: '<strong>Robert Taylor</strong> was hired as Sales Manager',
    date: '2025-03-15T16:30:00Z'
  },
  {
    id: 6,
    type: 'rejected',
    description: '<strong>Amanda Lee</strong> was rejected for Data Scientist position',
    date: '2025-03-14T11:45:00Z'
  }
];

// Mock Department Metrics
export const mockDepartmentMetrics = [
  {
    id: 1,
    name: 'Engineering',
    openPositions: 8,
    activeCandidates: 45,
    interviews: 20,
    timeToHire: 35,
    fillRate: 75,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Product',
    openPositions: 5,
    activeCandidates: 32,
    interviews: 15,
    timeToHire: 28,
    fillRate: 60,
    color: 'bg-purple-500'
  },
  {
    id: 3,
    name: 'Marketing',
    openPositions: 4,
    activeCandidates: 28,
    interviews: 12,
    timeToHire: 25,
    fillRate: 50,
    color: 'bg-indigo-500'
  },
  {
    id: 4,
    name: 'Sales',
    openPositions: 6,
    activeCandidates: 35,
    interviews: 18,
    timeToHire: 21,
    fillRate: 80,
    color: 'bg-green-500'
  },
  {
    id: 5,
    name: 'Finance',
    openPositions: 3,
    activeCandidates: 22,
    interviews: 10,
    timeToHire: 30,
    fillRate: 33,
    color: 'bg-amber-500'
  },
  {
    id: 6,
    name: 'HR',
    openPositions: 2,
    activeCandidates: 15,
    interviews: 8,
    timeToHire: 20,
    fillRate: 50,
    color: 'bg-pink-500'
  }
];

// Mock Communications Data
export const mockCommunications = [
  {
    id: 1,
    candidateId: "1",
    type: 'email',
    subject: 'Interview Invitation',
    content: 'Hi Sarah,\n\nWe were impressed by your application and would like to invite you for a technical interview. Please let me know your availability for next week.\n\nBest regards,\nHR Team',
    date: '2025-03-15T10:30:00Z',
    sentBy: '1',
    sentByName: 'Admin User'
  },
  {
    id: 2,
    candidateId: "1",
    type: 'email',
    subject: 'Re: Interview Invitation',
    content: 'Hello,\n\nThank you for the invitation. I am available on Monday and Tuesday next week from 10 AM to 2 PM EST.\n\nBest,\nSarah',
    date: '2025-03-15T14:45:00Z',
    sentBy: 'external',
    sentByName: 'Sarah Johnson'
  },
  {
    id: 3,
    candidateId: "1",
    type: 'call',
    subject: 'Phone Screening',
    content: 'Discussed previous experience and project work. Candidate has strong background in React development with good communication skills. Recommended to proceed to technical interview.',
    date: '2025-03-16T11:00:00Z',
    duration: '25 minutes',
    sentBy: '1',
    sentByName: 'Admin User'
  }
];

// Mock Notes Data
export const mockNotes = [
  {
    id: 1,
    candidateId: "1",
    content: 'Candidate has excellent technical skills and demonstrated good problem-solving abilities during the screening call.',
    createdBy: '1',
    createdByName: 'Admin User',
    createdAt: '2025-03-16T13:20:00Z'
  },
  {
    id: 2,
    candidateId: "1",
    content: 'References check came back positive. Previous manager spoke highly of her team collaboration skills.',
    createdBy: '2',
    createdByName: 'Jane Smith',
    createdAt: '2025-03-17T09:15:00Z'
  }
];

// Mock Documents Data
export const mockDocuments = [
  {
    id: 1,
    candidateId: "1",
    name: 'Sarah Johnson - Resume.pdf',
    fileType: 'pdf',
    fileSize: '1.2 MB',
    uploadedAt: '2025-03-10T08:30:00Z',
    uploadedBy: 'Sarah Johnson'
  },
  {
    id: 2,
    candidateId: "1",
    name: 'Cover Letter.pdf',
    fileType: 'pdf',
    fileSize: '580 KB',
    uploadedAt: '2025-03-10T08:32:00Z',
    uploadedBy: 'Sarah Johnson'
  },
  {
    id: 3,
    candidateId: "1",
    name: 'Portfolio_SarahJ.zip',
    fileType: 'zip',
    fileSize: '5.7 MB',
    uploadedAt: '2025-03-10T08:35:00Z',
    uploadedBy: 'Sarah Johnson'
  },
  {
    id: 4,
    candidateId: "1",
    name: 'Technical_Assessment_Results.pdf',
    fileType: 'pdf',
    fileSize: '890 KB',
    uploadedAt: '2025-03-18T14:22:00Z',
    uploadedBy: 'Admin User'
  }
];
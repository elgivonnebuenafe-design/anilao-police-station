const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React app
app.use(express.static('client/build'));

// Police Station Data
const policeStationData = {
  name: "Anilao Municipal Police Station",
  address: "Poblacion, Anilao, Iloilo, Philippines",
  coordinates: {
    lat: 10.9667,
    lng: 122.5167
  },
  contact: {
    emergency: "911",
    hotline: "0998 598 6193",
    landline: "033 362 0405",
    fax: "(033) 123-4568",
    email: "anilao.pnp@gmail.com",
    facebook: "Anilao Municipal Police Station"
  },
  operatingHours: {
    weekdays: "24/7",
    weekends: "24/7"
  },
  chief: "PCOL. JUAN DELA CRUZ",
  personnel: 45
};

// API Routes

// Get station information
app.get('/api/station', (req, res) => {
  res.json(policeStationData);
});

// Get weather data
app.get('/api/weather', async (req, res) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey || apiKey === 'your_openweather_api_key_here') {
      // Return mock data if no API key
      res.json({
        weather: [{ main: 'Clear', description: 'clear sky' }],
        main: { temp: 30, humidity: 75, feels_like: 32 },
        name: 'Anilao'
      });
      return;
    }
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${policeStationData.coordinates.lat}&lon=${policeStationData.coordinates.lng}&appid=${apiKey}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get directories
app.get('/api/directories', (req, res) => {
  const directories = [
    {
      id: 1,
      name: "Office of the Chief",
      description: "Main administrative office",
      contact: "(033) 123-4567",
      email: "chief.anilao.pnp@gmail.com"
    },
    {
      id: 2,
      name: "Investigation Division",
      description: "Criminal investigation services",
      contact: "(033) 123-4569",
      email: "investigation.anilao.pnp@gmail.com"
    },
    {
      id: 3,
      name: "Traffic Division",
      description: "Traffic management and enforcement",
      contact: "(033) 123-4570",
      email: "traffic.anilao.pnp@gmail.com"
    },
    {
      id: 4,
      name: "Community Relations",
      description: "Community outreach programs",
      contact: "(033) 123-4571",
      email: "community.anilao.pnp@gmail.com"
    },
    {
      id: 5,
      name: "Women and Children Protection Desk",
      description: "Special protection for women and children",
      contact: "(033) 123-4572",
      email: "wcpd.anilao.pnp@gmail.com"
    },
    {
      id: 6,
      name: "Drug Enforcement Unit",
      description: "Anti-illegal drug operations",
      contact: "(033) 123-4573",
      email: "deu.anilao.pnp@gmail.com"
    }
  ];
  res.json(directories);
});

// Get services
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      name: "Blotter/Incident Report",
      description: "Report any incident or file a complaint",
      requirements: ["Valid ID", "Incident details", "Witness information (if available)"],
      processingTime: "Same day"
    },
    {
      id: 2,
      name: "Police Clearance",
      description: "Certificate of good moral character",
      requirements: ["Valid ID", "Cedula", "2x2 picture (2 copies)", "Barangay clearance"],
      processingTime: "1-2 working days"
    },
    {
      id: 3,
      name: "Certificate of Indigency",
      description: "For indigent individuals requiring police certification",
      requirements: ["Valid ID", "Certificate of Indigency from barangay"],
      processingTime: "Same day"
    },
    {
      id: 4,
      name: "Lost Document Report",
      description: "Report lost documents and items",
      requirements: ["Valid ID", "Details of lost item/document", "Affidavit of loss (if available)"],
      processingTime: "Same day"
    },
    {
      id: 5,
      name: "Business Permit Clearance",
      description: "Police clearance for business permit application",
      requirements: ["Business registration", "Valid ID", "Barangay clearance"],
      processingTime: "1-2 working days"
    },
    {
      id: 6,
      name: "Travel Authority",
      description: "Travel clearance for specific cases",
      requirements: ["Valid ID", "Court order (if applicable)", "Purpose of travel"],
      processingTime: "3-5 working days"
    }
  ];
  res.json(services);
});

// Get policies
app.get('/api/policies', (req, res) => {
  const policies = [
    {
      id: 1,
      title: "Code of Conduct",
      category: "Internal",
      description: "Standards of behavior and ethical conduct for all police personnel",
      content: "All personnel must adhere to the highest standards of integrity, professionalism, and service to the community. Any violation will result in disciplinary action."
    },
    {
      id: 2,
      title: "Community Policing Guidelines",
      category: "Community",
      description: "Guidelines for engaging with the community",
      content: "We are committed to community-oriented policing strategies that build trust and partnership with the community we serve."
    },
    {
      id: 3,
      title: "Emergency Response Protocol",
      category: "Operations",
      description: "Procedures for emergency response situations",
      content: "All emergency calls are prioritized. Response time target is within 5-10 minutes for urgent situations within the municipality."
    },
    {
      id: 4,
      title: "Crime Prevention Program",
      category: "Community",
      description: "Strategies and programs for crime prevention",
      content: "Regular patrols, community watch programs, and public awareness campaigns are implemented to prevent crime."
    },
    {
      id: 5,
      title: "Complaint Procedure",
      category: "Public",
      description: "Process for filing complaints against police personnel",
      content: "Complaints can be filed in person, via email, or through our online form. All complaints are investigated within 15 working days."
    },
    {
      id: 6,
      title: "Data Privacy Policy",
      category: "Legal",
      description: "Protection of personal information",
      content: "We adhere to the Data Privacy Act of 2012. Personal information collected is used only for official purposes and is protected accordingly."
    }
  ];
  res.json(policies);
});

// Submit crime report
app.post('/api/report', (req, res) => {
  const { name, contact, incident, date, location, description } = req.body;
  
  // In a real application, this would save to a database
  console.log('Crime Report Received:', { name, contact, incident, date, location, description });
  
  res.json({
    success: true,
    message: "Report submitted successfully. Reference #: " + Date.now(),
    reference: Date.now().toString()
  });
});

// Get news/announcements
app.get('/api/news', (req, res) => {
  const news = [
    {
      id: 1,
      title: "Community Crime Prevention Seminar",
      date: "2026-04-25",
      content: "Join us for a free seminar on crime prevention tips and community safety strategies.",
      category: "Community"
    },
    {
      id: 2,
      title: "Traffic Safety Campaign Launch",
      date: "2026-04-20",
      content: "New traffic safety measures being implemented across the municipality to reduce accidents.",
      category: "Traffic"
    },
    {
      id: 3,
      title: "Police Recruitment Ongoing",
      date: "2026-04-15",
      content: "We are accepting applications for new police officers. Visit our office for requirements.",
      category: "Announcement"
    },
    {
      id: 4,
      title: "Drug Awareness Month Activities",
      date: "2026-04-10",
      content: "Various activities lined up for Drug Awareness Prevention Month in cooperation with local schools.",
      category: "Community"
    }
  ];
  res.json(news);
});

// Get media content
app.get('/api/media', (req, res) => {
  const mediaData = {
    photos: [
      { url: '/images/activity1.jpg', caption: 'Community Outreach Program', date: 'April 20, 2026' },
      { url: '/images/activity2.jpg', caption: 'Police Visibility Patrol', date: 'April 18, 2026' },
      { url: '/images/activity3.jpg', caption: 'School Safety Seminar', date: 'April 15, 2026' },
      { url: '/images/activity4.jpg', caption: 'Drug Awareness Campaign', date: 'April 12, 2026' },
      { url: '/images/activity5.jpg', caption: 'Traffic Enforcement', date: 'April 10, 2026' },
      { url: '/images/activity6.jpg', caption: 'Barangay Peacekeeping', date: 'April 8, 2026' },
    ],
    videos: [
      {
        title: 'Anilao MPS Annual Report 2025',
        description: 'Comprehensive report of police operations and achievements throughout the year.',
        duration: '5:30',
        date: 'January 15, 2026'
      },
      {
        title: 'Community Safety Tips',
        description: 'Important safety guidelines for residents and business owners.',
        duration: '3:45',
        date: 'February 20, 2026'
      },
      {
        title: 'Drug Awareness Documentary',
        description: 'Educational video about the dangers of illegal drugs.',
        duration: '12:00',
        date: 'March 10, 2026'
      }
    ],
    pressReleases: [
      {
        title: 'Significant Decrease in Crime Rate in Anilao',
        summary: 'Anilao Municipal Police Station reports a 25% decrease in crime rate for the first quarter of 2026 compared to the same period last year.',
        category: 'Performance',
        date: 'April 25, 2026',
        author: 'PIO Anilao MPS'
      },
      {
        title: 'New Police Officers Deployed to Anilao MPS',
        summary: 'Ten new police officers have been assigned to strengthen police presence and improve response time in the municipality.',
        category: 'Personnel',
        date: 'April 20, 2026',
        author: 'Admin Office'
      },
      {
        title: 'Successful Anti-Illegal Drug Operation',
        summary: 'Joint operation results in the arrest of suspects and confiscation of illegal substances worth over ₱500,000.',
        category: 'Operations',
        date: 'April 18, 2026',
        author: 'Operations Division'
      },
      {
        title: 'Community Partners with Anilao MPS for Safety Program',
        summary: 'Local businesses and barangay officials pledge support for the "Safe Anilao" initiative.',
        category: 'Community',
        date: 'April 15, 2026',
        author: 'Community Relations'
      }
    ]
  };
  res.json(mediaData);
});

// Get transparency data
app.get('/api/transparency', (req, res) => {
  const transparencyData = {
    statistics: {
      crimeRate: '12%',
      caseSolved: '89%',
      responseTime: '5min',
      transparencyScore: '95%'
    },
    documents: [
      { title: 'Q1 2026 Financial Report', category: 'Financial Reports', date: 'April 30, 2026', fileSize: '2.5 MB' },
      { title: 'Annual Performance Report 2025', category: 'Performance Reports', date: 'January 30, 2026', fileSize: '5.8 MB' },
      { title: 'Citizen Charter 2026', category: 'Citizen Charter', date: 'January 15, 2026', fileSize: '1.2 MB' },
      { title: 'Memorandum on Traffic Management', category: 'Memorandums', date: 'March 20, 2026', fileSize: '850 KB' },
      { title: 'Monthly Crime Statistics - March', category: 'Performance Reports', date: 'April 5, 2026', fileSize: '1.5 MB' },
      { title: 'Procurement Plan 2026', category: 'Financial Reports', date: 'February 10, 2026', fileSize: '3.2 MB' },
      { title: 'Community Feedback Report Q1', category: 'Performance Reports', date: 'April 10, 2026', fileSize: '2.1 MB' },
      { title: 'Policies and Guidelines Update', category: 'Others', date: 'March 15, 2026', fileSize: '980 KB' },
    ]
  };
  res.json(transparencyData);
});

// Get latest activities for slideshow
app.get('/api/activities', (req, res) => {
  const activities = [
    {
      id: 1,
      title: 'Oplan Sita Checkpoint Operation',
      description: 'Conducted surprise checkpoint operations at strategic locations to ensure public safety and enforce traffic laws. Over 200 vehicles were inspected with no major violations found.',
      image: '/images/activity1.jpg',
      category: 'Operations',
      date: 'April 26, 2026',
      location: 'Anilao Municipal Road'
    },
    {
      id: 2,
      title: 'Community Outreach Program',
      description: 'Police officers visited barangays to conduct dialogues with residents, addressing their concerns and strengthening community-police relations.',
      image: '/images/activity2.jpg',
      category: 'Community',
      date: 'April 24, 2026',
      location: 'Barangay Poblacion'
    },
    {
      id: 3,
      title: 'Drug Awareness Seminar for Youth',
      description: 'Educated over 200 students from local schools about the dangers of illegal drugs and ways to avoid peer pressure.',
      image: '/images/activity3.jpg',
      category: 'Education',
      date: 'April 22, 2026',
      location: 'Anilao National High School'
    },
    {
      id: 4,
      title: 'Traffic Safety Campaign Launch',
      description: 'Kicked off month-long traffic safety awareness campaign with distribution of informational materials and free helmets to motorcycle riders.',
      image: '/images/activity4.jpg',
      category: 'Campaign',
      date: 'April 20, 2026',
      location: 'Anilao Public Market'
    },
    {
      id: 5,
      title: 'Coastal Clean-up Drive',
      description: 'Anilao MPS personnel joined local residents in cleaning the coastal areas, promoting environmental awareness and community participation.',
      image: '/images/activity5.jpg',
      category: 'Environment',
      date: 'April 18, 2026',
      location: 'Anilao Beach'
    }
  ];
  res.json(activities);
});

// Catch all handler for React Router
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

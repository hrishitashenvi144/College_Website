export const departments = [
  {
    id: "cse", name: "Computer Science & Engineering", school: "School of Computing",
    programCount: 12, facultyCount: 85,
    description: "Leading innovation in AI, machine learning, cybersecurity, and software engineering.",
    icon: "Monitor", animationType: "terminal", color: "#3B82F6",
    programs: [
      { name: "B.Tech Computer Science", level: "UG", duration: "4 Years", seats: 180 },
      { name: "B.Tech AI & Machine Learning", level: "UG", duration: "4 Years", seats: 120 },
      { name: "M.Tech Computer Science", level: "PG", duration: "2 Years", seats: 60 },
      { name: "PhD Computer Science", level: "PhD", duration: "3-5 Years", seats: 20 },
    ],
    achievements: ["Best CS Department Award 2023", "120+ Research Papers", "95% Placement Rate"],
  },
  {
    id: "mech", name: "Mechanical Engineering", school: "School of Engineering",
    programCount: 8, facultyCount: 52,
    description: "Advancing robotics, manufacturing, and mechanical systems with cutting-edge research.",
    icon: "Cog", animationType: "gears", color: "#EF4444",
    programs: [
      { name: "B.Tech Mechanical Engineering", level: "UG", duration: "4 Years", seats: 120 },
      { name: "M.Tech Mechanical Engineering", level: "PG", duration: "2 Years", seats: 30 },
      { name: "PhD Mechanical Engineering", level: "PhD", duration: "3-5 Years", seats: 15 },
    ],
    achievements: ["SAE BAJA Champions 2023", "Advanced Robotics Lab", "Industry 4.0 Center"],
  },
  {
    id: "med", name: "Medicine & Life Sciences", school: "School of Health Sciences",
    programCount: 10, facultyCount: 95,
    description: "Training the next generation of healthcare professionals with world-class facilities.",
    icon: "Heart", animationType: "heartbeat", color: "#EC4899",
    programs: [
      { name: "MBBS", level: "UG", duration: "5.5 Years", seats: 150 },
      { name: "B.Pharma", level: "UG", duration: "4 Years", seats: 60 },
      { name: "M.Pharma", level: "PG", duration: "2 Years", seats: 30 },
      { name: "PhD Biomedical Sciences", level: "PhD", duration: "3-5 Years", seats: 10 },
    ],
    achievements: ["State-of-art Hospital", "500+ Bed Teaching Hospital", "NAAC A+ Accredited"],
  },
  {
    id: "arts", name: "Fine Arts & Design", school: "School of Creative Arts",
    programCount: 6, facultyCount: 28,
    description: "Fostering creativity through design thinking, visual arts, and digital media.",
    icon: "Palette", animationType: "paint", color: "#A855F7",
    programs: [
      { name: "B.Des Communication Design", level: "UG", duration: "4 Years", seats: 40 },
      { name: "BFA Fine Arts", level: "UG", duration: "4 Years", seats: 30 },
      { name: "M.Des Design Studies", level: "PG", duration: "2 Years", seats: 20 },
    ],
    achievements: ["National Design Award 2023", "Adobe Creative Partner", "Industry Exhibition Winners"],
  },
  {
    id: "biz", name: "Business & Management", school: "School of Business",
    programCount: 14, facultyCount: 62,
    description: "Developing future business leaders with global perspective and entrepreneurial mindset.",
    icon: "BarChart3", animationType: "bars", color: "#F59E0B",
    programs: [
      { name: "BBA", level: "UG", duration: "3 Years", seats: 120 },
      { name: "B.Com Honours", level: "UG", duration: "3 Years", seats: 90 },
      { name: "MBA", level: "PG", duration: "2 Years", seats: 180 },
      { name: "PhD Management", level: "PhD", duration: "3-5 Years", seats: 15 },
    ],
    achievements: ["Top 25 B-School Ranking", "100% Internship Placement", "Global Exchange Programs"],
  },
  {
    id: "law", name: "Law & Legal Studies", school: "School of Law",
    programCount: 6, facultyCount: 35,
    description: "Building legal professionals with strong ethics, analytical skills, and courtroom expertise.",
    icon: "Scale", animationType: "scale", color: "#14B8A6",
    programs: [
      { name: "BA LLB (Integrated)", level: "UG", duration: "5 Years", seats: 120 },
      { name: "BBA LLB (Integrated)", level: "UG", duration: "5 Years", seats: 60 },
      { name: "LLM", level: "PG", duration: "1 Year", seats: 30 },
    ],
    achievements: ["Moot Court Champions 2023", "Supreme Court Internships", "Legal Aid Center"],
  },
  {
    id: "physics", name: "Physics & Pure Sciences", school: "School of Basic Sciences",
    programCount: 8, facultyCount: 40,
    description: "Exploring the fundamental laws of nature through theoretical and experimental research.",
    icon: "Atom", animationType: "orbit", color: "#6366F1",
    programs: [
      { name: "B.Sc Physics", level: "UG", duration: "3 Years", seats: 60 },
      { name: "B.Sc Mathematics", level: "UG", duration: "3 Years", seats: 60 },
      { name: "M.Sc Physics", level: "PG", duration: "2 Years", seats: 30 },
      { name: "PhD Physics", level: "PhD", duration: "3-5 Years", seats: 10 },
    ],
    achievements: ["DST Funded Projects", "Quantum Computing Research", "Published in Nature Physics"],
  },
  {
    id: "intl", name: "International Studies", school: "School of Humanities",
    programCount: 5, facultyCount: 22,
    description: "Understanding global politics, diplomacy, and cross-cultural relations.",
    icon: "Globe", animationType: "globe", color: "#0EA5E9",
    programs: [
      { name: "BA International Relations", level: "UG", duration: "3 Years", seats: 40 },
      { name: "MA International Studies", level: "PG", duration: "2 Years", seats: 25 },
      { name: "PhD International Relations", level: "PhD", duration: "3-5 Years", seats: 8 },
    ],
    achievements: ["MUN Champions", "30+ University Partnerships", "Diplomat Guest Lectures"],
  },
];

export const faculty = [
  { id: 1, name: "Dr. Priya Sharma", dept: "cse", designation: "Professor & Head", bio: "20+ years in AI research with publications in top-tier journals.", publications: 87, email: "priya.sharma@diastas.edu.in" },
  { id: 2, name: "Dr. Rajesh Kumar", dept: "cse", designation: "Associate Professor", bio: "Expert in cybersecurity and network protocols.", publications: 45, email: "rajesh.kumar@diastas.edu.in" },
  { id: 3, name: "Dr. Anita Verma", dept: "mech", designation: "Professor & Head", bio: "Pioneer in sustainable manufacturing and green engineering.", publications: 62, email: "anita.verma@diastas.edu.in" },
  { id: 4, name: "Dr. Suresh Patel", dept: "med", designation: "Professor & Dean", bio: "Renowned cardiologist with 25+ years of clinical experience.", publications: 110, email: "suresh.patel@diastas.edu.in" },
  { id: 5, name: "Prof. Meera Joshi", dept: "arts", designation: "Associate Professor", bio: "Award-winning visual artist and design thinker.", publications: 23, email: "meera.joshi@diastas.edu.in" },
  { id: 6, name: "Dr. Vikram Singh", dept: "biz", designation: "Professor & Director", bio: "Former McKinsey consultant, expert in strategic management.", publications: 58, email: "vikram.singh@diastas.edu.in" },
  { id: 7, name: "Dr. Kavita Nair", dept: "law", designation: "Professor & Dean", bio: "Constitutional law expert, former High Court advocate.", publications: 41, email: "kavita.nair@diastas.edu.in" },
  { id: 8, name: "Dr. Amit Bhatt", dept: "physics", designation: "Professor & Head", bio: "Quantum physics researcher with breakthrough discoveries.", publications: 95, email: "amit.bhatt@diastas.edu.in" },
  { id: 9, name: "Dr. Neha Gupta", dept: "cse", designation: "Assistant Professor", bio: "Machine learning specialist focused on NLP applications.", publications: 32, email: "neha.gupta@diastas.edu.in" },
  { id: 10, name: "Dr. Ravi Tiwari", dept: "intl", designation: "Professor & Head", bio: "Diplomat turned academic with expertise in South Asian politics.", publications: 38, email: "ravi.tiwari@diastas.edu.in" },
];

export const alumni = [
  { id: 1, name: "Aakash Mehta", batch: 2015, dept: "cse", company: "Google", role: "Senior Software Engineer", story: "From coding in the Diastas labs to building products used by billions at Google.", achievement: "Led the development of a key Google Cloud feature.", linkedIn: "#" },
  { id: 2, name: "Sneha Kapoor", batch: 2016, dept: "biz", company: "Goldman Sachs", role: "Vice President", story: "MBA from Diastas opened doors to Wall Street and beyond.", achievement: "Youngest VP in the Mumbai office.", linkedIn: "#" },
  { id: 3, name: "Rahul Desai", batch: 2014, dept: "cse", company: "Microsoft", role: "Principal Engineer", story: "Started with a passion for open source during Diastas days.", achievement: "Core contributor to Azure AI services.", linkedIn: "#" },
  { id: 4, name: "Priya Reddy", batch: 2017, dept: "med", company: "AIIMS Delhi", role: "Senior Resident", story: "Diastas's medical program laid the foundation for her career in cardiology.", achievement: "Published groundbreaking research on cardiac imaging.", linkedIn: "#" },
  { id: 5, name: "Vikash Yadav", batch: 2013, dept: "mech", company: "Tesla", role: "Manufacturing Lead", story: "From Diastas's workshop to Tesla's Gigafactory.", achievement: "Optimized production line efficiency by 40%.", linkedIn: "#" },
  { id: 6, name: "Anjali Bhatt", batch: 2018, dept: "law", company: "Supreme Court of India", role: "Advocate", story: "Won the national moot court during Diastas years.", achievement: "Argued landmark environmental case.", linkedIn: "#" },
  { id: 7, name: "Karan Malhotra", batch: 2015, dept: "cse", company: "Startup Founder", role: "CEO, TechVenture", story: "Built a unicorn startup from the dorm room.", achievement: "Raised $50M Series B funding.", linkedIn: "#" },
  { id: 8, name: "Divya Nair", batch: 2016, dept: "arts", company: "Adobe", role: "Senior UX Designer", story: "Diastas's design program sparked a passion for user-centered design.", achievement: "Designed Adobe's flagship mobile app.", linkedIn: "#" },
];

export const publications = [
  { id: 1, title: "Deep Learning Approaches for Medical Image Segmentation", authors: ["Dr. Priya Sharma", "Dr. Neha Gupta"], journal: "IEEE Trans. Medical Imaging", year: 2024, citations: 47, abstract: "A comprehensive study of state-of-the-art deep learning architectures for automated medical image segmentation.", doi: "10.1109/TMI.2024.001", domain: "AI/ML" },
  { id: 2, title: "Quantum Entanglement in Topological Superconductors", authors: ["Dr. Amit Bhatt"], journal: "Physical Review Letters", year: 2024, citations: 32, abstract: "Novel experimental evidence for quantum entanglement phenomena in topological superconducting materials.", doi: "10.1103/PRL.2024.002", domain: "Physics" },
  { id: 3, title: "Sustainable Manufacturing Using Industry 4.0", authors: ["Dr. Anita Verma"], journal: "Journal of Cleaner Production", year: 2023, citations: 68, abstract: "Framework for integrating IoT and AI into sustainable manufacturing processes.", doi: "10.1016/JCP.2023.003", domain: "Engineering" },
  { id: 4, title: "Blockchain-Based Secure Voting Systems", authors: ["Dr. Rajesh Kumar", "Dr. Priya Sharma"], journal: "ACM Computing Surveys", year: 2024, citations: 25, abstract: "Analysis of blockchain architectures for tamper-proof electronic voting.", doi: "10.1145/ACM.2024.004", domain: "Cybersecurity" },
  { id: 5, title: "Constitutional Perspectives on Digital Privacy", authors: ["Dr. Kavita Nair"], journal: "Indian Law Review", year: 2023, citations: 19, abstract: "Examining the intersection of constitutional rights and digital privacy in the age of AI.", doi: "10.1080/ILR.2023.005", domain: "Law" },
  { id: 6, title: "Gene Therapy Advances in Cardiac Diseases", authors: ["Dr. Suresh Patel"], journal: "Nature Medicine", year: 2024, citations: 89, abstract: "Breakthrough approaches in gene therapy for treating hereditary cardiac conditions.", doi: "10.1038/NM.2024.006", domain: "Medicine" },
];

export const researchLabs = [
  { id: 1, name: "AI & Machine Learning Lab", focus: "Deep learning, NLP, computer vision", leadResearcher: "Dr. Priya Sharma", established: 2018, equipment: ["GPU Cluster (A100x8)", "Data Annotation Studio", "Edge AI Dev Kits"], recentPublications: 24 },
  { id: 2, name: "Quantum Computing Lab", focus: "Quantum algorithms, error correction", leadResearcher: "Dr. Amit Bhatt", established: 2020, equipment: ["Quantum Simulator", "Cryogenic Systems", "Photonic Equipment"], recentPublications: 12 },
  { id: 3, name: "Biomedical Research Center", focus: "Drug discovery, genomics, medical devices", leadResearcher: "Dr. Suresh Patel", established: 2017, equipment: ["Gene Sequencer", "Mass Spectrometer", "Biosafety Level 2 Lab"], recentPublications: 31 },
  { id: 4, name: "Renewable Energy Lab", focus: "Solar cells, battery tech, wind energy", leadResearcher: "Dr. Anita Verma", established: 2019, equipment: ["Solar Simulator", "Battery Testing Station", "Wind Tunnel"], recentPublications: 18 },
  { id: 5, name: "Cybersecurity Lab", focus: "Network security, cryptography, ethical hacking", leadResearcher: "Dr. Rajesh Kumar", established: 2019, equipment: ["Penetration Testing Suite", "Hardware Security Modules", "Network Sandbox"], recentPublications: 15 },
  { id: 6, name: "Materials Science Lab", focus: "Nanomaterials, composites, smart materials", leadResearcher: "Dr. Amit Bhatt", established: 2021, equipment: ["Electron Microscope", "X-Ray Diffractometer", "Thin Film Deposition"], recentPublications: 9 },
];

export const events = [
  { id: 1, title: "IGNITE 2025 - Annual Tech Fest", date: "March 15-17, 2025", type: "Festival", description: "Three days of coding, robotics, hackathons, and tech talks.", location: "Main Campus" },
  { id: 2, title: "International Research Symposium", date: "April 5-6, 2025", type: "Academic", description: "Global researchers present cutting-edge findings.", location: "Auditorium" },
  { id: 3, title: "Alumni Homecoming 2025", date: "May 10, 2025", type: "Alumni", description: "Annual reunion for all Diastas alumni batches.", location: "Sports Complex" },
  { id: 4, title: "Industry Connect Summit", date: "June 20, 2025", type: "Career", description: "Top companies meet top talent for internships and placements.", location: "Convention Center" },
  { id: 5, title: "Cultural Fest - UTSAV", date: "September 25-27, 2025", type: "Cultural", description: "Music, dance, drama, and art from across India.", location: "Open Air Theatre" },
  { id: 6, title: "Hackathon: Code for Change", date: "July 12-13, 2025", type: "Technical", description: "48-hour hackathon solving real-world social problems.", location: "Innovation Hub" },
  { id: 7, title: "Sports Meet 2025", date: "November 1-5, 2025", type: "Sports", description: "Inter-department athletic competition.", location: "Sports Complex" },
  { id: 8, title: "Convocation Ceremony", date: "December 15, 2025", type: "Ceremony", description: "Annual graduation ceremony for all programs.", location: "Main Auditorium" },
];

export const announcements = [
  "🎉 Admissions Open 2025-26 · Apply Now",
  "📢 Annual Tech Fest IGNITE 2025 — March 15-17",
  "🏆 Diastas ranked Top 50 by NIRF 2024",
  "📚 New Research Center for AI launched",
  "🌍 International collaborations with 30+ universities",
  "💼 Record placement season — 95% placement rate",
  "🔬 ₹120Cr+ in research funding secured",
  "🎓 New PhD programs in Quantum Computing & AI Ethics",
  "🏗️ State-of-the-art Innovation Hub inaugurated",
  "📋 Scholarship applications open — Apply before March 31",
];

export const testimonials = [
  { name: "Arjun Patel", program: "B.Tech CSE", batch: "2024", quote: "Diastas transformed my passion for coding into a career at a FAANG company. The faculty mentorship was incredible.", avatar: "" },
  { name: "Sanya Malhotra", program: "MBA", batch: "2023", quote: "The business school's industry connections opened doors I never imagined. I got placed at Deloitte during campus recruitment.", avatar: "" },
  { name: "Rohan Verma", program: "B.Tech Mech", batch: "2024", quote: "Working on the SAE BAJA team was the highlight of my college life. We won nationals!", avatar: "" },
  { name: "Priti Sharma", program: "BA LLB", batch: "2023", quote: "The moot court program prepared me for real courtroom advocacy. I'm now practicing at the Delhi High Court.", avatar: "" },
  { name: "Deepak Nair", program: "M.Sc Physics", batch: "2022", quote: "The quantum computing lab gave me hands-on experience that landed me a research position at CERN.", avatar: "" },
  { name: "Aisha Khan", program: "B.Des", batch: "2024", quote: "Diastas's design program taught me to think creatively and solve problems. Now I'm designing products at Flipkart.", avatar: "" },
];

export const timelineData = [
  { year: 2010, title: "University Founded", description: "Diastas University established in Greater Noida with a vision to provide world-class education." },
  { year: 2012, title: "First Graduating Batch", description: "The first batch of 500 students graduated across 4 programs." },
  { year: 2015, title: "NAAC A Grade", description: "Received NAAC A Grade accreditation, recognizing academic excellence." },
  { year: 2017, title: "Research Center Established", description: "Launched the multi-disciplinary research center with ₹50Cr investment." },
  { year: 2019, title: "International Collaborations", description: "Signed MoUs with 10+ international universities for student and faculty exchange." },
  { year: 2021, title: "20,000 Students Milestone", description: "Crossed 20,000 enrolled students across all programs." },
  { year: 2023, title: "Top 50 NIRF Ranking", description: "Ranked in the Top 50 universities in India by NIRF." },
  { year: 2024, title: "New AI Research Lab", description: "Inaugurated a state-of-the-art AI and Quantum Computing research lab." },
];

export const leadershipTeam = [
  { name: "Dr. Suneel Diastas", designation: "Chancellor", bio: "Visionary educationist who founded Diastas University with a mission to democratize quality education.", education: "PhD Education Policy, Oxford", publications: 45 },
  { name: "Dr. K. Mallikharjuna Babu", designation: "Vice Chancellor", bio: "Distinguished academician with 30+ years in higher education administration.", education: "PhD Computer Science, IIT Delhi", publications: 120 },
  { name: "Dr. Avadhesh Kumar", designation: "Pro Vice Chancellor", bio: "Expert in curriculum development and academic planning.", education: "PhD Electronics, IIT Kanpur", publications: 85 },
  { name: "Dr. Preeti Bajaj", designation: "Dean of Research", bio: "Leading researcher in signal processing and communications.", education: "PhD Signal Processing, IISc Bangalore", publications: 150 },
  { name: "Mr. Dhruv Diastas", designation: "CEO", bio: "Young entrepreneur driving the university's digital transformation and industry partnerships.", education: "MBA, Wharton School", publications: 12 },
  { name: "Dr. Rita Sharma", designation: "Dean of Students", bio: "Dedicated to student welfare, mental health, and holistic development.", education: "PhD Psychology, JNU", publications: 38 },
];

export const courses = [
  { id: 1, name: "B.Tech Computer Science & Engineering", dept: "cse", level: "UG", duration: "4 Years", seats: 180, eligibility: "10+2 with Physics, Math, min 60%", credits: 160, syllabusUrl: "#" },
  { id: 2, name: "B.Tech AI & Machine Learning", dept: "cse", level: "UG", duration: "4 Years", seats: 120, eligibility: "10+2 with Physics, Math, min 60%", credits: 160, syllabusUrl: "#" },
  { id: 3, name: "M.Tech Computer Science", dept: "cse", level: "PG", duration: "2 Years", seats: 60, eligibility: "B.Tech with min 55%, GATE score", credits: 80, syllabusUrl: "#" },
  { id: 4, name: "B.Tech Mechanical Engineering", dept: "mech", level: "UG", duration: "4 Years", seats: 120, eligibility: "10+2 with PCM, min 60%", credits: 160, syllabusUrl: "#" },
  { id: 5, name: "MBBS", dept: "med", level: "UG", duration: "5.5 Years", seats: 150, eligibility: "10+2 with PCB, NEET qualified", credits: 200, syllabusUrl: "#" },
  { id: 6, name: "MBA", dept: "biz", level: "PG", duration: "2 Years", seats: 180, eligibility: "Graduation with min 50%, CAT/MAT score", credits: 100, syllabusUrl: "#" },
  { id: 7, name: "BA LLB (Integrated)", dept: "law", level: "UG", duration: "5 Years", seats: 120, eligibility: "10+2 with min 50%, CLAT score", credits: 200, syllabusUrl: "#" },
  { id: 8, name: "B.Des Communication Design", dept: "arts", level: "UG", duration: "4 Years", seats: 40, eligibility: "10+2 with min 50%, portfolio", credits: 140, syllabusUrl: "#" },
  { id: 9, name: "BBA", dept: "biz", level: "UG", duration: "3 Years", seats: 120, eligibility: "10+2 with min 50%", credits: 120, syllabusUrl: "#" },
  { id: 10, name: "B.Sc Physics", dept: "physics", level: "UG", duration: "3 Years", seats: 60, eligibility: "10+2 with PCM, min 55%", credits: 120, syllabusUrl: "#" },
  { id: 11, name: "BA International Relations", dept: "intl", level: "UG", duration: "3 Years", seats: 40, eligibility: "10+2 with min 50%", credits: 120, syllabusUrl: "#" },
  { id: 12, name: "PhD Computer Science", dept: "cse", level: "PhD", duration: "3-5 Years", seats: 20, eligibility: "M.Tech/MCA with NET/GATE", credits: 60, syllabusUrl: "#" },
];

export const faqItems = [
  { question: "What are the admission requirements?", answer: "Admission requirements vary by program. Generally, undergraduate programs require 10+2 with minimum 50-60% marks. Postgraduate programs require a relevant bachelor's degree. Specific entrance exam scores (JEE, NEET, CAT, CLAT) may be required." },
  { question: "Is hostel accommodation available?", answer: "Yes, Diastas offers separate hostels for boys and girls with AC and non-AC options. All hostels have Wi-Fi, mess facilities, laundry services, and 24/7 security." },
  { question: "What is the placement record?", answer: "Diastas has a consistent placement rate of 90-95%. Top recruiters include Google, Microsoft, Amazon, Deloitte, Goldman Sachs, TCS, and many more. The highest package in 2024 was ₹42 LPA." },
  { question: "Are scholarships available?", answer: "Yes, Diastas offers merit-based scholarships covering up to 100% tuition. Special scholarships exist for sports achievers, defense personnel wards, and economically weaker sections." },
  { question: "What is the fee structure?", answer: "Fees vary by program. B.Tech programs range from ₹1.5L to ₹2.5L per year. MBA is approximately ₹3L per year. Detailed fee structure is available on the admissions portal." },
  { question: "Can I transfer from another university?", answer: "Lateral entry and transfers are considered on a case-by-case basis. Contact the admissions office with your academic records for evaluation." },
  { question: "What extracurricular activities are available?", answer: "Diastas has 50+ student clubs covering coding, robotics, music, dance, drama, sports, photography, entrepreneurship, and social service. Annual fests include IGNITE (tech) and UTSAV (cultural)." },
  { question: "Is the campus Wi-Fi enabled?", answer: "Yes, the entire campus has high-speed Wi-Fi coverage including classrooms, labs, hostels, library, and common areas." },
  { question: "What research opportunities exist for undergraduates?", answer: "UG students can participate in research through the Summer Research Fellowship, faculty-guided projects, and the Innovation Hub's incubation program." },
  { question: "How do I apply for international exchange programs?", answer: "Applications for exchange programs open in January each year. Students need a minimum CGPA of 7.5 and IELTS/TOEFL scores. The International Relations Office guides the process." },
  { question: "What medical facilities are on campus?", answer: "Diastas has a fully equipped medical center with doctors, nurses, and ambulance services available 24/7. A teaching hospital is adjacent to the campus." },
  { question: "How can I visit the campus?", answer: "Campus tours are available Monday to Saturday. Book a tour through the admissions portal or call the admissions office. Virtual tours are also available on our website." },
];

export const admissionDates = [
  { label: "Application Opens", date: "January 15, 2025", type: "start", color: "#22C55E" },
  { label: "Early Decision Deadline", date: "February 28, 2025", type: "deadline", color: "#F59E0B" },
  { label: "Entrance Test", date: "March 20, 2025", type: "exam", color: "#3B82F6" },
  { label: "Regular Application Deadline", date: "April 30, 2025", type: "deadline", color: "#EF4444" },
  { label: "Results Announced", date: "May 15, 2025", type: "result", color: "#8B5CF6" },
  { label: "Counselling Begins", date: "June 1, 2025", type: "event", color: "#06B6D4" },
  { label: "Fee Payment Deadline", date: "June 30, 2025", type: "deadline", color: "#F97316" },
  { label: "Classes Begin", date: "August 1, 2025", type: "start", color: "#22C55E" },
];

export const collaborations = [
  { institution: "MIT", country: "USA", flag: "🇺🇸", type: "Research", year: 2019 },
  { institution: "University of Oxford", country: "UK", flag: "🇬🇧", type: "Research", year: 2018 },
  { institution: "TU Munich", country: "Germany", flag: "🇩🇪", type: "Exchange", year: 2020 },
  { institution: "University of Tokyo", country: "Japan", flag: "🇯🇵", type: "Research", year: 2019 },
  { institution: "NUS Singapore", country: "Singapore", flag: "🇸🇬", type: "Exchange", year: 2021 },
  { institution: "University of Melbourne", country: "Australia", flag: "🇦🇺", type: "Publication", year: 2020 },
  { institution: "ETH Zurich", country: "Switzerland", flag: "🇨🇭", type: "Research", year: 2022 },
  { institution: "University of Toronto", country: "Canada", flag: "🇨🇦", type: "Exchange", year: 2019 },
  { institution: "Seoul National University", country: "South Korea", flag: "🇰🇷", type: "Research", year: 2021 },
  { institution: "Sorbonne University", country: "France", flag: "🇫🇷", type: "Publication", year: 2020 },
  { institution: "KTH Royal Institute", country: "Sweden", flag: "🇸🇪", type: "Exchange", year: 2022 },
  { institution: "Tsinghua University", country: "China", flag: "🇨🇳", type: "Research", year: 2018 },
  { institution: "University of Cape Town", country: "South Africa", flag: "🇿🇦", type: "Publication", year: 2023 },
  { institution: "Technion Israel", country: "Israel", flag: "🇮🇱", type: "Research", year: 2021 },
  { institution: "KAIST", country: "South Korea", flag: "🇰🇷", type: "Exchange", year: 2022 },
  { institution: "IIT Bombay", country: "India", flag: "🇮🇳", type: "Research", year: 2017 },
  { institution: "Delft University", country: "Netherlands", flag: "🇳🇱", type: "Research", year: 2023 },
  { institution: "University of São Paulo", country: "Brazil", flag: "🇧🇷", type: "Publication", year: 2022 },
  { institution: "Nanyang Technological University", country: "Singapore", flag: "🇸🇬", type: "Research", year: 2020 },
  { institution: "University of Edinburgh", country: "UK", flag: "🇬🇧", type: "Exchange", year: 2021 },
];

export const buildingInfo: Record<string, { name: string; description: string; funnyDesc: string; floors: number; facilities: string[]; hours: string; funnyImage: string }> = {
  "academic-a": { name: "Academic Block A", description: "Main academic building housing CSE, ECE, and IT departments.", funnyDesc: "Where students master the art of sleeping with their eyes open during 8 AM lectures. The WiFi here runs on pure desperation.", funnyImage: "💤", floors: 6, facilities: ["Smart Classrooms", "Computer Labs", "Seminar Halls"], hours: "8:00 AM - 8:00 PM" },
  "academic-b": { name: "Academic Block B", description: "Houses Business, Law, and Humanities departments.", funnyDesc: "Where calculators cry and whiteboards never have enough markers. Warning: Math anxiety zone ahead!", funnyImage: "🤯", floors: 5, facilities: ["Lecture Halls", "Moot Court", "Case Study Rooms"], hours: "8:00 AM - 8:00 PM" },
  "library": { name: "Central Library", description: "State-of-the-art library with 100,000+ books and digital resources.", funnyDesc: "SHHHHHENCE! The only place where silence is enforced with the fury of a thousand librarians. Also doubles as a nap sanctuary.", funnyImage: "📢", floors: 4, facilities: ["Reading Halls", "Digital Library", "Research Cubicles", "Rare Books Section"], hours: "7:00 AM - 11:00 PM" },
  "admin": { name: "Administrative Block", description: "University administration, registrar, and finance offices.", funnyDesc: "The legendary maze where paperwork goes to multiply. Bring snacks, you might be here a while.", funnyImage: "📋", floors: 3, facilities: ["Admissions Office", "Exam Cell", "Vice Chancellor Office"], hours: "9:00 AM - 5:00 PM" },
  "auditorium": { name: "Grand Auditorium", description: "2000-seat auditorium for convocations and cultural events.", funnyDesc: "Where freshers discover stage fright and seniors discover they're surprisingly good at lip-syncing.", funnyImage: "🎭", floors: 2, facilities: ["Main Stage", "Green Rooms", "AV Equipment", "VIP Lounge"], hours: "By Reservation" },
  "sports": { name: "Sports Complex", description: "Multi-sport facility with indoor and outdoor amenities.", funnyDesc: "The only place where 'I'll start going tomorrow' has been said 10,000 times. Gym mirrors have seen things.", funnyImage: "💪", floors: 2, facilities: ["Swimming Pool", "Gymnasium", "Basketball Courts", "Cricket Ground"], hours: "6:00 AM - 9:00 PM" },
  "hostel-boys": { name: "Boys Hostel", description: "Residential facility for male students with modern amenities.", funnyDesc: "24/7 chaos factory. Maggi at 3 AM is a constitutional right here. The common room TV remote is a weapon of mass argument.", funnyImage: "🍜", floors: 8, facilities: ["AC/Non-AC Rooms", "Common Room", "Mess Hall", "Laundry"], hours: "24/7" },
  "hostel-girls": { name: "Girls Hostel", description: "Residential facility for female students with enhanced security.", funnyDesc: "Fort Knox has less security. But inside? Absolute party central after 10 PM. The mess food reviews are legendary.", funnyImage: "🏰", floors: 8, facilities: ["AC/Non-AC Rooms", "Common Room", "Mess Hall", "Salon"], hours: "24/7" },
  "cafeteria": { name: "Central Cafeteria", description: "Multi-cuisine food court serving 3000+ students daily.", funnyDesc: "Where 'bhai ek plate momos' is the national anthem. The samosa guy is basically a celebrity.", funnyImage: "🥟", floors: 1, facilities: ["Food Court", "Coffee Shop", "Juice Bar", "Outdoor Seating"], hours: "7:00 AM - 10:00 PM" },
  "medical": { name: "Medical Center", description: "24/7 healthcare facility with qualified doctors and nurses.", funnyDesc: "Your headache is either from studying too hard or too little. Either way, paracetamol is the answer.", funnyImage: "💊", floors: 2, facilities: ["OPD", "Pharmacy", "Pathology Lab", "Ambulance"], hours: "24/7" },
  "research": { name: "Research Labs Complex", description: "Houses all major research laboratories and innovation spaces.", funnyDesc: "Where 'it works on my machine' is the most common phrase. The coffee machine here is the real MVP.", funnyImage: "🔬", floors: 4, facilities: ["AI Lab", "Quantum Lab", "Biomedical Lab", "Clean Room"], hours: "8:00 AM - 10:00 PM" },
  "innovation": { name: "Innovation Hub", description: "Startup incubator and entrepreneurship center.", funnyDesc: "Where every student has an 'Uber for X' idea. The pitch room has heard 500 startup ideas, 3 actually launched.", funnyImage: "🚀", floors: 3, facilities: ["Co-working Space", "Prototyping Lab", "Pitch Room", "Mentoring Rooms"], hours: "9:00 AM - 9:00 PM" },
};

export const placementStats = [
  { company: "Google", hires: 12, avgPackage: "₹32 LPA", logo: "🔵", deptBreakdown: { CSE: 58, ECE: 17, IT: 15, MBA: 10 } },
  { company: "Microsoft", hires: 18, avgPackage: "₹28 LPA", logo: "🟦", deptBreakdown: { CSE: 50, ECE: 22, IT: 17, MBA: 11 } },
  { company: "Amazon", hires: 25, avgPackage: "₹24 LPA", logo: "🟠", deptBreakdown: { CSE: 44, MBA: 20, ECE: 16, Mech: 12, IT: 8 } },
  { company: "Goldman Sachs", hires: 8, avgPackage: "₹35 LPA", logo: "🔷", deptBreakdown: { CSE: 38, MBA: 37, BBA: 25 } },
  { company: "Deloitte", hires: 30, avgPackage: "₹12 LPA", logo: "🟢", deptBreakdown: { MBA: 33, CSE: 27, BBA: 20, Law: 13, IT: 7 } },
  { company: "TCS", hires: 120, avgPackage: "₹7 LPA", logo: "⬛", deptBreakdown: { CSE: 30, ECE: 22, Mech: 18, IT: 15, Civil: 10, BBA: 5 } },
  { company: "Infosys", hires: 95, avgPackage: "₹6.5 LPA", logo: "🔹", deptBreakdown: { CSE: 32, ECE: 24, IT: 20, Mech: 14, Civil: 10 } },
  { company: "Flipkart", hires: 15, avgPackage: "₹22 LPA", logo: "🟡", deptBreakdown: { CSE: 47, MBA: 27, Design: 13, IT: 13 } },
  { company: "Adobe", hires: 6, avgPackage: "₹30 LPA", logo: "🔴", deptBreakdown: { CSE: 50, Design: 33, IT: 17 } },
  { company: "Tesla", hires: 3, avgPackage: "₹40 LPA", logo: "⚡", deptBreakdown: { Mech: 67, CSE: 33 } },
];

export const placementHighlights = {
  totalOffers: 2800,
  highestPackage: "₹42 LPA",
  averagePackage: "₹8.5 LPA",
  placementRate: 95,
  companiesVisited: 350,
  internshipConversion: 78,
};

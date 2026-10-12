/**
 * ====================================================================
 * PORTFOLIO CONTENT & DATA CONFIGURATION
 * ====================================================================
 * Suman S - Personal Portfolio
 * 
 * Edit this file to update any content, projects, achievements,
 * social handles, or contact form endpoints across the website.
 */

const PORTFOLIO_DATA = {
  // Personal Info
  personal: {
    name: "Suman S",
    initials: "SS",
    role: "Pre-final-year B.E. student (Information Science & Engineering) & Aspiring Full-Stack / AI Developer",
    college: "Sri Sairam College of Engineering, Bengaluru",
    graduationYears: "2024 — 2028",
    location: "Bengaluru, India",
    greeting: "Hi!",
    greetingEmoji: "👋",
    tagline: "I turn ideas into software that helps people.",
    bio: "I build practical full-stack and AI-powered applications that tackle real problems, from e-waste management to accessible communication. I also lead student communities, join hackathons and care about technology for social impact.",
    photo: "assets/me.png",
    // Contact placeholder as requested
    emailPlaceholder: "[TODO: my email]", // Replace with your real email, e.g. "suman@example.com"
    formEndpoint: "https://formspree.io/f/YOUR_FORM_ID" // Replace with your Formspree or Web3Forms endpoint
  },

  // Social Links
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/sumanssringeri94-create",
      ariaLabel: "Link to Suman S GitHub profile",
      icon: "github"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/suman-s-777ssss777/",
      ariaLabel: "Link to Suman S LinkedIn profile",
      icon: "linkedin"
    }
  ],

  // Skills (Strictly NO TypeScript as instructed)
  skills: [
    { name: "Java", category: "Language", iconId: "skill-java" },
    { name: "Python", category: "Language", iconId: "skill-python" },
    { name: "C", category: "Language", iconId: "skill-c" },
    { name: "C++", category: "Language", iconId: "skill-cpp" },
    { name: "JavaScript", category: "Language", iconId: "skill-javascript" },
    { name: "React", category: "Frontend", iconId: "skill-react" },
    { name: "Vite", category: "Build Tool", iconId: "skill-vite" },
    { name: "Tailwind CSS", category: "Frontend", iconId: "skill-tailwind" },
    { name: "Node.js", category: "Backend", iconId: "skill-nodejs" },
    { name: "Express.js", category: "Backend", iconId: "skill-express" },
    { name: "FastAPI", category: "Backend / AI", iconId: "skill-fastapi" },
    { name: "Flask", category: "Backend / AI", iconId: "skill-flask" },
    { name: "MongoDB", category: "Database", iconId: "skill-mongodb" },
    { name: "LangChain", category: "AI Framework", iconId: "skill-langchain" },
    { name: "LLM Integration", category: "AI / ML", iconId: "skill-llm" },
    { name: "Git", category: "Version Control", iconId: "skill-git" },
    { name: "GitHub", category: "Platform", iconId: "skill-github" },
    { name: "Vercel", category: "Deployment", iconId: "skill-vercel" }
  ],

  // Projects ("Things I worked on")
  projects: [
    {
      id: "ecollect-go",
      title: "e-Collect Go",
      description: "A full-stack e-waste management platform. Log e-waste, schedule pickups, track recycling progress, earn eco-points, see estimated CO2 savings, and manage requests from an admin dashboard. Built with JWT authentication, role-based access, and recycling-centre listings.",
      tags: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/sumanssringeri94-create/ecollect-go",
      liveUrl: "https://ecollect-go.vercel.app/",
      isComingSoon: false
    },
    {
      id: "datamind-llm-db-agent",
      title: "DataMind / LLM DB Agent",
      description: "A database assistant that lets people query relational and document data in natural language through an interactive web UI and a Python API.",
      tags: ["FastAPI", "React", "LangChain"],
      githubUrl: "https://github.com/sumanssringeri94-create/llm-DB-agent",
      liveUrl: null,
      isComingSoon: false
    },
    {
      id: "ai-communication-bridge",
      title: "AI Communication Bridge",
      description: "An accessibility-focused application helping people with speech difficulties communicate through writing, drawing, symbols and gestures while interpreting incoming speech in real time.",
      tags: ["React", "Vite", "Python", "Flask", "AI APIs"],
      githubUrl: "https://github.com/sumanssringeri94-create/AI-Communication-Bridge",
      liveUrl: null,
      isComingSoon: false
    },
    {
      id: "smart-ai-water-usage-analyzer",
      title: "Smart AI Water Usage Analyzer",
      description: "An AI-powered utility that monitors and analyses daily water usage patterns with a machine-learning component to identify consumption trends and support water conservation.",
      tags: ["Python", "Flask", "AI/ML"],
      githubUrl: "https://github.com/sumanssringeri94-create/SMART-AI-WATER-USAGE-ANALYZER",
      liveUrl: null,
      isComingSoon: false
    },
    {
      id: "cloud-select",
      title: "CloudSelect",
      description: "A multi-cloud catalogue and comparison portal designed for evaluating cloud providers, compute/storage services, architecture tiers, and pricing models.",
      tags: ["Node.js", "Express", "MongoDB", "Python"],
      githubUrl: null, // [TODO: repo URL]
      liveUrl: null,
      isComingSoon: true,
      comingSoonNote: "Link coming soon"
    },
    {
      id: "sri-sairam-university-website",
      title: "Sri Sairam University Website",
      description: "A comprehensive institutional college portal built collaboratively for a competitive hackathon/codethon challenge, featuring responsive academic and event hubs.",
      tags: ["React", "Vite", "Tailwind CSS"],
      githubUrl: null, // [TODO: live or repo URL]
      liveUrl: null,
      isComingSoon: true,
      comingSoonNote: "Link coming soon"
    }
  ],

  // Experience and Leadership Timeline
  // Adding any entry to this array automatically extends the winding S-curve and creates a new node!
  timeline: [
    {
      yearNumeral: "2024",
      period: "2024 — 2028",
      role: "B.E. in Information Science and Engineering",
      organization: "Sri Sairam College of Engineering, Bengaluru",
      orgShort: "SSCE",
      logoUrl: null, // Set to path like "assets/logos/sairam.png" to render an <img> inside the tile
      description: "Pursuing Bachelor of Engineering with foundational and practical coursework in Data Structures, Algorithms, Operating Systems, Database Management Systems, and Software Engineering.",
      highlight: "Pre-final-year student"
    },
    {
      yearNumeral: "2026",
      period: "2026",
      role: "Initiator & Petitioner — Student Branch Chapter",
      organization: "IEEE Industry Applications Society (IAS)",
      orgShort: "IEEE",
      logoUrl: null,
      description: "Spearheaded the initiative to establish the IEEE IAS Student Branch Chapter at Sri Sairam College of Engineering, acting as the official petitioner on the approval documentation.",
      highlight: "Leadership & Community Building"
    },
    {
      yearNumeral: "2026",
      period: "2026",
      role: "College Ambassador (Shortlisted)",
      organization: "IBM Z Datathon 2026",
      orgShort: "IBM Z",
      logoUrl: null,
      description: "Shortlisted as College Ambassador for IBM Z Datathon 2026, engaging peers in enterprise computing challenges, data workloads, and open-source mainframe technologies.",
      highlight: "Ambassadorship"
    },
    {
      yearNumeral: "2026",
      period: "2026",
      role: "SDG Exhibitor & Presenter",
      organization: "FKCCI Global CSR & Sustainability Summit 2026",
      orgShort: "FKCCI",
      logoUrl: null,
      description: "Exhibited and presented the college Sustainable Development Goal (SDG) initiatives before industry leaders, policymakers, and CSR professionals.",
      highlight: "Social Impact & Sustainability"
    },
    {
      yearNumeral: "2025",
      period: "Campus Leadership",
      role: "Technical Coordinator — Pradyut Parva",
      organization: "College Technical Fest",
      orgShort: "PP",
      logoUrl: null,
      description: "Coordinated technical fest activities including code debugging competitions, web development showcases, participant onboarding, and event registrations.",
      highlight: "Event Coordination"
    },
    {
      yearNumeral: "2025",
      period: "Field Innovation",
      role: "SamShoDhana Rural Field Visit",
      organization: "Gudnahalli, Karnataka",
      orgShort: "SSD",
      logoUrl: null,
      description: "Conducted field study visiting farmers in Gudnahalli, researching grassroots supply chain hurdles and formulating a proposed solution for a direct farmer-to-buyer platform.",
      highlight: "Proposed Solution (Field Research)"
    }
  ],

  // Achievements and Learning (Compact Block under Experience)
  achievements: [
    {
      title: "NPTEL Human Computer Interaction",
      detail: "Elite + Silver Certificate (Score: 87%)",
      badge: "Elite + Silver"
    },
    {
      title: "NPTEL Operating Systems",
      detail: "Elite Certificate",
      badge: "Elite"
    },
    {
      title: "Hackathons & Codethons",
      detail: "Participated in 4 hackathons and Winner of a Codethon",
      badge: "Codethon Winner"
    },
    {
      title: "Conferences & Summits (2026)",
      detail: "Quantum Ignite, GeoShakthi, IPRX, Karnataka CS Student Congress",
      badge: "Attended"
    }
  ]
};

// Export for module use or assign to window for vanilla script inclusion
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
} else if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}

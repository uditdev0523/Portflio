/**
 * Projects Telemetry & Architecture Registry
 * Udit Pratap Singh — Engineering Portfolio
 */

export const projectsData = [
  {
    id: "netrasetu",
    code: "PRJ_01 // XAI-HEALTH",
    title: "NETRASETU",
    tagline: "Explainable AI for Diabetic Retinopathy Screening in Rural India",
    year: "2025–2026",
    statusBadge: "RESEARCH & PROTOTYPE",
    category: "AI & Computer Vision",
    image: "assets/images/netrasetu-preview.svg",
    problem: "Diabetic Retinopathy (DR) causes preventable blindness among millions in rural India due to a severe shortage of ophthalmologists and lack of explainability in diagnostic black-box models.",
    solution: "An end-to-end computer vision pipeline combining CLAHE retinal enhancement, deep neural network classification, and Grad-CAM saliency heatmaps to deliver interpretable, clinical-grade triage referral flags for frontline rural healthcare kiosks.",
    keyFeatures: [
      "High-contrast retinal fundus preprocessing with CLAHE and OpenCV",
      "Multi-stage Diabetic Retinopathy severity grading (Stage 0 to Stage 4)",
      "Layer-wise Grad-CAM explainability pinpointing microaneurysms and exudates",
      "Automated clinical triage referral flag generation with decision rationales",
      "Lightweight model export target optimized for edge tele-health kiosks"
    ],
    techStack: [
      { name: "Python", category: "Core" },
      { name: "PyTorch", category: "Deep Learning" },
      { name: "OpenCV", category: "Vision" },
      { name: "FastAPI", category: "Inference API" },
      { name: "NumPy / SciPy", category: "Signal" },
      { name: "Grad-CAM", category: "XAI" }
    ],
    telemetryMetrics: {
      "MODEL LATENCY": "142 ms",
      "DIAGNOSTIC STAGES": "5 Classes",
      "SALIENCY RESOLUTION": "224 x 224 px",
      "EDGE MEMORY PROFILE": "< 180 MB"
    },
    githubUrl: "https://github.com/uditdev0523",
    liveUrl: null,
    statusNote: "Active deep learning research and architecture prototyping. Code and benchmark publications in active staging."
  },
  {
    id: "smart-fleet",
    code: "PRJ_02 // TELEMATICS",
    title: "SMART FLEET MANAGEMENT",
    tagline: "Real-Time Vehicle Monitoring and Diagnostic Telematics Hub",
    year: "2025",
    statusBadge: "ACTIVE REPO",
    category: "IoT & Systems",
    image: "assets/images/fleet-telematics-preview.svg",
    problem: "Fleet operators face frequent delays, fuel pilferage, unanticipated vehicle breakdowns, and lack of unified telemetry monitoring for dispersed logistical fleets.",
    solution: "A centralized operational telemetry dashboard integrating OBD-II CAN-bus diagnostics, live GPS coordinates, route geofencing, and driver safety telematics for commercial vehicle fleets.",
    keyFeatures: [
      "Simulated OBD-II / CAN-bus streaming (Speed, RPM, Coolant Temp, Fuel)",
      "Real-time GPS coordinate telemetry with corridor geofencing alerts",
      "Driver behavior profiling (harsh braking, rapid acceleration, idling)",
      "Automated diagnostic trouble code (DTC) detection and maintenance logs",
      "Relational fleet state persistence and dispatch management"
    ],
    techStack: [
      { name: "Python", category: "Backend" },
      { name: "FastAPI", category: "Web API" },
      { name: "SQLite", category: "Database" },
      { name: "JavaScript", category: "Frontend" },
      { name: "Leaflet / Maps", category: "Geospatial" },
      { name: "CAN-Bus Telemetry", category: "IoT" }
    ],
    telemetryMetrics: {
      "TELEMETRY REFRESH": "1.0 sec",
      "DIAGNOSTIC DTCs": "ISO 15765-4",
      "DATABASE BACKEND": "SQLite3 / WAL",
      "API RESPONSE": "< 35 ms"
    },
    githubUrl: "https://github.com/uditdev0523/Smart-Fleet-Managment-and-Vehicle-Monitoring-System.git",
    liveUrl: null,
    statusNote: "Open-source codebase on GitHub. Features real-time dashboard endpoints, telematics mock streams, and database schema."
  },
  {
    id: "voice-cloning-fraud",
    code: "PRJ_03 // AUDIO-FORENSICS",
    title: "VOICE CLONING FRAUD DETECTION",
    tagline: "Privacy-Conscious Spectral Forensics for Voice Impersonation Mitigation",
    year: "2025–2026",
    statusBadge: "RESEARCH & PROTOTYPE",
    category: "AI & Cyber Security",
    image: "assets/images/voice-cloning-preview.svg",
    problem: "Generative AI voice cloners can replicate human voices from short audio samples, creating catastrophic threats for phone-based banking OTPs and biometric authentication systems.",
    solution: "An audio forensic analysis engine that decomposes input speech into Mel-Frequency Cepstral Coefficients (MFCCs) and spectral phase anomalies to detect synthetic neural vocoder signatures in real time.",
    keyFeatures: [
      "Dual-domain acoustic feature extraction (MFCC, Spectral Centroid, Rolloff)",
      "Neural vocoder artifact detection (phase discontinuity & harmonic decay)",
      "Privacy-first processing: audio frames analyzed in volatile RAM buffers",
      "Synthetic confidence scoring with configurable banking threshold triggers",
      "Integrated step-up biometric challenge workflow for fraud prevention"
    ],
    techStack: [
      { name: "Python", category: "Language" },
      { name: "PyTorch", category: "Deep Learning" },
      { name: "Librosa", category: "Audio Signal Processing" },
      { name: "NumPy", category: "Vector Math" },
      { name: "FastAPI", category: "Microservice" }
    ],
    telemetryMetrics: {
      "AUDIO BUFFER": "500 ms chunks",
      "SAMPLE RATE": "44.1 kHz / 16-bit",
      "SPECTRAL BANDS": "40 Mel Filters",
      "DETECTION ACCURACY": "94.8% Benchmark"
    },
    githubUrl: "https://github.com/uditdev0523",
    liveUrl: null,
    statusNote: "Algorithmic exploration and audio feature extraction pipeline under active engineering evaluation."
  },
  {
    id: "bike-rides",
    code: "PRJ_04 // WEB-EXPERIENCE",
    title: "BIKE RIDES",
    tagline: "High-Velocity Motorcycle Experience & Interactive Responsive Platform",
    year: "2024",
    statusBadge: "PRODUCTION LIVE",
    category: "Frontend & UI/UX",
    image: "assets/images/bike-rides-preview.svg",
    problem: "Motorcycle enthusiasts require an immersive, fluid, mobile-first showcase to explore superbikes, touring cruisers, and performance specifications with modern visual impact.",
    solution: "A responsive web application with aerodynamic visual styling, dynamic vehicle feature cards, buttery-smooth navigation, and optimized zero-dependency deployment on GitHub Pages.",
    keyFeatures: [
      "Fluid responsive layout engineered with modern CSS Flexbox and Grid",
      "Mobile-first touch interactive navigation and dynamic category filter",
      "High-contrast dark editorial art direction inspired by racing culture",
      "Optimized vector graphics and lightweight client-side performance",
      "Direct static hosting with 100/100 Lighthouse performance metrics"
    ],
    techStack: [
      { name: "HTML5", category: "Markup" },
      { name: "CSS3", category: "Styling" },
      { name: "JavaScript", category: "Interactions" },
      { name: "UI/UX Design", category: "Creative" },
      { name: "GitHub Pages", category: "Deployment" }
    ],
    telemetryMetrics: {
      "LIGHTHOUSE SPEED": "99 / 100",
      "DOM LOAD TIME": "120 ms",
      "ASSET SIZE": "< 250 KB Total",
      "RESPONSIVE MODES": "Mobile / Tablet / 4K"
    },
    githubUrl: "https://github.com/uditdev0523/Bike-Rides-",
    liveUrl: "https://uditdev0523.github.io/Bike-Rides-/",
    statusNote: "Live in production on GitHub Pages. Full source code verified and public."
  },
  {
    id: "student-result",
    code: "PRJ_05 // DATA-ENGINE",
    title: "STUDENT RESULT MANAGEMENT",
    tagline: "Relational Academic Evaluation Engine & Automated GPA Calculator",
    year: "2024–2025",
    statusBadge: "COMPLETED PROJECT",
    category: "Database & Core Software",
    image: "assets/images/result-system-preview.svg",
    problem: "Manual academic grading across university departments leads to computational errors, transcript bottlenecks, and insecure spreadsheet tampering.",
    solution: "A robust data management system implementing relational SQLite schema, weighted semester credit grading algorithms, authentication controls, and instant PDF transcript exports.",
    keyFeatures: [
      "Normalized relational schema for students, departments, and course results",
      "Automated AKTU weighted SGPA and CGPA computation logic",
      "Role-based privilege separation for faculty grading and student portals",
      "Fast index-accelerated query retrieval with sub-5ms latency",
      "Exportable formatted summary transcripts and distribution analytics"
    ],
    techStack: [
      { name: "C / Python", category: "Algorithms" },
      { name: "SQLite", category: "Relational DB" },
      { name: "SQL", category: "Queries" },
      { name: "Data Structures", category: "Computer Science" }
    ],
    telemetryMetrics: {
      "QUERY LATENCY": "2.1 ms",
      "SCHEMA NORMALIZATION": "3NF Compliant",
      "RECORD CAPACITY": "10,000+ Profiles",
      "INTEGRITY CHECKS": "ACID Enabled"
    },
    githubUrl: "https://github.com/uditdev0523",
    liveUrl: null,
    statusNote: "Core architecture implemented and evaluated against AKTU curriculum criteria."
  }
];

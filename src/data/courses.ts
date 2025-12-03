export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price: number;
  originalPrice: number;
  modules: string[];
  whoShouldTake: string[];
  whatYouWillLearn: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  image?: string;
}

export const courses: Course[] = [
  {
    id: "1",
    slug: "healthcare-insurance",
    title: "Healthcare Insurance",
    shortDescription: "Learn insurance operations, claims, TPAs, IRDAI guidelines, provider relations, underwriting basics, and analytics.",
    fullDescription: "Master the fundamentals of healthcare insurance operations in India. This comprehensive course covers everything from policy types to claims processing, TPA operations, and regulatory compliance.",
    duration: "12-16 weeks",
    price: 4999,
    originalPrice: 7999,
    modules: [
      "Basics of Health Insurance",
      "Policy types and coverage",
      "Cashless & Reimbursement processes",
      "Claims lifecycle management",
      "TPA operations and workflows",
      "Hospital empanelment procedures",
      "Underwriting basics",
      "Fraud detection & audits"
    ],
    whoShouldTake: [
      "Healthcare professionals looking to understand insurance",
      "Insurance industry aspirants",
      "Hospital administrators",
      "TPA executives",
      "Anyone interested in healthcare management"
    ],
    whatYouWillLearn: [
      "Comprehensive understanding of health insurance policies",
      "End-to-end claims processing",
      "TPA operational knowledge",
      "IRDAI guidelines and compliance",
      "Provider relations management",
      "Underwriting fundamentals",
      "Fraud prevention techniques",
      "Healthcare analytics basics"
    ],
    benefits: [
      "Industry-recognized certificate",
      "Practical case studies",
      "Real-world simulations",
      "Internship opportunities",
      "Job placement assistance",
      "Lifetime course access"
    ],
    faqs: [
      {
        question: "Do I need prior healthcare experience?",
        answer: "No prior experience required. This course is designed for beginners and covers all fundamentals."
      },
      {
        question: "Will I get a certificate?",
        answer: "Yes, you'll receive a completion certificate upon successfully finishing the course."
      },
      {
        question: "Is internship guaranteed?",
        answer: "We provide internship support and connect you with partner organizations. Placement depends on your performance."
      }
    ]
  },
  {
    id: "2",
    slug: "healthcare-analytics",
    title: "Healthcare Analytics",
    shortDescription: "Master healthcare data, dashboards, KPIs, data cleaning, visualization, and real datasets.",
    fullDescription: "Become proficient in healthcare data analysis. Learn to work with hospital KPIs, EHR data, create dashboards, and derive actionable insights from healthcare datasets.",
    duration: "12-16 weeks",
    price: 5499,
    originalPrice: 8999,
    modules: [
      "Hospital KPIs and metrics",
      "Electronic Health Records (EHR) data",
      "Data cleaning and preparation",
      "Excel advanced functions",
      "Power BI dashboards",
      "Basic SQL for healthcare",
      "Healthcare reporting standards",
      "Case-based projects"
    ],
    whoShouldTake: [
      "Healthcare professionals seeking data skills",
      "Data analysts moving into healthcare",
      "Hospital administrators",
      "Quality improvement professionals",
      "Healthcare consultants"
    ],
    whatYouWillLearn: [
      "Healthcare data fundamentals",
      "KPI tracking and reporting",
      "Data visualization techniques",
      "Dashboard creation in Power BI",
      "SQL querying for healthcare data",
      "Statistical analysis basics",
      "Real-world healthcare datasets",
      "Industry-standard reporting"
    ],
    benefits: [
      "Hands-on projects with real data",
      "Industry-recognized certificate",
      "Power BI and Excel mastery",
      "Portfolio-ready projects",
      "Career guidance",
      "Lifetime access"
    ],
    faqs: [
      {
        question: "Do I need coding experience?",
        answer: "Basic computer skills are sufficient. We teach SQL and analytics tools from scratch."
      },
      {
        question: "What tools will I learn?",
        answer: "You'll master Excel, Power BI, and basic SQL - the industry-standard toolkit."
      }
    ]
  },
  {
    id: "3",
    slug: "medical-coding",
    title: "Medical Coding",
    shortDescription: "Master ICD, CPT, HCPCS, procedure coding, claim cycle, and live practice sheets.",
    fullDescription: "Become a certified medical coder. Learn ICD-10, CPT, HCPCS coding systems with extensive practice on real medical records and claims.",
    duration: "12-16 weeks",
    price: 5999,
    originalPrice: 9999,
    modules: [
      "ICD-10 coding system",
      "CPT coding procedures",
      "HCPCS codes",
      "Medical terminology",
      "Anatomy and physiology basics",
      "Coding guidelines and compliance",
      "Claims processing cycle",
      "Practice cases and simulations"
    ],
    whoShouldTake: [
      "Healthcare graduates",
      "Medical transcriptionists",
      "Healthcare administrators",
      "Anyone seeking coding certification",
      "Remote work aspirants"
    ],
    whatYouWillLearn: [
      "ICD-10 diagnosis coding",
      "CPT procedure coding",
      "HCPCS supply coding",
      "Medical record analysis",
      "Coding accuracy and compliance",
      "Claims submission process",
      "Denial management basics",
      "Real medical case practice"
    ],
    benefits: [
      "Industry-standard certification",
      "100+ practice cases",
      "Live coding sheets",
      "Job-ready portfolio",
      "High-demand skill",
      "Remote work opportunities"
    ],
    faqs: [
      {
        question: "Is medical background required?",
        answer: "Not mandatory. We cover essential medical terminology and anatomy as part of the course."
      },
      {
        question: "Can I work remotely after this?",
        answer: "Yes, medical coding is one of the most popular remote healthcare careers."
      }
    ]
  },
  {
    id: "4",
    slug: "hmis",
    title: "Health Management Information System (HMIS)",
    shortDescription: "Learn hospital information systems, data management, reporting, and healthcare IT fundamentals.",
    fullDescription: "Master healthcare information systems and hospital data management. Learn HMIS software, reporting, and IT infrastructure in healthcare settings.",
    duration: "12-16 weeks",
    price: 4499,
    originalPrice: 7499,
    modules: [
      "HMIS fundamentals",
      "Hospital information systems",
      "Data collection and entry",
      "Reporting and dashboards",
      "Healthcare IT basics",
      "System implementation",
      "Data quality management",
      "Practical software training"
    ],
    whoShouldTake: [
      "Healthcare administrators",
      "IT professionals entering healthcare",
      "Hospital managers",
      "Public health workers",
      "Healthcare consultants"
    ],
    whatYouWillLearn: [
      "HMIS concepts and frameworks",
      "Hospital software systems",
      "Data management practices",
      "Report generation",
      "Quality assurance",
      "System troubleshooting",
      "Healthcare standards",
      "Real-world implementations"
    ],
    benefits: [
      "Practical software training",
      "Certificate of completion",
      "Growing field expertise",
      "Government sector opportunities",
      "Career advancement",
      "Lifetime access"
    ],
    faqs: [
      {
        question: "Is IT knowledge required?",
        answer: "Basic computer skills are sufficient. We teach healthcare IT from fundamentals."
      }
    ]
  },
  {
    id: "5",
    slug: "strategic-management",
    title: "Strategic Management",
    shortDescription: "Learn frameworks to plan, analyze, and execute strategies in any organization.",
    fullDescription: "Master strategic thinking and planning. Learn industry-standard frameworks like SWOT, PESTLE, and Porter's Five Forces to drive organizational success.",
    duration: "12-16 weeks",
    price: 4999,
    originalPrice: 7999,
    modules: [
      "Strategic thinking fundamentals",
      "SWOT analysis",
      "PESTLE framework",
      "Porter's Five Forces",
      "Competitive analysis",
      "Strategy formulation",
      "Implementation planning",
      "Case studies and projects"
    ],
    whoShouldTake: [
      "Aspiring managers",
      "Business owners",
      "Mid-level professionals",
      "MBA aspirants",
      "Consultants"
    ],
    whatYouWillLearn: [
      "Strategic frameworks",
      "Environmental scanning",
      "Competitive positioning",
      "Strategy development",
      "Implementation methods",
      "Performance metrics",
      "Change management",
      "Real business cases"
    ],
    benefits: [
      "MBA-level concepts",
      "Industry case studies",
      "Certificate of completion",
      "Career growth skills",
      "Consulting toolkit",
      "Lifetime access"
    ],
    faqs: [
      {
        question: "Is MBA required?",
        answer: "No. This course teaches MBA-level concepts in an accessible format."
      }
    ]
  },
  {
    id: "6",
    slug: "human-resource-management",
    title: "Human Resource Management",
    shortDescription: "Learn HR ops, recruitment, onboarding, payroll basics, training & development.",
    fullDescription: "Become an HR professional. Master recruitment, employee management, payroll basics, and organizational development practices.",
    duration: "12-16 weeks",
    price: 4499,
    originalPrice: 6999,
    modules: [
      "HR fundamentals",
      "Recruitment and selection",
      "Interview techniques",
      "Onboarding processes",
      "Payroll basics",
      "HR policies",
      "Performance management",
      "Training and development"
    ],
    whoShouldTake: [
      "HR aspirants",
      "Business administration students",
      "Small business owners",
      "Team leaders",
      "Career switchers"
    ],
    whatYouWillLearn: [
      "End-to-end recruitment",
      "Selection methodologies",
      "Structured interviews",
      "Employee onboarding",
      "Compensation basics",
      "Policy creation",
      "Performance reviews",
      "Employee development"
    ],
    benefits: [
      "Industry-ready skills",
      "Certificate of completion",
      "Real HR scenarios",
      "Template toolkit",
      "High-demand field",
      "Career support"
    ],
    faqs: [
      {
        question: "Can I work in HR after this?",
        answer: "Yes, this course provides foundational HR skills needed for entry-level positions."
      }
    ]
  },
  {
    id: "7",
    slug: "quality-management",
    title: "Quality Management",
    shortDescription: "Master quality frameworks, audits, Six Sigma basics, and continuous improvement methodologies.",
    fullDescription: "Learn quality management systems and improvement methodologies. Master audits, quality frameworks, and continuous improvement techniques.",
    duration: "12-16 weeks",
    price: 4999,
    originalPrice: 7999,
    modules: [
      "Quality fundamentals",
      "ISO standards",
      "Quality audits",
      "Six Sigma basics",
      "Process improvement",
      "Root cause analysis",
      "Quality tools and techniques",
      "Implementation projects"
    ],
    whoShouldTake: [
      "Quality professionals",
      "Operations managers",
      "Healthcare administrators",
      "Manufacturing professionals",
      "Process improvement specialists"
    ],
    whatYouWillLearn: [
      "Quality management principles",
      "Audit methodologies",
      "ISO standards",
      "Six Sigma concepts",
      "Process mapping",
      "Problem-solving tools",
      "Continuous improvement",
      "Quality documentation"
    ],
    benefits: [
      "Industry certification prep",
      "Practical audit experience",
      "Quality toolkit",
      "Career advancement",
      "Cross-industry skills",
      "Lifetime access"
    ],
    faqs: [
      {
        question: "Is this suitable for healthcare?",
        answer: "Yes, quality management applies across industries including healthcare."
      }
    ]
  },
  {
    id: "8",
    slug: "hr-analytics",
    title: "HR Analytics",
    shortDescription: "Learn workforce analytics, HR metrics, data-driven decision making, and predictive analytics.",
    fullDescription: "Combine HR expertise with data analytics. Learn to measure, analyze, and optimize workforce performance using data-driven insights.",
    duration: "12-16 weeks",
    price: 5499,
    originalPrice: 8999,
    modules: [
      "HR metrics and KPIs",
      "Workforce analytics",
      "Data collection methods",
      "Excel for HR analytics",
      "Dashboard creation",
      "Predictive analytics basics",
      "Retention analysis",
      "ROI measurement"
    ],
    whoShouldTake: [
      "HR professionals",
      "Data analysts",
      "Business analysts",
      "HR managers",
      "Organizational development specialists"
    ],
    whatYouWillLearn: [
      "Key HR metrics",
      "Data analysis techniques",
      "Turnover analytics",
      "Hiring effectiveness",
      "Performance analytics",
      "Compensation analysis",
      "Workforce planning",
      "HR dashboards"
    ],
    benefits: [
      "High-demand skillset",
      "Data-driven HR expertise",
      "Certificate of completion",
      "Real HR datasets",
      "Career growth",
      "Lifetime access"
    ],
    faqs: [
      {
        question: "Do I need HR experience?",
        answer: "Basic HR knowledge is helpful but not required. We cover HR fundamentals."
      }
    ]
  }
];

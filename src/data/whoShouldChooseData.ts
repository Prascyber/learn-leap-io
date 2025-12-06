export interface WhoShouldChooseItem {
  courseSlug: string;
  targetAudience: string[];
}

export const whoShouldChooseData: WhoShouldChooseItem[] = [
  {
    courseSlug: "medical-coding",
    targetAudience: [
      "Life science graduates (BSc, B.Pharm, MLT, Biotechnology, Microbiology)",
      "Nursing and paramedical students seeking alternative careers",
      "Professionals aiming for CPC/CCA certification pathways",
      "Anyone looking for a high-demand, US healthcare job"
    ]
  },
  {
    courseSlug: "healthcare-insurance",
    targetAudience: [
      "Graduates (any stream) wanting to enter health insurance or RCM",
      "Hospital front-office billing executives",
      "Insurance TPA professionals (pre-auth/claims) wanting formal training",
      "MBA (Hospital & Health Management) students"
    ]
  },
  {
    courseSlug: "healthcare-analytics",
    targetAudience: [
      "Healthcare professionals wanting to transition into analytics",
      "Students with basic Excel or data analysis interest",
      "MBAs, statisticians, IT/CS graduates entering healthcare domain roles",
      "Clinicians wanting to upskill in data-driven decision-making"
    ]
  },
  {
    courseSlug: "hmis",
    targetAudience: [
      "Hospital administration students",
      "Freshers wanting IT + healthcare hybrid roles",
      "Hospital staff moving into digital operations",
      "Non-clinical healthcare workers aiming for system admin roles"
    ]
  },
  {
    courseSlug: "strategic-management",
    targetAudience: [
      "MHA/MBA-Healthcare students",
      "Hospital leaders, supervisors, and department heads",
      "Healthcare startup founders",
      "Analysts aspiring for healthcare consulting roles"
    ]
  },
  {
    courseSlug: "human-resource-management",
    targetAudience: [
      "MBA/BBA HR students",
      "Freshers entering HR roles",
      "Hospital HR executives wanting healthcare-specific HR skills",
      "Employees shifting from admin roles to HR"
    ]
  },
  {
    courseSlug: "quality-management",
    targetAudience: [
      "Nursing staff & paramedics preparing for quality roles",
      "Hospital administrators & operations executives",
      "Individuals seeking roles in quality departments",
      "NABH coordinators and aspiring QMS professionals"
    ]
  },
  {
    courseSlug: "hr-analytics",
    targetAudience: [
      "HR executives aspiring to transition into data-driven HR roles",
      "MBA HR students wanting analytics specialization",
      "Recruiters wanting to improve hiring metrics",
      "Professionals working with HR dashboards, Excel, or HRMS"
    ]
  }
];

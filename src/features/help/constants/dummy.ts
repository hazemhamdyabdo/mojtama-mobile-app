import type {
  EmergencyContact,
  HelpFaqCategory,
  HelpSupportContact,
  HelpTab,
} from "@/features/help/types";

export const HELP_TABS: { id: HelpTab }[] = [
  { id: "emergency" },
  { id: "faqs" },
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: "police",
    phoneNumber: "122",
    icon: "shield-star-outline",
  },
  {
    id: "ambulance",
    phoneNumber: "123",
    icon: "ambulance",
  },
  {
    id: "fire",
    phoneNumber: "180",
    icon: "fire",
  },
];

export const EMERGENCY_TIPS = [
  "Stay Calm And Provide Clear Information",
  "Give Your Exact Location And Unit Number",
  "Describe The Emergency Situation Clearly",
  "Follow Emergency Personal Instructions",
];

export const HELP_FAQ_CATEGORIES: HelpFaqCategory[] = [
  {
    id: "maintenance-repairs",
    icon: "shield-outline",
    questions: [
      {
        id: "report-maintenance",
        question: "How Do I Report A Maintenance Issue?",
        answer:
          "Use The Emergency Tab To Report Urgent Issues, Or Submit A Regular Request Through The Help Desk. Include Photos And Detailed Descriptions For Faster Resolution.",
      },
      {
        id: "maintenance-response-time",
        question: "What's The Response Time For Maintenance Requests?",
        answer:
          "Emergency Issues: 2-4 Hours. Urgent Requests: 24 Hours. Regular Maintenance: 3-5 Business Days. Response Times May Vary Based On Issue Complexity.",
      },
      {
        id: "repair-responsibility",
        question: "Who Is Responsible For Repairs In My Unit?",
        answer:
          "Structural Issues, Plumbing, Electrical Systems, And HVAC Are Typically Covered By The Community. Interior Fixtures, Appliances, And Cosmetic Repairs Are Usually The Resident's Responsibility.",
      },
    ],
  },
  {
    id: "payments-billing",
    icon: "credit-card-outline",
    questions: [
      {
        id: "payment-methods",
        question: "What Payment Methods Are Accepted?",
        answer:
          "We Accept Bank Transfers, Credit Cards, And Mobile Payment Options. All Payments Should Be Made Through The App Or Your Community Portal For Proper Tracking.",
      },
      {
        id: "payment-due-date",
        question: "When Are Monthly Fees Due?",
        answer:
          "Community Fees Are Due On The 1st Of Each Month. A Grace Period Of 5 Days Applies Before Late Fees Are Assessed.",
      },
      {
        id: "payment-receipt",
        question: "How Can I Get A Payment Receipt?",
        answer:
          "Receipts Are Automatically Generated After Each Payment And Can Be Downloaded From The Payments Section In Your Profile.",
      },
    ],
  },
  {
    id: "emergencies",
    icon: "shield-alert-outline",
    questions: [
      {
        id: "define-emergency",
        question: "What Qualifies As An Emergency?",
        answer:
          "Emergencies Include Fire, Flooding, Gas Leaks, Power Outages Affecting Multiple Units, Security Threats, And Medical Situations Requiring Immediate Assistance.",
      },
      {
        id: "report-emergency",
        question: "How Do I Report An Emergency?",
        answer:
          "Use The Emergency Tab To Access Quick Call Buttons For Police, Ambulance, And Fire Services. For Building-Related Emergencies, Contact The 24/7 Support Line.",
      },
      {
        id: "non-emergency",
        question: "What Should I Do For Non-Urgent Issues?",
        answer:
          "For Non-Urgent Building Issues, Submit A Support Request Through The Help Desk. Do Not Use Emergency Contacts For Routine Maintenance Or General Inquiries.",
      },
    ],
  },
  {
    id: "community-rules",
    icon: "badge-account-outline",
    questions: [
      {
        id: "quiet-hours",
        question: "What Are The Quiet Hours?",
        answer:
          "Quiet Hours Are Enforced From 10:00 PM To 7:00 AM Daily. Excessive Noise During These Hours May Result In Warnings Or Fines.",
      },
      {
        id: "visitor-policy",
        question: "What Is The Visitor Policy?",
        answer:
          "All Visitors Must Check In At The Front Desk. Overnight Guests Require Prior Approval From Building Management. Residents Are Responsible For Their Visitors' Conduct.",
      },
      {
        id: "common-areas",
        question: "Can I Reserve Common Areas?",
        answer:
          "Yes, Common Areas Such As The Clubhouse And BBQ Area Can Be Reserved Through The App. Submit Your Request At Least 48 Hours In Advance.",
      },
    ],
  },
  {
    id: "app-communication",
    icon: "view-grid-outline",
    questions: [
      {
        id: "notifications",
        question: "How Do I Manage Notifications?",
        answer:
          "Go To Settings → Notifications To Customize Which Alerts You Receive, Including Announcements, Maintenance Updates, And Community Events.",
      },
      {
        id: "language",
        question: "Can I Change The App Language?",
        answer:
          "Yes, Navigate To Settings → Language To Switch Between English And Arabic. The App Will Update Immediately After Your Selection.",
      },
      {
        id: "contact-management",
        question: "How Do I Contact Building Management?",
        answer:
          "Use The AI Chat Feature For Quick Answers, Submit A Support Request From Your Profile, Or Contact Support Directly Using The Details At The Bottom Of This Page.",
      },
    ],
  },
];

export const HELP_SUPPORT_CONTACTS: HelpSupportContact[] = [
  {
    id: "phone",
    value: "+966 50 123 4567",
    icon: "phone-outline",
    action: "phone",
  },
  {
    id: "email",
    value: "Support@Mojtama.Com",
    icon: "email-outline",
    action: "email",
  },
  {
    id: "support",
    value: "24/7 Emergency Support",
    icon: "shield-outline",
    action: "support",
  },
];

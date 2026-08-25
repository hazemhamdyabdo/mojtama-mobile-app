import type { PrivacyPolicy } from "@/features/privacy/types";

export const PRIVACY_POLICIES: PrivacyPolicy[] = [
  {
    id: "community-privacy",
    title: "Community Privacy",
    intro: "Pet Ownership And Management Policies ...",
    bullets: [
      "All Pets Must Be Leashed In Common Areas.",
      "Aggressive Breeds Are Not Allowed.",
      "Pet Waste Must Be Disposed Of Properly",
    ],
  },
  {
    id: "visitor-policy",
    title: "Visitor Policy",
    intro: "Guidelines for guest access and visitor registration ...",
    bullets: [
      "All visitors must check in at the front desk.",
      "Overnight guests require prior approval.",
      "Residents are responsible for their visitors' conduct.",
    ],
  },
  {
    id: "smoking-policy",
    title: "Smoking Policy",
    intro: "Community rules regarding smoking in shared spaces ...",
    bullets: [
      "Smoking is prohibited in all indoor common areas.",
      "Designated outdoor smoking zones must be used.",
      "Dispose of cigarette waste in marked receptacles only.",
    ],
  },
  {
    id: "noise-policy",
    title: "Noise Policy",
    intro: "Standards for maintaining a peaceful community environment ...",
    bullets: [
      "Quiet hours are enforced from 10:00 PM to 7:00 AM.",
      "Excessive noise from units or common areas is not permitted.",
      "Construction and renovation work must follow approved schedules.",
    ],
  },
];

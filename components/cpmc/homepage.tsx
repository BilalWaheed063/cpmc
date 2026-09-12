"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bone,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Camera,
  GraduationCap,
  HeartPulse,
  Hospital,
  Loader2,
  Mail,
  MapPin,
  Microscope,
  Phone,
  Search,
  ShieldCheck,
  Stethoscope,
  Trophy,
  UsersRound,
  SquarePlay,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  admissionSteps,
  categories,
  COLLEGE,
  CONTACT,
  features,
  filterPrograms,
  HOSPITAL,
  MAP,
  metrics,
  stories,
  testimonials,
  type Category,
  type Program,
  type StoryCategory,
} from "@/lib/cpmc/content";

const icons = {
  medicine: Stethoscope,
  nursing: HeartPulse,
  movement: Activity,
  lab: Microscope,
  graduate: GraduationCap,
  dentistry: CircleHelp,
};
const featureIcons = {
  research: Microscope,
  anatomy: Bone,
  library: BookOpen,
  hostel: Building2,
  sport: Trophy,
  support: UsersRound,
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function LinkArrow({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={cx("text-link", className)} href={href}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "outline" | "navy";
  className?: string;
}) {
  return (
    <a href={href} className={cx("btn", `btn-${variant}`, className)}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#top"
      className={cx("brand", footer && "brand-footer")}
      aria-label="Central Park Medical College home"
    >
      <span className="brand-crest">
        <img src="/assets/logo.png" width={64} height={64} alt="CPMC crest" />
      </span>
      <span className="brand-name">
        Central Park<span>Medical College</span>
        <small>LAHORE · PAKISTAN</small>
      </span>
    </a>
  );
}
function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://www.facebook.com/CentralParkMedicalCollege/"
        aria-label="CPMC on Facebook"
      >
        <span className="social-facebook" aria-hidden="true">
          f
        </span>
      </a>
      <a
        href="https://instagram.com/centralparkmedicalcollege1"
        aria-label="CPMC on Instagram"
      >
        <Camera size={16} />
      </a>
      <a href="https://twitter.com/CPMCandCPTH" aria-label="CPMC on X">
        <span aria-hidden="true">𝕏</span>
      </a>
      <a
        href="https://www.youtube.com/channel/UCZh9K07A2CJJeUDxPwvRiTQ/featured"
        aria-label="CPMC on YouTube"
      >
        <SquarePlay size={17} />
      </a>
    </div>
  );
}
type HeaderMenuItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  groups: readonly {
    title: string;
    links: readonly (readonly [string, string])[];
  }[];
};

const CPMC_HEADER_MENU = [
  {
    id: "about",
    label: "About Us",
    title: "About CPMC",
    description: "Explore the college, its leadership, values and history.",
    href: "/introduction/",
    groups: [
      {
        title: "The College",
        links: [
          ["Introduction", "/introduction/"],
          ["Vision, Mission & Core Values", "/vision-mission-and-values/"],
          ["Historical Background", "/historical-background/"],
        ],
      },
      {
        title: "Leadership",
        links: [
          ["Chairman’s Message", "/chairmans-message/"],
          ["Principal’s Message", "/principals-message/"],
          ["Vice Principal’s Message", "/vice-principals-message/"],
        ],
      },
    ],
  },
  {
    id: "learning",
    label: "Learning at CPMC",
    title: "Learning at CPMC",
    description:
      "Academic departments, clinical sciences and teaching resources.",
    href: "/departments-2/",
    groups: [
      {
        title: "Basic Sciences",
        links: [
          ["Department of Anatomy", "/department-of-anatomy/"],
          ["Department of Biochemistry", "/department-of-biochemistry/"],
          ["Department of Physiology", "/department-of-physiology/"],
          ["Department of Pharmacology", "/department-of-pharmacology/"],
          [
            "Department of Forensic Medicine",
            "/department-of-forensic-medicine/",
          ],
          [
            "Department of Psychiatry & Behavioural Sciences",
            "/department-of-psychiatry-behavioural-sciences/",
          ],
          [
            "Department of Community Medicine",
            "/department-of-community-medicine/",
          ],
          ["Department of Pathology", "/department-of-pathology/"],
          [
            "Department of Medical Education",
            "/department-of-medical-education/",
          ],
        ],
      },
      {
        title: "Medicine & Allied",
        links: [
          ["Clinical Sciences", "/clinical-scinces-1/"],
          ["Medicine & Allied", "/medicine-allied/"],
          [
            "Department of Medicine & Allied",
            "/department-of-medicine-allied/",
          ],
          ["Department of Paediatrics", "/department-of-paediatrics/"],
          ["Department of Rheumatology", "/department-of-rheumatology/"],
        ],
      },
      {
        title: "Surgery & Allied",
        links: [
          ["Surgery & Allied", "/surgeryallied/"],
          ["Department of Surgery & Allied", "/department-of-surgery-allied/"],
          ["Department of Anesthesia", "/department-of-anesthesia/"],
          [
            "Department of Obstetrics & Gynaecology",
            "/department-of-obstetrics-gynaecology/",
          ],
          [
            "Department of Ophthalmology (EYE)",
            "/department-of-ophthalmology-eye/",
          ],
          [
            "Department of Otorhinolaryngology (ENT)",
            "/department-of-otorhinolaryngology-ent/",
          ],
          ["Department of Physiotherapy", "/department-of-physiotherapy/"],
        ],
      },
      {
        title: "Teaching & Learning",
        links: [
          [
            "Innovations in Teaching & Learning",
            "/innovations-in-teaching-and-learning/",
          ],
          ["E-Learning", "/e-learning/"],
          ["Faculty Development Program", "/faculty-development-program/"],
          ["All Departments", "/departments-2/"],
        ],
      },
    ],
  },
  {
    id: "students",
    label: "Student Services",
    title: "Student Services",
    description: "Support, academic access and resources for CPMC students.",
    href: "/student-affairs-section/",
    groups: [
      {
        title: "Student Support",
        links: [
          ["Student Affairs Section", "/student-affairs-section/"],
          ["Counselling Services", "/career-counselling/"],
          ["Student Societies", "/student-committees-and-societies/"],
          ["Electives", "/electives/"],
          ["Alumni", "/alumni/"],
        ],
      },
      {
        title: "Academic Access",
        links: [
          ["CPMC Portal", "https://portal.cpmc.edu.pk/"],
          ["LMS / E-Learning", "/e-learning/"],
          ["Policies for Students", "/policies-for-students/"],
        ],
      },
      {
        title: "Useful Links",
        links: [
          ["Library", "/library/"],
          ["Health Coverage for Students", "/health-coverage-for-students/"],
          ["Hostels", "/hostels/"],
        ],
      },
    ],
  },
  {
    id: "life",
    label: "Life at CPMC",
    title: "Life at CPMC",
    description: "Discover the campus, facilities and student life.",
    href: "/facilities/",
    groups: [
      {
        title: "Campus Facilities",
        links: [
          ["Campus Facilities", "/facilities/"],
          ["Library", "/library/"],
          ["Hostels", "/hostels/"],
          ["Virtual Tour", "/virtual-tour/"],
        ],
      },
      {
        title: "Student Wellbeing",
        links: [
          ["Health Coverage for Students", "/health-coverage-for-students/"],
          ["Policies for Students", "/policies-for-students/"],
          ["Counselling Services", "/career-counselling/"],
        ],
      },
      {
        title: "Campus Community",
        links: [
          ["Student Societies", "/student-committees-and-societies/"],
          ["Electives", "/electives/"],
          ["Alumni", "/alumni/"],
        ],
      },
    ],
  },
  {
    id: "more",
    label: "Colleges & More",
    title: "Colleges & More",
    description:
      "Allied health, nursing, pharmacy and other important CPMC links.",
    href: "/a-project-of-health-education-foundation/",
    groups: [
      {
        title: "Allied Health Sciences",
        links: [
          [
            "Allied Health Sciences",
            "/a-project-of-health-education-foundation/",
          ],
          ["Programs", "/central-park-college-of-allied-health-sciences-2/"],
          [
            "Doctor of Physical Therapy",
            "/central-park-college-of-allied-health-sciences-3/",
          ],
          [
            "DPT Fee Structure 2025-30",
            "https://www.cpmc.edu.pk/wp-content/uploads/2025/07/Admission-Add-copy_page-0001.jpg",
          ],
          [
            "Paramedical Courses",
            "/central-park-college-of-allied-health-sciences/",
          ],
          ["Faculty of Allied Health Sciences", "/faculty/"],
        ],
      },
      {
        title: "Nursing College",
        links: [
          ["Introduction", "/school-of-nursing/"],
          ["Nursing Principal’s Message", "/nursing/"],
          ["CPNC Programs", "/programs/"],
          ["Faculty of Nursing", "/faculty-of-nursing/"],
        ],
      },
      {
        title: "More at CPMC",
        links: [
          ["College of Pharmacy", "/college-of-pharmacy/"],
          ["Careers", "/careers/"],
          ["Contact Us", "/contact-us/"],
        ],
      },
    ],
  },
  {
    id: "admissions",
    label: "Admissions",
    title: "Admissions",
    description:
      "Admission information, eligibility, fees and application resources.",
    href: "/mbbs-admissions-2024-29/",
    groups: [
      {
        title: "MBBS Admissions 2025-30",
        links: [
          ["MBBS Admissions 2025-30", "/mbbs-admissions-2024-29/"],
          [
            "Admission Announcements by UHS / PMDC 2025-26",
            "/admission-announcements/",
          ],
          [
            "MBBS 2025-30 Fee Structure (Local)",
            "/mbbs-2024-29-fee-structure-local/",
          ],
          [
            "MBBS 2025-30 Fee Structure (Foreign)",
            "/mbbs-2024-29-fee-structure-foreign/",
          ],
          ["Eligibility Criteria", "/eligibility-criteria/"],
          ["Merit Calculation", "/merit-calculation/"],
          ["Scholarships", "/scholarships/"],
        ],
      },
      {
        title: "Admissions Information",
        links: [
          ["Admissions FAQs", "/admissions-faqs/"],
          ["Why CPMC", "/why-cpmc-2/"],
          ["Position & Distinction Holders", "/distinction-holders-2/"],
          [
            "Vacant Seats Notice (2024)",
            "https://www.cpmc.edu.pk/wp-content/uploads/2024/03/vacant-seats-as-on-11-03-2024_page-0001.jpg",
          ],
        ],
      },
      {
        title: "Applications & Archives",
        links: [
          ["Apply for MBBS", "https://admissions.cpmc.edu.pk/"],
          ["Admission Archives", "https://admissions.cpmc.edu.pk/"],
          ["MBBS Admissions 2023-28", "/mbbs-admissions-2023-28/"],
          [
            "Prospectus 2022-23",
            "https://www.cpmc.edu.pk/wp-content/uploads/2022/11/Complete-Prospectus-2022.pdf",
          ],
        ],
      },
    ],
  },
] as const satisfies readonly HeaderMenuItem[];

const CPMC_HEADER_CSS = String.raw`
/* =========================================================
   GLOBAL BRAND MAPPING
   Exact palette supplied by CPMC.

   If your theme plugin exposes these named variables,
   their values are used automatically. Otherwise the
   exact approved HEX values below are used.
========================================================= */

#cpmc-th {
  --th-red: var(--cpmc-global-red, #BA1F27);
  --th-blue: var(--cpmc-global-blue, #2554A4);
  --th-light-blue: var(--cpmc-global-light-blue, #4169B1);
  --th-light-red: var(--cpmc-global-light-red, #EF1D26);
  --th-dark: var(--cpmc-global-dark, #0F224A);

  --th-white: #FFFFFF;
  --th-surface: var(--cpmc-surface, var(--th-white));

  /* Existing global typography — no new font */
  --th-font: var(
    --cpmc-font-body,
    var(--e-global-typography-text-font-family, inherit)
  );

  --th-heading-font: var(
    --cpmc-font-heading,
    var(--e-global-typography-primary-font-family, inherit)
  );

  /* Existing global layout / radius */
  --th-radius: var(
    --cpmc-radius-md,
    var(--cpmc-radius, 0px)
  );

  --th-cta-radius: var(
    --cpmc-cta-radius,
    var(--th-radius)
  );

  --th-container: var(
    --cpmc-container-width,
    var(--cpmc-container, 1500px)
  );

  --th-border: color-mix(in srgb, var(--th-dark) 12%, transparent);
  --th-muted: color-mix(in srgb, var(--th-dark) 62%, var(--th-white));
  --th-ease: cubic-bezier(.22, 1, .36, 1);

  position: relative;
  z-index: 9999;
  width: 100%;

  /* Reserve the real header space so the hero starts BELOW the fixed header.
     Desktop = 42px utility bar + 110px main header. */
  height: 152px;
  flex: 0 0 152px;

  font-family: var(--th-font);
  -webkit-font-smoothing: antialiased;
}

/* =========================================================
   RESET — REMOVE ALL REGULAR TEXT UNDERLINES
========================================================= */

#cpmc-th *,
#cpmc-th *::before,
#cpmc-th *::after {
  box-sizing: border-box;
}

#cpmc-th a,
#cpmc-th a:hover,
#cpmc-th a:focus,
#cpmc-th a:active,
#cpmc-th a:visited,
#cpmc-th button,
#cpmc-th button:hover,
#cpmc-th button:focus,
#cpmc-th button:active {
  text-decoration: none !important;
  text-decoration-line: none !important;
  text-underline-offset: 0 !important;
}

#cpmc-th a::before,
#cpmc-th a::after {
  text-decoration: none !important;
}

#cpmc-th button {
  font-family: inherit;
  -webkit-appearance: none;
  appearance: none;
}

#cpmc-th [hidden],
#cpmc-th-backdrop[hidden] {
  display: none !important;
}

#cpmc-th .cpmc-th__container {
  width: min(var(--th-container), calc(100% - 48px));
  margin-inline: auto;
}

/* =========================================================
   TRANSPARENT HEADER
========================================================= */

#cpmc-th .cpmc-th__bar {
  position: fixed;
  inset: 0 0 auto;
  z-index: 9999;
  width: 100%;
  color: var(--th-white);

  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--th-dark) 62%, transparent) 0%,
    color-mix(in srgb, var(--th-dark) 24%, transparent) 100%
  );

  transition:
    background .35s ease,
    box-shadow .35s ease;
}

/* =========================================================
   TOP BAR
========================================================= */

#cpmc-th .cpmc-th__top {
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid color-mix(in srgb, var(--th-white) 22%, transparent);

  transition:
    height .3s var(--th-ease),
    opacity .3s ease;
}

#cpmc-th .cpmc-th__top-inner {
  height: 42px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
}

#cpmc-th .cpmc-th__top a,
#cpmc-th .cpmc-th__top span {
  color: var(--th-white);
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
}

#cpmc-th .cpmc-th__top a {
  transition: opacity .2s ease;
}

#cpmc-th .cpmc-th__top a:hover {
  color: var(--th-white);
  opacity: .75;
}

#cpmc-th .cpmc-th__foundation {
  text-align: center;
}

#cpmc-th .cpmc-th__portal {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

#cpmc-th .cpmc-th__portal svg,
#cpmc-th .cpmc-th__cta svg,
#cpmc-th .cpmc-th__mobile-apply svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================================================
   MAIN HEADER — CENTERED LOGO
========================================================= */

#cpmc-th .cpmc-th__main-inner {
  min-height: 110px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 24px;

  transition: min-height .3s var(--th-ease);
}

#cpmc-th .cpmc-th__brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

#cpmc-th .cpmc-th__brand img {
  display: block;
  width: 78px;
  height: 78px;
  object-fit: contain;

  transition:
    width .3s var(--th-ease),
    height .3s var(--th-ease);
}

#cpmc-th .cpmc-th__nav-items {
  display: flex;
  align-items: center;
  gap: clamp(16px, 1.7vw, 30px);
}

#cpmc-th .cpmc-th__nav--left .cpmc-th__nav-items {
  justify-content: flex-start;
}

#cpmc-th .cpmc-th__nav--right .cpmc-th__nav-items {
  justify-content: flex-end;
}

#cpmc-th .cpmc-th__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(18px, 2vw, 32px);
}

/* =========================================================
   NAVIGATION — NO UNDERLINE / NO BOTTOM LINE
========================================================= */

#cpmc-th .cpmc-th__nav-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 10px 0;

  border: 0;
  background: transparent;
  color: var(--th-white);

  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  white-space: nowrap;
  cursor: pointer;

  transition:
    color .2s ease,
    opacity .2s ease;
}

/* Explicitly remove previous animated underline */
#cpmc-th .cpmc-th__nav-button::before,
#cpmc-th .cpmc-th__nav-button::after {
  content: none !important;
  display: none !important;
}

#cpmc-th .cpmc-th__nav-button:hover,
#cpmc-th .cpmc-th__nav-button.is-active {
  color: var(--th-white);
  opacity: .72;
}

/* Small dropdown chevron */
#cpmc-th .cpmc-th__chevron {
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg) translateY(-2px);

  transition: transform .2s ease;
}

#cpmc-th .cpmc-th__nav-button.is-active .cpmc-th__chevron {
  transform: rotate(225deg);
}

/* =========================================================
   ADMISSIONS BUTTON
========================================================= */

#cpmc-th .cpmc-th__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  min-height: 46px;
  padding: 12px 20px;

  border: 1px solid var(--th-red);
  border-radius: var(--th-cta-radius);
  background: var(--th-red);
  color: var(--th-white);

  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  white-space: nowrap;
  cursor: pointer;

  transition:
    background .25s ease,
    border-color .25s ease,
    color .25s ease,
    transform .25s var(--th-ease);
}

#cpmc-th .cpmc-th__cta:hover {
  background: transparent;
  color: var(--th-white);
  transform: translateY(-2px);
}

/* =========================================================
   DESKTOP MEGA MENU
========================================================= */

#cpmc-th .cpmc-th__panels {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  pointer-events: none;
}

#cpmc-th .cpmc-th__panel {
  width: min(var(--th-container), calc(100% - 48px));
  margin-inline: auto;
  padding-top: 10px;
  pointer-events: auto;
}

#cpmc-th .cpmc-th__panel-inner {
  display: grid;
  grid-template-columns: 235px minmax(0, 1fr);
  overflow: hidden;

  max-height: min(680px, calc(100dvh - var(--th-header-height, 160px) - 16px));

  /*border: 1px solid var(--th-border);*/
  /*border-radius: var(--th-radius);*/
  background: var(--th-surface);
  color: var(--th-dark);

  box-shadow: 0 22px 55px color-mix(in srgb, var(--th-dark) 16%, transparent);
  animation: cpmcThPanelIn .25s var(--th-ease) both;
}

@keyframes cpmcThPanelIn {
  from {
    opacity: 0;
    transform: translateY(-7px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* LEFT INTRO PANEL */
#cpmc-th .cpmc-th__panel-intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 30px;

  background: var(--th-dark);
  color: var(--th-white);
}

#cpmc-th .cpmc-th__panel-intro small {
  color: var(--th-white);
  opacity: .7;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .09em;
  text-transform: uppercase;
}

#cpmc-th .cpmc-th__panel-intro h2 {
  margin: 0;
  color: var(--th-white);
  font-family: var(--th-heading-font);
  font-size: 23px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -.025em;
}

#cpmc-th .cpmc-th__panel-intro p {
  margin: 0;
  color: var(--th-white);
  opacity: .78;
  font-size: 13px;
  font-weight: 400;
  line-height: 21px;
}

#cpmc-th .cpmc-th__view-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 14px;

  color: var(--th-white);
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;

  transition: opacity .2s ease;
}

#cpmc-th .cpmc-th__view-all:hover {
  color: var(--th-white);
  opacity: .7;
}

#cpmc-th .cpmc-th__view-all svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* MENU CONTENT */
#cpmc-th .cpmc-th__panel-content {
  min-width: 0;
  overflow-y: auto;
  padding: 28px 32px;
  scrollbar-width: thin;
  scrollbar-color: var(--th-light-blue) transparent;
}

#cpmc-th .cpmc-th__groups {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px;
}

#cpmc-th .cpmc-th__panel--learning .cpmc-th__groups {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

#cpmc-th .cpmc-th__group {
  min-width: 0;
}

#cpmc-th .cpmc-th__group-title {
  margin: 0 0 12px;
  color: var(--th-blue);
  font-size: 11px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: .07em;
  text-transform: uppercase;
}

#cpmc-th .cpmc-th__group-links {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

#cpmc-th .cpmc-th__group-links a {
  display: block;
  padding: 9px 10px;
  margin-inline: -10px;

  border-radius: var(--th-radius);
  color: var(--th-dark);

  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  transition:
    color .2s ease,
    background .2s ease;
}

#cpmc-th .cpmc-th__group-links a:hover,
#cpmc-th .cpmc-th__group-links a:focus-visible {
  color: var(--th-blue);
  background: color-mix(in srgb, var(--th-light-blue) 9%, var(--th-white));
}

/* =========================================================
   STICKY WHITE HEADER
========================================================= */

#cpmc-th .cpmc-th__bar.is-sticky {
  background: var(--th-white);
  color: var(--th-dark);

  box-shadow: 0 8px 30px color-mix(in srgb, var(--th-dark) 8%, transparent);
}

#cpmc-th .cpmc-th__bar.is-sticky .cpmc-th__top {
  height: 0;
  opacity: 0;
  border: 0;
}

#cpmc-th .cpmc-th__bar.is-sticky .cpmc-th__main {
  border-bottom: 1px solid var(--th-border);
}

#cpmc-th .cpmc-th__bar.is-sticky .cpmc-th__main-inner {
  min-height: 78px;
}

#cpmc-th .cpmc-th__bar.is-sticky .cpmc-th__brand img {
  width: 60px;
  height: 60px;
}

#cpmc-th .cpmc-th__bar.is-sticky .cpmc-th__nav-button {
  color: var(--th-dark);
}

#cpmc-th .cpmc-th__bar.is-sticky .cpmc-th__nav-button:hover,
#cpmc-th .cpmc-th__bar.is-sticky .cpmc-th__nav-button.is-active {
  color: var(--th-blue);
  opacity: 1;
}

#cpmc-th .cpmc-th__bar.is-sticky .cpmc-th__cta:hover {
  color: var(--th-red);
}

/* =========================================================
   MOBILE TOGGLE
========================================================= */

#cpmc-th .cpmc-th__toggle {
  display: none;
  width: 46px;
  height: 46px;
  padding: 12px;

  border: 1px solid color-mix(in srgb, var(--th-white) 28%, transparent);
  border-radius: var(--th-radius);
  background: transparent;
  color: var(--th-white);
  cursor: pointer;
}

#cpmc-th .cpmc-th__toggle span {
  display: block;
  width: 20px;
  height: 2px;
  margin: 4px auto;
  background: currentColor;

  transition:
    transform .25s ease,
    opacity .2s ease;
}

#cpmc-th .cpmc-th__mobile {
  display: none;
}

#cpmc-th-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: color-mix(in srgb, #0F224A 45%, transparent);
}

/* =========================================================
   TABLET / MOBILE NAVIGATION
========================================================= */

@media (max-width: 1279px) {

  /* Tablet = 42px utility bar + 88px main header */
  #cpmc-th {
    height: 130px;
    flex-basis: 130px;
  }

  #cpmc-th .cpmc-th__nav,
  #cpmc-th .cpmc-th__right,
  #cpmc-th .cpmc-th__panels {
    display: none;
  }

  #cpmc-th .cpmc-th__main-inner {
    min-height: 88px;
    grid-template-columns: 1fr auto 1fr;
  }

  #cpmc-th .cpmc-th__brand {
    grid-column: 2;
  }

  #cpmc-th .cpmc-th__toggle {
    display: block;
    grid-column: 3;
    justify-self: end;
  }

  #cpmc-th .cpmc-th__bar.is-sticky .cpmc-th__toggle {
    color: var(--th-dark);
    border-color: var(--th-border);
  }

  /* MOBILE MENU PANEL */
  #cpmc-th .cpmc-th__mobile:not([hidden]) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;

    max-height: var(--th-mobile-height, calc(100dvh - 88px));
    overflow-y: auto;
    overscroll-behavior: contain;

    background: var(--th-surface);
    color: var(--th-dark);

    box-shadow: 0 20px 40px color-mix(in srgb, var(--th-dark) 12%, transparent);
  }

  #cpmc-th .cpmc-th__mobile-head,
  #cpmc-th .cpmc-th__mobile-content,
  #cpmc-th .cpmc-th__mobile-footer {
    width: min(var(--th-container), calc(100% - 40px));
    margin-inline: auto;
  }

  #cpmc-th .cpmc-th__mobile-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 64px;

    border-bottom: 1px solid var(--th-border);

    font-size: 14px;
    font-weight: 600;
  }

  #cpmc-th .cpmc-th__mobile-close {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    border: 1px solid var(--th-border);
    border-radius: var(--th-radius);
    background: transparent;
    color: var(--th-dark);
    cursor: pointer;
  }

  #cpmc-th .cpmc-th__mobile-close svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
  }

  /* MOBILE ACCORDION */
  #cpmc-th .cpmc-th__mobile-section {
    border-bottom: 1px solid var(--th-border);
  }

  #cpmc-th .cpmc-th__mobile-section > summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 56px;
    padding: 15px 0;

    list-style: none;
    color: var(--th-dark);
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    cursor: pointer;
  }

  #cpmc-th .cpmc-th__mobile-section > summary::-webkit-details-marker {
    display: none;
  }

  #cpmc-th .cpmc-th__mobile-section > summary::after {
    content: "";
    width: 7px;
    height: 7px;
    border-right: 1.6px solid currentColor;
    border-bottom: 1.6px solid currentColor;
    transform: rotate(45deg);
    transition: transform .2s ease;
  }

  #cpmc-th .cpmc-th__mobile-section[open] > summary {
    color: var(--th-blue);
  }

  #cpmc-th .cpmc-th__mobile-section[open] > summary::after {
    transform: rotate(225deg);
  }

  #cpmc-th .cpmc-th__mobile-section-body {
    padding-bottom: 22px;
  }

  #cpmc-th .cpmc-th__mobile-group {
    margin-top: 15px;
  }

  #cpmc-th .cpmc-th__mobile-group-title {
    margin: 0 0 8px;
    color: var(--th-blue);
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: .06em;
  }

  #cpmc-th .cpmc-th__mobile-section-body a {
    display: block;
    padding: 10px 0;
    color: var(--th-dark);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  #cpmc-th .cpmc-th__mobile-section-body a:hover {
    color: var(--th-blue);
  }

  #cpmc-th .cpmc-th__mobile-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 22px 0 30px;
  }

  #cpmc-th .cpmc-th__mobile-apply {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    width: 100%;
    min-height: 48px;
    padding: 12px 18px;

    border: 1px solid var(--th-red);
    border-radius: var(--th-cta-radius);
    background: var(--th-red);
    color: var(--th-white);

    font-size: 15px;
    font-weight: 600;

    transition:
      background .2s ease,
      border-color .2s ease;
  }

  #cpmc-th .cpmc-th__mobile-apply:hover {
    background: var(--th-light-red);
    border-color: var(--th-light-red);
    color: var(--th-white);
  }

  #cpmc-th .cpmc-th__mobile-footer > a:last-child {
    color: var(--th-muted);
    font-size: 13px;
  }
}

@media (max-width: 767px) {

  /* Mobile utility bar is hidden, so reserve only the 76px main header */
  #cpmc-th {
    height: 76px;
    flex-basis: 76px;
  }

  #cpmc-th .cpmc-th__container {
    width: calc(100% - 30px);
  }

  #cpmc-th .cpmc-th__top {
    display: none;
  }

  #cpmc-th .cpmc-th__main-inner {
    min-height: 76px;
  }

  #cpmc-th .cpmc-th__brand img {
    width: 60px;
    height: 60px;
  }

  #cpmc-th .cpmc-th__bar.is-sticky .cpmc-th__main-inner {
    min-height: 68px;
  }

  #cpmc-th .cpmc-th__bar.is-sticky .cpmc-th__brand img {
    width: 52px;
    height: 52px;
  }
}

/* ACCESSIBILITY */
#cpmc-th a:focus-visible,
#cpmc-th button:focus-visible,
#cpmc-th summary:focus-visible {
  outline: 2px solid var(--th-blue);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  #cpmc-th *,
  #cpmc-th *::before,
  #cpmc-th *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
`;

function resolveHeaderHref(href: string) {
  if (
    /^https?:\/\//i.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  )
    return href;
  if (href.startsWith("/")) return `${COLLEGE.replace(/\/$/, "")}${href}`;
  return href;
}

function HeaderArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && rootRef.current && !rootRef.current.contains(target))
        setActiveMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        setMobileSection(null);
        requestAnimationFrame(() => toggleRef.current?.focus());
      } else {
        setActiveMenu(null);
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1279) {
        setMobileOpen(false);
        setMobileSection(null);
      }
      setActiveMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  const openDesktop = (id: string) => {
    if (typeof window !== "undefined" && window.innerWidth > 1279)
      setActiveMenu(id);
  };

  const toggleDesktop = (id: string) => {
    if (typeof window !== "undefined" && window.innerWidth <= 1279) return;
    setActiveMenu((current) => (current === id ? null : id));
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };

  const regularMenu = CPMC_HEADER_MENU.filter(
    (item) => item.id !== "admissions",
  );
  const leftMenu = regularMenu.slice(0, 3);
  const rightMenu = regularMenu.slice(3);
  const admissions = CPMC_HEADER_MENU.find((item) => item.id === "admissions")!;

  const renderNavButton = (item: HeaderMenuItem) => (
    <button
      key={item.id}
      type="button"
      className={cx(
        "cpmc-th__nav-button",
        activeMenu === item.id && "is-active",
      )}
      aria-expanded={activeMenu === item.id}
      aria-haspopup="true"
      aria-controls={`cpmc-th-panel-${item.id}`}
      onClick={() => toggleDesktop(item.id)}
      onMouseEnter={() => openDesktop(item.id)}
      onKeyDown={(event) => {
        if (event.key !== "ArrowDown") return;
        event.preventDefault();
        openDesktop(item.id);
        requestAnimationFrame(() => {
          const firstLink = document.querySelector<HTMLAnchorElement>(
            `#cpmc-th-panel-${item.id} a`,
          );
          firstLink?.focus();
        });
      }}
    >
      {item.label}
      <span className="cpmc-th__chevron" aria-hidden="true" />
    </button>
  );

  return (
    <>
      <header
        className="cpmc-th"
        id="cpmc-th"
        ref={rootRef}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className={cx("cpmc-th__bar", scrolled && "is-sticky")}>
          <div className="cpmc-th__top">
            <div className="cpmc-th__container cpmc-th__top-inner">
              <a href="mailto:info@cpmc.edu.pk">info@cpmc.edu.pk</a>
              <span className="cpmc-th__foundation">
                A project of Health &amp; Education Foundation
              </span>
              <a className="cpmc-th__portal" href="https://portal.cpmc.edu.pk/">
                Student portal
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </div>

          <div className="cpmc-th__main">
            <div className="cpmc-th__container cpmc-th__main-inner">
              <nav
                className="cpmc-th__nav cpmc-th__nav--left"
                aria-label="Primary navigation"
              >
                <div className="cpmc-th__nav-items">
                  {leftMenu.map((item) => renderNavButton(item))}
                </div>
              </nav>

              <a
                className="cpmc-th__brand"
                href="#top"
                aria-label="Central Park Medical College home"
              >
                <img
                  src="/assets/logo.png"
                  alt="Central Park Medical College"
                  width={78}
                  height={78}
                />
              </a>

              <div className="cpmc-th__right">
                <nav
                  className="cpmc-th__nav cpmc-th__nav--right"
                  aria-label="Secondary navigation"
                >
                  <div className="cpmc-th__nav-items">
                    {rightMenu.map((item) => renderNavButton(item))}
                  </div>
                </nav>

                <button
                  className={cx(
                    "cpmc-th__cta",
                    activeMenu === admissions.id && "is-active",
                  )}
                  type="button"
                  aria-expanded={activeMenu === admissions.id}
                  aria-haspopup="true"
                  aria-controls="cpmc-th-panel-admissions"
                  onClick={() => toggleDesktop(admissions.id)}
                  onMouseEnter={() => openDesktop(admissions.id)}
                >
                  <span>Admissions</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </button>
              </div>

              <button
                ref={toggleRef}
                className="cpmc-th__toggle"
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="cpmc-th-mobile"
                onClick={() => {
                  setActiveMenu(null);
                  setMobileOpen((open) => !open);
                }}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          <div className="cpmc-th__panels">
            {CPMC_HEADER_MENU.map((item) => (
              <div
                key={item.id}
                className={`cpmc-th__panel cpmc-th__panel--${item.id}`}
                id={`cpmc-th-panel-${item.id}`}
                hidden={activeMenu !== item.id}
              >
                <div className="cpmc-th__panel-inner">
                  <div className="cpmc-th__panel-intro">
                    <small>Central Park Medical College</small>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <a
                      className="cpmc-th__view-all"
                      href={resolveHeaderHref(item.href)}
                      onClick={() => setActiveMenu(null)}
                    >
                      Explore {item.label}
                      <HeaderArrow />
                    </a>
                  </div>

                  <div className="cpmc-th__panel-content">
                    <div className="cpmc-th__groups">
                      {item.groups.map((group) => (
                        <div className="cpmc-th__group" key={group.title}>
                          <h3 className="cpmc-th__group-title">
                            {group.title}
                          </h3>
                          <div className="cpmc-th__group-links">
                            {group.links.map(([label, href]) => (
                              <a
                                key={`${label}-${href}`}
                                href={resolveHeaderHref(href)}
                                onClick={() => setActiveMenu(null)}
                              >
                                {label}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <nav
            className="cpmc-th__mobile"
            id="cpmc-th-mobile"
            aria-label="Mobile navigation"
            hidden={!mobileOpen}
          >
            <div className="cpmc-th__mobile-head">
              <span>Explore CPMC</span>
              <button
                ref={closeRef}
                type="button"
                className="cpmc-th__mobile-close"
                aria-label="Close menu"
                onClick={() => {
                  closeMobile();
                  requestAnimationFrame(() => toggleRef.current?.focus());
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="cpmc-th__mobile-content">
              {CPMC_HEADER_MENU.map((item) => (
                <details
                  className="cpmc-th__mobile-section"
                  key={item.id}
                  open={mobileSection === item.id}
                  onToggle={(event) => {
                    const isOpen = event.currentTarget.open;
                    setMobileSection(
                      isOpen
                        ? item.id
                        : (current) => (current === item.id ? null : current),
                    );
                  }}
                >
                  <summary>{item.label}</summary>
                  <div className="cpmc-th__mobile-section-body">
                    <a
                      href={resolveHeaderHref(item.href)}
                      onClick={closeMobile}
                    >
                      Explore {item.label}
                    </a>
                    {item.groups.map((group) => (
                      <div className="cpmc-th__mobile-group" key={group.title}>
                        <h3 className="cpmc-th__mobile-group-title">
                          {group.title}
                        </h3>
                        {group.links.map(([label, href]) => (
                          <a
                            key={`${label}-${href}`}
                            href={resolveHeaderHref(href)}
                            onClick={closeMobile}
                          >
                            {label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <div className="cpmc-th__mobile-footer">
              <a
                className="cpmc-th__mobile-apply"
                href="https://admissions.cpmc.edu.pk/"
                onClick={closeMobile}
              >
                Apply for MBBS
                <HeaderArrow />
              </a>
              <a href="mailto:info@cpmc.edu.pk">info@cpmc.edu.pk</a>
            </div>
          </nav>
        </div>

        <style>{CPMC_HEADER_CSS}</style>
      </header>

      <div
        className="cpmc-th__backdrop"
        id="cpmc-th-backdrop"
        hidden={!mobileOpen}
        onClick={closeMobile}
        aria-hidden="true"
      />
    </>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (
      !ref.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1150, 1);
          setDisplay(value * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  const decimals = Number.isInteger(value) ? 0 : 1;
  return (
    <span ref={ref} aria-label={`${value.toLocaleString("en-US")}${suffix}`}>
      <span aria-hidden="true">
        {display.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </span>
    </span>
  );
}
const heroSlides = [
  {
    image: "/assets/campus.jpg",
    alt: "Aerial view of the Central Park Medical College campus in Lahore",
    number: "01",
    title: "A place to begin something meaningful.",
    caption: "Central Park Medical College · Lahore",
  },
  {
    image: "/assets/learning.jpg",
    alt: "Students learning at Central Park Medical College",
    number: "02",
    title: "Turn curiosity into clinical confidence.",
    caption: "Learning together, every day",
  },
  {
    image: "/assets/life.jpg",
    alt: "Campus life at Central Park Medical College",
    number: "03",
    title: "Find your people. Grow your perspective.",
    caption: "Life beyond the lecture hall",
  },
];
function Hero({
  onFind,
}: {
  onFind: (category: Category, query: string) => void;
}) {
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const current = heroSlides[slide];
  function find(event: FormEvent) {
    event.preventDefault();
    onFind(category, query);
  }
  return (
    <section className="hero-section wrap" aria-labelledby="hero-heading">
      <div className="hero-frame">
        <div className="hero-copy">
          <p className="eyebrow">Central Park Medical College</p>
          <h1 id="hero-heading">
            Learn with <br />
            purpose.
            <br />
            <em>Lead with care.</em>
          </h1>
          <p className="hero-intro">
            Your future in healthcare starts with a strong foundation, real
            clinical experience and a community that cares.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#programs">Find your program</ButtonLink>
            <a className="hero-tour" href={`${COLLEGE}/virtual-tour/`}>
              <span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
              Explore our campus
            </a>
          </div>
          <div className="hero-founded">
            <span className="small-crest">
              <img src="/assets/logo.png" width={35} height={35} alt="" />
            </span>
            <p>
              Building a healthier tomorrow
              <br />
              <strong>Since 2008 · Lahore, Pakistan</strong>
            </p>
          </div>
        </div>
        <div className="hero-photo">
          {heroSlides.map((item, index) => (
            <img
              key={item.image}
              className={cx("hero-image", index === slide && "active")}
              src={item.image}
              alt={index === slide ? item.alt : ""}
              aria-hidden={index !== slide}
              width={index === 0 ? 1024 : 2560}
              height={index === 0 ? 504 : 1707}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="hero-badge">
            <GraduationCap size={25} aria-hidden="true" />
            <div>
              <strong>
                <Counter value={1000} suffix="+" />
              </strong>
              <span>doctors graduated</span>
            </div>
          </div>
          <div className="hero-caption">
            <div aria-live="polite" aria-atomic="true">
              <span>{current.caption}</span>
              <p>{current.title}</p>
            </div>
            <div className="hero-controls">
              <button
                onClick={() => setSlide((slide + 2) % 3)}
                aria-label="Previous campus photograph"
              >
                <ChevronLeft size={19} />
              </button>
              <span>{current.number} / 03</span>
              <button
                onClick={() => setSlide((slide + 1) % 3)}
                aria-label="Next campus photograph"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <form
        className="program-finder"
        onSubmit={find}
        role="search"
        aria-label="Find a CPMC programme"
      >
        <div className="finder-heading">
          <Search size={23} aria-hidden="true" />
          <p>
            Your future,
            <br />
            <strong>find it here.</strong>
          </p>
        </div>
        <div className="finder-input">
          <label htmlFor="program-search">What would you like to study?</label>
          <input
            id="program-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={100}
            placeholder="Try MBBS, nursing or physiotherapy"
          />
        </div>
        <div className="finder-select">
          <label htmlFor="program-category">Area of interest</label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as Category)}
          >
            <SelectTrigger id="program-category" className="category-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="finder-options" position="popper">
              {categories.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <button type="submit" className="btn btn-navy">
          Explore programs
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>
    </section>
  );
}
function Recognition({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cx("recognition", compact && "recognition-compact")}>
      {!compact && (
        <p className="recognition-label">
          A foundation
          <br />
          <strong>you can trust.</strong>
        </p>
      )}
      <a href={`${COLLEGE}/introduction/`} className="recognition-item">
        <img
          src="/assets/cpmc/pmdc-logo.png"
          alt="Pakistan Medical and Dental Council"
          width={56}
          height={56}
          loading="lazy"
        />
        <span>
          <strong>PM&DC</strong>
          <small>Recognised medical college</small>
        </span>
      </a>
      <a href={`${COLLEGE}/introduction/`} className="recognition-item">
        <img
          src="/assets/cpmc/uhs-logo.jpg"
          alt="University of Health Sciences Lahore"
          width={56}
          height={56}
          loading="lazy"
        />
        <span>
          <strong>UHS Lahore</strong>
          <small>University affiliation</small>
        </span>
      </a>
      {!compact && (
        <a href={`${COLLEGE}/library/`} className="recognition-item">
          <span className="recognition-icon">
            <BookOpen size={30} aria-hidden="true" />
          </span>
          <span>
            <strong>HEC Digital Library</strong>
            <small>Access to academic resources</small>
          </span>
        </a>
      )}
    </div>
  );
}
function Metrics() {
  return (
    <section className="metrics-section wrap" aria-label="CPMC in numbers">
      <div className="metrics-grid">
        {metrics.map((item) => (
          <a className="metric" key={item.label} href={item.href}>
            <strong>
              <Counter value={item.value} suffix={item.suffix} />
            </strong>
            <h2>{item.label}</h2>
            <span>{item.note}</span>
          </a>
        ))}
      </div>
      <Recognition />
    </section>
  );
}
function ProgramCard({ program }: { program: Program }) {
  const Icon = icons[program.icon];
  return (
    <article
      className={cx("program-card", program.enquiry && "program-enquiry")}
    >
      <div className="program-card-top">
        <span className="program-icon">
          <Icon size={28} strokeWidth={1.55} aria-hidden="true" />
        </span>
        <span className="card-tag">{program.tag}</span>
      </div>
      <h3>
        <a href={program.href}>{program.title}</a>
      </h3>
      <p>{program.description}</p>
      <div className="program-detail">{program.detail}</div>
      <LinkArrow href={program.href}>
        {program.enquiry ? "Ask admissions" : "Explore program"}
      </LinkArrow>
    </article>
  );
}
function Programs({
  category,
  setCategory,
  query,
  clearSearch,
}: {
  category: Category;
  setCategory: (category: Category) => void;
  query: string;
  clearSearch: () => void;
}) {
  const matches = filterPrograms(category, query);
  return (
    <section
      className="section programs-section"
      id="programs"
      aria-labelledby="programs-heading"
    >
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Find your calling</p>
            <h2 id="programs-heading">
              Many pathways.
              <br />
              <em>One purpose: better care.</em>
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              From your first steps in medicine to specialist clinical training,
              find a path that fits your ambition.
            </p>
            <LinkArrow href={`${COLLEGE}/admission-announcements/`}>
              Admission information
            </LinkArrow>
          </div>
        </div>
        <Tabs
          value={category}
          onValueChange={(value) => setCategory(value as Category)}
          className="program-tabs"
        >
          <div className="tabs-scroll">
            <TabsList
              variant="line"
              className="editorial-tabs"
              aria-label="Filter programmes by subject"
            >
              {categories.map((item) => (
                <TabsTrigger value={item.id} key={item.id}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div
            className="program-results"
            aria-live="polite"
            aria-atomic="true"
          >
            {query ? (
              <>
                <span>
                  {matches.length} {matches.length === 1 ? "result" : "results"}{" "}
                  for “{query}”
                </span>
                <button onClick={clearSearch}>Clear search</button>
              </>
            ) : (
              <span>
                {category === "all"
                  ? "Explore degrees, diplomas and training opportunities"
                  : `${matches.length} ${matches.length === 1 ? "pathway" : "pathways"} in this area`}
              </span>
            )}
          </div>
          {categories.map((item) => (
            <TabsContent value={item.id} key={item.id}>
              {matches.length > 0 ? (
                <div className="program-grid">
                  {matches.map((program) => (
                    <ProgramCard key={program.id} program={program} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Search size={30} aria-hidden="true" />
                  <h3>No matching programs</h3>
                  <p>
                    Try “MBBS”, “nursing” or “allied”, or explore all areas.
                  </p>
                  <button
                    className="btn btn-navy"
                    onClick={() => {
                      clearSearch();
                      setCategory("all");
                    }}
                  >
                    Show all programs
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        <div className="program-support">
          <p>
            Not sure where to start?{" "}
            <strong>Let’s find your next step together.</strong>
          </p>
          <LinkArrow href={CONTACT}>Talk to admissions</LinkArrow>
        </div>
      </div>
    </section>
  );
}
function TeachingHospital() {
  return (
    <section
      className="hospital-section section wrap"
      id="hospital"
      aria-labelledby="hospital-heading"
    >
      <div className="hospital-frame">
        <div className="hospital-visual">
          <img
            src="/assets/cpmc/hospital-exterior.jpeg"
            alt="Central Park Teaching Hospital exterior, emergency entrance and ambulance"
            width={1920}
            height={860}
            loading="lazy"
          />
          <div className="hospital-visual-label">
            <Hospital size={22} aria-hidden="true" />
            <span>
              Central Park
              <br />
              <strong>Teaching Hospital</strong>
            </span>
          </div>
          <div className="hospital-emergency">
            <Clock3 size={20} aria-hidden="true" />
            <span>
              <strong>24 hours. Every day.</strong>Emergency services
            </span>
            <a
              href="tel:+924234500003"
              aria-label="Call Central Park Teaching Hospital"
            >
              <Phone size={19} />
            </a>
          </div>
        </div>
        <div className="hospital-copy">
          <p className="eyebrow">Where knowledge meets compassion</p>
          <h2 id="hospital-heading">
            Real patients.
            <br />
            Real experience.
            <br />
            <em>Lasting impact.</em>
          </h2>
          <p>
            At Central Park Teaching Hospital, clinical education and patient
            care come together. Learn in an active hospital environment,
            supported by specialist teams and a commitment to service.
          </p>
          <div className="hospital-facts">
            <div>
              <strong>600+</strong>
              <span>hospital beds</span>
            </div>
            <div>
              <strong>28</strong>
              <span>departments</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>emergency care</span>
            </div>
          </div>
          <div className="department-tags">
            <span>Medicine</span>
            <span>Surgery</span>
            <span>Cardiology</span>
            <span>Paediatrics</span>
            <span>Obstetrics & gynaecology</span>
          </div>
          <div className="hospital-actions">
            <ButtonLink
              href={`${HOSPITAL}/book-an-appointment/`}
              variant="light"
            >
              Book an appointment
            </ButtonLink>
            <LinkArrow href={HOSPITAL}>Visit CPTH</LinkArrow>
          </div>
        </div>
      </div>
      <div className="care-values">
        <span>
          <ShieldCheck size={20} aria-hidden="true" />
          Patient-centred care
        </span>
        <span>
          <Stethoscope size={20} aria-hidden="true" />
          Supervised clinical learning
        </span>
        <span>
          <HeartPulse size={20} aria-hidden="true" />
          Service to our community
        </span>
      </div>
    </section>
  );
}
function CampusLife() {
  return (
    <section
      className="section campus-section"
      id="campus"
      aria-labelledby="campus-heading"
    >
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">More than a medical education</p>
            <h2 id="campus-heading">
              Room to learn.
              <br />
              <em>Space to belong.</em>
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              Discover a campus where academic ambition, friendship and personal
              growth are part of the same experience.
            </p>
            <LinkArrow href={`${COLLEGE}/facilities/`}>
              Discover our facilities
            </LinkArrow>
          </div>
        </div>
        <div className="campus-feature-image">
          <img
            src="/assets/life.jpg"
            alt="Students taking part in campus life at Central Park Medical College"
            width={2560}
            height={1707}
            loading="lazy"
          />
          <div className="campus-image-caption">
            <span className="eyebrow">Your college years, fully lived</span>
            <h3>
              A community.
              <br />A sense of possibility.
            </h3>
            <ButtonLink href={`${COLLEGE}/virtual-tour/`} variant="light">
              Take a campus tour
            </ButtonLink>
          </div>
          <div className="campus-acreage">
            <strong>26</strong>
            <span>
              acres of campus
              <br />
              in Lahore
            </span>
          </div>
        </div>
        <div className="feature-grid">
          {features.map((feature) => {
            const Icon =
              featureIcons[feature.icon as keyof typeof featureIcons];
            return (
              <article className="feature-card" key={feature.title}>
                <Icon size={29} strokeWidth={1.55} aria-hidden="true" />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <LinkArrow href={feature.href}>{feature.link}</LinkArrow>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function Leadership() {
  return (
    <section
      className="section leadership-section wrap"
      id="leadership"
      aria-labelledby="leadership-heading"
    >
      <div className="leadership-frame">
        <div className="principal-photo">
          <img
            src="/assets/cpmc/principal-muhammad-amer-mian.jpg"
            alt="Prof. Muhammad Amer Mian, Principal of Central Park Medical College"
            width={925}
            height={1024}
            loading="lazy"
          />
          <span className="portrait-label">From the principal’s desk</span>
        </div>
        <div className="leadership-copy">
          <p className="eyebrow">A message from our leadership</p>
          <h2 id="leadership-heading">
            Preparing doctors.
            <br />
            <em>Shaping people.</em>
          </h2>
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote>
            We believe in character development, discipline, and fostering a
            spirit of compassion
          </blockquote>
          <p className="leadership-context">
            A medical education should nurture sound judgement and a commitment
            to the people we serve. Discover the values behind CPMC’s approach
            to learning.
          </p>
          <div className="principal-signature">
            <strong>Prof. Muhammad Amer Mian</strong>
            <span>MBBS, FCPS, CHPE</span>
            <small>Principal, Central Park Medical College</small>
          </div>
          <LinkArrow href={`${COLLEGE}/principals-message/`}>
            Read the principal’s message
          </LinkArrow>
        </div>
      </div>
    </section>
  );
}
function Admissions() {
  return (
    <section
      className="section admissions-section"
      id="admissions"
      aria-labelledby="admissions-heading"
    >
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your next chapter starts here</p>
            <h2 id="admissions-heading">
              An ambition today.
              <br />
              <em>A calling for life.</em>
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              Make your next step a confident one. Start with the current
              requirements for your chosen programme.
            </p>
            <ButtonLink href={`${COLLEGE}/admission-announcements/`}>
              View admissions
            </ButtonLink>
          </div>
        </div>
        <ol className="admission-steps">
          {admissionSteps.map((step, index) => (
            <li key={step.title}>
              <div className="step-top">
                <span>0{index + 1}</span>
                {index < 3 ? (
                  <ArrowRight size={24} aria-hidden="true" />
                ) : (
                  <Check size={24} aria-hidden="true" />
                )}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <LinkArrow href={step.href}>{step.action}</LinkArrow>
            </li>
          ))}
        </ol>
        <div className="admissions-note">
          <CalendarDays size={21} aria-hidden="true" />
          <p>
            Intakes, deadlines and entry requirements vary by programme.{" "}
            <a href={`${COLLEGE}/admission-announcements/`}>
              Always check the latest official notice.
            </a>
          </p>
        </div>
        <div className="admissions-help">
          <div>
            <span>Here to help you take the next step</span>
            <h3>Questions about joining CPMC?</h3>
          </div>
          <div>
            <ButtonLink href={CONTACT} variant="navy">
              Contact admissions
            </ButtonLink>
            <LinkArrow href={`${COLLEGE}/scholarships/`}>
              Explore scholarships
            </LinkArrow>
          </div>
        </div>
      </div>
    </section>
  );
}
function News() {
  const [category, setCategory] = useState<StoryCategory>("All stories");
  const filters: StoryCategory[] = [
    "All stories",
    "Research",
    "Events",
    "Achievements",
  ];
  const selected = stories.filter(
    (story) => category === "All stories" || story.category === category,
  );
  return (
    <section
      className="section news-section wrap"
      id="news"
      aria-labelledby="news-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Ideas. Milestones. Community.</p>
          <h2 id="news-heading">
            The latest stories.
            <br />
            <em>The bigger picture.</em>
          </h2>
        </div>
        <div className="section-heading-aside">
          <p>
            News from our teaching hospital, alongside research and achievements
            from the college archive.
          </p>
          <LinkArrow href={COLLEGE}>More from CPMC</LinkArrow>
        </div>
      </div>
      <Tabs
        value={category}
        onValueChange={(value) => setCategory(value as StoryCategory)}
      >
        <div className="tabs-scroll">
          <TabsList
            variant="line"
            className="editorial-tabs"
            aria-label="Filter news"
          >
            {filters.map((filter) => (
              <TabsTrigger value={filter} key={filter}>
                {filter}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {filters.map((filter) => (
          <TabsContent value={filter} key={filter}>
            <div className="news-grid">
              {selected.map((story) => (
                <article
                  className={`news-card news-${story.id}`}
                  key={story.id}
                >
                  <a
                    className="news-image"
                    href={story.href}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={story.image}
                      alt=""
                      width={
                        story.id === "research"
                          ? 1414
                          : story.id === "camp"
                            ? 1080
                            : 667
                      }
                      height={
                        story.id === "research"
                          ? 2000
                          : story.id === "camp"
                            ? 566
                            : 559
                      }
                      loading="lazy"
                    />
                    <span>{story.category}</span>
                  </a>
                  <div className="news-meta">
                    <time dateTime={story.isoDate}>{story.date}</time>
                    <span>{story.source}</span>
                  </div>
                  <h3>
                    <a href={story.href}>{story.title}</a>
                  </h3>
                  <p>{story.description}</p>
                  <LinkArrow href={story.href}>Read story</LinkArrow>
                </article>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
function Testimonials() {
  return (
    <section
      className="section testimonials-section"
      id="community"
      aria-labelledby="community-heading"
    >
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The people behind the promise</p>
            <h2 id="community-heading">
              Different journeys.
              <br />
              <em>A shared sense of purpose.</em>
            </h2>
          </div>
          <LinkArrow href={`${COLLEGE}/alumni/`}>
            Meet our alumni community
          </LinkArrow>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <figure className="testimonial-card" key={item.name}>
              <div className="testimonial-top">
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <span>{item.label}</span>
              </div>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <span className="person-avatar" aria-hidden="true">
                  {item.initials}
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </span>
              </figcaption>
              <a className="quote-source" href={item.href}>
                Read the original message
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const company = useRef<HTMLInputElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    if (!consent) {
      setStatus("error");
      setMessage("Please agree to receive college updates before subscribing.");
      return;
    }
    setStatus("loading");
    setMessage("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent,
          company: company.current?.value || "",
        }),
        signal: controller.signal,
      });
      const body = (await response.json()) as { error?: string; ok?: boolean };
      if (!response.ok || body.ok !== true)
        throw new Error(
          body.error || "We couldn’t save your subscription. Please try again.",
        );
      setStatus("success");
      setMessage("Thank you. Your subscription has been saved.");
      setEmail("");
      setConsent(false);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.name === "AbortError"
          ? "This is taking longer than expected. Please try again."
          : error instanceof Error
            ? error.message
            : "We couldn’t save your subscription. Please try again.",
      );
    } finally {
      clearTimeout(timeout);
    }
  }
  return (
    <div className="newsletter">
      <div>
        <p className="eyebrow">Keep in touch</p>
        <h3>A little closer to campus.</h3>
        <p>Sign up for college news, events and admission updates.</p>
      </div>
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="newsletter-email">
          Your email address
        </label>
        <div className="newsletter-input-row">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            disabled={status === "loading"}
            aria-describedby="newsletter-status"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            aria-label={
              status === "loading"
                ? "Saving subscription"
                : "Subscribe to newsletter"
            }
          >
            {status === "loading" ? (
              <Loader2 className="spin" size={20} />
            ) : (
              <ArrowUpRight size={24} />
            )}
          </button>
        </div>
        <div className="form-trap" aria-hidden="true">
          <label htmlFor="newsletter-company">Company website</label>
          <input
            id="newsletter-company"
            ref={company}
            name="company"
            autoComplete="off"
            tabIndex={-1}
          />
        </div>
        <div className="newsletter-consent">
          <Checkbox
            id="newsletter-consent"
            checked={consent}
            onCheckedChange={(value) => setConsent(value === true)}
            disabled={status === "loading"}
          />
          <label htmlFor="newsletter-consent">
            I agree to receive CPMC updates by email.{" "}
            <a href="/privacy">Privacy & unsubscribe</a>
          </label>
        </div>
        <p
          id="newsletter-status"
          className={`newsletter-status ${status}`}
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {message}
        </p>
      </form>
    </div>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-invitation">
          <div>
            <p className="eyebrow">Your future starts with a first step</p>
            <h2>
              Bring your ambition.
              <br />
              <em>We’ll help it grow.</em>
            </h2>
          </div>
          <ButtonLink
            href={`${COLLEGE}/admission-announcements/`}
            variant="light"
          >
            Begin your journey
          </ButtonLink>
        </div>
        <Newsletter />
        <div className="footer-grid">
          <div className="footer-about">
            <Brand footer />
            <p>
              A community of learning and care, preparing the next generation of
              healthcare professionals in Lahore.
            </p>
            <SocialLinks />
            <Recognition compact />
          </div>
          <div className="footer-column">
            <h3>Study at CPMC</h3>
            <a href={`${COLLEGE}/mbbs-admissions-2024-29/`}>MBBS</a>
            <a href={`${COLLEGE}/programs/`}>Nursing</a>
            <a
              href={`${COLLEGE}/central-park-college-of-allied-health-sciences-3/`}
            >
              Physical Therapy
            </a>
            <a
              href={`${COLLEGE}/central-park-college-of-allied-health-sciences-2/`}
            >
              Allied Health Sciences
            </a>
            <a href={`${COLLEGE}/department-of-anesthesia/`}>
              Postgraduate Training
            </a>
            <a href={`${COLLEGE}/college-of-pharmacy/`}>College of Pharmacy</a>
          </div>
          <div className="footer-column">
            <h3>Useful links</h3>
            <a href={`${COLLEGE}/admission-announcements/`}>Admissions</a>
            <a href="https://portal.cpmc.edu.pk/">Student portal</a>
            <a href={`${COLLEGE}/library/`}>Library</a>
            <a href={`${COLLEGE}/careers/`}>Careers</a>
            <a href={`${COLLEGE}/alumni/`}>Alumni</a>
            <a href={HOSPITAL}>Teaching Hospital</a>
            <a href={`${COLLEGE}/policies-for-students/`}>Student policies</a>
          </div>
          <div className="footer-column footer-contact">
            <h3>Come find us</h3>
            <p>
              <MapPin size={18} aria-hidden="true" />
              <span>
                31 km Ferozepur Road,
                <br />
                Central Park Housing Scheme,
                <br />
                Lahore, Pakistan
              </span>
            </p>
            <LinkArrow href={MAP}>Get directions</LinkArrow>
            <a className="contact-line" href="tel:+924234500003">
              <Phone size={17} aria-hidden="true" />
              <span>
                Hospital helpline
                <br />
                <strong>042 3450 0003</strong>
              </span>
            </a>
            <a className="contact-line" href={CONTACT}>
              <Mail size={17} aria-hidden="true" />
              Contact the college
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Central Park Medical College. All
            rights reserved.
          </p>
          <div>
            <a href="/privacy">Privacy</a>
            <a href={`${COLLEGE}/contact-us/`}>Contact</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default function Homepage() {
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  function findPrograms(nextCategory: Category, nextQuery: string) {
    setCategory(nextCategory);
    setQuery(nextQuery.trim());
    requestAnimationFrame(() => {
      const heading = document.getElementById("programs-heading");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
      document
        .getElementById("programs")
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
    });
  }
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero onFind={findPrograms} />
        <Metrics />
        <Programs
          category={category}
          setCategory={setCategory}
          query={query}
          clearSearch={() => setQuery("")}
        />
        <TeachingHospital />
        <CampusLife />
        <Leadership />
        <Admissions />
        <News />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

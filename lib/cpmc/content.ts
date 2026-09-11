export const COLLEGE = "https://www.cpmc.edu.pk";
export const HOSPITAL = "https://cpth.pk";
export const PROSPECTUS = `${COLLEGE}/wp-content/uploads/2022/11/Complete-Prospectus-2022.pdf`;
export const CONTACT = `${COLLEGE}/contact-us/`;
export const MAP = "https://www.google.com/maps/search/?api=1&query=Central+Park+Medical+College+31+km+Ferozepur+Road+Lahore";

export const navigation = [
  { label: "Programs", href: "#programs", links: [
    ["Explore all programs", "#programs"], ["MBBS", `${COLLEGE}/mbbs-admissions-2024-29/`],
    ["Nursing", `${COLLEGE}/programs/`], ["Allied Health Sciences", `${COLLEGE}/central-park-college-of-allied-health-sciences-2/`],
    ["Postgraduate training", `${COLLEGE}/department-of-anesthesia/`],
  ] },
  { label: "Admissions", href: "#admissions", links: [
    ["Your admission journey", "#admissions"], ["Announcements & applications", `${COLLEGE}/admission-announcements/`],
    ["Eligibility criteria", `${COLLEGE}/eligibility-criteria/`], ["Fee information", `${COLLEGE}/mbbs-2024-29-fee-structure-local/`],
    ["Scholarships", `${COLLEGE}/scholarships/`], ["Frequently asked questions", `${COLLEGE}/admissions-faqs/`],
  ] },
  { label: "Teaching Hospital", href: "#hospital", links: [
    ["Clinical learning & patient care", "#hospital"], ["Visit the hospital", HOSPITAL],
    ["Book an appointment", `${HOSPITAL}/book-an-appointment/`], ["Hospital contact", `${HOSPITAL}/contact-us/`],
  ] },
  { label: "Research", href: "#news", links: [
    ["Research & college news", "#news"], ["Medical education", `${COLLEGE}/department-of-medical-education/`],
    ["Faculty development", `${COLLEGE}/faculty-development-program/`], ["Clinical Trials Unit", "https://ctu.cpth.pk/"],
  ] },
  { label: "Campus Life", href: "#campus", links: [
    ["Discover campus life", "#campus"], ["Library", `${COLLEGE}/library/`], ["Hostels", `${COLLEGE}/hostels/`],
    ["Clubs & societies", `${COLLEGE}/student-committees-and-societies/`], ["Student affairs", `${COLLEGE}/student-affairs-section/`],
  ] },
  { label: "About Us", href: "#leadership", links: [
    ["Our story", `${COLLEGE}/introduction/`], ["Vision & values", `${COLLEGE}/vision-mission-and-values/`],
    ["Principal’s message", "#leadership"], ["Careers", `${COLLEGE}/careers/`], ["Contact us", CONTACT],
  ] },
];

export const categories = [
  { id: "all", label: "All programs" }, { id: "medicine", label: "Medicine" },
  { id: "nursing", label: "Nursing" }, { id: "allied", label: "Allied Health" },
  { id: "postgraduate", label: "Postgraduate" }, { id: "dentistry", label: "Dentistry enquiries" },
] as const;
export type Category = typeof categories[number]["id"];
export type Program = { id: string; category: Category; tag: string; title: string; description: string; detail: string; href: string; icon: "medicine" | "nursing" | "movement" | "lab" | "graduate" | "dentistry"; enquiry?: boolean; keywords: string };
export const programs: Program[] = [
  { id: "mbbs", category: "medicine", tag: "Undergraduate", title: "Bachelor of Medicine & Surgery", description: "Build your foundation in medical science and develop clinical skills through learning at Central Park Teaching Hospital.", detail: "MBBS · 5 years", href: `${COLLEGE}/mbbs-admissions-2024-29/`, icon: "medicine", keywords: "mbbs medicine doctor bachelor surgery undergraduate" },
  { id: "nursing", category: "nursing", tag: "Nursing education", title: "Nursing & Patient Care", description: "Explore the Certified Nursing Assistant diploma and post-basic diplomas in critical care and trauma & emergency care.", detail: "CNA · 2 years / Post-basic · 1 year", href: `${COLLEGE}/programs/`, icon: "nursing", keywords: "nursing nurse cna assistant critical care trauma diploma" },
  { id: "dpt", category: "allied", tag: "Undergraduate", title: "Doctor of Physical Therapy", description: "Study movement, rehabilitation and patient-centred recovery at Central Park College of Allied Health Sciences.", detail: "DPT · 5 years", href: `${COLLEGE}/central-park-college-of-allied-health-sciences-3/`, icon: "movement", keywords: "allied health dpt physical therapy physiotherapy rehabilitation undergraduate" },
  { id: "allied", category: "allied", tag: "Professional diplomas", title: "Allied Health Sciences", description: "Find a pathway in laboratory, radiography, operation theatre, anaesthesia and dialysis technology, or dispenser training.", detail: "Paramedical diplomas · 2 years", href: `${COLLEGE}/central-park-college-of-allied-health-sciences-2/`, icon: "lab", keywords: "allied health sciences diploma mlt rit ott laboratory radiology radiography anaesthesia dialysis dispenser" },
  { id: "postgraduate", category: "postgraduate", tag: "Clinical training", title: "Postgraduate Training", description: "Take the next step in clinical practice. Explore department-led training and ask about current recognised posts and intake.", detail: "Specialist pathways · Department-specific", href: `${COLLEGE}/department-of-anesthesia/`, icon: "graduate", keywords: "postgraduate graduate fcps cpsp residency anaesthesia specialist" },
  { id: "dentistry", category: "dentistry", tag: "Admissions enquiry", title: "Interested in Dentistry?", description: "A BDS programme is not confirmed in CPMC’s published programme list. Speak with admissions about availability before applying.", detail: "BDS · Confirm availability with admissions", href: CONTACT, icon: "dentistry", enquiry: true, keywords: "bds dentistry dental bachelor surgery enquiry" },
];

export function filterPrograms(category: Category, query: string) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return programs.filter(p => (category === "all" || p.category === category) && terms.every(t => `${p.title} ${p.keywords} ${p.description}`.toLocaleLowerCase().includes(t)));
}

export const metrics = [
  { value: 600, suffix: "+", label: "Teaching hospital beds", note: "Current hospital-published capacity", href: HOSPITAL },
  { value: 1000, suffix: "+", label: "Doctors graduated", note: "College-published alumni total", href: `${COLLEGE}/introduction/` },
  { value: 28, suffix: "", label: "Hospital departments", note: "Across medical & surgical care", href: HOSPITAL },
  { value: 400, suffix: "", label: "Daily OPD patients", note: "Reported in the 2022–23 prospectus", href: PROSPECTUS },
  { value: 98.9, suffix: "%", label: "Third Professional pass rate", note: "MBBS · UHS result, March 2024", href: `${COLLEGE}/cpmc-1st-position-third-professional-mbbs-2024/` },
];

export const features = [
  { icon: "research", title: "Space to discover", description: "Practical laboratories and a culture of inquiry connect what you study to questions that matter.", link: "Research & education", href: `${COLLEGE}/department-of-medical-education/` },
  { icon: "anatomy", title: "Anatomy, brought to life", description: "Explore specimens and models in the anatomy museum as you develop a deeper understanding of the human body.", link: "Basic sciences", href: `${COLLEGE}/departments-2/` },
  { icon: "library", title: "A library for curious minds", description: "Find textbooks, journals and digital resources, including access to the HEC digital library.", link: "Explore the library", href: `${COLLEGE}/library/` },
  { icon: "hostel", title: "A place to feel at home", description: "On-campus hostel facilities help students settle into college life and build lasting friendships.", link: "Hostel information", href: `${COLLEGE}/hostels/` },
  { icon: "sport", title: "Make room for more", description: "Sports, student societies and cultural activities bring energy and connection to life beyond lectures.", link: "Clubs & societies", href: `${COLLEGE}/student-committees-and-societies/` },
  { icon: "support", title: "Support for your next step", description: "Student affairs and career counselling help you navigate your studies and plan what comes next.", link: "Student support", href: `${COLLEGE}/student-affairs-section/` },
];

export const admissionSteps = [
  { title: "Check eligibility", description: "Review your chosen programme’s academic requirements and the latest admission notice.", href: `${COLLEGE}/eligibility-criteria/`, action: "See requirements" },
  { title: "Prepare for the test", description: "Check the current MDCAT or programme-specific test requirements, dates and application route.", href: `${COLLEGE}/admission-announcements/`, action: "Read announcements" },
  { title: "Interview & verification", description: "Complete merit and document checks. Attend an interview if your programme’s current policy requires one.", href: `${COLLEGE}/admissions-faqs/`, action: "Admission FAQs" },
  { title: "Confirm enrolment", description: "Follow your offer instructions, submit the required documents and fees, and prepare for orientation.", href: CONTACT, action: "Speak to admissions" },
];

export type StoryCategory = "All stories" | "Research" | "Events" | "Achievements";
export const stories = [
  { id: "camp", category: "Events" as const, date: "13 February 2026", isoDate: "2026-02-13", source: "Teaching hospital", title: "Care that reaches beyond the campus", description: "Central Park Teaching Hospital shares its free medical camp at Sarahali Kalan, bringing consultations to the community.", image: "/assets/cpmc/news-camp.jpg", imageAlt: "Clinician consulting a patient at the hospital’s free medical camp", href: `${HOSPITAL}/free-medical-camp/` },
  { id: "research", category: "Research" as const, date: "12 August 2024", isoDate: "2024-08-12", source: "College archive", title: "Ideas meet at the Research Conference", description: "Revisit the announcement for the Central Park Research Conference, held on 25–26 October 2024.", image: "/assets/cpmc/news-research.png", imageAlt: "Official poster for Central Park Research Conference 2024", href: `${COLLEGE}/invitation-to-central-park-research-conference-2024/` },
  { id: "achievement", category: "Achievements" as const, date: "15 March 2024", isoDate: "2024-03-15", source: "College archive", title: "A result to remember: first among 48 colleges", description: "CPMC reported a 98.9% pass rate in the Third Professional MBBS examination announced by UHS in March 2024.", image: "/assets/cpmc/news-achievement.png", imageAlt: "Central Park Medical College campus and crest", href: `${COLLEGE}/cpmc-1st-position-third-professional-mbbs-2024/` },
];

export const testimonials = [
  { initials: "AW", quote: "The college has facilitated me every step of the way", name: "Ahsan Waheed", role: "MBBS student · 2022–23 prospectus", label: "A foundation for the future", href: PROSPECTUS },
  { initials: "SHA", quote: "We have regular sessions on Medical ethics.", name: "Syed Hamza Ali", role: "MBBS student · 2022–23 prospectus", label: "Learning with responsibility", href: PROSPECTUS },
  { initials: "AM", quote: "But we understand that education extends beyond the classroom.", name: "Prof. Muhammad Amer Mian", role: "Principal · Faculty perspective", label: "Education for the whole person", href: `${COLLEGE}/principals-message/` },
];

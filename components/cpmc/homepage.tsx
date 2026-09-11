"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Activity, ArrowRight, ArrowUpRight, Bone, BookOpen, Building2, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Camera, GraduationCap, HeartPulse, Hospital, Loader2, Mail, MapPin, Menu, Microscope, Phone, Search, ShieldCheck, Stethoscope, Trophy, UsersRound, SquarePlay } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { admissionSteps, categories, COLLEGE, CONTACT, features, filterPrograms, HOSPITAL, MAP, metrics, navigation, stories, testimonials, type Category, type Program, type StoryCategory } from "@/lib/cpmc/content";

const icons = { medicine: Stethoscope, nursing: HeartPulse, movement: Activity, lab: Microscope, graduate: GraduationCap, dentistry: CircleHelp };
const featureIcons = { research: Microscope, anatomy: Bone, library: BookOpen, hostel: Building2, sport: Trophy, support: UsersRound };

function LinkArrow({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a className={`text-link ${className}`} href={href}>{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}
function ButtonLink({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "light" | "outline" | "navy"; className?: string }) {
  return <a href={href} className={`btn btn-${variant} ${className}`}>{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}
function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#top" className={`brand ${footer ? "brand-footer" : ""}`} aria-label="Central Park Medical College home">
    <span className="brand-crest"><img src="/assets/logo.png" width={64} height={64} alt="CPMC crest" /></span>
    <span className="brand-name">Central Park<span>Medical College</span><small>LAHORE · PAKISTAN</small></span>
  </a>;
}
function SocialLinks() {
  return <div className="social-links">
    <a href="https://www.facebook.com/CentralParkMedicalCollege/" aria-label="CPMC on Facebook"><span className="social-facebook" aria-hidden="true">f</span></a>
    <a href="https://instagram.com/centralparkmedicalcollege1" aria-label="CPMC on Instagram"><Camera size={16} /></a>
    <a href="https://twitter.com/CPMCandCPTH" aria-label="CPMC on X"><span aria-hidden="true">𝕏</span></a>
    <a href="https://www.youtube.com/channel/UCZh9K07A2CJJeUDxPwvRiTQ/featured" aria-label="CPMC on YouTube"><SquarePlay size={17} /></a>
  </div>;
}
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <>
    <div className="utility-bar"><div className="wrap utility-inner">
      <a className="helpline" href="tel:+924234500003"><Phone size={13} aria-hidden="true" /><span>Hospital helpline</span><strong>042 3450 0003</strong></a>
      <div className="utility-right"><a href={`${COLLEGE}/admission-announcements/`}>Admissions</a><a href={`${COLLEGE}/careers/`}>Careers</a><a href={`${COLLEGE}/alumni/`}>Alumni</a><a className="portal-link" href="https://portal.cpmc.edu.pk/">Student portal<ArrowUpRight size={13} aria-hidden="true" /></a><SocialLinks /></div>
    </div></div>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}><div className="wrap main-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(item => <DropdownMenu key={item.label}>
          <DropdownMenuTrigger className="nav-trigger">{item.label}<ChevronDown size={12} aria-hidden="true" /></DropdownMenuTrigger>
          <DropdownMenuContent className="nav-dropdown" align="start" sideOffset={21}>
            {item.links.map(([label, href]) => <DropdownMenuItem key={href} asChild><a href={href}>{label}<ArrowUpRight size={14} aria-hidden="true" /></a></DropdownMenuItem>)}
          </DropdownMenuContent>
        </DropdownMenu>)}
      </nav>
      <ButtonLink href={`${COLLEGE}/admission-announcements/`} className="header-apply">Apply now</ButtonLink>
      <Sheet><SheetTrigger className="mobile-toggle" aria-label="Open navigation"><Menu size={24} /></SheetTrigger>
        <SheetContent className="mobile-menu" side="right"><SheetHeader><SheetTitle>Explore CPMC</SheetTitle><SheetDescription>Medical education. Lifelong purpose.</SheetDescription></SheetHeader>
          <nav aria-label="Mobile navigation">{navigation.map(item => <div className="mobile-nav-group" key={item.label}>
            <SheetClose asChild><a className="mobile-nav-heading" href={item.href}>{item.label}<ArrowUpRight size={18} /></a></SheetClose>
            <div>{item.links.slice(1).map(([label, href]) => <SheetClose key={href} asChild><a href={href}>{label}</a></SheetClose>)}</div>
          </div>)}</nav>
          <div className="mobile-extras"><a href="https://portal.cpmc.edu.pk/">Student portal</a><a href={`${COLLEGE}/alumni/`}>Alumni</a><a href="tel:+924234500003">Hospital: 042 3450 0003</a></div>
        </SheetContent>
      </Sheet>
    </div></header>
  </>;
}
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect(); const start = performance.now();
      const tick = (now: number) => { const progress = Math.min((now - start) / 1150, 1); setDisplay(value * (1 - Math.pow(1 - progress, 3))); if (progress < 1) frame = requestAnimationFrame(tick); };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  const decimals = Number.isInteger(value) ? 0 : 1;
  return <span ref={ref} aria-label={`${value.toLocaleString("en-US")}${suffix}`}><span aria-hidden="true">{display.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span></span>;
}
const heroSlides = [
  { image: "/assets/campus.jpg", alt: "Aerial view of the Central Park Medical College campus in Lahore", number: "01", title: "A place to begin something meaningful.", caption: "Central Park Medical College · Lahore" },
  { image: "/assets/learning.jpg", alt: "Students learning at Central Park Medical College", number: "02", title: "Turn curiosity into clinical confidence.", caption: "Learning together, every day" },
  { image: "/assets/life.jpg", alt: "Campus life at Central Park Medical College", number: "03", title: "Find your people. Grow your perspective.", caption: "Life beyond the lecture hall" },
];
function Hero({ onFind }: { onFind: (category: Category, query: string) => void }) {
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const current = heroSlides[slide];
  function find(event: FormEvent) { event.preventDefault(); onFind(category, query); }
  return <section className="hero-section wrap" aria-labelledby="hero-heading">
    <div className="hero-frame">
      <div className="hero-copy"><p className="eyebrow">Central Park Medical College</p><h1 id="hero-heading">Learn with <br />purpose.<br /><em>Lead with care.</em></h1>
        <p className="hero-intro">Your future in healthcare starts with a strong foundation, real clinical experience and a community that cares.</p>
        <div className="hero-actions"><ButtonLink href="#programs">Find your program</ButtonLink><a className="hero-tour" href={`${COLLEGE}/virtual-tour/`}><span><ArrowUpRight size={20} aria-hidden="true" /></span>Explore our campus</a></div>
        <div className="hero-founded"><span className="small-crest"><img src="/assets/logo.png" width={35} height={35} alt="" /></span><p>Building a healthier tomorrow<br /><strong>Since 2008 · Lahore, Pakistan</strong></p></div>
      </div>
      <div className="hero-photo">
        {heroSlides.map((item, index) => <img key={item.image} className={`hero-image ${index === slide ? "active" : ""}`} src={item.image} alt={index === slide ? item.alt : ""} aria-hidden={index !== slide} width={index === 0 ? 1024 : 2560} height={index === 0 ? 504 : 1707} fetchPriority={index === 0 ? "high" : "auto"} loading={index === 0 ? "eager" : "lazy"} />)}
        <div className="hero-badge"><GraduationCap size={25} aria-hidden="true" /><div><strong><Counter value={1000} suffix="+" /></strong><span>doctors graduated</span></div></div>
        <div className="hero-caption"><div aria-live="polite" aria-atomic="true"><span>{current.caption}</span><p>{current.title}</p></div><div className="hero-controls"><button onClick={() => setSlide((slide + 2) % 3)} aria-label="Previous campus photograph"><ChevronLeft size={19} /></button><span>{current.number} / 03</span><button onClick={() => setSlide((slide + 1) % 3)} aria-label="Next campus photograph"><ChevronRight size={19} /></button></div></div>
      </div>
    </div>
    <form className="program-finder" onSubmit={find} role="search" aria-label="Find a CPMC programme">
      <div className="finder-heading"><Search size={23} aria-hidden="true" /><p>Your future,<br /><strong>find it here.</strong></p></div>
      <div className="finder-input"><label htmlFor="program-search">What would you like to study?</label><input id="program-search" type="search" value={query} onChange={e => setQuery(e.target.value)} maxLength={100} placeholder="Try MBBS, nursing or physiotherapy" /></div>
      <div className="finder-select"><label htmlFor="program-category">Area of interest</label><Select value={category} onValueChange={value => setCategory(value as Category)}><SelectTrigger id="program-category" className="category-select"><SelectValue /></SelectTrigger><SelectContent className="finder-options" position="popper">{categories.map(item => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)}</SelectContent></Select></div>
      <button type="submit" className="btn btn-navy">Explore programs<ArrowRight size={18} aria-hidden="true" /></button>
    </form>
  </section>;
}
function Recognition({ compact = false }: { compact?: boolean }) {
  return <div className={`recognition ${compact ? "recognition-compact" : ""}`}>
    {!compact && <p className="recognition-label">A foundation<br /><strong>you can trust.</strong></p>}
    <a href={`${COLLEGE}/introduction/`} className="recognition-item"><img src="/assets/cpmc/pmdc-logo.png" alt="Pakistan Medical and Dental Council" width={56} height={56} loading="lazy" /><span><strong>PM&DC</strong><small>Recognised medical college</small></span></a>
    <a href={`${COLLEGE}/introduction/`} className="recognition-item"><img src="/assets/cpmc/uhs-logo.jpg" alt="University of Health Sciences Lahore" width={56} height={56} loading="lazy" /><span><strong>UHS Lahore</strong><small>University affiliation</small></span></a>
    {!compact && <a href={`${COLLEGE}/library/`} className="recognition-item"><span className="recognition-icon"><BookOpen size={30} aria-hidden="true" /></span><span><strong>HEC Digital Library</strong><small>Access to academic resources</small></span></a>}
  </div>;
}
function Metrics() {
  return <section className="metrics-section wrap" aria-label="CPMC in numbers">
    <div className="metrics-grid">{metrics.map(item => <a className="metric" key={item.label} href={item.href}><strong><Counter value={item.value} suffix={item.suffix} /></strong><h2>{item.label}</h2><span>{item.note}</span></a>)}</div>
    <Recognition />
  </section>;
}
function ProgramCard({ program }: { program: Program }) {
  const Icon = icons[program.icon];
  return <article className={`program-card ${program.enquiry ? "program-enquiry" : ""}`}>
    <div className="program-card-top"><span className="program-icon"><Icon size={28} strokeWidth={1.55} aria-hidden="true" /></span><span className="card-tag">{program.tag}</span></div>
    <h3><a href={program.href}>{program.title}</a></h3><p>{program.description}</p><div className="program-detail">{program.detail}</div>
    <LinkArrow href={program.href}>{program.enquiry ? "Ask admissions" : "Explore program"}</LinkArrow>
  </article>;
}
function Programs({ category, setCategory, query, clearSearch }: { category: Category; setCategory: (category: Category) => void; query: string; clearSearch: () => void }) {
  const matches = filterPrograms(category, query);
  return <section className="section programs-section" id="programs" aria-labelledby="programs-heading"><div className="wrap">
    <div className="section-heading"><div><p className="eyebrow">Find your calling</p><h2 id="programs-heading">Many pathways.<br /><em>One purpose: better care.</em></h2></div><div className="section-heading-aside"><p>From your first steps in medicine to specialist clinical training, find a path that fits your ambition.</p><LinkArrow href={`${COLLEGE}/admission-announcements/`}>Admission information</LinkArrow></div></div>
    <Tabs value={category} onValueChange={value => setCategory(value as Category)} className="program-tabs">
      <div className="tabs-scroll"><TabsList variant="line" className="editorial-tabs" aria-label="Filter programmes by subject">{categories.map(item => <TabsTrigger value={item.id} key={item.id}>{item.label}</TabsTrigger>)}</TabsList></div>
      <div className="program-results" aria-live="polite" aria-atomic="true">{query ? <><span>{matches.length} {matches.length === 1 ? "result" : "results"} for “{query}”</span><button onClick={clearSearch}>Clear search</button></> : <span>{category === "all" ? "Explore degrees, diplomas and training opportunities" : `${matches.length} ${matches.length === 1 ? "pathway" : "pathways"} in this area`}</span>}</div>
      {categories.map(item => <TabsContent value={item.id} key={item.id}>{matches.length > 0 ? <div className="program-grid">{matches.map(program => <ProgramCard key={program.id} program={program} />)}</div> : <div className="empty-state"><Search size={30} aria-hidden="true" /><h3>No matching programs</h3><p>Try “MBBS”, “nursing” or “allied”, or explore all areas.</p><button className="btn btn-navy" onClick={() => { clearSearch(); setCategory("all"); }}>Show all programs<ArrowRight size={18} /></button></div>}</TabsContent>)}
    </Tabs>
    <div className="program-support"><p>Not sure where to start? <strong>Let’s find your next step together.</strong></p><LinkArrow href={CONTACT}>Talk to admissions</LinkArrow></div>
  </div></section>;
}
function TeachingHospital() {
  return <section className="hospital-section section wrap" id="hospital" aria-labelledby="hospital-heading">
    <div className="hospital-frame"><div className="hospital-visual"><img src="/assets/cpmc/hospital-exterior.jpeg" alt="Central Park Teaching Hospital exterior, emergency entrance and ambulance" width={1920} height={860} loading="lazy" /><div className="hospital-visual-label"><Hospital size={22} aria-hidden="true" /><span>Central Park<br /><strong>Teaching Hospital</strong></span></div><div className="hospital-emergency"><Clock3 size={20} aria-hidden="true" /><span><strong>24 hours. Every day.</strong>Emergency services</span><a href="tel:+924234500003" aria-label="Call Central Park Teaching Hospital"><Phone size={19} /></a></div></div>
      <div className="hospital-copy"><p className="eyebrow">Where knowledge meets compassion</p><h2 id="hospital-heading">Real patients.<br />Real experience.<br /><em>Lasting impact.</em></h2><p>At Central Park Teaching Hospital, clinical education and patient care come together. Learn in an active hospital environment, supported by specialist teams and a commitment to service.</p>
        <div className="hospital-facts"><div><strong>600+</strong><span>hospital beds</span></div><div><strong>28</strong><span>departments</span></div><div><strong>24/7</strong><span>emergency care</span></div></div>
        <div className="department-tags"><span>Medicine</span><span>Surgery</span><span>Cardiology</span><span>Paediatrics</span><span>Obstetrics & gynaecology</span></div>
        <div className="hospital-actions"><ButtonLink href={`${HOSPITAL}/book-an-appointment/`} variant="light">Book an appointment</ButtonLink><LinkArrow href={HOSPITAL}>Visit CPTH</LinkArrow></div>
      </div>
    </div>
    <div className="care-values"><span><ShieldCheck size={20} aria-hidden="true" />Patient-centred care</span><span><Stethoscope size={20} aria-hidden="true" />Supervised clinical learning</span><span><HeartPulse size={20} aria-hidden="true" />Service to our community</span></div>
  </section>;
}
function CampusLife() {
  return <section className="section campus-section" id="campus" aria-labelledby="campus-heading"><div className="wrap">
    <div className="section-heading"><div><p className="eyebrow">More than a medical education</p><h2 id="campus-heading">Room to learn.<br /><em>Space to belong.</em></h2></div><div className="section-heading-aside"><p>Discover a campus where academic ambition, friendship and personal growth are part of the same experience.</p><LinkArrow href={`${COLLEGE}/facilities/`}>Discover our facilities</LinkArrow></div></div>
    <div className="campus-feature-image"><img src="/assets/life.jpg" alt="Students taking part in campus life at Central Park Medical College" width={2560} height={1707} loading="lazy" /><div className="campus-image-caption"><span className="eyebrow">Your college years, fully lived</span><h3>A community.<br />A sense of possibility.</h3><ButtonLink href={`${COLLEGE}/virtual-tour/`} variant="light">Take a campus tour</ButtonLink></div><div className="campus-acreage"><strong>26</strong><span>acres of campus<br />in Lahore</span></div></div>
    <div className="feature-grid">{features.map(feature => { const Icon = featureIcons[feature.icon as keyof typeof featureIcons]; return <article className="feature-card" key={feature.title}><Icon size={29} strokeWidth={1.55} aria-hidden="true" /><h3>{feature.title}</h3><p>{feature.description}</p><LinkArrow href={feature.href}>{feature.link}</LinkArrow></article>; })}</div>
  </div></section>;
}
function Leadership() {
  return <section className="section leadership-section wrap" id="leadership" aria-labelledby="leadership-heading"><div className="leadership-frame">
    <div className="principal-photo"><img src="/assets/cpmc/principal-muhammad-amer-mian.jpg" alt="Prof. Muhammad Amer Mian, Principal of Central Park Medical College" width={925} height={1024} loading="lazy" /><span className="portrait-label">From the principal’s desk</span></div>
    <div className="leadership-copy"><p className="eyebrow">A message from our leadership</p><h2 id="leadership-heading">Preparing doctors.<br /><em>Shaping people.</em></h2><span className="quote-mark" aria-hidden="true">“</span><blockquote>We believe in character development, discipline, and fostering a spirit of compassion</blockquote><p className="leadership-context">A medical education should nurture sound judgement and a commitment to the people we serve. Discover the values behind CPMC’s approach to learning.</p><div className="principal-signature"><strong>Prof. Muhammad Amer Mian</strong><span>MBBS, FCPS, CHPE</span><small>Principal, Central Park Medical College</small></div><LinkArrow href={`${COLLEGE}/principals-message/`}>Read the principal’s message</LinkArrow></div>
  </div></section>;
}
function Admissions() {
  return <section className="section admissions-section" id="admissions" aria-labelledby="admissions-heading"><div className="wrap">
    <div className="section-heading"><div><p className="eyebrow">Your next chapter starts here</p><h2 id="admissions-heading">An ambition today.<br /><em>A calling for life.</em></h2></div><div className="section-heading-aside"><p>Make your next step a confident one. Start with the current requirements for your chosen programme.</p><ButtonLink href={`${COLLEGE}/admission-announcements/`}>View admissions</ButtonLink></div></div>
    <ol className="admission-steps">{admissionSteps.map((step, index) => <li key={step.title}><div className="step-top"><span>0{index + 1}</span>{index < 3 ? <ArrowRight size={24} aria-hidden="true" /> : <Check size={24} aria-hidden="true" />}</div><h3>{step.title}</h3><p>{step.description}</p><LinkArrow href={step.href}>{step.action}</LinkArrow></li>)}</ol>
    <div className="admissions-note"><CalendarDays size={21} aria-hidden="true" /><p>Intakes, deadlines and entry requirements vary by programme. <a href={`${COLLEGE}/admission-announcements/`}>Always check the latest official notice.</a></p></div>
    <div className="admissions-help"><div><span>Here to help you take the next step</span><h3>Questions about joining CPMC?</h3></div><div><ButtonLink href={CONTACT} variant="navy">Contact admissions</ButtonLink><LinkArrow href={`${COLLEGE}/scholarships/`}>Explore scholarships</LinkArrow></div></div>
  </div></section>;
}
function News() {
  const [category, setCategory] = useState<StoryCategory>("All stories");
  const filters: StoryCategory[] = ["All stories", "Research", "Events", "Achievements"];
  const selected = stories.filter(story => category === "All stories" || story.category === category);
  return <section className="section news-section wrap" id="news" aria-labelledby="news-heading">
    <div className="section-heading"><div><p className="eyebrow">Ideas. Milestones. Community.</p><h2 id="news-heading">The latest stories.<br /><em>The bigger picture.</em></h2></div><div className="section-heading-aside"><p>News from our teaching hospital, alongside research and achievements from the college archive.</p><LinkArrow href={COLLEGE}>More from CPMC</LinkArrow></div></div>
    <Tabs value={category} onValueChange={value => setCategory(value as StoryCategory)}><div className="tabs-scroll"><TabsList variant="line" className="editorial-tabs" aria-label="Filter news">{filters.map(filter => <TabsTrigger value={filter} key={filter}>{filter}</TabsTrigger>)}</TabsList></div>
      {filters.map(filter => <TabsContent value={filter} key={filter}><div className="news-grid">{selected.map(story => <article className={`news-card news-${story.id}`} key={story.id}><a className="news-image" href={story.href} tabIndex={-1} aria-hidden="true"><img src={story.image} alt="" width={story.id === "research" ? 1414 : story.id === "camp" ? 1080 : 667} height={story.id === "research" ? 2000 : story.id === "camp" ? 566 : 559} loading="lazy" /><span>{story.category}</span></a><div className="news-meta"><time dateTime={story.isoDate}>{story.date}</time><span>{story.source}</span></div><h3><a href={story.href}>{story.title}</a></h3><p>{story.description}</p><LinkArrow href={story.href}>Read story</LinkArrow></article>)}</div></TabsContent>)}
    </Tabs>
  </section>;
}
function Testimonials() {
  return <section className="section testimonials-section" id="community" aria-labelledby="community-heading"><div className="wrap">
    <div className="section-heading"><div><p className="eyebrow">The people behind the promise</p><h2 id="community-heading">Different journeys.<br /><em>A shared sense of purpose.</em></h2></div><LinkArrow href={`${COLLEGE}/alumni/`}>Meet our alumni community</LinkArrow></div>
    <div className="testimonial-grid">{testimonials.map(item => <figure className="testimonial-card" key={item.name}><div className="testimonial-top"><span className="quote-mark" aria-hidden="true">“</span><span>{item.label}</span></div><blockquote>“{item.quote}”</blockquote><figcaption><span className="person-avatar" aria-hidden="true">{item.initials}</span><span><strong>{item.name}</strong><small>{item.role}</small></span></figcaption><a className="quote-source" href={item.href}>Read the original message<ArrowUpRight size={13} aria-hidden="true" /></a></figure>)}</div>
  </div></section>;
}
function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const company = useRef<HTMLInputElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (status === "loading") return;
    if (!consent) { setStatus("error"); setMessage("Please agree to receive college updates before subscribing."); return; }
    setStatus("loading"); setMessage("");
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, consent, company: company.current?.value || "" }), signal: controller.signal });
      const body = await response.json() as { error?: string; ok?: boolean };
      if (!response.ok || body.ok !== true) throw new Error(body.error || "We couldn’t save your subscription. Please try again.");
      setStatus("success"); setMessage("Thank you. Your subscription has been saved."); setEmail(""); setConsent(false);
    } catch (error) { setStatus("error"); setMessage(error instanceof Error && error.name === "AbortError" ? "This is taking longer than expected. Please try again." : error instanceof Error ? error.message : "We couldn’t save your subscription. Please try again."); }
    finally { clearTimeout(timeout); }
  }
  return <div className="newsletter"><div><p className="eyebrow">Keep in touch</p><h3>A little closer to campus.</h3><p>Sign up for college news, events and admission updates.</p></div><form onSubmit={submit}>
    <label className="sr-only" htmlFor="newsletter-email">Your email address</label><div className="newsletter-input-row"><input id="newsletter-email" name="email" type="email" autoComplete="email" maxLength={254} required value={email} onChange={event => setEmail(event.target.value)} placeholder="Your email address" disabled={status === "loading"} aria-describedby="newsletter-status" /><button type="submit" disabled={status === "loading"} aria-label={status === "loading" ? "Saving subscription" : "Subscribe to newsletter"}>{status === "loading" ? <Loader2 className="spin" size={20} /> : <ArrowUpRight size={24} />}</button></div>
    <div className="form-trap" aria-hidden="true"><label htmlFor="newsletter-company">Company website</label><input id="newsletter-company" ref={company} name="company" autoComplete="off" tabIndex={-1} /></div>
    <div className="newsletter-consent"><Checkbox id="newsletter-consent" checked={consent} onCheckedChange={value => setConsent(value === true)} disabled={status === "loading"} /><label htmlFor="newsletter-consent">I agree to receive CPMC updates by email. <a href="/privacy">Privacy & unsubscribe</a></label></div>
    <p id="newsletter-status" className={`newsletter-status ${status}`} role={status === "error" ? "alert" : "status"} aria-live="polite">{message}</p>
  </form></div>;
}
function Footer() {
  return <footer className="site-footer"><div className="wrap">
    <div className="footer-invitation"><div><p className="eyebrow">Your future starts with a first step</p><h2>Bring your ambition.<br /><em>We’ll help it grow.</em></h2></div><ButtonLink href={`${COLLEGE}/admission-announcements/`} variant="light">Begin your journey</ButtonLink></div>
    <Newsletter />
    <div className="footer-grid"><div className="footer-about"><Brand footer /><p>A community of learning and care, preparing the next generation of healthcare professionals in Lahore.</p><SocialLinks /><Recognition compact /></div>
      <div className="footer-column"><h3>Study at CPMC</h3><a href={`${COLLEGE}/mbbs-admissions-2024-29/`}>MBBS</a><a href={`${COLLEGE}/programs/`}>Nursing</a><a href={`${COLLEGE}/central-park-college-of-allied-health-sciences-3/`}>Physical Therapy</a><a href={`${COLLEGE}/central-park-college-of-allied-health-sciences-2/`}>Allied Health Sciences</a><a href={`${COLLEGE}/department-of-anesthesia/`}>Postgraduate Training</a><a href={`${COLLEGE}/college-of-pharmacy/`}>College of Pharmacy</a></div>
      <div className="footer-column"><h3>Useful links</h3><a href={`${COLLEGE}/admission-announcements/`}>Admissions</a><a href="https://portal.cpmc.edu.pk/">Student portal</a><a href={`${COLLEGE}/library/`}>Library</a><a href={`${COLLEGE}/careers/`}>Careers</a><a href={`${COLLEGE}/alumni/`}>Alumni</a><a href={HOSPITAL}>Teaching Hospital</a><a href={`${COLLEGE}/policies-for-students/`}>Student policies</a></div>
      <div className="footer-column footer-contact"><h3>Come find us</h3><p><MapPin size={18} aria-hidden="true" /><span>31 km Ferozepur Road,<br />Central Park Housing Scheme,<br />Lahore, Pakistan</span></p><LinkArrow href={MAP}>Get directions</LinkArrow><a className="contact-line" href="tel:+924234500003"><Phone size={17} aria-hidden="true" /><span>Hospital helpline<br /><strong>042 3450 0003</strong></span></a><a className="contact-line" href={CONTACT}><Mail size={17} aria-hidden="true" />Contact the college</a></div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Central Park Medical College. All rights reserved.</p><div><a href="/privacy">Privacy</a><a href={`${COLLEGE}/contact-us/`}>Contact</a><a href="#top">Back to top ↑</a></div></div>
  </div></footer>;
}
export default function Homepage() {
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  function findPrograms(nextCategory: Category, nextQuery: string) {
    setCategory(nextCategory); setQuery(nextQuery.trim());
    requestAnimationFrame(() => { const heading = document.getElementById("programs-heading"); heading?.setAttribute("tabindex", "-1"); heading?.focus({ preventScroll: true }); document.getElementById("programs")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); });
  }
  return <div id="top"><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero onFind={findPrograms} /><Metrics /><Programs category={category} setCategory={setCategory} query={query} clearSearch={() => setQuery("")} /><TeachingHospital /><CampusLife /><Leadership /><Admissions /><News /><Testimonials /></main><Footer /></div>;
}

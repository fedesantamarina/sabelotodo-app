import { useEffect, useCallback } from 'react'
import { useAppStore } from './store/useAppStore'
import { t } from './i18n'
import { useInView } from './hooks/useInView'
import {
  Zap, Brain, AlertTriangle, Clock, Target,
  Headphones, Monitor, Mic, User, Languages,
  Cpu, MessageCircle, Code, RefreshCw, Globe, Users,
  ChevronDown, ArrowRight, Play, Shield
} from 'lucide-react'

function Nav() {
  const { lang, toggleLang, menuOpen, toggleMenu, setMenuOpen, activeSection } = useAppStore()
  const i = t[lang].nav

  const handleScroll = useCallback(() => {
    const nav = document.querySelector('.nav')
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled')
    } else {
      nav?.classList.remove('scrolled')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const links = [
    { id: 'features', label: i.features },
    { id: 'how-it-works', label: i.howItWorks },
    { id: 'modes', label: i.modes },
    { id: 'metrics', label: i.metrics },
    { id: 'audience', label: i.whoFor },
    { id: 'faq', label: i.faq },
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Sabelotodo
          </a>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={activeSection === l.id ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.id) }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <button className="lang-toggle" onClick={toggleLang}>
              <span className={lang === 'en' ? 'active-lang' : ''}>EN</span>
              <span>/</span>
              <span className={lang === 'es' ? 'active-lang' : ''}>ES</span>
            </button>
            <button className="btn-primary" onClick={() => scrollTo('cta')}>
              <span>{i.cta}</span>
            </button>
            <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollTo(l.id) }}>
            {l.label}
          </a>
        ))}
        <button className="btn-primary" onClick={() => scrollTo('cta')} style={{ marginTop: 16 }}>
          <span>{i.cta}</span>
        </button>
      </div>
    </>
  )
}

function SectionObserver({ id }) {
  const setActiveSection = useAppStore((s) => s.setActiveSection)

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [id, setActiveSection])

  return null
}

function FadeUp({ children, className = '' }) {
  const [ref, inView] = useInView({ once: true, threshold: 0.15 })
  return (
    <div ref={ref} className={`fade-up ${inView ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

function Stagger({ children, className = '' }) {
  const [ref, inView] = useInView({ once: true, threshold: 0.1 })
  return (
    <div ref={ref} className={`stagger ${inView ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

function Hero() {
  const lang = useAppStore((s) => s.lang)
  const i = t[lang].hero

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
      </div>
      <div className="container">
        <FadeUp>
          <div className="hero-badge">
            <span className="dot" />
            {i.badge}
          </div>
        </FadeUp>
        <FadeUp>
          <h1>
            {i.title1} <span className="highlight">{i.titleHighlight}</span>
            <br />{i.title2}
          </h1>
        </FadeUp>
        <FadeUp>
          <p className="hero-subtitle">{i.subtitle}</p>
        </FadeUp>
        <FadeUp>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>
              <span><Zap size={18} /> {i.cta}</span>
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              <Play size={16} /> {i.ctaSecondary}
            </button>
          </div>
        </FadeUp>
        <Stagger className="hero-stats">
          <div className="hero-stat">
            <div className="value">{i.stat1}</div>
            <div className="label">{i.stat1Label}</div>
          </div>
          <div className="hero-stat">
            <div className="value">{i.stat2}</div>
            <div className="label">{i.stat2Label}</div>
          </div>
          <div className="hero-stat">
            <div className="value">{i.stat3}</div>
            <div className="label">{i.stat3Label}</div>
          </div>
        </Stagger>
      </div>
    </section>
  )
}

function Problem() {
  const lang = useAppStore((s) => s.lang)
  const i = t[lang].problem

  return (
    <section id="problem">
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-tag"><AlertTriangle size={14} /> {i.tag}</div>
            <h2 className="section-title">{i.title}</h2>
            <p className="section-subtitle">{i.subtitle}</p>
          </div>
        </FadeUp>
        <Stagger className="problem-grid">
          <div className="problem-card">
            <div className="icon-wrap"><Clock size={22} /></div>
            <h3>{i.card1Title}</h3>
            <p>{i.card1Desc}</p>
          </div>
          <div className="problem-card">
            <div className="icon-wrap"><Brain size={22} /></div>
            <h3>{i.card2Title}</h3>
            <p>{i.card2Desc}</p>
          </div>
          <div className="problem-card">
            <div className="icon-wrap"><Target size={22} /></div>
            <h3>{i.card3Title}</h3>
            <p>{i.card3Desc}</p>
          </div>
        </Stagger>
      </div>
    </section>
  )
}

function HowItWorks() {
  const lang = useAppStore((s) => s.lang)
  const i = t[lang].howItWorks

  return (
    <section id="how-it-works">
      <SectionObserver id="how-it-works" />
      <div className="container">
        <FadeUp>
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div className="section-tag"><Zap size={14} /> {i.tag}</div>
            <h2 className="section-title">{i.title}</h2>
          </div>
        </FadeUp>
        <Stagger className="steps-grid">
          {i.steps.map((step) => (
            <div className="step-card" key={step.num}>
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

function Modes() {
  const lang = useAppStore((s) => s.lang)
  const i = t[lang].modes

  const modes = [
    { ...i.interview, icon: <Headphones size={22} /> },
    { ...i.system, icon: <Monitor size={22} /> },
    { ...i.mic, icon: <Mic size={22} /> },
  ]

  return (
    <section id="modes">
      <SectionObserver id="modes" />
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-tag"><Headphones size={14} /> {i.tag}</div>
            <h2 className="section-title">{i.title}</h2>
          </div>
        </FadeUp>
        <Stagger className="modes-grid">
          {modes.map((m) => (
            <div className="mode-card" key={m.title}>
              <div className="mode-badge">{m.badge}</div>
              <div className="icon-wrap">{m.icon}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

function Personalization() {
  const lang = useAppStore((s) => s.lang)
  const i = t[lang].personalization

  return (
    <section id="personalization">
      <div className="container">
        <div className="personalization-layout">
          <FadeUp className="personalization-content">
            <div className="section-tag"><User size={14} /> {i.tag}</div>
            <h2 className="section-title">{i.title}</h2>
            <p className="section-subtitle">{i.desc}</p>
          </FadeUp>
          <FadeUp>
            <div className="personalization-example">
              <div className="example-header">
                <div className="dots">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
              </div>
              <div className="example-body">
                <div className="example-question">{i.example}</div>
                <p className="example-answer">{i.exampleDesc}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const lang = useAppStore((s) => s.lang)
  const i = t[lang].features

  return (
    <section id="features">
      <SectionObserver id="features" />
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-tag"><Zap size={14} /> {i.tag}</div>
            <h2 className="section-title">{i.title}</h2>
          </div>
        </FadeUp>
        <Stagger className="features-grid">
          <div className="feature-card">
            <div className="icon-wrap"><Languages size={22} /></div>
            <h3>{i.bilingual.title}</h3>
            <p>{i.bilingual.desc}</p>
          </div>
          <div className="feature-card">
            <div className="icon-wrap"><Cpu size={22} /></div>
            <h3>{i.engines.title}</h3>
            <div className="engine-list">
              <div className="engine-item">
                <span className="engine-dot remote" />
                <span>{i.engines.remote}</span>
              </div>
              <div className="engine-item">
                <span className="engine-dot local" />
                <span>{i.engines.local}</span>
              </div>
            </div>
          </div>
          <div className="feature-card">
            <div className="icon-wrap"><MessageCircle size={22} /></div>
            <h3>{i.whatsapp.title}</h3>
            <p>{i.whatsapp.desc}</p>
          </div>
        </Stagger>
      </div>
    </section>
  )
}

function Metrics() {
  const lang = useAppStore((s) => s.lang)
  const i = t[lang].metrics

  return (
    <section id="metrics">
      <SectionObserver id="metrics" />
      <div className="container">
        <FadeUp>
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div className="section-tag"><Zap size={14} /> {i.tag}</div>
            <h2 className="section-title">{i.title}</h2>
          </div>
        </FadeUp>
        <Stagger className="metrics-grid">
          {i.items.map((m) => (
            <div className="metric-card" key={m.label}>
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

function Audience() {
  const lang = useAppStore((s) => s.lang)
  const i = t[lang].audience

  const icons = { code: Code, refresh: RefreshCw, globe: Globe, users: Users }

  return (
    <section id="audience">
      <SectionObserver id="audience" />
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-tag"><Users size={14} /> {i.tag}</div>
            <h2 className="section-title">{i.title}</h2>
          </div>
        </FadeUp>
        <Stagger className="audience-grid">
          {i.items.map((item) => {
            const Icon = icons[item.icon]
            return (
              <div className="audience-card" key={item.title}>
                <div className="icon-wrap"><Icon size={22} /></div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

function NotWhat() {
  const lang = useAppStore((s) => s.lang)
  const i = t[lang].notWhat

  return (
    <div className="not-what">
      <div className="container">
        <FadeUp>
          <div className="not-what-inner">
            <Shield size={32} style={{ color: 'var(--accent)', marginBottom: 16 }} />
            <h2>{i.title}</h2>
            <p>{i.desc}</p>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}

function FAQ() {
  const lang = useAppStore((s) => s.lang)
  const { openFaq, toggleFaq } = useAppStore()
  const i = t[lang].faq

  return (
    <section id="faq">
      <SectionObserver id="faq" />
      <div className="container">
        <FadeUp>
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div className="section-tag">{i.tag}</div>
            <h2 className="section-title">{i.title}</h2>
          </div>
        </FadeUp>
        <div className="faq-list">
          {i.items.map((item, idx) => (
            <div className={`faq-item ${openFaq === idx ? 'open' : ''}`} key={idx}>
              <button className="faq-question" onClick={() => toggleFaq(idx)}>
                <span>{item.q}</span>
                <ChevronDown size={18} className="chevron" />
              </button>
              {openFaq === idx && (
                <div className="faq-answer">
                  <div className="faq-answer-inner">{item.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  const lang = useAppStore((s) => s.lang)
  const i = t[lang].cta

  return (
    <section className="cta-section" id="cta">
      <div className="cta-bg" />
      <div className="container">
        <FadeUp>
          <h2>{i.title}</h2>
          <p className="subtitle">{i.subtitle}</p>
          <button className="btn-primary">
            <span><ArrowRight size={20} /> {i.button}</span>
          </button>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const lang = useAppStore((s) => s.lang)
  const i = t[lang].footer

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">Sabelotodo</div>
            <div className="footer-tagline">{i.tagline}</div>
          </div>
          <div className="footer-right">{i.rights}</div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <Modes />
      <Personalization />
      <Features />
      <Metrics />
      <Audience />
      <NotWhat />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}

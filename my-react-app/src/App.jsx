import { useState, useEffect, useMemo, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Mail, Github, Linkedin, ArrowDown, Briefcase, Code, Wrench, Send, Menu, Database, BarChart3, GraduationCap, Award, Phone, FileDown, Eye, X } from 'lucide-react'

const PARTICLE_COUNT = 20

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [activeCert, setActiveCert] = useState(null)
  const [resumeUrl, setResumeUrl] = useState(null)
  const aboutRef = useRef(null)
  const eduRef = useRef(null)
  const projRef = useRef(null)
  const skillsRef = useRef(null)

  // Scroll-reveal for About + Education + Projects + Skills sections
  useEffect(() => {
    const sections = [aboutRef.current, eduRef.current, projRef.current, skillsRef.current].filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            entry.target.classList.remove('out-view')
          } else {
            entry.target.classList.remove('in-view')
            entry.target.classList.add('out-view')
          }
        })
      },
      { threshold: 0.15 }
    )
    sections.forEach((section) => {
      const items = section.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      items.forEach((el) => observer.observe(el))
    })
    return () => observer.disconnect()
  }, [])

  const particles = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: `${(i * 5.1 + 2) % 100}%`,
      size: 2 + (i % 5),
      duration: 8 + (i % 7) * 2,
      delay: -(i * 1.3),
      gold: i % 4 === 0,
      slow: i % 3 === 0,
    })), []
  )
  const [resumeOpen, setResumeOpen] = useState(false)

  useEffect(() => {
    const fetchResume = async () => {
      const { data, error } = await supabase
        .from('resume')
        .select('resume_url')
        .order('resume_id', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (data && !error) {
        const { data: urlData } = supabase.storage
          .from('resume')
          .getPublicUrl(data.resume_url)
        setResumeUrl(urlData.publicUrl)
      }
    }
    fetchResume()
  }, [])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const { error } = await supabase
      .from('contact_message')
      .insert([{
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }])

    setSubmitting(false)

    if (error) {
      setError('Failed to send message. Please try again.')
      console.error('Supabase error:', error)
      return
    }

    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const projects = [
    {
      title: 'OTG Puerto Galera Booking System',
      description: 'A comprehensive web-based booking management and analytics system for OTG Puerto Galera Travel and Tours. Features real-time appointment scheduling, automated email confirmations, a custom analytics dashboard for business monitoring, and AI-powered insights that interpret data visualizations for smarter decision-making.',
      tags: ['Node.js', 'Express.js', 'Supabase', 'PostgreSQL'],
    },
    {
      title: 'The Daily Bit',
      description: 'A responsive food blog designed and deployed using HTML and CSS. Structured with an intuitive user interface to effectively showcase recipes and food content with clean layouts and engaging visuals.',
      tags: ['HTML5', 'CSS3', 'Responsive Design'],
    },
  ]

  const education = [
    {
      role: 'BS Information Technology',
      date: 'Currently Enrolled',
      company: 'Batangas State University \u2013 The National Engineering University',
      description: 'Major in Business Analytics. Dean\u2019s Lister (1st Semester AY 2024\u20132025). Relevant coursework includes Web Systems and Technologies, Information Assurance and Security, and Database Management Systems.',
    },
  ]

  const certifications = [
    {
      name: 'Data Analytics Essentials \u2013 Cisco',
      description: 'Completed Cisco\u2019s Data Analytics Essentials course, gaining foundational skills in data collection, preparation, analysis, and visualization \u2014 including hands-on practice with tools and techniques used to derive actionable insights from data.',
      certificate: '/Data_Analytics_Essentials_certificate_nelvingarciacatapang-gmail-com_60ceb2a0-06bd-413a-8092-c9ad3abf5082.pdf',
    },
    {
      name: 'CCNAv7: Switching, Routing, and Wireless Essentials \u2013 Cisco',
      certificate: '/CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_22-02551-g-batstate-u-edu-ph_23ed3d9e-d83a-47fe-916a-9d8c213175ea.pdf',
    },
    {
      name: 'CCNAv7: Introduction to Networks \u2013 Cisco',
      certificate: '/CCNA-_Introduction_to_Networks_certificate_22-02551-g-batstate-u-edu-ph_784af1c1-ed9d-4bea-a295-d25f16fcb1a6.pdf',
    },
    {
      name: 'Apply AI: Update Your Resume \u2013 Cisco',
      certificate: '/Apply_AI-_Update_Your_Resume_certificate_nelvingarciacatapang-gmail-com_7829b400-7404-4b57-ba95-a85cd0054212.pdf',
    },
    {
      name: 'Computer Hardware Basics \u2013 Cisco',
      certificate: '/Computer_Hardware_Basics_certificate_nelvingarciacatapang-gmail-com_69e85e6d-087d-4126-a92d-b716cff708a6.pdf',
    },
    {
      name: 'ASEAN Data Science Explorers \u2013 Enablement Session 2023/2024',
      certificate: '/ADSE_NELVIN G. CATAPANG .pdf',
    },
    { name: 'Hackin\u2019 Ka Na Lang 2023 \u2013 Cybersecurity Conference' },
    {
      name: 'BITCON \u2013 Batangas IT Conference',
      certificate: '/JPCS BSU Alangilan 0334 Nelvin G. Catapang.pdf',
    },
    {
      name: 'PIVOT 2025 \u2013 Regional Tech & Innovation Summit',
      certificate: '/Nelvin G. Catapang.png',
    },
  ]

  const skills = [
    {
      category: 'Web Development',
      icon: <Code className="w-5 h-5" />,
      items: ['JavaScript', 'Node.js', 'Express.js', 'HTML5', 'CSS3', 'Bootstrap'],
    },
    {
      category: 'Data & Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      items: ['Power BI', 'Google Looker Studio', 'Python', 'Excel (PivotTables)', 'Google Colab'],
    },
    {
      category: 'Database & Tools',
      icon: <Database className="w-5 h-5" />,
      items: ['Supabase', 'PostgreSQL', 'SQL', 'Git/GitHub', 'VS Code', 'Postman'],
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-navy-dark/85 backdrop-blur-md border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold tracking-wide bg-linear-to-r from-foreground to-gold bg-clip-text text-transparent">
            NELVIN
          </span>
          <ul className="hidden md:flex gap-8 list-none m-0 p-0">
            {[{ label: 'About', href: 'about' }, { label: 'Education', href: 'experience' }, { label: 'Projects', href: 'projects' }, { label: 'Skills', href: 'skills' }, { label: 'Contact', href: 'contact' }].map((item) => (
              <li key={item.label}>
                <a
                  href={`#${item.href}`}
                  className="text-muted-foreground text-sm font-medium uppercase tracking-wider hover:text-gold transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gold hover:text-gold hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-navy-dark border-l border-white/10 w-70 p-0">
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-white/10">
                  <span className="text-lg font-bold tracking-widest bg-linear-to-r from-foreground to-gold bg-clip-text text-transparent">
                    NELVIN
                  </span>
                </div>
                {/* Nav Links */}
                <nav className="flex flex-col px-4 py-6 gap-1">
                  {[{ label: 'About', href: 'about' }, { label: 'Education', href: 'experience' }, { label: 'Projects', href: 'projects' }, { label: 'Skills', href: 'skills' }, { label: 'Contact', href: 'contact' }].map((item) => (
                    <a
                      key={item.label}
                      href={`#${item.href}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground font-medium hover:text-gold hover:bg-white/5 transition-all"
                    >
                      <span className="text-gold text-xs">&#x25B8;</span>
                      {item.label}
                    </a>
                  ))}
                </nav>
                {/* Footer inside drawer */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-white/10">
                  <p className="text-xs text-muted-foreground">nelvingarciacatapang@gmail.com</p>
                  <a href="https://github.com/nelvsss" target="_blank" rel="noopener noreferrer" className="text-xs text-gold hover:underline">github.com/nelvsss</a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #151a23 0%, #0a0e14 100%)',
          }}
        >
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-100"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          {/* Floating particles */}
          {particles.map((p) => (
            <span
              key={p.id}
              className="hero-particle"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                background: p.gold ? 'rgba(226,183,20,0.7)' : 'rgba(255,255,255,0.25)',
                boxShadow: p.gold ? '0 0 6px 1px rgba(226,183,20,0.4)' : 'none',
                animationName: p.slow ? 'float-up-slow' : 'float-up',
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
          <div className="relative z-10 px-6">
            <p className="hero-greeting text-lg sm:text-xl text-muted-foreground mb-3 font-medium">
              Hi, I'm Nelvin Catapang
            </p>
            <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              IT &amp; Analytics
            </h1>
            <p className="hero-subtitle text-lg sm:text-xl text-gold max-w-2xl mx-auto mb-10 font-normal">
              Web Development &middot; Data Analytics &middot; Business Intelligence
            </p>
            <a href="#projects" className="hero-cta inline-block">
              <Button
                variant="outline"
                size="lg"
                className="border-gold text-gold hover:bg-gold hover:text-navy-dark font-semibold uppercase tracking-widest text-base px-8 py-6 cursor-pointer"
              >
                View My Work
                <ArrowDown className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 max-w-6xl mx-auto" ref={aboutRef}>
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl font-bold text-foreground mb-2">About</h2>
            <Separator className="w-16 mx-auto mt-3 bg-gold h-1 rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed reveal-left reveal-delay-1">
                I'm a motivated Information Technology student majoring in Business Analytics at Batangas State University. I combine a versatile technical skillset in Web Development (Node.js/Supabase) with strong Data Analytics capabilities (Power BI/Python).
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed reveal-left reveal-delay-2">
                I have practical experience building web-based management systems with integrated AI features. I'm passionate about turning data into actionable insights and building tools that solve real-world problems.
              </p>
              <p className="text-muted-foreground text-sm reveal-left reveal-delay-3">
                <span className="text-gold">Location:</span> Balete, Batangas City, Philippines
              </p>
              <div className="flex gap-3 reveal-left reveal-delay-4">
                <Button
                  variant="outline"
                  disabled={!resumeUrl}
                  onClick={() => setResumeOpen(true)}
                  className="border-gold text-gold hover:bg-gold hover:text-navy-dark font-semibold uppercase tracking-widest text-sm px-6 py-4 cursor-pointer disabled:opacity-50"
                >
                  <Eye className="mr-2 w-4 h-4" />
                  {resumeUrl ? 'View Resume' : 'Loading...'}
                </Button>
                <a
                  href={resumeUrl || '#'}
                  download
                >
                  <Button
                    variant="outline"
                    disabled={!resumeUrl}
                    className="border-gold/50 text-gold/70 hover:bg-gold hover:text-navy-dark font-semibold uppercase tracking-widest text-sm px-6 py-4 cursor-pointer disabled:opacity-50"
                  >
                    <FileDown className="mr-2 w-4 h-4" />
                    Download
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex justify-center reveal-right">
              <div className="relative">
                <div className="w-64 h-64 rounded-2xl bg-navy-light flex items-center justify-center">
                  <span className="text-[10rem] font-black leading-none text-navy-dark" style={{ textShadow: '-2px -2px 0 #e2b714, 2px -2px 0 #e2b714, -2px 2px 0 #e2b714, 2px 2px 0 #e2b714' }}>
                    N
                  </span>
                </div>
                <div className="absolute -inset-4 border-2 border-gold/30 rounded-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="experience" className="py-24 px-6 bg-navy" ref={eduRef}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-4xl font-bold text-foreground mb-2">Education</h2>
              <Separator className="w-16 mx-auto mt-3 bg-gold h-1 rounded-full" />
            </div>
            <div className="relative border-l-2 border-navy-light pl-8 ml-4 space-y-8">
              {education.map((edu, i) => (
                <Card
                  key={i}
                  className="reveal-left bg-card/60 border-white/5 hover:border-gold/50 hover:translate-x-2 transition-all duration-300 group relative"
                  style={{ transitionDelay: `${i * 0.15 + 0.1}s` }}
                >
                  <div className="absolute -left-[2.85rem] top-8 w-4 h-4 bg-gold rounded-full border-4 border-navy-dark shadow-[0_0_0_2px_#e2b714]" />
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-gold" />
                      {edu.role}
                    </CardTitle>
                    <CardDescription className="space-y-1">
                      <span className="text-gold font-mono text-sm">{edu.date}</span>
                      <br />
                      <span className="text-muted-foreground font-semibold">{edu.company}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Certifications */}
            <div className="grid md:grid-cols-1 gap-8 mt-16">
              <Card className="reveal bg-card/60 border-white/5" style={{ transitionDelay: '0.25s' }}>
                <CardHeader>
                  <CardTitle className="text-lg text-gold flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Certifications & Trainings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                    {certifications.map((cert, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="text-gold mt-1 shrink-0">&#x25B8;</span>
                        <span className="flex flex-col items-start gap-1.5">
                          <span className="text-foreground font-medium">{cert.name}</span>
                          {cert.description && (
                            <p className="text-muted-foreground text-xs leading-relaxed">{cert.description}</p>
                          )}
                          {cert.certificate && (
                            <button
                              onClick={() => setActiveCert(cert)}
                              className="inline-flex items-center gap-1 text-xs text-gold border border-gold/40 rounded px-2 py-0.5 hover:bg-gold/10 transition-colors cursor-pointer"
                            >
                              <Award className="w-3 h-3" />
                              View Certificate
                            </button>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 max-w-6xl mx-auto" ref={projRef}>
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl font-bold text-foreground mb-2">Projects</h2>
            <Separator className="w-16 mx-auto mt-3 bg-gold h-1 rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <Card
                key={i}
                className="reveal bg-card/60 border-white/5 hover:border-gold/30 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer group"
                style={{ transitionDelay: `${i * 0.15 + 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-gold/30 text-gold bg-gold/10 hover:bg-gold/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 bg-navy" ref={skillsRef}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-4xl font-bold text-foreground mb-2">Skills</h2>
              <Separator className="w-16 mx-auto mt-3 bg-gold h-1 rounded-full" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((group, gi) => (
                <div
                  key={group.category}
                  className="reveal space-y-4"
                  style={{ transitionDelay: `${gi * 0.15 + 0.1}s` }}
                >
                  <h3 className="text-center text-gold uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-2">
                    {group.icon}
                    {group.category}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((skill, si) => (
                      <li
                        key={skill}
                        className="bg-card/60 px-4 py-3 rounded-lg font-medium border-l-3 border-gold hover:bg-navy-light hover:pl-6 transition-all duration-200"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-2">Contact</h2>
            <Separator className="w-16 mx-auto mt-3 bg-gold h-1 rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hello, feel free to reach out.
              </p>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:nelvingarciacatapang@gmail.com"
                    className="text-gold hover:text-gold-dark text-lg inline-flex items-center gap-3 border-b border-transparent hover:border-gold transition-all"
                  >
                    <Mail className="w-5 h-5" /> nelvingarciacatapang@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/nelvsss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-dark text-lg inline-flex items-center gap-3 border-b border-transparent hover:border-gold transition-all"
                  >
                    <Github className="w-5 h-5" /> github.com/nelvsss
                  </a>
                </li>
                <li>
                  <span
                    className="text-gold text-lg inline-flex items-center gap-3"
                  >
                    <Phone className="w-5 h-5" /> (+63) 927-206-0133
                  </span>
                </li>
              </ul>
            </div>
            <Card className="bg-card/60 border-white/5">
              <CardContent className="pt-6">
                <form className="space-y-5" onSubmit={handleFormSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gold">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="bg-black/20 border-navy-light focus:border-gold focus:ring-gold/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gold">
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="bg-black/20 border-navy-light focus:border-gold focus:ring-gold/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-gold">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      className="min-h-37.5 bg-black/20 border-navy-light focus:border-gold focus:ring-gold/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gold text-navy-dark hover:bg-gold-dark font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
                    size="lg"
                  >
                    {submitting ? 'Sending...' : submitted ? 'Message Sent!' : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                  {error && (
                    <p className="text-red-400 text-sm text-center mt-2">{error}</p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Resume Modal */}
      {resumeOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setResumeOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-navy-dark rounded-xl border border-white/10 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
              <h3 className="text-foreground font-semibold text-sm pr-4 leading-snug">Resume</h3>
              <div className="flex items-center gap-3">
                <a
                  href={resumeUrl}
                  download
                  className="text-muted-foreground hover:text-gold transition-colors"
                  title="Download"
                >
                  <FileDown className="w-5 h-5" />
                </a>
                <button
                  onClick={() => setResumeOpen(false)}
                  className="text-muted-foreground hover:text-gold transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto min-h-0">
              <iframe
                src={resumeUrl}
                className="w-full h-[75vh]"
                title="Resume"
              />
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-navy-dark rounded-xl border border-white/10 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
              <h3 className="text-foreground font-semibold text-sm pr-4 leading-snug">{activeCert.name}</h3>
              <button
                onClick={() => setActiveCert(null)}
                className="text-muted-foreground hover:text-gold transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Modal Body */}
            <div className="flex-1 overflow-hidden rounded-b-xl bg-white/5">
              {activeCert.certificate.endsWith('.png') || activeCert.certificate.endsWith('.jpg') || activeCert.certificate.endsWith('.jpeg') ? (
                <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
                  <img
                    src={activeCert.certificate}
                    alt={activeCert.name}
                    className="max-w-full max-h-full object-contain rounded shadow-lg"
                  />
                </div>
              ) : (
                <iframe
                  src={`${activeCert.certificate}#toolbar=0&navpanes=0&scrollbar=0`}
                  title={activeCert.name}
                  className="w-full h-full border-0"
                  style={{ height: '75vh', display: 'block' }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-8 px-6 text-muted-foreground text-sm border-t border-white/5">
        <p>&copy; 2026 Nelvin Catapang. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App

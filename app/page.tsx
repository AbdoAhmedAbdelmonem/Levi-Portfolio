"use client"

import React, { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    // Mouse Blob Follower
    const blob = document.getElementById("cursor-blob")
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      if (blob) {
        blob.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      }
    }
    document.addEventListener("mousemove", handleMouseMove)

    // Parallax Effect
    const handleScroll = () => {
      const scroll = window.pageYOffset

      // Hero parallax
      const parallaxTexts = document.querySelectorAll(".parallax-text")
      parallaxTexts.forEach((text) => {
        const speed = text.getAttribute("data-speed")
        if (speed) {
          ;(text as HTMLElement).style.transform = `translateX(${scroll * Number.parseFloat(speed) * 0.1}px)`
        }
      })

      const heroImg = document.getElementById("hero-img")
      if (heroImg) {
        heroImg.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.2}px)) scale(${1 + scroll * 0.0005})`
      }

      // Floating labels in project section
      const labels = document.querySelectorAll(".floating-label")
      labels.forEach((label, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        ;(label as HTMLElement).style.transform = `translateY(${scroll * 0.1 * direction}px)`
      })

      // Terminal visualization scroll interactions
      const terminalViz = document.getElementById("terminal-viz")
      if (terminalViz) {
        const translateY = Math.sin(scroll * 0.005) * 10
        terminalViz.style.transform = `translateY(${translateY}px)`
      }

      // Particles parallax
      const particles = document.querySelectorAll(".particle")
      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.03
        const direction = index % 2 === 0 ? 1 : -1
        const yMove = Math.sin(scroll * speed) * 30 * direction
        const xMove = Math.cos(scroll * speed * 0.5) * 20
        ;(particle as HTMLElement).style.transform = `translate(${xMove}px, ${yMove}px)`
      })

      // Terminal window subtle tilt
      const terminalWindow = document.querySelector(".terminal-window") as HTMLElement
      if (terminalWindow) {
        const rotateX = Math.sin(scroll * 0.003) * 2
        const rotateY = Math.cos(scroll * 0.003) * 2
        terminalWindow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }

      // Glow lines animation
      const glowLines = document.querySelectorAll(".glow-line")
      glowLines.forEach((line, index) => {
        const opacity = 0.3 + Math.sin(scroll * 0.02 + index) * 0.3
        ;(line as SVGElement).style.opacity = opacity.toString()
      })

      // Timeline spiral animations
      const spiralPaths = document.querySelectorAll(".spiral-path")
      spiralPaths.forEach((path, index) => {
        const pathElement = path as SVGPathElement
        const length = pathElement.getTotalLength ? pathElement.getTotalLength() : 1000
        const drawAmount = (scroll * 0.5) % length
        const direction = index % 2 === 0 ? 1 : -1
        pathElement.style.strokeDasharray = `${length}`
        pathElement.style.strokeDashoffset = `${length - drawAmount * direction}`
      })

      // Timeline orbs floating
      const timelineOrbs = document.querySelectorAll(".timeline-orb")
      timelineOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.02
        const xMove = Math.sin(scroll * speed) * 30
        const yMove = Math.cos(scroll * speed) * 20
        const scale = 1 + Math.sin(scroll * speed * 0.5) * 0.2
        ;(orb as HTMLElement).style.transform = `translate(${xMove}px, ${yMove}px) scale(${scale})`
      })
    }
    window.addEventListener("scroll", handleScroll)

    // Simple reveal on enter (Intersection Observer)
    const observerOptions = {
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".reveal-text").forEach((text) => {
      observer.observe(text)
    })

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const href = (this as HTMLAnchorElement).getAttribute("href")
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  const [menuOpen, setMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    document.body.style.overflow = menuOpen ? '' : 'hidden'
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <div className="blob" id="cursor-blob"></div>

      <nav>
        <div className="logo">Abdo Ahmed</div>
        
        {/* Desktop Nav */}
        <ul className="nav-links desktop-nav">
          <li>
            <a href="#work">Projects</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        {/* Hamburger Menu Button */}
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu}>
        <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
          <a href="#work" onClick={closeMenu}>Projects</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </div>
      </div>

      <main>
        {/* HERO SECTION */}
        <section id="hero">
          {/* Animated Gradient Orbs */}
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>
          
          <img
            src="/Images/DeWatermark.ai_1748512990329.jpg"
            alt="Abdo Ahmed"
            className="hero-img"
            id="hero-img"
          />
          <div className="hero-title-container container">
            <span className="hero-type parallax-text" data-speed="-2">
              FULL STACK
            </span>
            <span className="hero-type outline-text parallax-text" data-speed="2">
              DEVELOPER
            </span>
            <a href="/Images/CV/Abdelrahman_Ahmed_Resume.pdf" download className="download-cv-btn">
              Get My CV
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
          </div>
        </section>

        {/* INTRO */}
        <section id="about">
          <div className="container">
            <div className="about-intro-grid">
              <div className="about-intro-text">
                <h2
                  style={{
                    fontSize: "3rem",
                    fontFamily: "var(--syne)",
                    marginBottom: "40px",
                  }}
                >
                  BUILDING DIGITAL EXPERIENCES THAT MAKE AN IMPACT.
                </h2>
                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 300,
                    color: "#888",
                  }}
                >
                  I&apos;m Abdo Ahmed, a full stack developer from Alexandria with a passion for coding and problem-solving. 
                  I completed the Alextream bootcamp for competitive programming, and I love tackling algorithmic challenges 
                  just as much as I enjoy building sleek, interactive websites.
                </p>
              </div>
              
              {/* Creative Terminal Animation */}
              <div className="terminal-visualization" id="terminal-viz">
                {/* Floating Particles */}
                <div className="particles-container">
                  <div className="particle particle-1"></div>
                  <div className="particle particle-2"></div>
                  <div className="particle particle-3"></div>
                  <div className="particle particle-4"></div>
                  <div className="particle particle-5"></div>
                  <div className="particle particle-6"></div>
                </div>
                
                {/* Terminal Window */}
                <div className="terminal-window">
                  <div className="terminal-header">
                    <div className="terminal-btn terminal-btn-red"></div>
                    <div className="terminal-btn terminal-btn-yellow"></div>
                    <div className="terminal-btn terminal-btn-green"></div>
                    <span className="terminal-title">abdo@portfolio ~ </span>
                  </div>
                  <div className="terminal-body">
                    <div className="terminal-line">
                      <span className="terminal-prompt">$</span>
                      <span className="terminal-text typing-1">whoami</span>
                    </div>
                    <div className="terminal-output output-1">Full Stack Developer</div>
                    <div className="terminal-line">
                      <span className="terminal-prompt">$</span>
                      <span className="terminal-text typing-2">cat skills.txt</span>
                    </div>
                    <div className="terminal-output output-2">
                      <span className="skill-tag">React</span>
                      <span className="skill-tag">Next.js</span>
                      <span className="skill-tag">TypeScript</span>
                      <span className="skill-tag">Python</span>
                    </div>
                    <div className="terminal-line">
                      <span className="terminal-prompt">$</span>
                      <span className="terminal-text typing-3">./build_something_amazing.sh</span>
                    </div>
                    <div className="terminal-output output-3">
                      <span className="success-text">✓ Building dreams...</span>
                    </div>
                    <div className="terminal-cursor"></div>
                  </div>
                </div>
                
                {/* Glowing Connection Lines */}
                <svg className="connection-lines" viewBox="0 0 400 400">
                  <line className="glow-line line-1" x1="50" y1="50" x2="150" y2="100" />
                  <line className="glow-line line-2" x1="350" y1="80" x2="250" y2="150" />
                  <line className="glow-line line-3" x1="30" y1="300" x2="130" y2="250" />
                  <line className="glow-line line-4" x1="370" y1="350" x2="270" y2="280" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* STATISTICS SECTION */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🚀</div>
                <div className="stat-number">6+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💻</div>
                <div className="stat-number">10K+</div>
                <div className="stat-label">Lines of Code</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🧩</div>
                <div className="stat-number">200+</div>
                <div className="stat-label">Problems Solved</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">☕</div>
                <div className="stat-number">∞</div>
                <div className="stat-label">Cups of Coffee</div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="skills-section">
          <div className="container">
            <h2 className="section-title">SKILLS & TOOLS</h2>
            <div className="skills-grid">
              {/* Frontend */}
              <div className="skill-category">
                <h4 className="skill-category-title">
                  <span className="skill-category-icon">🎨</span>
                  Frontend
                </h4>
                <div className="skill-list">
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>React / Next.js</span>
                      <span className="skill-percentage">90%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>TypeScript</span>
                      <span className="skill-percentage">85%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>CSS / Tailwind</span>
                      <span className="skill-percentage">92%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>Three.js</span>
                      <span className="skill-percentage">75%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend */}
              <div className="skill-category">
                <h4 className="skill-category-title">
                  <span className="skill-category-icon">⚙️</span>
                  Backend
                </h4>
                <div className="skill-list">
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>Python / Flask</span>
                      <span className="skill-percentage">80%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>Node.js</span>
                      <span className="skill-percentage">72%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "72%" }}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>SQL / PostgreSQL</span>
                      <span className="skill-percentage">90%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>REST APIs</span>
                      <span className="skill-percentage">85%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cloud & Tools */}
              <div className="skill-category">
                <h4 className="skill-category-title">
                  <span className="skill-category-icon">☁️</span>
                  Cloud & Tools
                </h4>
                <div className="skill-list">
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>AWS (S3, EC2)</span>
                      <span className="skill-percentage">90%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>Git / GitHub</span>
                      <span className="skill-percentage">90%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>Vercel / Netlify</span>
                      <span className="skill-percentage">95%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-name">
                      <span>Supabase / Firebase</span>
                      <span className="skill-percentage">85%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="scrolling-marquee">
          <div className="marquee-inner">
            <span className="huge-type outline-text">CHAMELEON — HACKERRANK — MORX — E-COMMERCE — AWS — AURA — </span>
            <span className="huge-type outline-text">CHAMELEON — HACKERRANK — MORX — E-COMMERCE — AWS — AURA — </span>
          </div>
        </div>

        {/* WORK SECTION */}
        <section id="work" className="container">
          <div className="sticky-type">PROJECTS</div>

          {/* Project 1 - Chameleon */}
          <div className="project-row">
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>001 / EDUCATION</span>
              <h3 className="project-title">
                CHAMELEON
              </h3>
              <p>
                A comprehensive educational platform for the Faculty of Computer and Data Science at Alexandria University. 
                Provides students and faculty with resources to enhance learning and research.
              </p>
              <div className="divider"></div>
              <p>TECH: Next.js, TypeScript, Tailwind CSS, Three.js,Shadcn UI, RadixUI, PostgresSQL, Google APIs, CronJobs</p>
              <div style={{ marginTop: "20px" }}>
                <a href="https://chameleon-nu.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">View Project →</a>
              </div>
            </div>
            <div className="project-media" style={{ bottom: "-50px" }}>
              <img
                src="/Images/Screenshot%202025-03-31%20225949.png"
                alt="Chameleon Project"
                className="project-image"
              />
              <div className="floating-label huge-type outline-text" style={{ fontSize: "8rem" }}>
                FCDS
              </div>
            </div>
          </div>

          {/* Project 2 - HackerRank */}
          <div className="project-row" style={{ flexDirection: "row-reverse" }}>
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>002 / EDUCATION</span>
              <h3 className="project-title">
                HACKERRANK
              </h3>
              <p>
                A premier coding platform that helps developers and students enhance their programming skills 
                through challenges, competitions, and interview preparation developed specially for Hackerrank FCDS Campus.
              </p>
              <div className="divider"></div>
              <p>TECH: Next.js, TypeScript, Tailwind CSS, Google Drive APIs</p>
              <div style={{ marginTop: "20px" }}>
                <a href="https://hr-fcds-materials.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">View Project →</a>
              </div>
            </div>
            <div className="project-media">
              <img
                src="/Images/Screenshot%202025-03-31%20225752.png"
                alt="HackerRank Project"
                className="project-image"
              />
              <div
                className="floating-label huge-type outline-text"
                style={{ fontSize: "8rem", right: "auto", left: "-100px" }}
              >
                CODE
              </div>
            </div>
          </div>

          {/* Project 3 - Morx */}
          <div className="project-row">
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>003 / PRODUCTIVITY</span>
              <h3 className="project-title">
                MORX
              </h3>
              <p>
                A team management platform that allows users to create teams with projects, 
                tasks, and files for seamless collaboration and productivity.
              </p>
              <div className="divider"></div>
              <p>TECH: Next.js, TypeScript, Express.js, Tailwind CSS, RadixUI, MySQL</p>
              <div style={{ marginTop: "20px" }}>
                <a href="https://morx-corp.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">View Project →</a>
              </div>
            </div>
            <div className="project-media">
              <img
                src="/Images/Morx.png"
                alt="Morx Project"
                className="project-image"
              />
              <div className="floating-label huge-type outline-text" style={{ fontSize: "8rem" }}>
                LEARN
              </div>
            </div>
          </div>

          {/* Project 4 - E-Commerce */}
          <div className="project-row" style={{ flexDirection: "row-reverse" }}>
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>004 / E-COMMERCE</span>
              <h3 className="project-title">
                SHOP
              </h3>
              <p>
                Next-generation E-commerce platform with a full-stack architecture. 
                Built with Python Flask backend and modern frontend design.
              </p>
              <div className="divider"></div>
              <p>TECH: Python, Flask, JavaScript, SQL Server</p>
              <div style={{ marginTop: "20px" }}>
                <a href="https://ecommerce-full-stack-project.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">View Project →</a>
              </div>
            </div>
            <div className="project-media">
              <img
                src="/Images/Screenshot%202025-03-31%20231118.png"
                alt="E-Commerce Project"
                className="project-image"
              />
              <div className="floating-label huge-type outline-text" style={{ fontSize: "8rem" }}>
                STORE
              </div>
            </div>
          </div>

          {/* Project 5 - AWS S3 */}
          <div className="project-row">
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>005 / CLOUD</span>
              <h3 className="project-title">
                AWS S3
              </h3>
              <p>
                Upload your files to Amazon S3 with this lightweight web application. 
                Perfect for team collaboration and personal storage.
              </p>
              <div className="divider"></div>
              <p>TECH: AWS S3, AWS EC2, JavaScript</p>
              <div style={{ marginTop: "20px" }}>
                <a href="https://aws-s3-sand.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">View Project →</a>
              </div>
            </div>
            <div className="project-media">
              <img
                src="/Images/img.png"
                alt="AWS S3 Project"
                className="project-image"
              />
              <div
                className="floating-label huge-type outline-text"
                style={{ fontSize: "8rem", right: "auto", left: "-100px" }}
              >
                CLOUD
              </div>
            </div>
          </div>

          {/* Project 6 - AURA MLR */}
          <div className="project-row" style={{ flexDirection: "row-reverse" }}>
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>006 / DATA SCIENCE</span>
              <h3 className="project-title">
                AURA
              </h3>
              <p>
                A full stack project for multiple linear regression analysis with statistics. 
                Developed with an awesome productive team.
              </p>
              <div className="divider"></div>
              <p>TECH: Python, Flask, JavaScript, Advanced Statistics, Machine Learning</p>
              <div style={{ marginTop: "20px" }}>
                <a href="https://aura-mlr.netlify.app/" target="_blank" rel="noopener noreferrer" className="project-link">View Project →</a>
              </div>
            </div>
            <div className="project-media">
              <img
                src="/Images/img_1.png"
                alt="AURA MLR Project"
                className="project-image"
              />
              <div className="floating-label huge-type outline-text" style={{ fontSize: "8rem" }}>
                MLR
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE / EXPERIENCE SECTION */}
        <section className="timeline-section">
          <div className="container">
            <div className="sticky-type">JOURNEY</div>
            <h2 className="section-title">MY JOURNEY</h2>
            <div className="timeline-container">
              <div className="timeline-line"></div>
              
              {/* Spiral Decorations */}
              <svg className="timeline-spiral spiral-left" viewBox="0 0 100 400" preserveAspectRatio="none">
                <path className="spiral-path spiral-path-1" d="M50,0 Q0,50 50,100 Q100,150 50,200 Q0,250 50,300 Q100,350 50,400" fill="none" stroke="url(#spiralGradient)" strokeWidth="2"/>
                <defs>
                  <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,62,0,0.8)"/>
                    <stop offset="50%" stopColor="rgba(255,62,0,0.3)"/>
                    <stop offset="100%" stopColor="rgba(255,62,0,0)"/>
                  </linearGradient>
                </defs>
              </svg>
              <svg className="timeline-spiral spiral-right" viewBox="0 0 100 400" preserveAspectRatio="none">
                <path className="spiral-path spiral-path-2" d="M50,0 Q100,50 50,100 Q0,150 50,200 Q100,250 50,300 Q0,350 50,400" fill="none" stroke="url(#spiralGradient2)" strokeWidth="2"/>
                <defs>
                  <linearGradient id="spiralGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,62,0,0)"/>
                    <stop offset="50%" stopColor="rgba(255,62,0,0.3)"/>
                    <stop offset="100%" stopColor="rgba(255,62,0,0.8)"/>
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Floating Orbs */}
              <div className="timeline-orb orb-1"></div>
              <div className="timeline-orb orb-2"></div>
              <div className="timeline-orb orb-3"></div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">2024 - PRESENT</div>
                  <h4 className="timeline-title">Full Stack Developer</h4>
                  <p className="timeline-description">
                    Building production-ready web applications with React, Next.js, and Python. 
                    Deployed multiple projects serving real users.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">2024</div>
                  <h4 className="timeline-title">First Project</h4>
                  <p className="timeline-description">
                    Launching the first version of chameleonFCDS to be the first educatioal site in Faculty of
                    Computer and Data Science Alexandria University - helping students to learn and understand
                    the subject.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">2024</div>
                  <h4 className="timeline-title">Alextream Bootcamp</h4>
                  <p className="timeline-description">
                    Completed intensive competitive programming bootcamp. 
                    Solved 200+ algorithmic problems and honed problem-solving skills.
                  </p>
                </div>
              </div>


              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">2023</div>
                  <h4 className="timeline-title">FCDS Alexandria University</h4>
                  <p className="timeline-description">
                    Studying Computer and Data Science at Alexandria University. 
                    Building strong foundations in algorithms, data structures, and software engineering.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">2022</div>
                  <h4 className="timeline-title">Started Coding Journey</h4>
                  <p className="timeline-description">
                    Discovered my passion for programming. Built first projects and 
                    fell in love with creating digital solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section className="about-section">
          <div className="container">
            <h2 className="section-title">ABOUT ME</h2>
            <div className="about-grid">
              <div className="about-card">
                <h4 className="about-card-title">FULL STACK DEVELOPER</h4>
                <p className="about-card-text">
                  I work at the intersection of design and engineering, crafting digital experiences 
                  that are both beautiful and functional. From competitive programming to web development, 
                  I bring precision and creativity to every project.
                </p>
              </div>
              <div className="about-images">
                <img
                  src="/Images/Screenshot%202025-03-31%20225949.png"
                  className="about-image"
                  alt="Chameleon Project"
                />
                <img
                  src="/Images/Screenshot 2025-03-31 225752.png"
                  className="about-image"
                  alt="HackerRank Project"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact">
          <div className="container">
            <div className="footer-cta">
              <a href="mailto:tokyo9900777@gmail.com">LET&apos;S — WORK</a>
            </div>
            
            {/* Social Icons */}
            <div className="social-icons">
              <a href="https://github.com/AbdoAhmedAbdelmonem" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/abdoahmed/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://codeforces.com/profile/roshen" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Codeforces">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100065484038724" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
            
            <div className="divider"></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--syne)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                color: "#555",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <div>© 2026 ABDO AHMED</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--accent)" }}>📍</span>
                ALEXANDRIA // EGYPT
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}


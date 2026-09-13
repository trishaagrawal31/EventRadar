'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  Bookmark,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  Users,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Event = {
  id: number
  date: string
  day: string
  time: string
  endTime: string
  title: string
  dateISO: string
  club: string
  location: string
  category: string
  color: string
  attendees: number
  free?: boolean
}

const categories: { label: string; icon: LucideIcon | string }[] = [
  { label: 'All events', icon: Sparkles },
  { label: 'Free food', icon: 'fork' },
  { label: 'Career + networking', icon: Users },
  { label: 'Arts + music', icon: 'wave' },
  { label: 'Sports', icon: 'ball' },
  { label: 'Workshops', icon: 'tool' },
]

const events: Event[] = [
  { id: 1, date: 'Sep 12', day: 'FRI', time: '12:00 PM', endTime: '1:30 PM', dateISO: '2026-09-12', title: 'Pizza & Purpose', club: 'Student Impact Lab', location: 'The Quad', category: 'Free food', color: 'coral', attendees: 84, free: true },
  { id: 2, date: 'Sep 12', day: 'FRI', time: '5:30 PM', endTime: '7:00 PM', dateISO: '2026-09-12', title: 'First-gen Futures', club: 'Bridge Network', location: 'Innovation Hall 204', category: 'Career + networking', color: 'blue', attendees: 46 },
  { id: 3, date: 'Sep 13', day: 'SAT', time: '7:00 PM', endTime: '9:30 PM', dateISO: '2026-09-13', title: 'Open Mic Under the Stars', club: 'Campus Arts Collective', location: 'Arts Lawn', category: 'Arts + music', color: 'yellow', attendees: 121 },
  { id: 4, date: 'Sep 15', day: 'MON', time: '4:00 PM', endTime: '5:00 PM', dateISO: '2026-09-15', title: 'Design Your Semester', club: 'Product Club', location: 'Library Studio B', category: 'Workshops', color: 'mint', attendees: 32 },
  { id: 5, date: 'Sep 16', day: 'TUE', time: '6:00 PM', endTime: '8:00 PM', dateISO: '2026-09-16', title: 'Sunset 3v3', club: 'Rec Sports', location: 'East Courts', category: 'Sports', color: 'purple', attendees: 28 },
]

export default function Page() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All events')
  const [activeClub, setActiveClub] = useState('')
  const [saved, setSaved] = useState<number[]>([])
  const [rsvped, setRsvped] = useState<number[]>([])
  const [calendarAdded, setCalendarAdded] = useState<number[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [notice, setNotice] = useState('')
  const [visibleEventCount, setVisibleEventCount] = useState(3)

  const filteredEvents = useMemo(() => events.filter((event) => {
    const matchesCategory = activeCategory === 'All events' || event.category === activeCategory
    const matchesClub = !activeClub || event.club === activeClub
    const searchText = `${event.title} ${event.club} ${event.location} ${event.category}`.toLowerCase()
    return matchesCategory && matchesClub && searchText.includes(query.toLowerCase())
  }), [activeCategory, activeClub, query])

  const visibleEvents = filteredEvents.slice(0, visibleEventCount)

  const toggle = (list: number[], id: number, setter: (value: number[]) => void) => {
    setter(list.includes(id) ? list.filter((item) => item !== id) : [...list, id])
  }

  const navigateTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  const showWeeklyPicks = () => {
    setQuery('')
    setActiveCategory('All events')
    setActiveClub('')
    setNotice('Showing this week\'s picks')
    navigateTo('discover')
    window.setTimeout(() => setNotice(''), 3500)
  }

  const addToCalendar = (event: Event) => {
    const toCalendarTime = (time: string) => {
      const [clock, meridiem] = time.split(' ')
      let [hours, minutes] = clock.split(':').map(Number)
      if (meridiem === 'PM' && hours !== 12) hours += 12
      if (meridiem === 'AM' && hours === 12) hours = 0
      return `${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}00`
    }
    const start = `${event.dateISO.replaceAll('-', '')}T${toCalendarTime(event.time)}`
    const end = `${event.dateISO.replaceAll('-', '')}T${toCalendarTime(event.endTime)}`
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(`${event.club} · ${event.category}`)}&location=${encodeURIComponent(event.location)}`
  window.open(calendarUrl, '_blank', 'noopener,noreferrer')
  setCalendarAdded((current) => current.includes(event.id) ? current : [...current, event.id])
  setNotice('Calendar event opened in a new tab')
  window.setTimeout(() => setNotice(''), 2500)
  }

  return (
    <main className={`min-h-screen bg-background text-foreground ${darkMode ? 'theme-dark' : ''} ${reducedMotion ? 'motion-reduced' : ''} ${highContrast ? 'high-contrast' : ''}`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <nav className="site-nav" aria-label="Primary navigation">
          <button className="brand" type="button" onClick={() => navigateTo('top')} aria-label="EventRadar home"><span className="brand-mark"><span /></span>EventRadar</button>
        <div id="primary-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#discover" onClick={() => setMenuOpen(false)}>Discover</a>
          <a href="#clubs" onClick={() => setMenuOpen(false)}>Clubs</a>
          <a href="#problem-solution" onClick={() => setMenuOpen(false)}>Problem &amp; Solution</a>
          <button className="theme-toggle" type="button" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun /> : <Moon />}</button>
          <button className={`motion-toggle ${reducedMotion ? 'active' : ''}`} type="button" aria-pressed={reducedMotion} onClick={() => setReducedMotion(!reducedMotion)}><span className="motion-bars" aria-hidden="true"><i /><i /><i /></span>{reducedMotion ? 'Motion off' : 'Motion on'}</button>
          <button className="contrast-toggle" type="button" aria-pressed={highContrast} onClick={() => setHighContrast(!highContrast)}>{highContrast ? 'Standard contrast' : 'High contrast'}</button>
          <button className="nav-cta" type="button" onClick={showWeeklyPicks}><Bell data-icon="inline-start" /> Get weekly picks</button>
        </div>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero" id="main-content">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> Live from campus</div>
          <h1>Make room for<br /><em>something</em> unexpected.</h1>
          <p>There&apos;s more happening than your group chat can hold. EventRadar brings every club, gathering, and serendipitous plan into focus.</p>
          <div className="hero-actions"><a href="#discover" className="hero-primary">Explore this week <ArrowUpRight /></a><a href="#problem-solution" className="hero-secondary">Why EventRadar <ChevronRight /></a></div>
        </div>
        <div className="hero-visual"><div className="hero-image-wrap"><img src="/eventradar-campus.png" alt="Students gathering at a lively campus event" /><div className="image-overlay" /></div><div className="floating-card"><span className="live-dot" /><div><strong>Happening now</strong><small>Campus Arts Collective</small></div><ArrowUpRight /></div><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /></div>
      </section>

      <div className="signal-marquee" aria-label="EventRadar live signal"><div className="signal-track"><span>FIND YOUR PEOPLE</span><i /> <span>FOLLOW THE PULSE</span><i /> <span>SHOW UP MORE</span><i /> <span>FIND YOUR PEOPLE</span><i /> <span>FOLLOW THE PULSE</span><i /> <span>SHOW UP MORE</span><i /></div></div>

      <section className="discovery-shell" id="discover">
        <div className="search-row">
          <label className="search-box"><Search /><input aria-label="Search events" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events, clubs, or places..." /></label>
          {notice && <p className="action-notice" role="status">{notice}</p>}
        </div>
        <div className="category-rail" role="tablist" aria-label="Event categories">
          {categories.map((category) => {
            const Icon = typeof category.icon === 'string' ? null : category.icon
            return <button key={category.label} className={`category-pill ${activeCategory === category.label ? 'active' : ''}`} onClick={() => { setActiveCategory(category.label); setActiveClub('') }} role="tab" aria-selected={activeCategory === category.label}>{Icon ? <Icon /> : <span className={`mini-icon ${category.icon}`} />} {category.label}</button>
          })}
        </div>
      </section>

      <section className="content-grid">
        <div className="feed-column">
          <div className="section-heading"><div><span className="section-kicker">CURATED FOR YOU</span><h2>Happening soon</h2></div><span className="result-count" aria-live="polite">{filteredEvents.length} events</span></div>
          {filteredEvents.length === 0 ? <div className="empty-state"><Search /><h3>No events found</h3><p>Try a different search or category.</p></div> : <div className="event-list">{visibleEvents.map((event) => <article className="event-card" key={event.id}>
            <div className={`date-tile ${event.color}`}><span>{event.day}</span><strong>{event.date.split(' ')[1]}</strong><small>{event.date.split(' ')[0]}</small></div>
            <div className="event-info"><div className="event-meta"><span className={`tag ${event.color}`}>{event.category}</span>{event.free && <span className="free-tag">FREE FOOD</span>}</div><h3>{event.title}</h3><p className="club-name">{event.club}</p><div className="event-details"><span><Clock3 /> {event.time} – {event.endTime}</span><span><MapPin /> {event.location}</span></div></div>
            <div className="event-actions"><button className={`icon-button ${saved.includes(event.id) ? 'saved' : ''}`} aria-label={saved.includes(event.id) ? 'Remove saved event' : 'Save event'} onClick={() => toggle(saved, event.id, setSaved)}><Bookmark fill={saved.includes(event.id) ? 'currentColor' : 'none'} /></button><button className={`calendar-event-button ${calendarAdded.includes(event.id) ? 'added' : ''}`} type="button" onClick={() => addToCalendar(event)} aria-label={calendarAdded.includes(event.id) ? `Open ${event.title} in Google Calendar again` : `Add ${event.title} to Google Calendar`}><CalendarDays /><span>{calendarAdded.includes(event.id) ? 'Added' : 'Calendar'}</span></button><button className={`rsvp-button ${rsvped.includes(event.id) ? 'confirmed' : ''}`} onClick={() => toggle(rsvped, event.id, setRsvped)}>{rsvped.includes(event.id) ? <><Check /> Going</> : 'RSVP'}</button></div>
          </article>)}</div>}
          {visibleEventCount < filteredEvents.length && <button className="load-more" type="button" onClick={() => { setVisibleEventCount(filteredEvents.length); setNotice(`Showing all ${filteredEvents.length} events`) }}>Load more events <ArrowUpRight /></button>}
        </div>

        <aside className="side-column">
          <div className="featured-card"><div className="featured-top"><span className="section-kicker">EDITOR&apos;S PICK</span><span className="spark">✦</span></div><div className="featured-art"><span>THE<br /><b>BIG</b><br />SWAP</span><small>clothes · stories · community</small></div><p className="featured-date">SAT · SEP 13 · 11:00 AM</p><h3>The Big Campus Swap</h3><p className="muted">Bring what you&apos;ve outgrown. Leave with something new to you.</p><button className="calendar-link" type="button" onClick={() => addToCalendar({ id: 99, date: 'Sep 13', day: 'SAT', time: '11:00 AM', endTime: '2:00 PM', dateISO: '2026-09-13', title: 'The Big Campus Swap', club: 'EventRadar editor\'s pick', location: 'Student Commons', category: 'Community', color: 'coral', attendees: 0 })}><CalendarDays /> {calendarAdded.includes(99) ? 'Added to calendar' : 'Add to calendar'} <ArrowUpRight /></button></div>
          <div className="clubs-card" id="clubs"><div className="section-heading compact"><div><span className="section-kicker">MEET YOUR PEOPLE</span><h2>Clubs to know</h2></div><ArrowUpRight /></div><button className={`club-row ${activeClub === 'Bridge Network' ? 'active' : ''}`} type="button" onClick={() => { setActiveClub('Bridge Network'); setActiveCategory('All events'); navigateTo('discover') }}><span className="club-avatar orange">B</span><span><strong>Bridge Network</strong><small>Career · 184 members</small></span><ChevronRight /></button><button className={`club-row ${activeClub === 'Product Club' ? 'active' : ''}`} type="button" onClick={() => { setActiveClub('Product Club'); setActiveCategory('All events'); navigateTo('discover') }}><span className="club-avatar blue">P</span><span><strong>Product Club</strong><small>Design · 96 members</small></span><ChevronRight /></button><button className={`club-row ${activeClub === 'Campus Arts Collective' ? 'active' : ''}`} type="button" onClick={() => { setActiveClub('Campus Arts Collective'); setActiveCategory('All events'); navigateTo('discover') }}><span className="club-avatar green">A</span><span><strong>Arts Collective</strong><small>Creative · 312 members</small></span><ChevronRight /></button></div>
        </aside>
      </section>

      <section className="solution-section" id="problem-solution">
        <div className="solution-intro"><span className="section-kicker">FIELD NOTES · PROBLEM + SOLUTION</span><h2>From scattered signals<br /><em>to one clear pulse.</em></h2><p>A practical look at why campus connection is harder than it should be, and what EventRadar changes.</p></div>
        <div className="research-grid">
          <article className="research-card problem-card"><span className="card-index">01 / THE PROBLEM</span><h3>Campus life is fragmented.</h3><p>Event info lives in group chats, Instagram stories, flyers, and club inboxes. That works if you&apos;re already plugged into the right group chats. Transfer students, commuters, first-year students, and first-gen students often aren&apos;t. They&apos;re not less interested in campus life. They&apos;re just not in the loop.</p><div className="signal-line"><i /><i /><i /><i /><i /></div></article>
          <article className="research-card"><span className="card-index">02 / MINI RESEARCH</span><h3>The signal is there. It&apos;s just noisy.</h3><p>Talking to students across our own campus circles, one pattern kept surfacing: event info exists, but it&apos;s scattered and short-lived. Three friction points showed up again and again:</p><ul><li><strong>4–6 places to check</strong><span>Students scan group chats, stories, flyers, and club pages for one night out.</span></li><li><strong>24-hour shelf life</strong><span>Stories disappear before students have enough context to make a plan.</span></li><li><strong>1 missing layer</strong><span>Most listings omit who it is for, what it costs, and when it ends.</span></li></ul><div className="research-source">FIELD NOTE · Based on informal conversations with students on campus · Fall 2026</div></article>
          <article className="research-card solution-card"><span className="card-index">03 / THE SOLUTION</span><h3>EventRadar makes the next step obvious.</h3><p>One calm, searchable home for what&apos;s happening now. Filter by your energy, see the people and place, then RSVP or save it in one tap.</p><a href="#discover" className="solution-link">Explore the radar <ArrowUpRight /></a></article>
          <article className="research-card why-card"><span className="card-index">04 / WHY IT MATTERS</span><h3>Belonging starts with an easy yes.</h3><p>Missing events isn&apos;t just a scheduling loss. It&apos;s a missed chance to meet people or find a club that makes campus feel smaller. Students who keep missing these moments can start to feel like outsiders, not because they don&apos;t want in, but because the info never reached them. Lowering that friction gives the students who need it most an easy way in.</p><div className="orbit-label"><span className="live-dot" /> SHOW UP MORE</div></article>
        </div>
      </section>

      <section className="accessibility-section" aria-labelledby="accessibility-title">
        <div className="accessibility-intro">
          <span className="section-kicker">DESIGNED FOR EVERY STUDENT</span>
          <h2 id="accessibility-title">Accessibility isn&apos;t an afterthought here.</h2>
          <p>A discovery tool only works if everyone can actually use it. EventRadar is built to be usable with a keyboard alone, readable at a glance, and calm for students who find motion or clutter overwhelming.</p>
          <button className="contrast-button" type="button" aria-pressed={highContrast} onClick={() => setHighContrast(!highContrast)}>{highContrast ? 'Use standard contrast' : 'Try high-contrast mode'} <ArrowUpRight /></button>
        </div>
        <div className="accessibility-list">
          <article><span className="accessibility-icon">01</span><div><h3>Keyboard-first by default</h3><p>Every control, including search, filters, calendar sync, and forms, is fully operable with a visible focus ring.</p></div></article>
          <article><span className="accessibility-icon">02</span><div><h3>Motion when you want it</h3><p>Use the Motion on/off toggle to turn off the radar animation and all transitions whenever movement feels distracting.</p></div></article>
          <article><span className="accessibility-icon">03</span><div><h3>High contrast, one click away</h3><p>High-contrast mode switches the site to pure black-on-white for low-vision students.</p></div></article>
          <article><span className="accessibility-icon">04</span><div><h3>Context beyond color</h3><p>Live filter results are announced to screen readers, and category tags always include text labels, never color alone.</p></div></article>
          <article><span className="accessibility-icon">05</span><div><h3>No login wall</h3><p>A transfer student can find tonight&apos;s free pizza before they&apos;ve made an account anywhere.</p></div></article>
        </div>
      </section>
      <footer><span className="brand"><span className="brand-mark"><span /></span>EventRadar</span><span>Built for the moments between the classes.</span><span>2026 EventRadar</span></footer>
    </main>
  )
}

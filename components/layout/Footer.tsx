import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 17,
                color: 'white',
                marginBottom: 12,
                letterSpacing: '-0.01em',
              }}
            >
              UC AI Society
            </div>
            <p
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 14,
                lineHeight: 1.6,
                maxWidth: 320,
                margin: 0,
              }}
            >
              A student-led club at the University of Canterbury — making AI accessible, ethical,
              and useful for every student.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/events">Events</Link>
            <Link href="/tutorials">Tutorials</Link>
            <Link href="/about">About</Link>
            <Link href="/#projects">Projects</Link>
          </div>
          <div>
            <h4>Community</h4>
            <a
              href="https://www.facebook.com/profile.php?id=61582126750231"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a href="https://instagram.com/ucai.soc" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="#">LinkedIn</a>
            <a href="#">Discord</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="mailto:ucaisoc@outlook.com">ucaisoc@outlook.com</a>
            <a href="#">StudentLink sign-up</a>
            <a href="#">Submit a project</a>
            <Link href="/contact">Contact form</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} UC AI Society · University of Canterbury</span>
          <span>Ōtautahi Christchurch, Aotearoa New Zealand</span>
        </div>
      </div>
    </footer>
  )
}

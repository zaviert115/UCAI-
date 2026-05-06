import Link from 'next/link'

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Discord', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/70 text-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-bold text-white text-base mb-2">
              <span className="text-brand-cyan">UC AI</span> Society
            </p>
            <p className="leading-relaxed">
              A student-led club at the University of Canterbury exploring AI in practical, ethical,
              and real-world ways.
            </p>
          </div>

          <div>
            <p className="font-semibold text-white mb-3">Quick links</p>
            <ul className="space-y-1.5">
              {[
                { href: '/about', label: 'About' },
                { href: '/events', label: 'Events' },
                { href: '/tutorials', label: 'Tutorials' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white mb-3">Connect</p>
            <ul className="space-y-1.5">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:committee@ucaisoc.nz"
                  className="hover:text-white transition-colors"
                >
                  committee@ucaisoc.nz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} UC AI Society. University of Canterbury, Christchurch,
          New Zealand.
        </div>
      </div>
    </footer>
  )
}

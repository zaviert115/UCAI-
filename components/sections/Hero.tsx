import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative bg-navy-800 text-white overflow-hidden">
      {/* Circuit pattern decoration */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/circuit-pattern.svg"
          alt=""
          fill
          className="object-cover object-right opacity-60"
          priority
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          <p className="text-brand-cyan text-sm font-semibold tracking-widest uppercase mb-4">
            University of Canterbury
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            The <span className="text-brand-cyan">UC AI</span>
            <br />
            Society
          </h1>
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            Helping students understand and use AI in practical, ethical, and real-world ways.
            Workshops, panels, tutorials, and a community ready to grow with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#join"
              className="rounded-md bg-brand-cyan px-6 py-3 text-navy-800 font-semibold text-center hover:bg-brand-cyan-dark transition-colors"
            >
              Join the club
            </Link>
            <Link
              href="/events"
              className="rounded-md border border-white/30 px-6 py-3 text-white text-center hover:bg-white/10 transition-colors"
            >
              Upcoming events
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

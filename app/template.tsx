/**
 * Re-mounts on every navigation, so the staged `.pt-wipe` overlay replays its
 * gradient sweep on each route change (and once on first load). Reduced motion
 * collapses the animation to ~0ms via the global rule in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pt-wipe" aria-hidden="true">
        <span className="pt-mark">UC·AI</span>
      </div>
      {children}
    </>
  )
}

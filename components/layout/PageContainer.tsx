import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16', className)}>
      {children}
    </div>
  )
}

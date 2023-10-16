import { cn } from '@/lib/utils'

export function ResponsiveGrid({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[400px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ',
        className
      )}
      {...props}
    />
  )
}

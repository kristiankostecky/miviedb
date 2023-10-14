import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const headingVariants = cva('scroll-m-20 tracking-tight', {
  defaultVariants: {
    size: 'h1',
  },
  variants: {
    size: {
      h1: 'text-4xl font-extrabold',
      h2: 'text-3xl font-semibold tracking-tight',
      h3: 'text-2xl font-semibold tracking-tight',
      h4: 'text-xl font-semibold tracking-tight',
    },
  },
})

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ asChild = false, className, size, variant, ...props }, ref) => {
//     const Comp = asChild ? Slot : 'button'
//     return (
//       <Comp
//         ref={ref}
//         className={cn(buttonVariants({ className, size, variant }))}
//         {...props}
//       />
//     )
//   }
// )
// Button.displayName = 'Button'

// export { Button, buttonVariants }

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  asChild?: boolean
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild = false, className, size, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h1'
    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ className, size }))}
        {...props}
      />
    )
  }
)

Heading.displayName = 'Heading'

export { Heading, headingVariants }

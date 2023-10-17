import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Fragment } from 'react'

export function ExtraInfo({
  info,
}: {
  info: Array<{ label: string; value: string }>
}) {
  return (
    <p className="text-muted-foreground">
      {info.map(({ label, value }, index, array) => {
        return (
          <Fragment key={value + label}>
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <span>{value}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {index !== array.length - 1 && <> &middot; </>}
          </Fragment>
        )
      })}
    </p>
  )
}

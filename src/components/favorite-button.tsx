import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'

interface FavoriteButtonProps extends ButtonProps {
  isFavorite: boolean
}

export function FavoriteButton({
  className,
  isFavorite,
  ...props
}: FavoriteButtonProps) {
  return (
    <Button
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={cn('self-end rounded-full', className)}
      size="icon"
      variant="outline"
      {...props}
    >
      {isFavorite ? <StarFilledIcon /> : <StarIcon />}
    </Button>
  )
}

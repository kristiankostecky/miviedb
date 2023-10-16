import EmptyTomato from '@/assets/tomatometer-empty.svg'
import FreshTomato from '@/assets/tomatometer-fresh.svg'
import RottenTomato from '@/assets/tomatometer-rotten.svg'
import { Badge } from '@/components/ui/badge'
import { StarFilledIcon } from '@radix-ui/react-icons'

function RatingIMDB({ ratingValue }: { ratingValue: string }) {
  return (
    <Badge variant="outline">
      IMDb
      <StarFilledIcon className="mx-1" color="hsl(47.9 95.8% 53.1%)" />
      {ratingValue}
    </Badge>
  )
}

const getRottenTomatoesIcon = (ratingValue: number) => {
  if (ratingValue >= 60) {
    return FreshTomato
  }
  if (ratingValue >= 0) {
    return RottenTomato
  }
  return EmptyTomato
}

function RatingRottenTomatoes({ ratingValue }: { ratingValue: string }) {
  const ratingNumericValue = Number(ratingValue?.replace('%', ''))

  return (
    <Badge variant="outline">
      Rotten Tomatoes
      {ratingNumericValue && !Number.isNaN(ratingNumericValue) && (
        <img
          alt="Rotten Tomatoes"
          className="mx-1 inline-block h-4"
          src={getRottenTomatoesIcon(ratingNumericValue)}
        />
      )}
      {ratingValue}
    </Badge>
  )
}

export function Rating({ source, value }: { source: string; value: string }) {
  switch (source) {
    case 'Internet Movie Database':
      return <RatingIMDB ratingValue={value} />
    case 'Rotten Tomatoes':
      return <RatingRottenTomatoes ratingValue={value} />
    default:
      return (
        <Badge variant="outline">
          {source}: {value}
        </Badge>
      )
  }
}

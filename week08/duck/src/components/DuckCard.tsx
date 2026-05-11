import type { Duck } from '../types/duck'

type Props = {
  duck: Duck
}

export function DuckCard({ duck }: Props) {
  return (
    <article className="duck-card" data-testid={`duck-card-${duck.id}`}>
      <h3>{duck.name}</h3>
      <p className="duck-species">{duck.species}</p>
    </article>
  )
}

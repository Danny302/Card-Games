'use client'

import { PlayingCard } from './../components/PlayingCard'
import Card from './../lib/card'

const card = new Card(Card.Rank.Ace, Card.Suit.Hearts, Card.Status.FaceDown)

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <PlayingCard card={card} />
    </main>
  )
}

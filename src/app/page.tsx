'use client'

import { PlayingCard } from './../components/PlayingCard'
import Card, { Rank, Suit, Status } from './../lib/card'

const card = new Card(Rank.Ace, Suit.Hearts, Status.FaceDown)

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <PlayingCard card={card} />
    </main>
  )
}

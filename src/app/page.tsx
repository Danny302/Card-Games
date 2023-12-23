'use client'

import { useState, useEffect, ReactNode } from 'react'
import { PlayingCard } from './../components/PlayingCard'
import Deck from './../lib/deck'

export default function Home() {
  const deck = new Deck(10, true)
  const [cards, setCards] = useState<ReactNode>()

  useEffect(() => {
    setCards(deck.deck.map((card, index) =>
      <PlayingCard key={card.rank + card.suit + index} card={card} />
    ))
  }, [])

  return (
    <main className="flex flex-row flex-wrap items-center justify-between">
      {cards}
    </main>
  )
}

'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Card, CardBody } from '@nextui-org/card'
import { PlayingCard } from './../components/PlayingCard'
import Concentration, { Rule } from './../lib/concentration'
import styles from '../styles/Concentration.module.css'

export default function Home() {
  const [cards, setCards] = useState<ReactNode>()
  const [prompt, setPrompt] = useState('Hi')
  const game = new Concentration(Rule.RankOnly, 8, true, setPrompt)
  const deck = game.startGame()

  useEffect(() => {
    setCards(deck.map((card, index) =>
      <PlayingCard key={card.rank + card.suit + index} card={card} onClick={game.pickCard.bind(game)} />
    ))
  }, [])

  return (
    <main className='flex flex-col items-center justify-center gap-y-5'>
      <h1 className={styles.title}>Memory Game</h1>
      <Card>
        <CardBody className={styles.prompt}>{prompt}</CardBody>
      </Card>
      <div className={styles['cards-container']}>
        {cards}
      </div>
    </main>
  )
}

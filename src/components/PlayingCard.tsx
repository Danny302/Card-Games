'use client'

import { useState } from 'react'
import { Card as CardUI } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import styles from './PlayingCard.module.css'
import clsx from 'clsx'
import type Card from './../lib/card'

interface PlayingCardProps {
  card: Card;
}

export function PlayingCard({ card }: PlayingCardProps) {
  const [status, setStatus] = useState(card.isFaceDown())
  const flip = () => {
    card.flip()
    setStatus(card.isFaceDown())
  }

  return (
    <div className={styles.container}>
      <div className={clsx(styles.card, status && styles.flip)} onClick={flip}>
        <CardUI radius='sm' className={clsx(styles.content, styles.front)} style={{color: card.color}}>
            {card.rank}<br/>{card.suit}
        </CardUI>
        <CardUI radius='sm' className={clsx(styles.content, styles.back)}>
          <Image
            className={styles.art}
            src='/card_art.jpeg'
          />
        </CardUI>
      </div>
    </div>
  )
}

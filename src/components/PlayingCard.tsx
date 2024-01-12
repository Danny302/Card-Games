import { useState } from 'react'
import { Card as CardUI } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import styles from '../styles/PlayingCard.module.css'
import clsx from 'clsx'
import type Card from './../lib/card'

interface PlayingCardProps {
  card: Card
  onClick?: Function
}

export function PlayingCard({ card, onClick }: PlayingCardProps) {
  const [status, setStatus] = useState(card.isFaceDown())
  const flip = () => {
    if (onClick) {
      onClick(card, setStatus)
    } else {
      card.flip()
      setStatus(card.isFaceDown())
    }
  }

  return (
    <div className={styles.container}>
      <div className={clsx(styles.card, status && styles.flip)} onClick={flip}>
        <CardUI radius='sm' className={clsx(styles.content, styles.front)}>
          <svg viewBox='0 0 150 120'>
            <foreignObject className={styles.info} style={{color: card.color}}>
              {card.rank}<br/>{card.suit}
            </foreignObject>
          </svg>
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

'use client'

import { useState, useEffect } from 'react'
import { RadioGroup, Radio } from '@nextui-org/radio'
import { Card, CardBody } from '@nextui-org/card'
import { useDisclosure } from '@nextui-org/use-disclosure'
import { Tooltip } from '@nextui-org/tooltip'
import { Button } from '@nextui-org/button'
import { Switch } from '@nextui-org/switch'
import { Input } from '@nextui-org/input'
import NewGameModal from '@/components/NewGameModal'
import PlayingCard from '@/components/PlayingCard'
import Concentration, { Rule } from '@/lib/concentration'
import styles from '@/styles/Concentration.module.css'
import clsx from 'clsx'
import List from '@/components/List'

interface OptionsData {
  rule?: Rule
  numberOfCards?: number
  includeJokers?: boolean
  players?: string[]
  error?: {
    rule?: boolean
    numberOfCards?: string
    players?: string
  }
}

const Options = ({numberOfCards, includeJokers, rule, players, error}: OptionsData) => {
  return (
    <>
      <div>
        <p className={clsx(styles.option, error?.rule && styles.error)}>
          Select match rule <b>{error?.rule && '*'}</b>
        </p>
        <RadioGroup name='rule' defaultValue={rule}>
          <Radio value={Rule.RankAndColor}>{Rule.RankAndColor}</Radio>
          <Radio value={Rule.RankOnly}>{Rule.RankOnly}</Radio>
        </RadioGroup>
      </div>
      <div>
        <Tooltip content='More cards lead to increased difficulty' placement='right' color='primary' showArrow>
          <p className={clsx(styles.option, error?.numberOfCards && styles.error)}>
            Enter number of cards to match <b>{error?.numberOfCards && '*'}</b>
          </p>
        </Tooltip>
        <p className={clsx(styles['helper-text'], styles.error)}>
          {error?.numberOfCards}
        </p>
        <Input
          name='numberOfCards'
          type='number'
          size='sm'
          defaultValue={numberOfCards?.toString()}
        />
      </div>
      <div>
        <p className={styles.option}>
          Play with Joker cards?
        </p>
        <Switch
          name='includeJokers'
          color='primary'
          defaultSelected={includeJokers}
          thumbIcon={({isSelected}) =>
            isSelected ? <p className='text-green-500'>✔</p> : <p className='text-red-700'>✘</p>
          }
        />
      </div>
      <div>
        <p className={clsx(styles.option, error?.players && styles.error)}>
          Select number of players <b>{error?.players && '*'}</b>
        </p>
        <p className={clsx(styles['helper-text'], styles.error)}>
          {error?.players}
        </p>
        <List data={players} placeholder="Enter name" />
      </div>
    </>
  )
}

const Home = () => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const [optionsData, setOptionsData] = useState<OptionsData>({})
  const [cards, setCards] = useState<JSX.Element[]>()
  const [prompt, setPrompt] = useState('Hi')

  const newGame = (formData: FormData) => {
    let rule = formData.get("rule") as Rule
    let numberOfCards = Number(formData.get("numberOfCards"))
    let includeJokers = formData.has("includeJokers")
    let players = formData.getAll('listData') as string[]

    if (validate(rule, numberOfCards, players)) {
      const game = new Concentration(rule, numberOfCards, includeJokers, setPrompt)
      const deck = game.startGame()
      setOptionsData({rule: rule, numberOfCards: numberOfCards, includeJokers: includeJokers, players: players})
      setCards(deck.map((card, index) =>
        <PlayingCard key={card.rank + card.suit + index} card={card} onClick={game.pickCard.bind(game)} />
      ))
      onClose()
    }
  }

  const validate = (rule: Rule, numberOfCards: number, players: string[]) => {
    let errors = {}
    if (!Object.values<string>(Rule).includes(rule)) {
      errors = {...errors, rule: true}
    }
    if (!Number.isInteger(numberOfCards) || numberOfCards < 2 || numberOfCards % 2 === 1) {
      errors = {...errors, numberOfCards: 'Must be a positive even integer'}
    }
    if (players.filter(name => name.trim() === '').length !== 0) {
      errors = {...errors, players: "Name can't be blank"}
    }
    setOptionsData({error: errors})
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    onOpen()
  }, [])

  return (
    <main className='flex flex-col items-center justify-center gap-y-5'>
      <h1 className={styles.title}>Concentration</h1>
      <Card>
        <CardBody className={styles.prompt}>{prompt}</CardBody>
      </Card>
      <div className={styles['cards-container']}>
        {cards}
      </div>
      <Button onPress={onOpen}>New Game</Button>
      <NewGameModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        title='Concentration (Memory Game)'
        newGame={newGame}
        options={Options(optionsData)}
      />
    </main>
  )
}

export default Home

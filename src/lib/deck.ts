import Card, { Rank, Suit, Status } from './card';

export enum DeckSize {
  Half = 26,
  Standard = 52,
  StandardPlusJokers = 54
}

export default class Deck {
  #deck: Card[];
  readonly #size: number;
  readonly #includeJokers: boolean;

  constructor(size: number, includeJokers: boolean) {
    this.#deck = [];
    this.#size = size;
    this.#includeJokers = includeJokers;
    this.newDeck();
  }

  get deck() {
    return this.#deck;
  }

  get size() {
    return this.#size;
  }

  newDeck(): void {
    while (this.#deck.length < this.#size) {
      if (this.#includeJokers) {
        this.#deck.push( new Card(Rank.Joker, Suit.Joker, Status.FaceDown) );
        this.#deck.push( new Card(Rank.Joker, Suit.Joker, Status.FaceDown) );
      }

      if (this.#deck.length === this.#size) {
        break;
      }

      const cardsRemaining = this.#size - this.#deck.length;
      cardsRemaining >= DeckSize.Standard ? this.addStandardDeck() : this.addRandomPairs(cardsRemaining);
    }
  }

  shuffle(): void {
    for (let i = this.#size-1; i > 0; i--) {
      let random = Math.floor(Math.random() * i);
      [this.#deck[i], this.#deck[random]] = [this.#deck[random], this.#deck[i]];
    }
  }

  private addStandardDeck(): void {
    const ranks: Rank[] = Object.values(Rank).slice(1);
    const suits: Suit[] = Object.values(Suit).slice(1);

    for (let suit of suits) {
      for (let rank of ranks) {
        this.#deck.push( new Card(rank, suit, Status.FaceDown) );
      }
    }
  }

  private addRandomPairs(numberOfCards: number): void {
    const ranks: Rank[] = Object.values(Rank).slice(1);
    let cards = [...Array(DeckSize.Half).keys()];
    let index = DeckSize.Half - 1;
    
    // cards with values 0 through 12 represent ranks A through K for Clubs and Spades
    // cards with values 13 through 25 represent ranks A through K for Diamonds and Hearts
    while (numberOfCards > 0) {
      let random = Math.floor(Math.random() * index);
      let rank = cards[random];

      if (rank <= 12) {
        this.#deck.push( new Card(ranks[rank], Suit.Clubs, Status.FaceDown) );
        this.#deck.push( new Card(ranks[rank], Suit.Spades, Status.FaceDown) );
      } else {
        this.#deck.push( new Card(ranks[rank-13], Suit.Diamonds, Status.FaceDown) );
        this.#deck.push( new Card(ranks[rank-13], Suit.Hearts, Status.FaceDown) );
      }

      [cards[index], cards[random]] = [cards[random], cards[index]];
      numberOfCards -= 2;
      index--;
    }
  }
}

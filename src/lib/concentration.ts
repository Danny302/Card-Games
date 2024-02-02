import type Card from './card';
import Deck from './deck';
import Player from './player';
import Timeout from './timeout';

export enum Rule {
  RankAndColor,
  RankOnly
}

export default class Concentration {
  readonly #rule: Rule;
  readonly #deck: Deck;
  #matchedCards: number;
  #cardsPicked: {card: Card, setStatus: Function}[];
  #players: Player[];
  #currentPlayer: number;
  #timeout: Timeout;
  #prompt: Function;

  constructor(rule: Rule, numberOfCards: number, includeJokers: boolean, prompt: Function) {
    this.#rule = rule;
    this.#deck = new Deck(numberOfCards, includeJokers);
    this.#matchedCards = 0;
    this.#cardsPicked = [];
    this.#players = [];
    this.#currentPlayer = 0;
    this.#timeout = new Timeout();
    this.#prompt = prompt;
  }

  addPlayer(name: string): void {
    this.#players.push(new Player(name));
  }

  startGame() {
    this.#deck.shuffle();
    return this.#deck.deck;
  }

  notifyPlayer() {
    return this.#players[this.#currentPlayer].name + "'s turn!";
  }

  nextPlayer(): void {
    this.#currentPlayer = (this.#currentPlayer + 1) % this.#players.length;
  }

  pickCard(card: Card, setStatus: Function): void {
    if (this.#cardsPicked.length === 2) {
      this.#timeout.cancel();
      return;
    }

    if (card.isFaceUp()) {
      this.#prompt("Please select a face down card");
    } else {
      card.flip();
      setStatus(card.isFaceDown());
      this.#cardsPicked.push({card, setStatus});

      if (this.#cardsPicked.length === 2) {
        this.checkCardsPicked();
      }
    }
  }

  async checkCardsPicked(): Promise<void> {
    if (this.isMatch(this.#cardsPicked[0].card, this.#cardsPicked[1].card)) {
      this.#matchedCards += 2;
      //this.#players[this.#currentPlayer].addPoints(1);
      if (this.isGameOver()) {
        this.#prompt("You Won!");
      } else {
        this.#prompt("It's a match! Go again!");
      }
    } else {
      this.#prompt("Not a match");
      await this.#timeout.wait(1500);
      for (let object of this.#cardsPicked) {
        object.card.flip();
        object.setStatus(object.card.isFaceDown());
      }
    }

    this.#cardsPicked = [];
  }

  isMatch(card1: Card, card2: Card) {
    const rankMatch = card1.rank === card2.rank;
    const colorMatch = this.#rule === Rule.RankAndColor ? card1.color === card2.color : true;
    return rankMatch && colorMatch;
  }

  isGameOver() {
    return this.#matchedCards === this.#deck.size;
  }

  //getWinner() {}
}

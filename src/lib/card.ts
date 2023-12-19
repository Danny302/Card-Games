// Do not rearrange Rank order
enum Rank {
  Joker = "JOKER",
  Ace =   "A",
  Two =   "2",
  Three = "3",
  Four =  "4",
  Five =  "5",
  Six =   "6",
  Seven = "7",
  Eight = "8",
  Nine =  "9",
  Ten =  "10",
  Jack =  "J",
  Queen = "Q",
  King =  "K"
}
// Do not rearrange Suit order
enum Suit {
  Joker =    "★",
  Clubs =    "♣",
  Diamonds = "♦",
  Hearts =   "♥",
  Spades =   "♠"
}
enum Status {
  FaceDown,
  FaceUp
}

interface ICard {
  rank: Rank;
  value: number;
  suit: Suit;
  color: string;
  isFaceDown(): boolean;
  isFaceUp(): boolean;
  flip(): void;
}

export default class Card implements ICard {
  // makes enums available via Card.Rank, Card.Suit, Card.Status
  static readonly Rank = Rank;
  static readonly Suit = Suit;
  static readonly Status = Status;
  // private class properties
  readonly #rank: Rank;
  readonly #value: number;
  readonly #suit: Suit;
  readonly #color: string;
  #status: Status;

  readonly #rankValues = new Map<Rank, number>([
    [Rank.Joker,  0],
    [Rank.Ace,    1],
    [Rank.Two,    2],
    [Rank.Three,  3],
    [Rank.Four,   4],
    [Rank.Five,   5],
    [Rank.Six,    6],
    [Rank.Seven,  7],
    [Rank.Eight,  8],
    [Rank.Nine,   9],
    [Rank.Ten,   10],
    [Rank.Jack,  11],
    [Rank.Queen, 12],
    [Rank.King,  13]
  ]);
  readonly #suitColors = new Map<Suit, string>([
    [Suit.Joker,  ""],
    [Suit.Clubs,  "black"],
    [Suit.Diamonds, "red"],
    [Suit.Hearts,   "red"],
    [Suit.Spades, "black"]
  ]);

  constructor(rank: Rank, suit: Suit, status: Status) {
    this.#rank = rank;
    this.#value = this.#rankValues.get(rank) as number;
    this.#suit = suit;
    this.#color = this.#suitColors.get(suit) as string;
    this.#status = status;
  }

  get rank() {
    return this.#rank;
  }

  get value() {
    return this.#value;
  }

  get suit() {
    return this.#suit;
  }

  get color() {
    return this.#color;
  }

  isFaceDown() {
    return this.#status == Status.FaceDown;
  }

  isFaceUp() {
    return this.#status == Status.FaceUp;
  }

  flip(): void {
    this.#status = this.isFaceDown() ? Status.FaceUp : Status.FaceDown;
  }
}

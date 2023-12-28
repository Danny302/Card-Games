export default class Player {
  #name: string;
  #score: number;

  constructor(name: string) {
    this.#name = name;
    this.#score = 0;
  }

  get name() {
    return this.#name;
  }

  get score() {
    return this.#score;
  }

  addPoints(points: number): void {
    this.#score += points;
  }
}

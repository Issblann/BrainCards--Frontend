interface Flashcard {
  id: string;
  deckId: string;
  question: string;
  answer: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export enum DifficultyLevelEnum {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export default Flashcard;

import Flashcard from './Flashcards';

interface Deck {
  id: string | number;
  boxId?: string;
  title: string;
  description?: string;
  flashCards?: Flashcard[];
}

export default Deck;

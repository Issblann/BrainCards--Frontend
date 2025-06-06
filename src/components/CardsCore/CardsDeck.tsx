import Deck from '../../models/Deck';
import { CardDeck } from './CardDeck';

interface DataItem {
  label: string;
  value: string;
  decks: Deck[] | null;
}
export const CardsDeck = ({ data, activeTab }: any) => {
  if (activeTab !== 'All') {
    return (
      <>
        {data.map(({ label, value, decks }: DataItem) => (
          <CardDeck
            key={value}
            label={label}
            value={value}
            decks={decks}
          />
        ))}
      </>
    );
  } else {
    const selectedBox = data.find((box: any) => box.label === activeTab);
    if (!selectedBox) return null;

    return (
      <CardDeck
        label={selectedBox.label}
        value={selectedBox.value}
        decks={selectedBox.decks}
      />
    );
  }
};

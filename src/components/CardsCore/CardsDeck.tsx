import Deck from '../../models/Deck';
import { CardDeck } from './CardDeck';

interface DataItem {
  label: string;
  value: string;
  desc: Deck[];
}
export const CardsDeck = ({ data, defaultDeck }: any) => {
  return (
    <>
      {data && data.length > 0 ? (
        data.map(({ label, value, desc }: DataItem) => (
          <CardDeck label={label} key={value} value={value} desc={desc} />
        ))
      ) : (
        <CardDeck
          label={defaultDeck[0].label}
          value={defaultDeck[0].value}
          desc={defaultDeck[0].desc}
        />
      )}
    </>
  );
};

import Deck from '../../models/Deck';
import { CardDeck } from './CardDeck';

interface DataItem {
  label: string;
  value: string;
  desc: Deck[];
}
export const CardsDeck = ({ data }: any) => {
  return (
    <>
      {data && data?.length > 0 && (
        data?.map(({ label, value, desc }: DataItem) => (
          <CardDeck label={label} key={value} value={value} desc={desc} />
        ))
      ) 
      }
    </>
  );
};

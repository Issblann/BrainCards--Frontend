import Deck from '../models/Deck';
import { Button, TabPanel } from '@material-tailwind/react';

interface CardDeckProps {
  value: string;
  desc: Deck[];
}
export const CardDeck = ({ value, desc }: CardDeckProps) => {
  console.log(desc);
  return (
    <TabPanel
      className="flex flex-col py-4 px-0 gap-3 w-full md:flex-row"
      key={value}
      value={value}
    >
      {desc.map(({ id, title, boxId }: Deck) => (
        <div
          className="bg-white rounded-xl w-full flex flex-col justify-between border-2 md:w-[300px] h-[240px] p-4"
          key={id}
        >
          <div className="flex flex-col">
            <p className="font-bold text-black">{boxId}</p>
            {/* //cambiar a boxName */}
            <h1>{title}</h1>
          </div>

          <Button size="sm" className="w-[120px]">
            Study
          </Button>
        </div>
      ))}
    </TabPanel>
  );
};

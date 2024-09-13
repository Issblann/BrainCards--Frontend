import Deck from '../../models/Deck';
import { Button, TabPanel } from '@material-tailwind/react';

interface CardDeckProps {
  value: string;
  desc: Deck[];
  label?: string;
}
export const CardDeck = ({ label, value, desc }: CardDeckProps) => {
  return (
    <TabPanel
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 px-0"
      key={value}
      value={value}
    >
      {!desc.length && (
        <div className="col-span-full flex justify-center items-center h-[300px]">
          <h1 className="text-black"> No decks in {label}</h1>
        </div>
      )}
      {desc.map(({ id, title, description }: Deck) => {
        return (
          <div
            className="bg-lavender-background rounded-xl w-full flex flex-col justify-between border-2  h-[160px] md:h-[240px] p-4"
            key={id}
          >
            <div className="flex flex-col">
              <p className="font-normal text-lavender-950 text-xs">{label}</p>
              <h1 className="text-black font-semibold ">{title}</h1>
              <p className="text-xs font-normal">{description}</p>
            </div>

            <Button
              size="sm"
              className="w-[120px] bg-lavender-600 hover:bg-lavender-700"
            >
              Study
            </Button>
          </div>
        );
      })}
    </TabPanel>
  );
};

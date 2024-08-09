import Deck from '../models/Deck';
import { Button, TabPanel } from '@material-tailwind/react';

interface CardDeckProps {
  value: string;
  desc: Deck[];
  label?: string;
}
export const CardDeck = ({ label, value, desc }: CardDeckProps) => {
  return (
    <TabPanel
      className="flex flex-col py-4 px-0 gap-3 w-full md:flex-row"
      key={value}
      value={value}
    >
      {!desc.length && (
        <div className="flex justify-center mx-auto h-[300px] items-center">
          <h1 className="text-black"> No decks in {label}</h1>
        </div>
      )}
      {desc.map(({ id, title, description }: Deck) => {
        return (
          <div
            className="bg-lavender-background rounded-xl w-full flex flex-col justify-between border-2 md:w-[300px] h-[160px] md:h-[240px] p-4"
            key={id}
          >
            <div className="flex flex-col">
              {/* Muestra el nombre de la caja correspondiente */}
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

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
      {desc.map(({ id, title, description }: Deck) => {
        // Encuentra el nombre de la caja correspondiente al `boxId` del deck actual

        return (
          <div
            className="bg-white rounded-xl w-full flex flex-col justify-between border-2 md:w-[300px] h-[160px] md:h-[240px] p-4"
            key={id}
          >
            <div className="flex flex-col">
              {/* Muestra el nombre de la caja correspondiente */}
              <p className="font-normal text-black text-xs">{label}</p>
              <h1 className="text-black font-semibold ">{title}</h1>
              <p className="text-xs font-normal">{description}</p>
            </div>

            <Button size="sm" className="w-[120px]">
              Study
            </Button>
          </div>
        );
      })}
    </TabPanel>
  );
};

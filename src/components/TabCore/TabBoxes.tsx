import { Tabs, TabsHeader, TabsBody, Tab } from '@material-tailwind/react';
import '../../styles/global.css';
import { CreateBoxModal } from './CreateBoxModal';
import { CardsDeck } from '../CardsCore/CardsDeck';
import { FC } from 'react';
import { FormValuesBox } from '../../services/boxes.service';
import { useSelector } from 'react-redux';

interface TabBoxesProps {
  data?: any;
  handleDialogBox: () => void;
  openDialogBox: boolean;
  handleCreateBox: (data: FormValuesBox) => void;
}

interface DataItem {
  label: string;
  value: string;
}
export const TabBoxes: FC<TabBoxesProps> = ({
  handleDialogBox,
  openDialogBox,
  handleCreateBox,
}) => {
  const boxes = useSelector((store: any) => store.boxes);

  const data = boxes.map((box: any) => ({
    label: box.boxName,
    value: box.id,
    desc: box.decks.map((deck: any) => ({
      id: deck.id,
      title: deck.title,
      description: deck.description,
    })),
  }));
  return (
    <div className="w-full flex flex-col gap-4">
      <CreateBoxModal
        open={openDialogBox}
        handleClose={handleDialogBox}
        submitForm={handleCreateBox}
      />

      <Tabs value={data?.[0]?.value}>
        <TabsHeader className="w-full overflow-x-scroll scrollbar-thin">
          {data.map(({ label, value }: DataItem) => (
            <Tab
              className="max-w-[50%] md:max-w-72 md:w-72 flex-shrink-0"
              key={value}
              value={value}
              defaultValue="All"
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: -250 },
            mount: { y: 0 },
            unmount: { y: 350 },
          }}
        >
          <CardsDeck data={data} />
        </TabsBody>
      </Tabs>
    </div>
  );
};

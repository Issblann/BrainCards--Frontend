import { Tabs, TabsHeader, TabsBody, Tab } from '@material-tailwind/react';
import '../../styles/global.css';
import { CreateBoxModal } from './CreateBoxModal';
import { CardsDeck } from '../CardsCore/CardsDeck';
import { FC } from 'react';
import { FormValuesBox } from '../../services/boxes.service';

interface TabBoxesProps {
  data?: any;
  handleDialogBox: () => void;
  openDialogBox: boolean;
  handleCreateBox: (data: FormValuesBox) => void;
}
export const TabBoxes: FC<TabBoxesProps> = ({
  data,
  handleDialogBox,
  openDialogBox,
  handleCreateBox,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <CreateBoxModal
        open={openDialogBox}
        handleClose={handleDialogBox}
        submitForm={handleCreateBox}
      />

      {data && data.length > 0 ? (
        <Tabs value={data?.[0]?.value}>
          <TabsHeader className="w-full overflow-x-scroll scrollbar-thin">
            {data.map(({ label, value }) => (
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
            {' '}
            <CardsDeck data={data} />
          </TabsBody>
        </Tabs>
      ) : (
        <Tabs value="All">
          <TabsHeader className="w-full overflow-x-scroll scrollbar-thin">
            <Tab
              className="max-w-[50%] md:max-w-72 md:w-72 flex-shrink-0 "
              key="All"
              value="All"
            >
              All
            </Tab>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: -250 },
              mount: { y: 0 },
              unmount: { y: 350 },
            }}
          >
            <CardsDeck />
          </TabsBody>
        </Tabs>
      )}
    </div>
  );
};

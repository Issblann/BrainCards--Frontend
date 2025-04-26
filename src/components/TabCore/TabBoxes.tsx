import { Tabs, TabsHeader, TabsBody, Tab } from '@material-tailwind/react';
import '../../styles/global.css';
import { CardsDeck } from '../CardsCore/CardsDeck';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { thunks } from '../../redux/slices/decks/thunks';
import { thunks as boxesThunks } from '../../redux/slices/boxes/thunks';

interface TabBoxesProps {
}

interface DataItem {
  label: string;
  value: string;
}
export const TabBoxes: FC<TabBoxesProps> = () => {
  const user = useSelector((store: RootState) => store.user);
  const { data } = useSelector((store: RootState) => store.boxes);
  const {data: decksData} = useSelector((store: RootState) => store.decks);
  const dispatch = useDispatch<AppDispatch>()
  const [activeTab, setActiveTab] = useState('All');
  const boxData = data?.map((box: any) => ({
    label: box.boxName,
    value: box.id,
    decks: box?.decks?.map((deck: any) => ({
      id: deck.id,
      title: deck.title,
      description: deck.description,
    })),
  }));

  useEffect(() => {
    if(!user || !user.id) return;
    dispatch(boxesThunks.getBoxesByUser(user.id));
    dispatch(thunks.getDecksByUser(user.id));
  }, [user.id]);

  const currentData: any[] = activeTab === 'All'
  ? [{ label: 'All', value: data?.[0]?.id, decks: decksData || [] }] 
  : boxData;

  return data && data?.length > 0 && (
      <div className="w-full flex flex-col gap-4">
      <Tabs value={activeTab} defaultValue="All">
        <TabsHeader className="w-full overflow-x-scroll scrollbar-thin">
          {boxData.map(({ label, value }: DataItem) => (
            <Tab
              className="max-w-[50%] md:max-w-72 md:w-72 flex-shrink-0"
              key={value}
              value={value}
              defaultValue={data?.[0]?.id}
              onClick={() => setActiveTab(label === 'All' ? 'All' : value)}
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
          <CardsDeck data={currentData} activeTab={activeTab}/>
        </TabsBody>
      </Tabs>
    </div>
    )
};

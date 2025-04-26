import { Tabs, TabsHeader, TabsBody, Tab } from '@material-tailwind/react';
import '../../styles/global.css';
import { CardsDeck } from '../CardsCore/CardsDeck';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { thunks } from '../../redux/slices/decks/thunks';

interface TabBoxesProps {
}

interface DataItem {
  label: string;
  value: string;
}
export const TabBoxes: FC<TabBoxesProps> = () => {
  const user = useSelector((store: RootState) => store.user);
  const { data } = useSelector((store: RootState) => store.boxes);

  const dispatch = useDispatch<AppDispatch>()

  const boxData = data?.map((box: any) => ({
    label: box.boxName,
    value: box.id,
    desc: box.decks.map((deck: any) => ({
      id: deck.id,
      title: deck.title,
      description: deck.description,
    })),
  }));

  useEffect(() => {
    if (user.id) {
     dispatch(thunks.getDecksByUser(user.id));
    }
  }, [user.id]);
  return data && data?.length > 0 && (
      <div className="w-full flex flex-col gap-4">
      <Tabs value={boxData?.[0]?.value} defaultValue="All">
        <TabsHeader className="w-full overflow-x-scroll scrollbar-thin">
          {boxData.map(({ label, value }: DataItem) => (
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
          <CardsDeck data={boxData}/>
        </TabsBody>
      </Tabs>
    </div>
    )
};

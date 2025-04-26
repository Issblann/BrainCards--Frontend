import { useDispatch, useSelector } from 'react-redux';
import { CardsDeck, SpeedDialButton, TabBoxes } from '../components';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../redux/store/store';
import { Tabs, TabsHeader, Tab, TabsBody } from '@material-tailwind/react';
import { thunks } from '../redux/slices/boxes/thunks';


export const Home = () => {
  const user = useSelector((store: RootState) => store.user);
  const loading = useSelector((store: RootState) => store.boxes.loading);
  const dispatch = useDispatch<AppDispatch>();
  const defaultDeck = [
    {
      value: 'All',
      label: 'All',
      desc: [
        {
          id: 1,
          title: 'Sample Deck',
          description: 'This is a sample deck',
        },
      ],
    },
  ];

    useEffect(() => {
      if (user.id) {
       dispatch(thunks.getBoxesByUser(user.id));
      }
    }, [user.id]);
  return (
    <div className="w-full h-full flex justify-center flex-col gap-4">
      {user?.id ? (
        <>
          <SpeedDialButton
          />
          <TabBoxes
          />
        
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="text-center flex flex-col justify-center items-center">
                <span className="w-16 h-16 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></span>
                <p className="mt-4 text-white text-lg">Cargando..</p>
              </div>
            </div>
          )}
        </>
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
            <CardsDeck data={defaultDeck} />
          </TabsBody>
        </Tabs>
      )}
    </div>
  );
};

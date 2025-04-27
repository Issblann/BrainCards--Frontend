import { useDispatch, useSelector } from 'react-redux';
import { CardsDeck, SpeedDialButton, TabBoxes } from '../components';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../redux/store/store';
import { Tabs, TabsHeader, Tab, TabsBody } from '@material-tailwind/react';
import { thunks } from '../redux/slices/boxes/thunks';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { setEditMode } from '../redux/slices';


export const Home = () => {
  const user = useSelector((store: RootState) => store.user);
  const {loading, editMode} = useSelector((store: RootState) => store.boxes);
  const dispatch = useDispatch<AppDispatch>();
  const defaultDeck = [
    {
      value: 'All',
      label: 'All',
      decks: [
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
        <div className="w-full flex flex-col gap-4">
          <div className='flex justify-end items-end gap-20'>
          <button onClick={() => dispatch(setEditMode())}>
            <span className="text-lavender-600 hover:text-lavender-700 font-semibold flex items-center gap-2">
                {editMode === false ? <span className='flex gap-2 justify-center'><HiOutlinePencilAlt size={25}/>Edit Mode</span> : `Leave edit mode`}
            </span>
          </button>
          <SpeedDialButton/>
          </div>
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
        </div>
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

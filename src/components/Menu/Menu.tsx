import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import * as state from '@/lib/state';
import Modal from '../ui/Modal';
import Tabs from './Tabs/Tabs';
import Notes from './Tabs/Notes';
import Guide from './Tabs/Guide';
import Bookmarks from './Tabs/Bookmarks';
import Tooltip from '../ui/Tooltip';

interface Props {}

const Menu: React.FC<Props> = () => {
   const [_, setBusy] = useAtom(state.busy);
   const [showMenu, setShowMenu] = useState<boolean>(false);

   useEffect(() => {
      setBusy(showMenu);
   }, [showMenu]);

   return (
      <>
         <div className="absolute top-[20px] left-[20px] z-[51]">
            <Tooltip text="Menu" placement="bottom">
               <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="px-5 py-3 text-xl text-white transition duration-200 ease-linear border drop-shadow-2xl rounded-xl bg-base-850 hover:bg-base-800 border-base-750 will-change-transform"
               >
                  <i className="fas fa-bars"></i>
               </button>
            </Tooltip>
         </div>
         <Modal
            showModal={showMenu}
            setShowModal={setShowMenu}
            className="max-w-lg px-3 py-6 rounded-2xl"
         >
            <Tabs
               tabs={(tab, setTab) => {
                  if (tab === 'notes') {
                     return <Notes setShowMenu={setShowMenu} setTab={setTab} />;
                  } else if (tab === 'bookmarks') {
                     return <Bookmarks setTab={setTab} />;
                  } else if (tab === 'guide') {
                     return <Guide setTab={setTab} />;
                  }
               }}
            />
         </Modal>
      </>
   );
};

export default Menu;

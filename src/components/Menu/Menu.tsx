import { useEffect, useState } from 'react';

import useBearStore from '@/lib/state';
import Modal from '../ui/Modal';
import Tabs from './Tabs/Tabs';
import Notes from './Tabs/Notes';
import Guide from './Tabs/Guide';
import Bookmarks from './Tabs/Bookmarks';
import Tooltip from '../ui/Tooltip';
import Changelog from './Tabs/Changelog';

interface Props {}

const Menu: React.FC<Props> = () => {
   const updateBusy = useBearStore((state) => state.updateBusy);
   const [showMenu, setShowMenu] = useState<boolean>(false);

   useEffect(() => {
      updateBusy(showMenu);
   }, [updateBusy, showMenu]);

   return (
      <>
         <div className="absolute top-5 left-5 z-[51]">
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
                  } else if (tab === 'guide') {
                     return <Guide setTab={setTab} />;
                  } else if (tab === 'changelog') {
                     return <Changelog setTab={setTab} />;
                  }
               }}
            />
         </Modal>
      </>
   );
};

export default Menu;

import { Dispatch, SetStateAction, useState } from 'react';
import { motion } from 'framer-motion';

import { TTab } from '@/types/types';
import useBearStore from '@/lib/state';
import useJump from '@/hooks/useJump';

interface Props {
   setShowMenu: Dispatch<SetStateAction<boolean>>;
   setTab: Dispatch<SetStateAction<false | TTab>>;
}

const Notes: React.FC<Props> = ({ setShowMenu, setTab }) => {
   const per = 10;
   const [notes] = useBearStore((state) => [state.notes]);
   const [page, setPage] = useState<number>(1);
   const [maxPages, setPages] = useState<number>(Math.ceil(notes.length / per));

   const jump = useJump(false);

   return (
      <div className="flex flex-col">
         <h1 className="flex items-center ml-4 text-2xl font-semibold gap-x-4">
            <button
               onClick={() => setTab(false)}
               className="text-zinc-500 hover:text-zinc-300 transition duration-200 ease-linear text-lg py-0.5 px-2.5 bg-base-850 rounded-lg group"
            >
               <i className="fa-solid fa-arrow-up-left"></i>
            </button>
            Notes
         </h1>
         <hr className="my-4 border-t border-base-850" />
         {notes.length ? (
            <div className="grid grid-cols-2 gap-2">
               {notes.slice((page - 1) * per, per * page).map((note) => (
                  <button
                     key={`menu-${note._id}`}
                     className="w-full px-5 py-4 text-left transition duration-200 ease-linear rounded-xl hover:bg-base-900 hover:ring-2 hover:ring-base-850"
                     onClick={() => {
                        setShowMenu(false);
                        jump(note);
                     }}
                  >
                     <div className="text-xs font-medium tracking-wide text-gray-300">
                        #{note._id}
                     </div>
                     <div className="w-full mt-2 text-sm italic font-semibold truncate">
                        {note.note || 'This note is empty'}
                     </div>
                  </button>
               ))}
            </div>
         ) : (
            <div className="px-4 text-sm italic font-medium text-zinc-300">
               No notes created yet, let&apos;s start there first...
            </div>
         )}
      </div>
   );
};

export default Notes;

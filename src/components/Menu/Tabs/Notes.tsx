import { Dispatch, SetStateAction, useState } from 'react';
import { motion } from 'framer-motion';

import { useAtom } from 'jotai';

import { TTab } from '@/types/types';
import * as state from '@/lib/state';
import { INote } from '@/types/interfaces';

interface Props {
   setShowMenu: Dispatch<SetStateAction<boolean>>;
   setTab: Dispatch<SetStateAction<false | TTab>>;
}

const Notes: React.FC<Props> = ({ setShowMenu, setTab }) => {
   const per = 10;
   const [canvas, setCanvas] = useAtom(state.canvas);
   const [notes] = useAtom(state.notes);
   const [_, setJumping] = useAtom(state.jumping);
   const [page, setPage] = useState<number>(1);
   const [maxPages, setPages] = useState<number>(Math.ceil(notes.length / per));

   function convert(note: INote): { x: number; y: number } {
      return {
         x: parseFloat(
            (-note.x + (window.innerWidth / 2 - note.width / 2)).toFixed(1)
         ),
         y: parseFloat(
            (-note.y + (window.innerHeight / 2 - note.height / 2)).toFixed(1)
         ),
      };
   }

   function jump(note: INote) {
      const { x, y } = convert(note);

      setShowMenu(false);
      setJumping(true);
      setCanvas({
         ...canvas,
         x,
         y,
         scale: 1.0,
      });
      setJumping(false);
   }

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
               {notes
                  .slice((page - 1) * per, per * page)
                  .map((note, noteIndex) => (
                     <button
                        key={`menu-${note.id}`}
                        className="w-full px-5 py-3 text-left rounded-xl hover:bg-base-900 transition-basic"
                        onClick={() => jump(note)}
                     >
                        <div className="text-xs font-medium tracking-wide text-gray-300">
                           {convert(note).x}, {convert(note).y}
                        </div>
                        <div className="w-full mt-2 text-sm italic font-semibold truncate">
                           {note.note || 'This note is empty'}
                        </div>
                     </button>
                  ))}
            </div>
         ) : (
            <div className="px-4 text-sm italic font-medium text-zinc-300">
               No notes created yet, let's start there first...
            </div>
         )}
      </div>
   );
};

export default Notes;

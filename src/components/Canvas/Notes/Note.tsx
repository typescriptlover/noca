import { FC, MouseEvent, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion';

import * as state from '@/lib/state';
import { INote } from '@/types/interfaces';
import getNoteCoords from '@/lib/getNoteCoords';
import useJump from '@/hooks/useJump';
import Tooltip from '@/components/ui/Tooltip';

interface Props {
   note: INote;
   setNote: (id: number, newNote: INote) => void;
   deleteNote: (id: number) => void;
}

// TODO: don't unmount location pin on scale, performance boost
const Note: FC<Props> = ({ note, setNote, deleteNote }) => {
   const [canvas, setCanvas] = useAtom(state.canvas);
   const [_, setBusy] = useAtom(state.busy);
   const [jumping, setJumping] = useAtom(state.jumping);
   const jump = useJump(note);

   const [moving, setMoving] = useState<boolean>(false);

   function startMove(e: MouseEvent<HTMLDivElement>) {
      if (e.currentTarget !== e.target) return;
      setMoving(true);
   }

   function move(e: any) {
      if (!moving) return;

      console.log(e.pageX, e.pageY);
   }

   useEffect(() => {
      document.addEventListener('mousemove', move);
      return () => document.removeEventListener('mousemove', move);
   }, [moving]);

   function locationTop() {
      return 45 / canvas.scale;
   }

   function locationSize() {
      return 30 / canvas.scale;
   }

   return (
      <div
         id={`note-${note.id}`}
         onDoubleClick={startMove}
         className="absolute pointer-events-auto"
         style={{
            width: `${note.width}px`,
            height: `${note.height}px`,
            transform: `translate(${note.x}px, ${note.y}px)`,
         }}
      >
         <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
               {canvas.scale <= 0.3 && !jumping && (
                  <motion.div
                     initial={{ opacity: 0, scale: 0.5, y: 15 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.5, y: 15 }}
                     transition={{
                        ease: 'easeInOut',
                        duration: 0.3,
                     }}
                  >
                     <div className="absolute inset-x-0 top-0 flex items-center justify-center transition-all duration-200 ease-in-out">
                        <button
                           onClick={() => jump()}
                           className="transition-all duration-200 ease-linear outline-none text-zinc-400 hover:text-white"
                           style={{
                              marginTop: `-${locationTop()}px`,
                              fontSize: `${locationSize()}px`,
                           }}
                        >
                           <i className="fa-duotone fa-location-dot"></i>
                        </button>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
            <div className="relative w-full h-full shadow-2xl focus-within:scale-110 will-change transition duration-200 ease-in-out rounded-xl border-[4px] border-base-850 focus-within:border-base-800">
               <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                     ease: 'easeInOut',
                     duration: 0.3,
                  }}
               >
                  <div className="absolute top-0 right-0 -mr-1 -mt-14">
                     <div className="flex items-center rounded-xl bg-base-900">
                        <Tooltip text="Delete">
                           <button
                              onClick={() => deleteNote(note.id)}
                              className="px-3 py-2 transition duration-200 ease-linear text-zinc-400 hover:text-white"
                           >
                              <i className="fa-solid fa-fw fa-trash"></i>
                           </button>
                        </Tooltip>
                        <button className="px-3 py-2 text-zinc-400 cursor-grab">
                           <i className="fa-regular fa-fw fa-up-down-left-right"></i>
                        </button>
                     </div>
                  </div>
               </motion.div>
               <textarea
                  disabled={jumping}
                  onFocus={() => setBusy(true)}
                  onBlur={() => setBusy(false)}
                  spellCheck={false}
                  value={note.note || ''}
                  onInput={(e: any) => {
                     setNote(note.id, {
                        ...note,
                        note: e.target.value,
                     });
                  }}
                  className="w-full h-full p-3 overflow-hidden text-sm font-medium text-white rounded-lg resize-none select-text focus:overflow-auto focus:outline-none bg-base-400/10"
               />
            </div>
         </div>
      </div>
   );
};

export default Note;

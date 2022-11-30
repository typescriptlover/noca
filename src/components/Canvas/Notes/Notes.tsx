import { FC, ForwardedRef, RefObject } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import useBearStore from '@/lib/state';
import Note from './Note';

import { INote } from '@/types/interfaces';
import * as db from '@/lib/db';

interface Props {
   canvasRef: RefObject<HTMLDivElement>;
}

// TODO: only render notes visible in render distance
const Notes: FC<Props> = ({ canvasRef }) => {
   const notes = useBearStore((state) => state.notes);

   return (
      <div
         onMouseDown={(e: any) => e.stopPropagation()}
         id="notes"
         className="absolute"
      >
         <AnimatePresence>
            {notes.map((note) => (
               <motion.div
                  key={note._id}
                  initial={false}
                  animate={false}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{
                     ease: 'easeInOut',
                     duration: 0.3,
                  }}
               >
                  <Note note={note} canvasRef={canvasRef} />
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
   );
};

export default Notes;

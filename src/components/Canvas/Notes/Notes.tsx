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
               <Note key={note._id} note={note} canvasRef={canvasRef} />
            ))}
         </AnimatePresence>
      </div>
   );
};

export default Notes;

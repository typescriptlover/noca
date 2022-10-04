import { FC } from 'react';
import { useAtom } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion';

import * as state from '@/lib/state';
import Note from './Note';

import { INote } from '@/types/interfaces';

// TODO: only render notes visible in render distance
const Notes: FC = () => {
   const [notes, setNotes] = useAtom(state.notes);

   function setNote(id: number, newNote: INote) {
      setNotes(
         notes.map((n) => {
            if (n.id !== id) return n;
            return newNote;
         })
      );
   }

   function deleteNote(id: number) {
      const newNotes = notes.filter((n) => n.id !== id);
      setNotes(newNotes);
   }

   return (
      <div
         onMouseDown={(e: any) => e.stopPropagation()}
         id="notes"
         className="absolute"
      >
         <AnimatePresence>
            {notes.map((note) => (
               <motion.div
                  key={note.id}
                  initial={false}
                  animate={false}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{
                     ease: 'easeInOut',
                     duration: 0.3,
                  }}
               >
                  <Note note={note} setNote={setNote} deleteNote={deleteNote} />
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
   );
};

export default Notes;

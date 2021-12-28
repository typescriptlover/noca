import { useAtom } from 'jotai';

import * as state from '@/state';
import Note from './Note';

import { INote } from '@/interfaces';

interface Props {}

const Notes: React.FC<Props> = () => {
   const [notes, setNotes] = useAtom(state.notes);

   function setNote(id: number, newNote: INote) {
      setNotes(
         notes.map((n) => {
            if (n.id !== id) return n;

            return newNote;
         })
      );
   }

   return (
      <div
         onMouseDown={(e: any) => e.stopPropagation()}
         id="notes"
         className="absolute"
      >
         {notes.map((note) => (
            <Note key={note.id} note={note} setNote={setNote} />
         ))}
      </div>
   );
};

export default Notes;

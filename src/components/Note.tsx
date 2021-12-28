import { useAtom } from 'jotai';

import * as state from '@/state';
import { INote } from '@/interfaces';

interface Props {
   note: INote;
   setNote: (id: number, newNote: INote) => void;
}

const Note: React.FC<Props> = ({ note, setNote }) => {
   const [_, setWriting] = useAtom(state.writing);

   return (
      <div
         className="absolute p-2 pointer-events-auto rounded-xl bg-sister"
         style={{
            width: `${note.width}px`,
            height: `${note.height}px`,
            transform: `translate(${note.x}px, ${note.y}px)`,
         }}
      >
         <textarea
            onFocus={() => setWriting(true)}
            onBlur={() => setWriting(false)}
            spellCheck={false}
            value={note.note || ''}
            onInput={(e: any) => {
               setNote(note.id, {
                  ...note,
                  note: e.target.value,
               });
            }}
            className={`overflow-hidden focus:overflow-auto w-full h-full p-4 text-sm font-medium tracking-wide text-gray-300 rounded-lg resize-none select-text focus:outline-none bg-brother`}
         />
      </div>
   );
};

export default Note;

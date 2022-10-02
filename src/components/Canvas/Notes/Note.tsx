import { FC, MouseEvent, useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import * as state from '@/lib/state';
import { INote } from '@/types/interfaces';

interface Props {
   note: INote;
   setNote: (id: number, newNote: INote) => void;
}

const Note: FC<Props> = ({ note, setNote }) => {
   const [_, setBusy] = useAtom(state.busy);
   const [jumping] = useAtom(state.jumping);

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
         <div className="w-full h-full shadow-2xl focus-within:scale-110 will-change transition duration-200 ease-in-out rounded-xl border-[4px] border-base-850 focus-within:border-base-800">
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
               className="w-full h-full p-3 overflow-hidden text-base font-medium text-white rounded-lg resize-none select-text focus:overflow-auto focus:outline-none bg-base-400/10"
            />
         </div>
      </div>
   );
};

export default Note;

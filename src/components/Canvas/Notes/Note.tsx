import { FC, RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import useBearStore from '@/lib/state';
import useJump from '@/hooks/useJump';
import Tooltip from '@/components/ui/Tooltip';
import getMouseCoords from '@/lib/getMouseCoords';

import { INote } from '@/types/interfaces';
import * as db from '@/lib/db';
import { useDebounce } from '@/hooks/useDebounce';
import clsx from 'clsx';

interface Props {
   note: INote & PouchDB.Core.IdMeta;
   canvasRef: RefObject<HTMLDivElement>;
}

const Note: FC<Props> = ({ note, canvasRef }) => {
   const [canvas, jumping, updateBusy, updateNote, deleteNote] = useBearStore(
      (state) => [
         state.canvas,
         state.jumping,
         state.updateBusy,
         state.updateNote,
         state.deleteNote,
      ]
   );
   const jump = useJump(note);

   const [focused, setFocused] = useState<boolean>(false);
   const [moving, setMoving] = useState<boolean>(false);
   const toolbarRef = useRef<HTMLDivElement>(null);

   const debounceNote = useDebounce(note.note, 500);

   useEffect(() => {
      if (note.note === debounceNote) {
         db.updateNote(note._id, {
            ...note,
            note: debounceNote,
         });
      }
   }, [note, debounceNote]);

   function toggleMove() {
      if (moving) db.updateNote(note._id, note);
      setMoving(!moving);
   }

   function Delete() {
      deleteNote(note._id);
      db.deleteNote(note._id);
   }

   useEffect(() => {
      function move(e: any) {
         if (!moving) return;

         const coords = getMouseCoords(canvasRef, e, canvas.scale);

         if (coords) {
            const { x, y } = coords;

            updateNote(note._id, {
               x: x - note.width + 15,
               y: y - (toolbarRef.current?.offsetTop || 0) - 15,
            });
         }
      }

      document.addEventListener('mousemove', move);
      return () => document.removeEventListener('mousemove', move);
   }, [canvasRef, note, updateNote, canvas, moving]);

   function locationTop() {
      return 45 / canvas.scale;
   }

   function locationSize() {
      return 30 / canvas.scale;
   }

   const editor = useEditor({
      extensions: [StarterKit],
      onFocus() {
         updateBusy(true);
         setFocused(true);
      },
      onBlur() {
         updateBusy(false);
         setFocused(false);
      },
      onUpdate({ editor }) {
         updateNote(note._id, {
            note: editor.getHTML(),
         });
      },
      content: note.note || '',
      editorProps: {
         attributes: {
            class: 'focus:outline-none prose-invert prose prose-p:text-sm prose-h1:text-xl prose-h2:text-lg prose-h3:text-base',
         },
      },
      autofocus: 'end',
   });

   return (
      <div
         id={`note-${note._id}`}
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
            <div
               className={clsx(
                  'relative w-full h-full shadow-2xl transition duration-200 ease-in-out rounded-xl border-[4px]',
                  moving
                     ? 'scale-105 border-base-750'
                     : 'border-base-850 focus-within:border-base-750'
               )}
            >
               <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                     ease: 'easeInOut',
                     duration: 0.3,
                  }}
               >
                  <div
                     ref={toolbarRef}
                     className="absolute top-0 right-0 -mr-1 -mt-14"
                  >
                     <div className="flex px-0.5 items-center rounded-xl bg-base-850">
                        <Tooltip disabled={moving} text="Delete">
                           <span
                              onClick={Delete}
                              className="px-2.5 cursor-pointer py-2 transition duration-200 ease-linear text-zinc-400 hover:text-white"
                           >
                              <i className="fa-solid fa-fw fa-trash"></i>
                           </span>
                        </Tooltip>
                        <span
                           onClick={toggleMove}
                           className={clsx("px-2.5 py-2 text-zinc-400", moving ? 'cursor-grabbing' : 'cursor-grab')}
                        >
                           <i className="fa-solid fa-fw fa-up-down-left-right"></i>
                        </span>
                     </div>
                  </div>
               </motion.div>
               <div
                  onClick={() => editor?.view.dom.focus()}
                  className={clsx(
                     'w-full h-full p-4 bg-base-400/10 cursor-text',
                     focused ? 'overflow-auto' : 'overflow-hidden'
                  )}
               >
                  <EditorContent editor={editor} spellCheck={false} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Note;

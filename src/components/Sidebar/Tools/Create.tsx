import {
   FC,
   RefObject,
   useState,
   useMemo,
   Dispatch,
   SetStateAction,
   useEffect,
   useRef,
   forwardRef,
} from 'react';
import { createPortal } from 'react-dom';

import clsx from 'clsx';

import * as db from '@/lib/db';
import useBearStore from '@/lib/state';
import Tool from './Tool';
import Box from '@/layouts/Box';
import getMouseCoords from '@/lib/getMouseCoords';
import getSelection from '@/lib/getSelection';
import { IMouseCoords } from '@/types/interfaces';
import useCancel from '@/hooks/useCancel';

interface CreationProps {
   canvas: RefObject<HTMLDivElement>;
   start: IMouseCoords;
   current: IMouseCoords;
   scale: number;
   creating: boolean;
   setCreating: Dispatch<SetStateAction<boolean>>;
   setSelecting: Dispatch<SetStateAction<boolean>>;
}

const Creation = forwardRef<HTMLDivElement, CreationProps>(
   (
      { canvas, start, current, scale, creating, setCreating, setSelecting },
      ref
   ) => {
      const [notes, createNote] = useBearStore((state) => [
         state.notes,
         state.createNote,
      ]);

      const selection = getSelection(start, current);

      useEffect(() => {
         if (creating) {
            if (selection.height <= 150 || selection.width <= 150) {
               setCreating(false);
               setSelecting(false);
            } else {
               const timeout = setTimeout(() => {
                  setCreating(false);
                  setSelecting(false);

                  const note = {
                     _id: Date.now().toString(),
                     height: selection.height,
                     width: selection.width,
                     x: selection.left,
                     y: selection.top,
                     note: '',
                  };
                  createNote(note);
                  db.createNote(note);
               }, 350);

               return () => clearTimeout(timeout);
            }
         }
      }, [createNote, selection, creating, setCreating, setSelecting, notes]);

      if (!canvas.current) return null;
      return createPortal(
         <div
            ref={ref}
            className={clsx(
               'absolute pointer-events-none transition rounded-xl border-[4px] duration-200 ease-linear select-none border-base-800',
               creating ? 'bg-base-800 animate-bump' : 'bg-transparent'
            )}
            style={{
               left: `${selection.left}px`,
               top: `${selection.top}px`,
               width: `${selection.width}px`,
               height: `${selection.height}px`,
            }}
         />,
         canvas.current
      );
   }
);

interface Props {
   container: RefObject<HTMLDivElement>;
   canvas: RefObject<HTMLDivElement>;
}

const Create: FC<Props> = ({ container, canvas }) => {
   const [tools, scale] = useBearStore((state) => [
      state.tools,
      state.canvas.scale,
   ]);
   const active = useMemo(() => tools.create, [tools]);

   const [selecting, setSelecting] = useState<boolean>(false);
   const [creating, setCreating] = useState<boolean>(false);

   const [start, setStart] = useState<IMouseCoords>({
      x: 0,
      y: 0,
   });
   const [current, setCurrent] = useState<IMouseCoords>({
      x: 0,
      y: 0,
   });

   const creationRef = useRef<HTMLDivElement>(null);

   function handleCreate(e: MouseEvent) {
      setCreating(true);
   }

   useEffect(() => {
      function startSelect(e: MouseEvent) {
         if (e.currentTarget !== e.target || creating || e.which !== 1) return;

         const coords = getMouseCoords(canvas, e, scale);

         if (coords) {
            const { x, y } = coords;

            setStart({ x, y });
            setCurrent({ x, y });
            setSelecting(true);
         }
      }

      function handleSelect(e: MouseEvent) {
         const coords = getMouseCoords(canvas, e, scale);

         if (coords) {
            const { x, y } = coords;

            setCurrent({ x, y });
         }
      }

      if (active) {
         container.current?.addEventListener('mousedown', startSelect);
         if (selecting && !creating) {
            container.current?.addEventListener('mousemove', handleSelect);
            container.current?.addEventListener('mouseup', handleCreate);
         }
      }
      return () => {
         container.current?.removeEventListener('mousedown', startSelect);
         container.current?.removeEventListener('mousemove', handleSelect);
         container.current?.removeEventListener('mouseup', handleCreate);
      };
   }, [canvas, container, active, selecting, creating, scale]);

   useCancel(() => {
      setSelecting(false);
      setCreating(false);
   });

   return (
      <Box>
         <Tool tool="create" icon="note" />
         {active && selecting && (
            <Creation
               ref={creationRef}
               canvas={canvas}
               start={start}
               current={current}
               scale={scale}
               creating={creating}
               setCreating={setCreating}
               setSelecting={setSelecting}
            />
         )}
      </Box>
   );
};

export default Create;

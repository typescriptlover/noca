import { FC, RefObject, useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { createPortal } from 'react-dom';

import * as state from '@/lib/state';
import Tool from './Tool';
import getMouseCoords from '@/lib/getMouseCoords';
import { IMouseCoords } from '@/types/interfaces';
import Box from '@/layouts/Box';
import getSelection from '@/lib/getSelection';

interface SelectionProps {
   canvas: RefObject<HTMLDivElement>;
   start: IMouseCoords;
   current: IMouseCoords;
   scale: number;
}

const Selection: FC<SelectionProps> = ({ canvas, start, current, scale }) => {
   const selection = getSelection(start, current);

   function borderSize() {
      return 3 / scale;
   }

   function borderRadius() {
      return 12 / scale;
   }

   if (!canvas.current) return null;
   return createPortal(
      <div
         className="absolute border-dashed pointer-events-none select-none bg-base-900/20 border-base-700"
         style={{
            left: `${selection.left}px`,
            top: `${selection.top}px`,
            width: `${selection.width}px`,
            height: `${selection.height}px`,
            borderRadius: `${borderRadius()}px`,
            borderWidth: `${borderSize()}px`,
         }}
      />,
      canvas.current
   );
};

interface Props {
   container: RefObject<HTMLDivElement>;
   canvas: RefObject<HTMLDivElement>;
}
const Select: FC<Props> = ({ container, canvas }) => {
   const [tools] = useAtom(state.tools);
   const active = useMemo(() => tools.select, [tools]);
   const [_, setCursor] = useAtom(state.cursor);

   const [selecting, setSelecting] = useState<boolean>(false);
   const [{ scale }] = useAtom(state.canvas);

   const [start, setStart] = useState<IMouseCoords>({
      x: 0,
      y: 0,
   });
   const [current, setCurrent] = useState<IMouseCoords>({
      x: 0,
      y: 0,
   });

   function startSelect(e: MouseEvent) {
      if (e.currentTarget !== e.target) return;

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

   function stopSelect() {
      setSelecting(false);

      setStart({ x: 0, y: 0 });
      setCurrent({ x: 0, y: 0 });
   }

   useEffect(() => {
      if (active) {
         container.current?.addEventListener('mousedown', startSelect);
         if (selecting) {
            container.current?.addEventListener('mousemove', handleSelect);
            container.current?.addEventListener('mouseup', stopSelect);
         }
      }
      return () => {
         container.current?.removeEventListener('mousedown', startSelect);
         container.current?.removeEventListener('mousemove', handleSelect);
         container.current?.removeEventListener('mouseup', stopSelect);
      };
   }, [active, selecting, scale]);

   return (
      <Box>
         <Tool
            tool="select"
            icon="square-dashed"
            action={() => {
               setCursor('crosshair');
            }}
         />
         {active && selecting && (
            <Selection
               canvas={canvas}
               start={start}
               current={current}
               scale={scale}
            />
         )}
      </Box>
   );
};

export default Select;

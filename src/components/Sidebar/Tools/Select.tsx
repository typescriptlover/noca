import { FC, RefObject, useEffect, useMemo, useState } from 'react';

import { createPortal } from 'react-dom';

import useBearStore from '@/lib/state';
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
   const [tools, updateCursor, scale] = useBearStore((state) => [
      state.tools,
      state.updateCursor,
      state.canvas.scale,
   ]);
   const active = useMemo(() => tools.select, [tools]);

   const [selecting, setSelecting] = useState<boolean>(false);

   const [start, setStart] = useState<IMouseCoords>({
      x: 0,
      y: 0,
   });
   const [current, setCurrent] = useState<IMouseCoords>({
      x: 0,
      y: 0,
   });

   function stopSelect() {
      setSelecting(false);

      setStart({ x: 0, y: 0 });
      setCurrent({ x: 0, y: 0 });
   }

   useEffect(() => {
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
   }, [canvas, container, active, selecting, scale]);

   return (
      <Box>
         <Tool
            tool="select"
            icon="square-dashed"
            action={() => updateCursor('crosshair')}
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

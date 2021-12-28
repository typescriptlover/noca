import { useAtom } from 'jotai';
import { MouseEvent, useEffect, useState } from 'react';
import tinykeys from 'tinykeys';

import * as state from '@/state';
import Select from './Select';
import Stats from './Stats';
import Menu from './Menu';

import { IMouseCoords } from '@/interfaces';

interface Props {}

const Canvas: React.FC<Props> = ({ children }) => {
   const [canvas, setCanvas] = useAtom(state.canvas);
   const [writing] = useAtom(state.writing);
   const [containerElement, setContainerElement] = useState<Element | null>(
      null
   );
   const [canvasElement, setCanvasElement] = useState<Element | null>(null);
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

   useEffect(() => {
      if (document) {
         const ca = document.querySelector('#canvas');
         const co = document.querySelector('#container');

         if (ca) setCanvasElement(ca);
         if (co) setContainerElement(co);
      }
   }, []);

   function getMouseCoords(e: MouseEvent) {
      if (canvasElement) {
         const bounds = canvasElement.getBoundingClientRect();

         if (bounds) {
            let x = e.clientX - bounds.left;
            let y = e.clientY - bounds.top;

            const p = (canvas.scale / 1.0) * 100;

            x = (x / p) * 100;
            y = (y / p) * 100;

            return {
               x,
               y,
            };
         }
      }
   }

   function handleDown(e: MouseEvent) {
      setSelecting(true);

      if (canvasElement) {
         const coords = getMouseCoords(e);

         if (coords) {
            const { x, y } = coords;

            setStart({ x, y });
            setCurrent({ x, y });
         }
      }
   }

   function handleMove(e: MouseEvent) {
      if (canvasElement && selecting) {
         const coords = getMouseCoords(e);

         if (coords) {
            const { x, y } = coords;

            setCurrent({ x, y });
         }
      }
   }

   function handleUp() {
      if (selecting) {
         setSelecting(false);
         setCreating(true);
      }
   }

   useEffect(() => {
      if (!writing && containerElement) {
         const wheel = (e: any) => {
            const down = e.wheelDelta < 0;

            if (down) {
               if (canvas.scale >= 0.2) {
                  setCanvas({
                     ...canvas,
                     scale: parseFloat((canvas.scale - 0.1).toFixed(1)),
                  });
               }
            } else {
               if (canvas.scale < 1.0) {
                  setCanvas({
                     ...canvas,
                     scale: parseFloat((canvas.scale + 0.1).toFixed(1)),
                  });
               }
            }
         };

         containerElement.addEventListener('wheel', wheel);

         return () => containerElement.removeEventListener('wheel', wheel);
      }
   }, [writing, canvas, containerElement]);

   useEffect(() => {
      if (!writing) {
         const moveRate = 150;

         const unsubscribe = tinykeys(window, {
            ArrowUp: () => {
               setCanvas({
                  ...canvas,
                  y: canvas.y + moveRate,
               });
            },
            ArrowDown: () => {
               setCanvas({
                  ...canvas,
                  y: canvas.y - moveRate,
               });
            },
            ArrowRight: () => {
               setCanvas({
                  ...canvas,
                  x: canvas.x - moveRate,
               });
            },
            ArrowLeft: () => {
               setCanvas({
                  ...canvas,
                  x: canvas.x + moveRate,
               });
            },
         });

         return () => {
            unsubscribe();
         };
      }
   }, [writing, canvas]);

   return (
      <div
         id="container"
         onMouseDown={(e: MouseEvent) => handleDown(e)}
         onMouseMove={(e: MouseEvent) => handleMove(e)}
         onMouseUp={() => handleUp()}
         className="fixed top-0 left-0 w-full h-full will-change"
         style={{
            contain: 'strict',
         }}
      >
         <Menu />
         <Stats />
         <div
            id="canvas"
            className="absolute inset-0 transition duration-150 ease-linear pointer-events-none select-none will-change"
            style={{
               transform: `scale(${canvas.scale}) translate(${canvas.x}px, ${canvas.y}px)`,
            }}
         >
            <Select
               selecting={selecting}
               start={start}
               setStart={setStart}
               current={current}
               setCurrent={setCurrent}
               creating={creating}
               setCreating={setCreating}
            />
            {children}
         </div>
      </div>
   );
};

export default Canvas;

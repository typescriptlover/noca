import { useEffect } from 'react';
import tinykeys from 'tinykeys';

import useBearStore from '@/lib/state';

export default function useMove(rate: number) {
   const [canvas, updateCanvas] = useBearStore((state) => [
      state.canvas,
      state.updateCanvas,
   ]);
   const busy = useBearStore((state) => state.busy);

   useEffect(() => {
      if (!busy) {
         const unsubscribe = tinykeys(window, {
            ArrowUp: () => {
               updateCanvas({
                  y: canvas.y + rate,
               });
            },
            ArrowDown: () => {
               updateCanvas({
                  y: canvas.y - rate,
               });
            },
            ArrowRight: () => {
               updateCanvas({
                  x: canvas.x - rate,
               });
            },
            ArrowLeft: () => {
               updateCanvas({
                  x: canvas.x + rate,
               });
            },
         });

         return () => {
            unsubscribe();
         };
      }
   }, [rate, updateCanvas, busy, canvas]);
}

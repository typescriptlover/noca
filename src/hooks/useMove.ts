import { useAtom } from 'jotai';
import { useEffect } from 'react';
import tinykeys from 'tinykeys';

import * as state from '@/lib/state';

export default function useMove(rate: number) {
   const [canvas, setCanvas] = useAtom(state.canvas);
   const [busy] = useAtom(state.busy);

   useEffect(() => {
      if (!busy) {
         const unsubscribe = tinykeys(window, {
            ArrowUp: () => {
               setCanvas({
                  ...canvas,
                  y: canvas.y + rate,
               });
            },
            ArrowDown: () => {
               setCanvas({
                  ...canvas,
                  y: canvas.y - rate,
               });
            },
            ArrowRight: () => {
               setCanvas({
                  ...canvas,
                  x: canvas.x - rate,
               });
            },
            ArrowLeft: () => {
               setCanvas({
                  ...canvas,
                  x: canvas.x + rate,
               });
            },
         });

         return () => {
            unsubscribe();
         };
      }
   }, [busy, canvas]);
}

import { useAtom } from 'jotai';
import { RefObject } from 'react';

export default function getMouseCoords(
   ref: RefObject<any>,
   e: MouseEvent,
   scale: number
) {
   if (ref.current) {
      const bounds = ref.current.getBoundingClientRect();

      if (bounds) {
         let x = e.clientX - bounds.left;
         let y = e.clientY - bounds.top;

         const p = (scale / 1.0) * 100;

         x = (x / p) * 100;
         y = (y / p) * 100;

         return {
            x,
            y,
         };
      }
   }
}

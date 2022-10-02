import { useAtom } from 'jotai';
import { RefObject, useEffect } from 'react';

import * as state from '@/lib/state';

export default function useZoom(containerRef: RefObject<HTMLDivElement>) {
   const [canvas, setCanvas] = useAtom(state.canvas);
   const [busy] = useAtom(state.busy);

   useEffect(() => {
      if (!busy && containerRef.current) {
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

         containerRef.current.addEventListener('wheel', wheel);
         return () => containerRef.current?.removeEventListener('wheel', wheel);
      }
   }, [busy, canvas, containerRef.current]);
}

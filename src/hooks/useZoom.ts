import { RefObject, useEffect } from 'react';

import useBearStore from '@/lib/state';

export default function useZoom(containerRef: RefObject<HTMLDivElement>) {
   const [canvas, updateCanvas, busy] = useBearStore((state) => [
      state.canvas,
      state.updateCanvas,
      state.busy,
   ]);

   useEffect(() => {
      if (!busy && containerRef.current) {
         const wheel = (e: any) => {
            const down = e.wheelDelta < 0;

            if (down) {
               if (canvas.scale >= 0.2) {
                  updateCanvas({
                     scale: parseFloat((canvas.scale - 0.1).toFixed(1)),
                  });
               }
            } else {
               if (canvas.scale < 1.0) {
                  updateCanvas({
                     scale: parseFloat((canvas.scale + 0.1).toFixed(1)),
                  });
               }
            }
         };

         const current = containerRef.current;
         current.addEventListener('wheel', wheel);
         return () => current.removeEventListener('wheel', wheel);
      }
   }, [updateCanvas, busy, canvas, containerRef]);
}

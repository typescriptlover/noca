import getNoteCoords from '@/lib/getNoteCoords';

import { useCallback } from 'react';

import useBearStore from '@/lib/state';
import { INote } from '@/types/interfaces';
import { jumpingAnimation } from '@/lib/constants';

export default function useJump(note: (INote & PouchDB.Core.IdMeta) | false) {
   const [updateCanvas, updateJumping] = useBearStore((state) => [
      state.updateCanvas,
      state.updateJumping,
   ]);

   return useCallback(
      (cnote?: INote) => {
         const { x, y } = getNoteCoords(note || cnote!);

         updateJumping(true);
         updateCanvas({
            x,
            y,
         });
         setTimeout(() => {
            updateCanvas({
               x,
               y,
               scale: 1.0,
            });
            setTimeout(() => {
               updateJumping(false);
            }, jumpingAnimation);
         }, jumpingAnimation);
      },
      [updateCanvas, updateJumping, note]
   );
}

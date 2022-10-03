import getNoteCoords from '@/lib/getNoteCoords';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

import * as state from '@/lib/state';
import { INote } from '@/types/interfaces';
import { jumpingAnimation } from '@/lib/constants';

export default function useJump(note: INote | false) {
   const [_, setJumping] = useAtom(state.jumping);
   const [canvas, setCanvas] = useAtom(state.canvas);

   return useCallback(
      (cnote?: INote) => {
         const { x, y } = getNoteCoords(note || cnote!);

         setJumping(true);
         setCanvas({
            ...canvas,
            x,
            y,
         });
         setTimeout(() => {
            setCanvas({
               ...canvas,
               x,
               y,
               scale: 1.0,
            });
            setTimeout(() => {
               setJumping(false);
            }, jumpingAnimation);
         }, jumpingAnimation);
      },
      [note, canvas]
   );
}

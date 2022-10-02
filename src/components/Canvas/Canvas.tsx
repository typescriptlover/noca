import { useAtom } from 'jotai';
import { useRef, FC, RefObject, forwardRef } from 'react';

import * as state from '@/lib/state';
import useZoom from '@/hooks/useZoom';
import useMove from '@/hooks/useMove';
import Notes from './Notes/Notes';

interface Props {
   container: RefObject<HTMLDivElement>;
}

const Canvas = forwardRef<HTMLDivElement, Props>(({ container }, ref) => {
   const [canvas] = useAtom(state.canvas);

   useZoom(container);
   useMove(150);

   return (
      <div
         id="canvas"
         ref={ref}
         className="absolute inset-0 transition-all duration-150 ease-linear pointer-events-none select-none"
         style={{
            transform: `scale(${canvas.scale}) translate(${canvas.x}px, ${canvas.y}px)`,
         }}
      >
         <Notes />
      </div>
   );
});

export default Canvas;

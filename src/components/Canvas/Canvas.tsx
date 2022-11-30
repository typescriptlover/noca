import { RefObject, forwardRef } from 'react';
import clsx from 'clsx';

import useBearStore from '@/lib/state';
import useZoom from '@/hooks/useZoom';
import useMove from '@/hooks/useMove';
import Notes from './Notes/Notes';
import { jumpingAnimation } from '@/lib/constants';

interface Props {
   container: RefObject<HTMLDivElement>;
}

const Canvas = forwardRef<HTMLDivElement, Props>(({ container }, ref) => {
   const [canvas, jumping] = useBearStore((state) => [
      state.canvas,
      state.jumping,
   ]);

   useZoom(container);
   useMove(150);

   return (
      <div
         id="canvas"
         key="canvas"
         ref={ref}
         className={clsx(
            'absolute inset-0 transition-all pointer-events-none select-none',
            jumping ? 'ease-in-out' : 'ease-linear'
         )}
         style={{
            transitionDuration: jumping ? `${jumpingAnimation}ms` : '150ms',
            transform: `scale(${canvas.scale}) translate(${canvas.x}px, ${canvas.y}px)`,
         }}
      >
         <Notes canvasRef={ref as RefObject<HTMLDivElement>} />
      </div>
   );
});

export default Canvas;

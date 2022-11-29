import { useAtom } from 'jotai';
import { useRef } from 'react';

import useCanvasStorage from '@/hooks/useCanvasStorage';
import useNotesStorage from '@/hooks/useNotesStorage';
import * as state from '@/lib/state';
import Canvas from '@/components/Canvas/Canvas';
import Zoom from '@/components/Canvas/Zoom';
import Menu from '@/components/Menu/Menu';
import Sidebar from '@/components/Sidebar/Sidebar';

const App = () => {
   const canvasLoaded = useCanvasStorage();
   useNotesStorage();

   const containerRef = useRef<HTMLDivElement>(null);
   const canvasRef = useRef<HTMLDivElement>(null);
   const [cursor] = useAtom(state.cursor);

   // TODO: add some sort of loading canvas
   if (!canvasLoaded) return null;

   return (
      <div
         id="container"
         ref={containerRef}
         className="fixed inset-0"
         style={{
            contain: 'strict',
            cursor,
         }}
      >
         <Canvas ref={canvasRef} container={containerRef} />
         <Menu />
         <Sidebar container={containerRef} canvas={canvasRef} />
         <Zoom />
      </div>
   );
};

export default App;

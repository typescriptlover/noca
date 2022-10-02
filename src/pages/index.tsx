import { NextPage } from 'next';
import { useRef } from 'react';
import { useAtom } from 'jotai';

import * as state from '@/lib/state';
import useCanvasStorage from '@/hooks/useCanvasStorage';
import Canvas from '@/components/Canvas/Canvas';
import Zoom from '@/components/Canvas/Zoom';
import Menu from '@/components/Menu/Menu';
import Sidebar from '@/components/Sidebar/Sidebar';

const Index: NextPage = () => {
   const loaded = useCanvasStorage();

   const containerRef = useRef<HTMLDivElement>(null);
   const canvasRef = useRef<HTMLDivElement>(null);
   const [cursor] = useAtom(state.cursor);

   if (!loaded) return null;
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

export default Index;

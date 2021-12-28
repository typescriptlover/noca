import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import Canvas from '@/components/Canvas';
import Notes from '@/components/Notes';
import useStorage from '@/hooks/useStorage';
import { useAtom } from 'jotai';
import * as state from '@/state';

const Index: NextPage = () => {
   const [canvas, setCanvas] = useAtom(state.canvas);
   const [notes, setNotes] = useAtom(state.notes);
   const [loaded, setLoaded] = useState<boolean>(false);

   const [localCanvas, setLocalCanvas] = useStorage('noca_canvas');
   const [localNotes, setLocalNotes] = useStorage('noca_notes');

   useEffect(() => {
      if (localCanvas !== null && localNotes !== null) {
         if (localCanvas) setCanvas(JSON.parse(localCanvas));
         if (localNotes) setNotes(JSON.parse(localNotes));

         return () => setLoaded(true);
      }
   }, [localCanvas, localNotes]);

   useEffect(() => {
      if (loaded) {
         setLocalCanvas(JSON.stringify(canvas));
         setLocalNotes(JSON.stringify(notes));
      }
   }, [loaded, notes, canvas]);

   if (!loaded) return null;

   return (
      <Canvas>
         <Notes />
      </Canvas>
   );
};

export default Index;

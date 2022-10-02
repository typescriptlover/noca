import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import * as state from '@/lib/state';
import useStorage from './useStorage';
import { ICanvas, INote } from '@/interfaces';

const useCanvasStorage = () => {
   const [canvas, setCanvas] = useAtom(state.canvas);
   const [notes, setNotes] = useAtom(state.notes);

   const [loaded, setLoaded] = useState<boolean>(false);

   const [localCanvas, setLocalCanvas] = useStorage('noca_canvas');
   const [localNotes, setLocalNotes] = useStorage('noca_notes');

   useEffect(() => {
      if (!loaded) {
         if (localCanvas === null && localNotes === null) {
            setLoaded(true);
         } else if (localCanvas || localNotes) {
            if (localCanvas) {
               const parsedCanvas = JSON.parse(localCanvas) as ICanvas;
               setCanvas(parsedCanvas);
            }
            if (localNotes) {
               const parsedNotes = JSON.parse(localNotes) as INote[];
               setNotes(parsedNotes);
            }
            setLoaded(true);
         }
      }
   }, [loaded, localCanvas, localNotes]);

   useEffect(() => {
      if (loaded) {
         if (!localCanvas || JSON.stringify(canvas) !== localCanvas) {
            setLocalCanvas(JSON.stringify(canvas));
         }
         if (!localNotes || JSON.stringify(notes) !== localNotes) {
            setLocalNotes(JSON.stringify(notes));
         }
      }
   }, [loaded, canvas, localCanvas, notes, localNotes]);

   return loaded;
};

export default useCanvasStorage;

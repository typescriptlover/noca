import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import useLocalStorage from './useLocalStorage';
import * as state from '@/lib/state';

import { ICanvas } from '@/types/interfaces';

const useCanvasStorage = () => {
   const [loaded, setLoaded] = useState<boolean>(false);
   const [canvas, setCanvas] = useAtom(state.canvas);
   const [localCanvas, setLocalCanvas] = useLocalStorage('noca_canvas');

   useEffect(() => {
      if (!loaded) {
         if (localCanvas === null) {
            setLoaded(true);
         } else if (localCanvas) {
            if (localCanvas) {
               const parsedCanvas = JSON.parse(localCanvas) as ICanvas;
               setCanvas(parsedCanvas);
            }
            setLoaded(true);
         }
      }
   }, [loaded, localCanvas]);

   useEffect(() => {
      if (loaded) {
         if (!localCanvas || JSON.stringify(canvas) !== localCanvas) {
            setLocalCanvas(JSON.stringify(canvas));
         }
      }
   }, [loaded, canvas, localCanvas]);

   return loaded;
};

export default useCanvasStorage;

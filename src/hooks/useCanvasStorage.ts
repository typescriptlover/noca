import { useEffect, useState } from 'react';

import useLocalStorage from './useLocalStorage';
import useBearStore from '@/lib/state';

import { ICanvas } from '@/types/interfaces';

const useCanvasStorage = () => {
   const [loaded, setLoaded] = useState<boolean>(false);
   const [localCanvas, setLocalCanvas] = useLocalStorage('noca_canvas');

   const [canvas, updateCanvas] = useBearStore((state) => [
      state.canvas,
      state.updateCanvas,
   ]);

   useEffect(() => {
      if (!loaded) {
         if (localCanvas === null) {
            setLoaded(true);
         } else if (localCanvas) {
            if (localCanvas) {
               const parsedCanvas = JSON.parse(localCanvas) as ICanvas;
               updateCanvas(parsedCanvas);
            }
            setLoaded(true);
         }
      }
   }, [updateCanvas, loaded, localCanvas]);

   useEffect(() => {
      if (loaded) {
         if (!localCanvas || JSON.stringify(canvas) !== localCanvas) {
            setLocalCanvas(JSON.stringify(canvas));
         }
      }
   }, [setLocalCanvas, loaded, localCanvas, canvas]);

   return loaded;
};

export default useCanvasStorage;

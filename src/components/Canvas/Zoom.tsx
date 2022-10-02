import { FC, useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import * as state from '@/lib/state';
import Tooltip from '../ui/Tooltip';

const Zoom: FC = () => {
   const [canvas, setCanvas] = useAtom(state.canvas);

   return (
      <div className="absolute bottom-[20px] right-[20px] z-50">
         <div className="flex select-none items-center overflow-hidden border border-base-850 rounded-xl drop-shadow-2xl">
            <Tooltip text="Zoom out">
               <button
                  disabled={canvas.scale - 0.1 <= 0}
                  onClick={() => {
                     const scale = canvas.scale - 0.1;
                     setCanvas({
                        ...canvas,
                        scale: parseFloat(scale.toFixed(1)),
                     });
                  }}
                  className="px-4 py-2 transition duration-200 ease-linear border-r bg-base-900 cursor-zoom-out disabled:opacity-75 disabled:hover:bg-base-900 disabled:cursor-not-allowed border-base-850 hover:bg-base-850"
               >
                  <i className="fa-regular fa-minus"></i>
               </button>
            </Tooltip>
            <div className="text-base w-[4.25rem] text-center bg-base-900 py-2 font-semibold tracking-wide text-white">
               {(canvas.scale / 1.0) * 100}%
            </div>
            <Tooltip text="Zoom in">
               <button
                  disabled={canvas.scale + 0.1 > 1}
                  onClick={() => {
                     const scale = canvas.scale + 0.1;
                     setCanvas({
                        ...canvas,
                        scale: parseFloat(scale.toFixed(1)),
                     });
                  }}
                  className="px-4 py-2 transition duration-200 ease-linear border-l bg-base-900 cursor-zoom-in disabled:opacity-75 disabled:hover:bg-base-900 disabled:cursor-not-allowed border-base-850 hover:bg-base-850"
               >
                  <i className="fa-regular fa-plus"></i>
               </button>
            </Tooltip>
         </div>
      </div>
   );
};

export default Zoom;

import { useAtom } from 'jotai';

import * as state from '@/state';

const Stats = () => {
   const [canvas] = useAtom(state.canvas);
   const [notes] = useAtom(state.notes);

   return (
      <div className="absolute top-[25px] right-[20px] select-none bg-sister py-3 px-4 rounded-2xl shadow-2xl z-50">
         <div className="flex flex-col items-end justify-end gap-y-1">
            <div className="text-base font-semibold tracking-wide text-white">
               {(canvas.scale / 1.0) * 100}%
            </div>
            <div className="text-sm font-semibold tracking-wide text-gray-300">
               {canvas.x}, {canvas.y}
            </div>
         </div>
      </div>
   );
};

export default Stats;

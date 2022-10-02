import { Dispatch, SetStateAction } from 'react';

import { TTab } from '@/types';

interface Props {
   setTab: Dispatch<SetStateAction<false | TTab>>;
}

const Guide: React.FC<Props> = ({ setTab }) => {
   return (
      <div className="flex flex-col">
         <h1 className="flex items-center ml-4 text-2xl font-semibold gap-x-4">
            <button
               onClick={() => setTab(false)}
               className="text-zinc-500 hover:text-zinc-300 transition duration-200 ease-linear text-lg py-0.5 px-2.5 bg-base-850 rounded-lg group"
            >
               <i className="fa-solid fa-arrow-up-left"></i>
            </button>
            Guide
         </h1>
         <hr className="my-4 border-t border-base-850" />
         <div className="flex flex-col gap-y-7">
            <div className="flex flex-col px-4 gap-y-3">
               <h2 className="text-xs font-semibold tracking-wide uppercase text-zinc-400">
                  general
               </h2>
               <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <div className="flex items-center gap-x-3">
                     <div>
                        <span className="px-2 py-1 text-[0.7rem] uppercase font-semibold text-zinc-300 tracking-wide rounded-md bg-base-900 border border-base-850">
                           <i className="fa-solid fa-arrow-up"></i>
                        </span>
                     </div>
                     <div className="text-sm font-medium">Navigate up</div>
                  </div>
                  <div className="flex items-center gap-x-3">
                     <div>
                        <span className="px-2 py-1 text-[0.7rem] uppercase font-semibold text-zinc-300 tracking-wide rounded-md bg-base-900 border border-base-850">
                           <i className="fa-solid fa-arrow-down"></i>
                        </span>
                     </div>
                     <div className="text-sm font-medium">Navigate down</div>
                  </div>
                  <div className="flex items-center gap-x-3">
                     <div>
                        <span className="px-2 py-1 text-[0.7rem] uppercase font-semibold text-zinc-300 tracking-wide rounded-md bg-base-900 border border-base-850">
                           <i className="fa-solid fa-arrow-left"></i>
                        </span>
                     </div>
                     <div className="text-sm font-medium">Navigate left</div>
                  </div>
                  <div className="flex items-center gap-x-3">
                     <div>
                        <span className="px-2 py-1 text-[0.7rem] uppercase font-semibold text-zinc-300 tracking-wide rounded-md bg-base-900 border border-base-850">
                           <i className="fa-solid fa-arrow-right"></i>
                        </span>
                     </div>
                     <div className="text-sm font-medium">Navigate right</div>
                  </div>
                  <div className="flex items-center gap-x-3">
                     <div>
                        <span className="px-2 py-1 text-[0.7rem] uppercase font-semibold text-zinc-300 tracking-wide rounded-md bg-base-900 border border-base-850">
                           scroll
                        </span>
                     </div>
                     <div className="text-sm font-medium">Zoom in/out</div>
                  </div>
                  <div className="flex items-center gap-x-3">
                     <div>
                        <span className="px-2 py-1 text-[0.7rem] uppercase font-semibold text-zinc-300 tracking-wide rounded-md bg-base-900 border border-base-850">
                           esc
                        </span>
                     </div>
                     <div className="text-sm font-medium">Cancel</div>
                  </div>
               </div>
            </div>
            <div className="flex flex-col px-4 gap-y-3">
               <h2 className="text-xs font-semibold tracking-wide uppercase text-zinc-400">
                  tools
               </h2>
               <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <div className="flex items-center gap-x-3">
                     <div>
                        <span className="px-2 py-1 text-[0.7rem] uppercase font-semibold text-zinc-300 tracking-wide rounded-md bg-base-900 border border-base-850">
                           click + drag
                        </span>
                     </div>
                     <div className="text-sm font-medium">Create</div>
                  </div>
                  <div className="flex items-center gap-x-3">
                     <div>
                        <span className="px-2 py-1 text-[0.7rem] uppercase font-semibold text-zinc-300 tracking-wide rounded-md bg-base-900 border border-base-850">
                           click + drag
                        </span>
                     </div>
                     <div className="text-sm font-medium">Select</div>
                  </div>
                  <div className="flex items-center gap-x-3">
                     <div>
                        <span className="px-2 py-1 text-[0.7rem] uppercase font-semibold text-zinc-300 tracking-wide rounded-md bg-base-900 border border-base-850">
                           click + drag
                        </span>
                     </div>
                     <div className="text-sm font-medium">Move</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Guide;

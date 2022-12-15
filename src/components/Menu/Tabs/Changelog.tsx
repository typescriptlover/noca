import { Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';

import { TTab } from '@/types/types';
import changelog from '@/data/changelog';

interface Props {
   setTab: Dispatch<SetStateAction<false | TTab>>;
}

const Changelog: React.FC<Props> = ({ setTab }) => {
   return (
      <div className="flex flex-col">
         <h1 className="flex items-center ml-4 text-2xl font-semibold gap-x-4">
            <button
               onClick={() => setTab(false)}
               className="text-zinc-500 hover:text-zinc-300 transition duration-200 ease-linear text-lg py-0.5 px-2.5 bg-base-850 rounded-lg group"
            >
               <i className="fa-solid fa-arrow-up-left"></i>
            </button>
            Changelog
         </h1>
         <hr className="my-4 border-t border-base-850" />
         <div className="flex flex-col gap-y-4">
            <button className="p-4 text-sm font-semibold transition duration-200 ease-linear border-2 border-dashed text-zinc-400 hover:text-white hover:border-solid hover:bg-base-900 rounded-xl border-base-750 hover:border-base-700">
               <span className="mr-3 -ml-3">
                  <i className="fa-regular fa-angle-up"></i>
               </span>
               Newer logs
            </button>
            {changelog.map((log, logIndex) => (
               <div
                  key={logIndex}
                  className="p-4 transition duration-200 ease-linear rounded-xl bg-base-900 hover:bg-base-850"
               >
                  <div className="inline-flex items-center gap-x-2">
                     <span className="text-xs font-medium tracking-tight text-zinc-400">
                        {format(new Date(log.createdAt), 'MMM d, y')}
                     </span>
                     <span className="text-xs font-light text-zinc-200">
                        {log.type}
                     </span>
                  </div>
                  <h2 className="font-medium tracking-wide">{log.title}</h2>
                  <div className="mt-2 text-sm text-zinc-300">
                     {log.description}
                  </div>
               </div>
            ))}
            <button className="p-4 text-sm font-semibold transition duration-200 ease-linear border-2 border-dashed text-zinc-400 hover:text-white hover:border-solid hover:bg-base-900 rounded-xl border-base-750 hover:border-base-700">
               <span className="mr-3 -ml-3">
                  <i className="fa-regular fa-angle-down"></i>
               </span>
               Older logs
            </button>
         </div>
      </div>
   );
};

export default Changelog;

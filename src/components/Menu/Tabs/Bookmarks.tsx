import { Dispatch, SetStateAction } from 'react';

import { TTab } from '@/types/types';

interface Props {
   setTab: Dispatch<SetStateAction<false | TTab>>;
}

const Bookmarks: React.FC<Props> = ({ setTab }) => {
   return (
      <div className="flex flex-col">
         <h1 className="flex items-center ml-4 text-2xl font-semibold gap-x-4">
            <button
               onClick={() => setTab(false)}
               className="text-zinc-500 hover:text-zinc-300 transition duration-200 ease-linear text-lg py-0.5 px-2.5 bg-base-850 rounded-lg group"
            >
               <i className="fa-solid fa-arrow-up-left"></i>
            </button>
            Bookmarks
         </h1>
         <hr className="my-4 border-t border-base-850" />
         asd
      </div>
   );
};

export default Bookmarks;

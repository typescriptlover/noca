import { FC, RefObject } from 'react';
import Create from './Tools/Create';
import Move from './Tools/Move';

import Select from './Tools/Select';

interface Props {
   container: RefObject<HTMLDivElement>;
   canvas: RefObject<HTMLDivElement>;
}

const Sidebar: FC<Props> = ({ container, canvas }) => {
   return (
      <div className="absolute z-50 inset-y-0 left-[20px] flex items-center">
         <div className="flex flex-col px-1.5 py-1.5 gap-y-1 drop-shadow-2xl bg-base-900 border border-base-850 rounded-xl">
            <Create container={container} canvas={canvas} />
            <Select container={container} canvas={canvas} />
            <Move container={container} canvas={canvas} />
         </div>
      </div>
   );
};

export default Sidebar;
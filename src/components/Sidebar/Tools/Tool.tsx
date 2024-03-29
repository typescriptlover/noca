import Tooltip from '@/components/ui/Tooltip';
import { FC, MouseEvent, useMemo } from 'react';
import clsx from 'clsx';

import useBearStore from '@/lib/state';

import { TTool } from '@/types/types';

interface Props {
   tool: TTool;
   icon: string;
   action?: any;
}

const Tool: FC<Props> = ({ tool, icon, action }) => {
   const [tools, updateCursor, updateTools] = useBearStore((state) => [
      state.tools,
      state.updateCursor,
      state.updateTools,
   ]);
   const active = useMemo(() => tools[tool], [tools, tool]);

   function setActive() {
      const newTools = Object.keys(tools).reduce((a, k) => {
         return { ...a, [k]: false };
      }, tools);

      updateCursor('auto');
      updateTools({
         ...newTools,
         [tool]: true,
      });
   }

   return (
      <Tooltip text={tool[0].toUpperCase() + tool.slice(1, tool.length)}>
         <button
            onClick={() => {
               setActive();
               if (action) action();
            }}
            className={clsx(
               'focus:outline-none px-2.5 py-2 text-xl transition duration-200 ease-linear group rounded-xl',
               active
                  ? 'text-white bg-base-700'
                  : 'text-zinc-400 hover:text-white focus:text-white focus:bg-base-750 hover:bg-base-750'
            )}
         >
            <span
               className={clsx(
                  'inline-block transition duration-200 ease-linear will-change-transform',
                  active ? 'scale-110' : 'group-hover:scale-110'
               )}
            >
               <i className={`fa-regular fa-fw fa-${icon}`}></i>
            </span>
         </button>
      </Tooltip>
   );
};

export default Tool;

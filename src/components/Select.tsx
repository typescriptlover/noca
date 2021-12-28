import { Dispatch, SetStateAction, useEffect } from 'react';

import { IMouseCoords } from '@/interfaces';
import { useAtom } from 'jotai';

import * as state from '@/state';

interface Props {
   selecting: boolean;
   start: IMouseCoords;
   setStart: Dispatch<SetStateAction<IMouseCoords>>;
   current: IMouseCoords;
   setCurrent: Dispatch<SetStateAction<IMouseCoords>>;
   creating: boolean;
   setCreating: Dispatch<SetStateAction<boolean>>;
}

const Select: React.FC<Props> = ({
   selecting,
   start,
   setStart,
   current,
   setCurrent,
   creating,
   setCreating,
}) => {
   const [canvas] = useAtom(state.canvas);
   const [notes, setNotes] = useAtom(state.notes);

   function calcTop(): number {
      return current.y < start.y ? current.y : start.y;
   }

   function calcLeft(): number {
      return current.x < start.x ? current.x : start.x;
   }

   function calcWidth(): number {
      return current.x < start.x ? start.x - current.x : current.x - start.x;
   }

   function calcHeight(): number {
      return current.y < start.y ? start.y - current.y : current.y - start.y;
   }

   useEffect(() => {
      let timeout: any;

      if (creating) {
         if (calcWidth() <= 100 && calcHeight() <= 100) {
            setCreating(false);
         } else {
            timeout = setTimeout(() => {
               setNotes([
                  ...notes,
                  {
                     id: Date.now(),
                     note: '',
                     height: calcHeight(),
                     width: calcWidth(),
                     x: calcLeft(),
                     y: calcTop(),
                  },
               ]);

               setStart({ x: 0, y: 0 });
               setCurrent({ x: 0, y: 0 });
               setCreating(false);
            }, 300);
         }
      }

      return () => {
         if (timeout) clearTimeout(timeout);
      };
   }, [creating]);

   function borderSize() {
      const st = 1.0 - canvas.scale;
      return 3 + 7 * st;
   }

   function borderRadius() {
      const st = 1.0 - canvas.scale;
      return 8 + 7 * st;
   }

   if (selecting || creating) {
      return (
         <div
            className={`absolute pointer-events-none select-none border-[#16191b] ${
               creating && 'bg-sisterLight animate-bump'
            }`}
            style={{
               left: `${calcLeft()}px`,
               top: `${calcTop()}px`,
               width: calcWidth() + 'px',
               height: calcHeight() + 'px',
               borderWidth: `${borderSize()}px`,
               borderRadius: `${borderRadius()}px`,
            }}
         ></div>
      );
   } else {
      return null;
   }
};

export default Select;

import { RefObject, useEffect } from 'react';

export default function useClickOutside(
   condition: boolean,
   ref: RefObject<any>,
   handler: any,
   dependencies?: any[]
) {
   useEffect(() => {
      if (condition) {
         const clickOutsideA = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (
               (target && e.offsetX > target.clientWidth) ||
               (target && e.offsetY > target.clientHeight)
            ) {
               return;
            }

            if (ref && ref.current && !ref.current.contains(target)) handler();
         };
         document.addEventListener('mousedown', clickOutsideA, false);

         return () => document.removeEventListener('mousedown', clickOutsideA);
      }
   }, [handler, condition, ref, dependencies]);
}

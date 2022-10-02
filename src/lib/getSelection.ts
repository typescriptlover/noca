import { IMouseCoords } from '@/interfaces';

export default function getSelection(
   current: IMouseCoords,
   start: IMouseCoords
) {
   function top(): number {
      return current.y < start.y ? current.y : start.y;
   }

   function left(): number {
      return current.x < start.x ? current.x : start.x;
   }

   function width(): number {
      return current.x < start.x ? start.x - current.x : current.x - start.x;
   }

   function height(): number {
      return current.y < start.y ? start.y - current.y : current.y - start.y;
   }

   return {
      top: top(),
      left: left(),
      width: width(),
      height: height(),
   };
}

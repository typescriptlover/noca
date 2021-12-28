import { MutableRefObject, useEffect, useRef, useState } from 'react';

export default function useHover(): [MutableRefObject<any>, boolean] {
   const [value, setValue] = useState(false);
   const ref = useRef(null);

   const handleMouseOver = () => setValue(true);
   const handleMouseOut = () => setValue(false);

   useEffect(() => {
      const node = ref.current as any;

      if (node) {
         node.addEventListener('mouseover', handleMouseOver);
         node.addEventListener('mouseout', handleMouseOut);

         return () => {
            node.removeEventListener('mouseover', handleMouseOver);
            node.removeEventListener('mouseout', handleMouseOut);
         };
      }
   }, [ref.current]);
   return [ref, value];
}

import { useEffect, useState } from 'react';

export default function useStorage(name: string): [string | null | false, any] {
   const [storage, setStorage] = useState<string | false | null>(false);

   useEffect(() => {
      if (typeof window !== undefined) {
         setStorage(window.localStorage.getItem(name));
      }
   }, []);

   function updateStorage(value: string) {
      if (typeof window !== undefined) {
         setStorage(value);
         window.localStorage.setItem(name, value);
      }
   }

   return [storage, updateStorage];
}

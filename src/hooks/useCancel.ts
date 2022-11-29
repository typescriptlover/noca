import { useEffect } from 'react';
import tinykeys from 'tinykeys';

export default function useCancel(trigger: any) {
   useEffect(() => {
      const unsubscribe = tinykeys(window, {
         Escape: () => trigger(),
      });
      return () => {
         unsubscribe();
      };
   }, [trigger]);
}

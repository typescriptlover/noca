import useBearStore from '@/lib/state';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

const Mode = () => {
   const tools = useBearStore((state) => state.tools);

   const activeTool = useMemo(
      () =>
         Object.keys(
            Object.fromEntries(Object.entries(tools).filter(([k, v]) => !!v))
         )[0],
      [tools]
   );

   return (
      <div className="absolute pointer-events-none select-none top-5 inset-x-0 flex items-center justify-center">
         <AnimatePresence mode="wait">
            <motion.div
               key={activeTool}
               initial={{ opacity: 0, y: -20, scale: 0.8 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: -20, scale: 0.8 }}
               transition={{
                  ease: 'easeInOut',
                  duration: 0.2,
               }}
               className="text-sm will-change-transform text-zinc-300 z-[50] bg-base-900 py-1.5 px-3 drop-shadow-2xl rounded-lg"
            >
               currently in{' '}
               <span className="text-white font-semibold">{activeTool}</span>{' '}
               mode
            </motion.div>
         </AnimatePresence>
      </div>
   );
};

export default Mode;

import useLocalStorage from '@/hooks/useLocalStorage';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Tooltip from '../ui/Tooltip';

const Introduction = () => {
   const [introduction, setIntroduction] = useLocalStorage('noca_introduction');

   const [animateIcon, setAnimateIcon] = useState<boolean>(false);

   return (
      <AnimatePresence>
         {introduction === null && (
            <motion.div
               className={clsx(
                  'fixed flex flex-col inset-0 backdrop-blur-2xl bg-black/75 cursor-default z-[99999]'
               )}
            >
               <div className="m-auto text-center max-w-lg w-full">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                     animate={{ opacity: 1, scale: 1.0, rotate: -12 }}
                     exit={{ opacity: 0, scale: 0.6, rotate: 0 }}
                     transition={{
                        ease: 'easeInOut',
                        duration: 0.4,
                     }}
                     className={clsx(
                        'text-7xl will-change-transform transition duration-300 ease-linear',
                        animateIcon ? 'text-zinc-200' : 'text-zinc-400'
                     )}
                  >
                     <i className="fa-duotone fa-note"></i>
                  </motion.div>
                  <motion.h1
                     initial={{ opacity: 0, y: -5 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -5 }}
                     transition={{
                        ease: 'easeInOut',
                        duration: 0.4,
                        delay: 0.6,
                     }}
                     className="mt-8 text-4xl text-zinc-200 tracking-tight font-light"
                  >
                     introducing{' '}
                     <span className="font-semibold text-white">no-ca</span>.
                  </motion.h1>
                  <motion.div
                     initial={{ opacity: 0, y: -5 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -5 }}
                     transition={{
                        ease: 'easeInOut',
                        duration: 0.4,
                        delay: 0.8,
                     }}
                     className="mt-4 text-zinc-400"
                  >
                     a{' '}
                     <Tooltip
                        text="Keep your data, it's yours"
                        className="inline-block"
                        hideOnClick={false}
                     >
                        <span className="text-zinc-300 underline">
                           serverless
                        </span>
                     </Tooltip>{' '}
                     fully interactive and infinite{' '}
                     <span className="font-medium text-zinc-300">
                        note-canvas
                     </span>
                     .
                  </motion.div>
                  <motion.button
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     transition={{
                        ease: 'easeInOut',
                        duration: 0.4,
                        delay: 1.2,
                     }}
                     onClick={() => setIntroduction(true)}
                     onMouseEnter={() => setAnimateIcon(true)}
                     onMouseLeave={() => setAnimateIcon(false)}
                     className="group text-sm mt-8 bg-base-900 border transition duration-200 ease-linear hover:bg-base-850 border-base-800 font-semibold py-2 px-3.5 rounded-lg shadow-2xl"
                  >
                     start noting
                     <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        aria-hidden="true"
                        className="relative inline-block ml-2 -mr-1 stroke-2 stroke-white fill-transparent"
                     >
                        <g fillRule="evenodd">
                           <path
                              className="transition duration-200 ease-in-out opacity-0 group-hover:opacity-100 group-focus:opacity-100"
                              d="M0 5h8"
                           ></path>
                           <path
                              className="group-hover:translate-x-[4px] group-focus:translate-x-[4px] transition duration-200 ease-in-out"
                              d="M1 1l4 4-4 4"
                           ></path>
                        </g>
                     </svg>
                  </motion.button>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default Introduction;

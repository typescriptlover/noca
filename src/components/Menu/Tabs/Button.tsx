interface Props {
   name: string;
   icon: string;
   action?: any;
}

export const TabButton: React.FC<Props> = ({ name, icon, action }) => {
   return (
      <button
         onClick={action}
         className="focus:outline-none group w-full px-5 py-3.5 text-base font-semibold transition-basic hover:bg-base-900 focus:bg-sister focus:scale-95 rounded-xl"
      >
         <div className="flex items-center justify-between">
            <div>
               <span className="mr-6 text-lg opacity-40">
                  <i className={`fad fa-fw fa-${icon}`}></i>
               </span>
               {name}
            </div>
            <div className="transition duration-200 ease-linear scale-75 opacity-0 will-change group-hover:opacity-100 group-hover:scale-100">
               <span className="text-lg opacity-50">
                  <i className="fa-solid fa-arrow-up-right"></i>
               </span>
            </div>
         </div>
      </button>
   );
};

import { useState, Dispatch, SetStateAction } from 'react';

import { TabButton } from './Button';
import { TTab } from '@/types/types';

interface Props {
   tabs: (tab: TTab, setTab: Dispatch<SetStateAction<TTab | false>>) => any;
}

const Tabs = ({ tabs }: Props) => {
   const [tab, setTab] = useState<TTab | false>(false);

   if (!tab) {
      return (
         <div className="flex flex-col">
            <h1 className="ml-5 text-2xl font-semibold">Menu</h1>
            <hr className="my-4 border-t border-base-850" />
            <div className="flex flex-col gap-y-1">
               <TabButton
                  name="Notes"
                  icon="sticky-note"
                  action={() => setTab('notes')}
               />
               <TabButton
                  name="Guide"
                  icon="keyboard"
                  action={() => setTab('guide')}
               />
               <TabButton
                  name="Changelog"
                  icon="memo-pad"
                  action={() => setTab('changelog')}
               />
            </div>
         </div>
      );
   } else {
      return tabs(tab, setTab);
   }
};

export default Tabs;

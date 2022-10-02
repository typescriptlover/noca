import { useAtom } from 'jotai';
import { FC, RefObject, useState } from 'react';

import * as state from '@/lib/state';
import Tool from './Tool';

interface Props {
   container: RefObject<HTMLDivElement>;
   canvas: RefObject<HTMLDivElement>;
}

const Move: FC<Props> = ({ container, canvas }) => {
   const [_, setCursor] = useAtom(state.cursor);

   return (
      <Tool
         tool="move"
         icon="up-down-left-right"
         action={() => {
            setCursor('grab');
         }}
      />
   );
};

export default Move;

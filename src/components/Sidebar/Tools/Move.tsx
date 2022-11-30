import { FC, RefObject, useState } from 'react';

import useBearStore from '@/lib/state';
import Tool from './Tool';

interface Props {
   container: RefObject<HTMLDivElement>;
   canvas: RefObject<HTMLDivElement>;
}

const Move: FC<Props> = ({ container, canvas }) => {
   const updateCursor = useBearStore((state) => state.updateCursor);

   return (
      <Tool
         tool="move"
         icon="up-down-left-right"
         action={() => updateCursor('grab')}
      />
   );
};

export default Move;

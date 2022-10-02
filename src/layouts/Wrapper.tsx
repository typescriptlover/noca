import { FC, ReactNode } from 'react';

interface Props {
   children: ReactNode;
}

const Wrapper: FC<Props> = ({ children }) => {
   return (
      <div className="flex flex-col w-full h-1 min-h-screen">{children}</div>
   );
};

export default Wrapper;

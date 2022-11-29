import { FC, PropsWithChildren } from 'react';

const Wrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
   return (
      <div className="flex flex-col w-full h-1 min-h-screen">{children}</div>
   );
};

export default Wrapper;

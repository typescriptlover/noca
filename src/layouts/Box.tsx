import { FC, PropsWithChildren } from 'react';

const Box: FC<PropsWithChildren<{}>> = ({ children }) => {
   return <>{children}</>;
};

export default Box;

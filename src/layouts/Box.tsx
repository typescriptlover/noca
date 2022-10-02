import { FC, ReactNode } from 'react';

interface Props {
   children: ReactNode;
}

const Box: FC<Props> = ({ children }) => {
   return <>{children}</>;
};

export default Box;

import { FC, ReactNode } from 'react';

interface Props {
   children: ReactNode;
}
const Body: FC<Props> = ({ children }) => {
   return (
      <body className="antialiased text-white bg-base-1000 font-inter opacity-95">
         {children}
      </body>
   );
};

export default Body;

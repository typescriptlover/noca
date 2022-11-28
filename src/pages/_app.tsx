import type { AppProps } from 'next/app';

import '@/styles/index.css';
import '@/styles/global.css';
import '@/styles/fonts/inter.css';

import Box from '@/layouts/Box';
import Wrapper from '@/layouts/Wrapper';
import FontAwesome from '@/components/ui/FontAwesome';

const App = ({ Component, pageProps }: AppProps) => {
   return (
      <Box>
         <FontAwesome />
         <Wrapper>
            <Component {...pageProps} />
         </Wrapper>
      </Box>
   );
};

export default App;

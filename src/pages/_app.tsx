import type { AppProps } from 'next/app';
import Script from 'next/script';

import '@/styles/index.css';
import '@/styles/custom.css';

const App = ({ Component, pageProps }: AppProps) => {
   return (
      <>
         <Script
            src="https://kit.fontawesome.com/bfd3987de4.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
         />

         <div className="flex flex-col w-full h-1 min-h-screen">
            <Component {...pageProps} />
         </div>
      </>
   );
};

export default App;

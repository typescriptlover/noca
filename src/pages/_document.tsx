import Document, { Html, Head, Main, NextScript } from 'next/document';

import Body from '@/layouts/Body';

class Doc extends Document {
   render() {
      return (
         <Html lang="en">
            <Head />
            <Body>
               <Main />
               <NextScript />
            </Body>
         </Html>
      );
   }
}

export default Doc;

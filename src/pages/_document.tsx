import Document, { Html, Head, Main, NextScript } from 'next/document';

class Doc extends Document {
   render() {
      return (
         <Html lang="en">
            <Head>
               <link
                  href="https://rsms.me/inter/inter.css?v=3.15"
                  rel="stylesheet"
               />
            </Head>
            <body className="antialiased text-white bg-main font-inter opacity-95">
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

export default Doc;

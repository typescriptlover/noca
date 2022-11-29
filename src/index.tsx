import React from 'react';
import ReactDOM from 'react-dom';

import './styles/tailwind.css';
import './styles/index.css';
import './styles/fonts/inter.css';

import Wrapper from './layouts/Wrapper';
import App from './App';

ReactDOM.render(
   <React.StrictMode>
      <Wrapper>
         <App />
      </Wrapper>
   </React.StrictMode>,
   document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Home} from './home/Home';
import {Match} from './match/Match';
import reportWebVitals from './reportWebVitals';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {Flex, Box, Link } from 'rebass';


const Main = () => (
  <main>
<Flex
  px={2}
  color='white'
  bg='Pink'
  alignItems='center'>
  <Link sx={{
              display: 'inline-block',
              fontWeight: 'bold',
              px: 2,
              py: 1,
              color: 'inherit',
            }} variant='nav' href='/'>
   CatMash
  </Link>
  <Box mx='30px' />
  <Link sx={{
            display: 'inline-block',
            fontWeight: 'bold',
            px: 2,
            py: 1,
            color: 'inherit',
          }} variant='nav' href='match'>
    Match
  </Link>
</Flex>
   <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/match' component={Match}/>
    </Switch>

  </main>
)

ReactDOM.render(
  <BrowserRouter>
      <Main />
    </BrowserRouter>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

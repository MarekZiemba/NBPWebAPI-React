import React from 'react';
import CurrentGoldPrice from './CurrentGoldPrice';
import ExchangeRateA from './ExchangeRateA';
import ExchangeRateB from './ExchangeRateB';
import ExchangeRateC from './ExchangeRateC';
// import './style/style.css';

const App = () => {
    return ( 
        <div>
            <CurrentGoldPrice />
            <ExchangeRateC />
            <ExchangeRateA />
            <ExchangeRateB />
        </div>
    );
}

export default App;
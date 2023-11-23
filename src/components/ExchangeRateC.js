import React, { useState } from 'react';

const ExchangeRateC = () => {
    const [exchangeRatesC, setExchangeRatesC] = useState('');
    const [exchangeRatesDateC, setExchangeRatesDateC] = useState('');

    const showExchangeRatesC = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://api.nbp.pl/api/exchangerates/tables/C/');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const tableCdata = data[0];
            const { effectiveDate: tableCDate, rates: exchangeCRates } = tableCdata;

            setExchangeRatesDateC(`On the ${tableCDate} the exchange rates are:`);

            setExchangeRatesC(() => {
                const updatedRates = exchangeCRates.map(exchangeCRatesData => {
                    const { currency: currencyName, code: cureencyCode, bid: bidExchangeRate, ask: askExchangeRate } = exchangeCRatesData;
                    return (
                        <tr key={cureencyCode}>
                            <td>{currencyName}</td>
                            <td>{cureencyCode}</td>
                            <td>{bidExchangeRate}</td>
                            <td>{askExchangeRate}</td>
                        </tr>
                    );
                });

                return updatedRates;
            });

        } catch (error) {
            console.error('Error fetching data:', error);
            setMidExchangeRatesDateC('There has been an error when fetching data.');
        }
    };

    return (
        <section>
            <form id="currencyExchangeRateC" onSubmit={showExchangeRatesC}>
                <h2>Exchange rates for Table C</h2>
                <h3 id="currentExchangeDateParagraphC">{exchangeRatesDateC}</h3>
                <table id="currencyExchangeRatesTableC">
                    <thead>
                        <tr>
                        <tr>
                            <th>Currency</th>
                            <th>Code</th>
                            <th>Buy rate</th>
                            <th>Selling rate</th>
                        </tr>
                        </tr>
                    </thead>
                    <tbody>
                        {exchangeRatesC}
                    </tbody>
                </table>
                <button type="submit">Update bid/ask rates</button>
            </form>
        </section>
    );
};

export default ExchangeRateC;

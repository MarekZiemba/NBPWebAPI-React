import React, { useState } from 'react';

const ExchangeRateB = () => {
    const [exchangeRatesB, setExchangeRatesB] = useState('');
    const [midExchangeRatesDateB, setMidExchangeRatesDateB] = useState('');

    const showMidExchangeRatesB = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://api.nbp.pl/api/exchangerates/tables/B/');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const tableBdata = data[0];
            const { effectiveDate: tableBDate, rates: exchangeBRates } = tableBdata;

            setMidExchangeRatesDateB(`On the ${tableBDate} the exchange rates are:`);

            setExchangeRatesB(() => {
                const updatedRates = exchangeBRates.map(exchangeBRatesData => {
                    const { currency: currencyName, code: cureencyCode, mid: midExchangeRate } = exchangeBRatesData;
                    return (
                        <tr key={cureencyCode}>
                            <td>{currencyName}</td>
                            <td>{cureencyCode}</td>
                            <td>{midExchangeRate}</td>
                        </tr>
                    );
                });

                return updatedRates;
            });

        } catch (error) {
            console.error('Error fetching data:', error);
            setMidExchangeRatesDateB('There has been an error when fetching data.');
        }
    };

    return (
        <section>
            <form id="currencyExchangeRateB" onSubmit={showMidExchangeRatesB}>
                <h2>Average exchange rates for Table B</h2>
                <h3 id="currentExchangeDateParagraphB">{midExchangeRatesDateB}</h3>
                <table id="currencyExchangeRatesTableB">
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Code</th>
                            <th>Average rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exchangeRatesB}
                    </tbody>
                </table>
                <button type="submit">Update average rates</button>
            </form>
        </section>
    );
};

export default ExchangeRateB;

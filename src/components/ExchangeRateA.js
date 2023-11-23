import React, { useState } from 'react';

const ExchangeRateA = () => {
    const [exchangeRatesA, setExchangeRatesA] = useState('');
    const [midExchangeRatesDateA, setMidExchangeRatesDateA] = useState('');

    const showMidExchangeRatesA = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://api.nbp.pl/api/exchangerates/tables/A/');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const tableAdata = data[0];
            const { effectiveDate: tableADate, rates: exchangeARates } = tableAdata;

            setMidExchangeRatesDateA(`On the ${tableADate} the exchange rates are:`);

            setExchangeRatesA(() => {
                const updatedRates = exchangeARates.map(exchangeARatesData => {
                    const { currency: currencyName, code: cureencyCode, mid: midExchangeRate } = exchangeARatesData;
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
            setMidExchangeRatesDateA('There has been an error when fetching data.');
        }
    };

    return (
        <section>
            <form id="currencyExchangeRateA" onSubmit={showMidExchangeRatesA}>
                <h2>Average exchange rates for Table A</h2>
                <h3 id="currentExchangeDateParagraphA">{midExchangeRatesDateA}</h3>
                <table id="currencyExchangeRatesTableA">
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Code</th>
                            <th>Average rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exchangeRatesA}
                    </tbody>
                </table>
                <button type="submit">Update average rates</button>
            </form>
        </section>
    );
};

export default ExchangeRateA;

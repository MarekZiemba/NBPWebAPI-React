import React, { useState } from 'react';

const CurrentGoldPrice = () => {
    const [goldPrice, setGoldPrice] = useState('');

    const showCurrentGoldPrice = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://api.nbp.pl/api/cenyzlota');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const goldData = data[0];
            const { data: goldDate, cena: newGoldPrice } = goldData;

            setGoldPrice(`On the ${goldDate} the price is ${newGoldPrice} PLN/g.`);
        } catch (error) {
            console.error('Error fetching data:', error);
            setGoldPrice('There has been an error when fetching data.');
        }
    };

    return (
        <section>
            <form id="currentGoldPriceForm" onSubmit={showCurrentGoldPrice}>
                <h2>Current Gold Price</h2>
                <p id="currentGoldPriceParagraph">{goldPrice}</p>
                <button type="submit">Update current price</button>
            </form>
        </section>
    );
};

export default CurrentGoldPrice;

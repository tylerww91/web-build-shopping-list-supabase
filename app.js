/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

import { createItem } from './fetch-utils.js';
/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const errorDisplay = document.getElementById('error-display');
/* State */
let items = [];
let error = null;
/* Events */

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addItemForm);
    const newItem = {
        item: formData.get('item'),
    };

    const response = await createItem(newItem);
    error = response.error;
    const item = response.data;

    if (error) {
        displayError();
    } else {
        items.push(item);
        addItemForm.reset();
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

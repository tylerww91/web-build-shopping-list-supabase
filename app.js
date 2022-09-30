/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

import { createItem } from './fetch-utils.js';
import { getItem } from './fetch-utils.js';
import { renderItem } from './render-utils.js';
import { boughtItem } from './fetch-utils.js';
import { deleteAllItems } from './fetch-utils.js';
import { deleteBoughtItems } from './fetch-utils.js';
import { deleteSelectedItem } from './fetch-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const errorDisplay = document.getElementById('error-display');
const itemList = document.getElementById('item-list');
const removeAllButton = document.getElementById('remove-all-button');
const removeBoughtButton = document.getElementById('remove-bought-button');

// const selectRemovebtn = document.querySelectorAll('.select-remove-btn');
/* State */
let items = [];
let error = null;
/* Events */

async function fetchData() {
    // this is how we fetch our data from our back end
    const response = await getItem();
    error = response.error;
    items = response.data;
}

window.addEventListener('load', async () => {
    await fetchData();
    if (error) {
        displayError();
    }

    if (items) {
        displayItem();
    }
});

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addItemForm);
    const newItem = {
        item: formData.get('item'),
        quantity: formData.get('quantity'),
    };

    const response = await createItem(newItem);
    error = response.error;
    const item = response.data;

    if (error) {
        displayError();
    } else {
        items.push(item);
        addItemForm.reset();
        displayItem();
    }
});

removeAllButton.addEventListener('click', async () => {
    const response = await deleteAllItems();

    error = response.error;

    if (error) {
        displayError();
    } else {
        items = [];
        displayItem();
    }
});

removeBoughtButton.addEventListener('click', async () => {
    const response = await deleteBoughtItems();

    error = response.error;

    if (error) {
        displayError();
    } else {
        const notBoughtItems = [];
        for (const item of items) {
            if (!item.bought) {
                notBoughtItems.push(item);
            }
        }
        items = notBoughtItems;

        displayItem();
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

function displayItem() {
    itemList.innerHTML = '';

    for (const item of items) {
        const itemEl = renderItem(item);
        itemList.append(itemEl);

        itemEl.addEventListener('click', async () => {
            const response = await boughtItem(item.id);
            error = response.error;
            const updatedItem = response.data;

            if (error) {
                displayError();
            } else {
                const index = items.indexOf(item);
                items[index] = updatedItem;
                displayItem();
            }
        });

        const btn = document.createElement('button'); //this can be used seperate from the renderfunction
        btn.textContent = '-';
        btn.classList.add('select-remove-btn');
        itemList.append(btn);

        btn.addEventListener('click', async () => {
            const response = await deleteSelectedItem(item.id);
            error = response.error;
            if (error) {
                displayError();
            } else {
                await fetchData();
                displayItem();
            }
        });
    }
}

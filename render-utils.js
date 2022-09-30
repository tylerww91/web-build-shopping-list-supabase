export function renderItem(item) {
    const li = document.createElement('li');
    if (item.bought) {
        li.classList.add('bought');
    }

    const p = document.createElement('p');
    p.textContent = item.quantity + ' ' + item.item;

    // const btn = document.createElement('button');
    // btn.textContent = '-';
    // btn.classList.add('select-remove-btn');

    // b.addEventListener('click' async () => {
    //     const response = await deleteSelectedItem();
    //     error = response.error;

    //     if (error) {
    //         displayError();
    //     } else {
    //         const index = items.indexOf(item);
    //         items[index] =
    //     }
    // })

    // const img = document.createElement('img');
    // img.classList.add('hidden');
    // if (item.bought) img.classList.remove('hidden');

    li.append(p);

    return li;
}

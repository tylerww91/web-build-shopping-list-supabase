export function renderItem(item) {
    const li = document.createElement('li');
    if (item.bought) {
        li.classList.add('bought');
    }

    const p = document.createElement('p');
    p.textContent = item.quantity + ' ' + item.item;

    // const img = document.createElement('img');
    // img.classList.add('hidden');
    // if (item.bought) img.classList.remove('hidden');

    li.append(p);

    return li;
}

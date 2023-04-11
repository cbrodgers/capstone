const search_input = document.getElementById('search');
const results = document.getElementById('results');

let search_term = '';
let names;

const fetchNames = async () => {
    names = await fetch(
        'https://rxnav.nlm.nih.gov/REST/RxTerms/allconcepts.json'
    ).then(res => res.json());
};

const showNames = async () => {
    results.innerHTML = '';

    await fetchNames();

    const ul = document.createElement('ul');
    ul.classList.add('Names');


    names
        .filter(name => 
            name.firstName.toLowerCase().includes(search_term.toLowerCase())
            )
        .forEach(name => {
            const li = document.createElement('li');
            li.classList.add('name-str');

            const name_searched = document.createElement('h3');
            name_searched.innerText = searched.name;
            name_searched.classList.add('searched-name');

            const name_info = document.createElement('div');
            name_info.classList.add('name-info');

            const name_rxcuid = document.createElement('p');
            name_rxcuid.innerText = numberWithCommas(name_rxcuid);
            name_rxcuid.classList.add('rxcuid');

            name_info.appendChild(name_rxcuid);

            li.appendChild(name_searched);
            li.appendChild(name_info);

            ul.appendChild(li);
        });

        results.appendChild(ul);
};

showNames();

search_input.addEventListener('input', e => {
    search_term = e.target.value;
    showNames();
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
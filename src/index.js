import './css/styles.css';
import { fetchCountries} from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

searchInput.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler() {
    countryList.innerHTML = '';
    const inputValue = searchInput.value.trim();
    if (inputValue === '') {
        return;
    } else {
        fetchCountries(inputValue)
            .then(data => {
                if (data.length === 1) {
                    const lang = Object.values(data[0].languages);
                    const markup = data.map(country => {
                        return `<li><h3><img src="${country.flags.svg}" width ="20" alt=""> ${country.name.official}</h3><p>Capital: ${country.capital}</p><p>Population:${country.population}</p <p>Languages: ${lang}</p> </li>`;
                    });
                    countryList.innerHTML = markup;
                } else if (data.length >= 2 && data.length <= 10) {
                    const markup = data.map(country => {
                        return `<li class="country-item"><img src="${country.flags.svg}" width ="20" height="20" alt=""><p>${country.name.official}</p></li>`}).join('');
                    countryList.innerHTML = markup;
                } else {
                    Notiflix.Notify.info(
                        'Too many matches found. Please enter a more specific name.'
                    );
                }
            })
            .catch(() => {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            });
    }
}
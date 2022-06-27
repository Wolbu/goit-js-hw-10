import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

searchInput.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));




function inputHandler() {
    countryList.innerHTML = '';
    const inputValue = searchInput.value;
    if (inputValue === "") {
        Notiflix.Notify.warning('Empty field');
    } else {
        fetchCountries(inputValue).then((data) => {

            if (data.length === 1) {
                const lang = Object.values(data[0].languages)
                const markup = data.map((country) => {
                    return `<li>${country.flag} ${country.name.official}</li><p>Capital: ${country.capital}</p><p>Population:${country.population}</p><p>Languages: ${lang}</p>`;
                })
                countryList.innerHTML = markup;


            } else if (data.length >= 2 && data.length <= 10) {
                console.log("between 2 and 10")
                const markup = data.map((country) => {
                    return `<li>${country.flag} ${country.name.official}</li>`;
                })
                countryList.innerHTML = markup;
            } else {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name."');
            }

        }).catch(()=>{
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    }
}


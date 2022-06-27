 function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,official,capital,population,flag,languages`)
        .then(
            (response) => { 
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            }
        );
}
export {fetchCountries}





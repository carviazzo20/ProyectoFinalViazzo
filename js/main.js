let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");

let currencyTranslations = {};
fetch('./json/monedas.json')
    .then(res => res.json())
    .then(json => {
        currencyTranslations = json;
    })

let subregionsTranslations = {};
fetch('./json/subregiones.json')
    .then(res => res.json())
    .then(json => {
        subregionsTranslations = json;
    })

let languageTranslations = {};

fetch('./json/idiomas.json')
  .then(res => res.json())
  .then(json => {
    languageTranslations = json;
  })
  .catch(error => console.error('Error al cargar el archivo de idiomas:', error));



searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value;
  let finalURL = `https://restcountries.com/v3.1/translation/${countryName}?fullText=true`;
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let subregionOriginal = data[0].continents[0];
      let subregionTraducida = subregionsTranslations[subregionOriginal] || subregionOriginal;
      let currencyCode = Object.keys(data[0].currencies)[0];

      let translatedLanguages = Object.keys(data[0].languages)
        .map(langCode => {
            return languageTranslations[langCode] || langCode; 
        })
        .join(", "); 

        console.log(translatedLanguages); 

      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].translations.spa.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Sub-continente:</h4>
                <span>${subregionTraducida}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Población:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Moneda:</h4>
                <span>${currencyTranslations[currencyCode]} - ${currencyCode}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Idiomas más frecuentes:</h4>
                <span>${translatedLanguages}</span>
            </div>
        </div>
      `;
    })

    .catch(() => {
      if (countryName.length == 0) {
        result.innerHTML = `<h3>El ingreso no puede estar vacío!</h3>`;
      } else {
        result.innerHTML = `<h3>Por favor, ingrese un nombre de país válido!</h3>`;
      }
    });
});
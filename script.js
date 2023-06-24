'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
         <img class="country__img" src="${data.flag}" />
         <div class="country__data">
             <h3 class="country__name">${data.name}</h3>
             <h4 class="country__region">${data.region}</h4>
             <p class="country__row"><span>👫</span>${(
               +data.population / 1000000
             ).toFixed(1)}</p>
             <p class="country__row"><span>🗣️</span>${
               data.languages[0].name
             }</p>
             <p class="country__row"><span>💰</span>${
               data.currencies[0].name
             }</p>
         </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();
//   console.log(request.responseText);
//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const html = `
//  <article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//  </article>
//  `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('israel');
// getCountryData('portugal');
// getCountryData('usa');
// 250

const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();
  console.log(request.responseText);
  request.addEventListener('load', function () {
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render country 1
    renderCountry(data);
    // Get neighbour country 2
    // const [neighbour] = data.borders;
    const neighbour = data.borders?.[0];
    if (!neighbour) return;
    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
    );
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};
// getCountryAndNeighbour('israel');
// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// 240 Promises and the Fetch API(modern way)
// const request = new XMLHttpRequest();
// request.open(
//   'GET',
//   `https://countries-api-836d.onrender.com/countries/name/${country}`
// );
// request.send();
// const request = fetch(
//   'https://countries-api-836d.onrender.com/countries/name/portugal'
// );
// console.log(request);
// 244 Consuming Promises
// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => {
//       // handel promise
//       console.log(response);
//       return response.json(); //return promise, read data
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
// const getJSON = function (url, errorMsg) {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`Country not found (${response.status})`);
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   //Country 1
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found ${response.status} `);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       //   const neighbour = data[0].borders?.[0];
//       const neighbour = 'gggggggg';
//       if (!neighbour) return;
//       //Country 2
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found ${response.status} `);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}.Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// const getCountryData = function (country) {
//   //Country 1
//   getJSON(
//     `https://countries-api-836d.onrender.com/countries/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) throw new Error('No neighbour found ');
//       //Country 2
//       return getJSON(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}.Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// //246 Handling rejected promises
// btn.addEventListener('click', function () {
//   //   getCountryData('portugal');
// });
// getCountryData('israel');
// getCountryData('hhhhhhhhh');
// getCountryData('australia');

// Coding Challenge # 1
/*
In this challenge you will build the function 'whereAmI' which render country only based on GPS coordinates. For thet you will use the second API to geocoge coordinats
1. Create a function 'whereAmI'  which takes as inputs a lat value and a lng value.
2. To do 'reverse geocoding' of the provided coordinats. Reverse geocoding means to convert coordinates to meaningfull location, like city and country name. Use this API  to reverse giocoding: http://geocode.xyz/api.
The AJAX call will be done to the url whis this format:'https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=json';IUse the fetch API  and promises to get the data, log a massege to console 'You are in Berlin , Germany'
https://maps.googleapis.com/maps/api/geocode/json?address=
3. Once you have the data take look at it on the console to see all the attributes that you recived about  the provided location. Then using this data  log a massenge to the console: 'You are in  Berlin , Germany'
4.Chain a .catch mhetod to the end of the promise chain and log errors to the console.
5. This API ellows you to make only 3 reguests per second. If you will get this error  with code 403. Thia is the error with the request. Remember, fetch( )does NOT reject the promise in this case. So create an error to reject the  promise yourself, whis meaningful error message
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result and plag in to the countries API than we have  been using.

TEST COORDS 1: 52.508, 13.381 
TEST COORDS 2:  19.037, 72.873
TEST COORDS 2: -33.933, 18.474
*/

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    //   fetch(
    //     `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}`
    //   )
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding${res.status}`);
      //   console.log(res);
      return res.json();
    })
    .then(data => {
      //   console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.country}`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err.message} 💥`);
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

// 250 Lopp event
// console.log('Test start');
// setTimeout(() => console.log('0 seconds'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 10000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

/*
// 251 Building promises
// encapsulate
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You WIN ＄');
    } else {
      reject(new Error('You lost your money 💩 '));
    }
  }, 2000);
});
// concume
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
//consume, and chain
wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

//2 setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));
// create fulfield or rejected promise immediatly
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

// 252 Promisifying the Geolocation API (callback based API)

// console.log('Getting position');
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     resolve(position);
    //   },
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition().then(pos => console.log(pos));
// build the func that tell where we are , based on geolocation of our device
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding${res.status}`);
      console.log(res);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.country}`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err.message} 💥`);
    });
};
btn.addEventListener('click', whereAmI);
*/
// Coding challange #2
/*
Build  the image loading functionality that I just showed you on the screen
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretendet you are working on your own
PART 1
Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new img (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'image' class, and resolve the promise. The  fullfiled value shoud be the image element itself. In case there is an arror loadind the image ('error' event),reject the promise.
If this  part it too tricky for you just wach the solution
// PART 2
2.Consume the promise using .then and also add an error handler
3. After the image has loaded , pause execution for 2 seconds using the wait function thet we create earlier.
4.After the 2 second has passed, hide the current image(set display 'none'), and ,load the second image(Hint: use the image element returned by createImage promise to hide the current image. You will need a global variable for that )
5.After the second image has loaded, pause pause execution for 2 seconds again
6. After the 2 seconds have passed, hide the current image.

TEST DATA:
*/ /*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const imgConteiner = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', () => {
      imgConteiner.append(img);
      resolve(img);
    });
    img.addEventListener('error', () => {
      reject(new Error('Image not found.'));
    });
  });
};
let currImage;
createImage('img/img-1.jpg')
  .then(img => {
    currImage = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currImage = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currImage.style.display = 'none';
  })
  .catch(err => console.error('err'));
*/
/*
// 254 Concuming promises  with async/await
// fetch(
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   ).then(res=>console.log(res))

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function (country) {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`💥${err}`);
    renderError(`💥${err.message}`);
    // Reject promise returned from async function
    throw err;
  }
};
console.log('1: Will get location');
// const city = whereAmI();// retutn promise
// console.log(city);
// whereAmI()
//   .then(city => console.log(`2:${city}`))
//   .catch(err => console.log(`2:${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

//255 Error handling with try... catch
// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }
// 256 Returning values from async function
//IIFE (function(){})()
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2:${city}`);
  } catch (err) {
    console.error(`2:${err.message}`);
  }
  console.log('3: Finished getting location');
})();
*/ /*
// 257 Running promises in parallel time Promise.all()combinator function
const getJSON = function (url, errorMsg) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`Country not found (${response.status})`);
    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);
    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries('israel', 'portugal', 'tanzania');
// 258 Other promise combinator: race, allSettled and any
//1. Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/canada`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/mexico`),
  ]);
  console.log(res[0]);
})();
// Regect = timeout and not resolve= wait
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Recuest took too long!'));
    }, sec * 1000);
  });
};
Promise.race([
  getJSON(`https://countries-api-836d.onrender.com/countries/name/portugal`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));
//2. Promise.allSettled - never short sircuts
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

// Promise.all
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/
// 258 Coding challenge #3
/*
// PART 1
1. Write a  function 'loadPause' that recreate Coding challenge #2 this time using async/await.
Onli the part where the promise consumed. Compere the two version think about the big  differences, and see with do you like more. Dont forget to test the error handler, and to set Network to Fast 3G
PART 2
1.Create async function 'loadAll' that receives an array of image paths 'imgArr'
2. Use .map to loop over the array to load all images with 'createImages' call the resulting array images
3.Check out  the 'imgs' array in the console. Is it like you acpected?
4. Use apromise combinator to actually get the imges from array
5. Add the 'parallel' class  to all the images(it has the same SCC styleS)

TEST DATA:['img/img-1.jpg','img/img-2.jpg','img/img-3.jpg']. To test turn off the 'loadPause'function .

*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const imgConteiner = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', () => {
      //   console.log(imgConteiner);
      imgConteiner.append(img);
      resolve(img);
    });
    img.addEventListener('error', () => {
      reject(new Error('Image not found.'));
    });
  });
};

// PART 1
const loadPause = async function () {
  try {
    // Load img 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';
    // Load img 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error('err');
  }
};
//loadPause();
//PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    // console.log(imgs);
    const imgsEl = await Promise.all(imgs);
    // console.log(imgsEl);
    imgsEl.forEach(img => {
      img.classList.add('parallel');
    });
  } catch (err) {
    console.error(err.message);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

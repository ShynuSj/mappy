'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map;
let mapEvent;

navigator.geolocation.getCurrentPosition(
  function (dypos) {
    const { latitude } = dypos.coords;
    const { longitude } = dypos.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];
    map = L.map('map').setView(coords, 17);

    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    map.on('click', function (mapE) {
      mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
},
    function () {
        alert(`Could not get your position`);
      })

    form.addEventListener('submit', function (e) {
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ""
      e.preventDefault();
      const { lat, lng } = mapEvent.latlng;
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
          })
        )
        .setPopupContent('workout')
        .openPopup();
    });
inputType.addEventListener('change',function(){
 inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
 inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    
});
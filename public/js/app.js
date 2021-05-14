

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e) => {
 
    e.preventDefault();

    message1.textContent = 'Loading Weather Details';
    message2.textContent = '';

    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                //console.log(data.error);
                message1.textContent = data.error;
            } else {
                //console.log(data);
                message1.textContent = "Current Weather is " + data.currentWeather;
                message2.textContent = "Current Temperature is " + data.currentTemp +" and it feels like "+ data.feelsLike;
            };
        })
        });


// console.log(search.value)
})
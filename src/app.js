const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = 3000;

//Set up paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Set up hbs config values
app.set('view engine','hbs');
app.set('views',viewsPath);

//Set up directory to serve 
app.use(express.static(publicDirectoryPath));

hbs.registerPartials(partialsPath);

app.get('', (req,res) => {
    res.render('index', {
        name: 'Gaurav Karkara',
        title: 'from Weather Site'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        name: 'Gaurav Karkara',
        title: 'About me'
    })
});

app.get('/help',(req,res) => {
    res.render('help',{
        place: 'Gurgaon',
        phoneNumber: '9818333403',
        name: 'Gaurav Karkara',
        title: 'Help'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address query parameter'
        })
    };

    geocode.getGeocode(req.query.address, (error,{Latitude,Longitude,Location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        };
    
     forecast.forecast(Latitude, Longitude,(error,forecastData) => {
         if(error){
             return res.send({
                 error: error
             });
         };

         res.send(Object.assign({'Location': Location}, forecastData));
    });
    
    })

});

app.get('/help/*',(req,res) => {
    res.render('genericError',{
        errorText: 'Help Article not found'
    });
})

app.get('*',(req,res) => {
    res.render('genericError',{
        errorText: '404 - Not found'
    })
})

app.listen(port,() => {
    console.log('Server is up and running');
});


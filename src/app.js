const path = require('path');
const express = require('express')
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

const PORT = process.env.PORT || 3000;

//Define paths for Express config
const public = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(public));

app.get('', (req, res) => {
    res.render('index',
        {
            title: "Weather App",
            name: "Ivan"
        });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About",
        name: "Ivan"
    })
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: "Help",
        name: "Ivan",
        message: "Out of space"
    });
});

app.get('/weather', (req, res) => {
   if(!req.query.address){
       return res.send({
           error: "You must provide address."
       });
   }
   geocode(req.query.address,(err, {latitude, longitude, location}={})=>{
       if(err){
           return res.send({err});
       }
       forecast(latitude, longitude, (err, data)=>{
          if(err){
              return res.send({err});
          }
           res.send({
               address: req.query.address,
               weather: data,
               location
           });
       });
   });

})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: "404",
        name: "Ivan",
        message: "Help article not found"
    });
});

app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
            error: "You must provide search term."
        });
    }
        res.send({
            products: []
        });


});

app.get('*', (req, res)=>{
    res.render('404', {
        title: "404",
        name: "Ivan",
        message: "Page not found"
    });
});

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})
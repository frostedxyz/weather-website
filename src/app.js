const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app =express()
const port = process.env.PORT || 3000
// define paths for express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engone and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve 
app.use(express.static(publicDirectoryPath))
 
app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather App', 
        name:'Zebedee Wanyonyi'})
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:'About Me',
        name:'Zebedee Wanyonyi'
    })

})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:'Help Page',
        message:'I need help',
        name:'Zebedee Wanyonyi'
    })
})

app.get('/weather', (req,res)=>{
    let address= req.query.address
    if(!address){
        return res.send({
            error:'No address provided'
        })
    }

    //  before destructuring data.longitude, data.latitude, fata.location

    geocode(address,(error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData)=>{
            if (error){
                return Response.send({error})
            }
                
                res.send({
                    location:location,
                    forecast:forecastData
                
                })
            })

    })

    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title:'404 Not Found',
        errormessage:'Article Not found',
        name:'Zebedee Wanyonyi'
    })
})

app.get('*',(req,res)=>{
    res.render('404', {
        title:'404 Not Found',
        errormessage:'Page not found',
        name:'Zebedee Wanyonyi'
    })
})


app.listen(port,()=>{
    console.log('Server is up on port300')
})
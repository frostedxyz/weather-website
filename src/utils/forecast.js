const request =require('request')


const weather = (latitude, longitude, callback)=>{
    const url ='https://api.darksky.net/forecast/de09199fae76056845717a71cc1c295b/'+latitude+','+longitude +'?units=si&lang=en'
request({url, json:true}, (error, {body})=>{
    if(error){
        callback('Unable to connect', undefined)
    } else if(body.error){
        callback('Coordinate Error! Unable to find location', undefined)
            
    } else{
       console.log(body.daily)
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. Temperature High: '+body.daily.data[0].temperatureHigh+' Temperature Low: '+body.daily.data[0].temperatureLow)
    }
}) 

}


module.exports = weather

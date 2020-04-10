const request=require('request')

const forecast=(lattitude,longtitude,callback)=>{
    const url  = "https://api.darksky.net/forecast/72193c67d322722b9b347fb128e86ffc/"+lattitude+","+longtitude

    request({ url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to find services',undefined)
        }else if(body.error){
            callback(body.error,undefined)
        }else{
            callback(undefined,body.daily.data[0].summary +' It is Currently '+ body.currently.temperature +' degrees out. There is a '+ body.currently.precipProbability +' chance of rain ')
        }
    })
 }

 module.exports=forecast
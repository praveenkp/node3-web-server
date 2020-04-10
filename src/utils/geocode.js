request=require('request');

const geoCode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicHJhdmVlbmtwIiwiYSI6ImNrMnl3eGw0aTBic3QzY21zZGp3N3lzMnkifQ.RqR0tBuB5xTS3Iap7Owsgw"

    request({ url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to find services',undefined)
        }else if(body.features.length==0){
            callback('Location not found',undefined)
        }else{
            callback(undefined,{
                lattitude : body.features[0].center[1],
                longtitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode
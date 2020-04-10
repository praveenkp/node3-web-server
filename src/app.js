const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app =express()

const port = process.env.PORT || 3000

// Path for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Handlebarengine,view path
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static path
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Praveen'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Praveen'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Praveen',
        helpText:'Helpful Text'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geoCode(req.query.address,(error,{lattitude,longtitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(lattitude,longtitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }    
                res.send({
                    location:location,
                    forcast:forecastData,
                    address:req.query.address
            
                })
            
        })
    })



    
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    if(!req.query.search) {
        return res.send({
            error:"You must provide serach terms"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{

    res.render('404',{
        title:'404 Help',
        name:'Praveen',
        error_message:'Help Article not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Praveen',
        error_message:'Page Not Found'
    })
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
})
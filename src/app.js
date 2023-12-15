

    const express = require('express')
    const app = express()

    const port = process.env.PORT || 3000

    
    const path = require ("path")
    const publicDirectory =  path.join(__dirname , '../public')
    app.use (express.static (publicDirectory))

    

    app.get('/about', (req, res) => {
        res.send('This is data in about Page ')
       })

  

       app.get('/data1', (req, res) => {
        res.send({
            name : "ahmed",
            age : 20,
            city : "Cairo"
        })
       })

       app.get('/data2', (req, res) => {
        res.send({
            name : "Islam",
            age : 26,
            city : "Mansoura"
        })
       })



  

    app.set('view engine', 'hbs');

      const viewsDirectory = path.join (__dirname , "../temp1/views" )
      app.set( "views" , viewsDirectory)

      var hbs = require ('hbs')

      const partialsPath = path.join (__dirname , "../temp1/partials")

      hbs.registerPartials(partialsPath)

    app.get('/' , (req , res) => {
      res.render('index')
     
    })

    app.get('/weather' , (req , res) => {
        res.render('weather')})




    const geocode = require('./tools/geocode')
    const forecast = require('./tools/forecastFile')
    
    app.get('/weather',(req,res)=>{
        if(!req.query.address){
            return res.send({
                error:'You must provide address'
            })
        }
        geocode(req.query.address,(error,data)=>{
            if(error){
                
                return res.send({error})
            }
            forecast(data.latitude,data.longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location:req.query.address
                })
            })
        })
    })
    














   

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
    



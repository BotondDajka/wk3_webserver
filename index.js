const express = require("express");
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const models = require("./models");

const app = express();
const port = 3000;



//

// app.get("/", (req,res)=>{
//     res.send("Hello World!")
// });


const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.use(express.static("public"));

app.get('/', async (request, response) => {
    response.render('restaurants', {restaurants: await models.Restaurant.findAll(), title:"Home | Restaurants"})
})

app.get('/about', (request, response) => {
    response.render('about', {title:"About | Restaurants"})
})

app.get('/restaurant/:restaurantId', async (request, response) => {
    await models.Restaurant.findOne({
        where:{
            id : request.params.restaurantId
        },
        include: [
            {model: models.Menu, as: 'menus', 
                include:[
                    {model: models.MenuItem, as: 'items'},
                ]
    }   ],
    }).then((restaurant)=>{
        //console.log(restaurant.menus[0].items[1]);
        response.render('restaurant', {title:`${restaurant.name}| Restaurants`, restaurant: restaurant})
        //response.json(restaurant)
    })
    .catch((error)=>{
        console.log(error);
        response.status(404).render('notfound', {title:"Error 404 | Page not found", layout: "notfound"})
    });
})

app.get('/rest/restaurant/:restaurantId', async (request, response) => {
    await models.Restaurant.findOne({
        where:{
            id : request.params.restaurantId
        },
        include: [
            {model: models.Menu, as: 'menus', 
                include:[
                    {model: models.MenuItem, as: 'items'},
                ]
    }   ],
    }).then((restaurant)=>{
        //console.log(restaurant.menus[0].items[1]);
        //response.render('restaurant', {title:`${restaurant.name}| Restaurants`, restaurant: restaurant})
        response.json(restaurant)
    })
    .catch((error)=>{
        console.log(error);
        response.status(404).render('notfound', {title:"Error 404 | Page not found", layout: "notfound"})
    });
})







app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})
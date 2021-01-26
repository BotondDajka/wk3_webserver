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
    let restaurant;
    let menu;
    let items;

    await models.Restaurant.findOne({
        where:{
            id : request.params.restaurantId
        }
    }).then((_restaurant)=>{
        restaurant = _restaurant;
    })
    .catch((error)=>{
        response.status(404).render('notfound', {title:"Error 404 | Page not found", layout: "notfound"})
    });

    await models.Menu.findAll({
        where:{
            restaurantId : request.params.restaurantId
        }
    }).then((_menu)=>{
        menu = _menu;
    })
    .catch((error)=>{
        response.status(404).render('notfound', {title:"Error 404 | Page not found", layout: "notfound"})
    });

    await models.MenuItem.findAll()
    .then((_items)=>{
        items = _items;
    })
    .catch((error)=>{
        response.status(404).render('notfound', {title:"Error 404 | Page not found", layout: "notfound"})
    });

    response.render('restaurant', {title:`${restaurant.name}| Restaurants`, restaurant: restaurant, menu: menu, items: items})

    
})



app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})
const express = require("express");
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const { Op } = require("sequelize");

//const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');



const models = require("./models");
const { request, response } = require("express");


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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
    key: "user_sid",
    secret: "something",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        expires: 600000
    }
}));

app.use((request, response, next)=>{
    if (request.cookies.user_sid && !request.session.user){
        response.clearCookie("user_sid")
    }
    next();
})



app.get('/', async (request, response) => {
    if (request.session.user && request.cookies.user_sid) {
        response.render('restaurants', {restaurants: await models.Restaurant.findAll(), title:"Home | Restaurants", layout: "loggedin"})
    }
    else{
        response.render('restaurants', {restaurants: await models.Restaurant.findAll(), title:"Home | Restaurants"})
    }
    
})



app.get("/admin", (request, response) => {
    if (request.session.user && request.cookies.user_sid) {
        response.render("admin", {layout: "loggedin"})
    }
    else{
        response.redirect("/")
    }
})

app.route("/login")
    .get((request, response)=>{
        if (request.session.user && request.cookies.user_sid) {
            response.redirect("/")
        }
        else{
            response.render("login")
        }
    })
    .post((request, response)=>{
        const username = request.body.username;
        const password = request.body.password;

        models.User.findOne({
            where:{
                [Op.and]: [
                    {username: username},
                    {password: password}
                ]
            }
        })
        .then((user)=>{
            if (!user){
                response.redirect("/login")
            }
            else{
                request.session.user = user.dataValues;
                response.redirect("/")
            }
        }).catch((err)=>{
            response.redirect("/login")
        })
});

app.get("/logout", (request, response) => {
    if (request.session.user && request.cookies.user_sid) {
        response.clearCookie('user_sid');
        response.redirect('/');
    } else {
        response.redirect('/');
    }
});

app.get('/about', (request, response) => {
    if (request.session.user && request.cookies.user_sid) {
        response.render('about', {title:"About | Restaurants", layout: "loggedin"})
    }
    else{
        response.render('about', {title:"About | Restaurants"})
    }
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
        }],
    }).then((restaurant)=>{
        //console.log(restaurant.menus[0].items[1]);
        if (request.session.user && request.cookies.user_sid) {
            response.render('restaurant', {title:`${restaurant.name}| Restaurants`, restaurant: restaurant, layout: "loggedin"})
        }
        else{
            response.render('restaurant', {title:`${restaurant.name}| Restaurants`, restaurant: restaurant})
        }
        //response.json(restaurant)
    })
    .catch((error)=>{
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
        response.status(404).render('notfound', {title:"Error 404 | Page not found", layout: "notfound"})
    });
})





app.use((request, response, next)=>{
    response.status(404).render('notfound', {title:"Error 404 | Page not found", layout: "notfound"})
})

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})
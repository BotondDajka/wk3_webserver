const models = require("./models")
const fs = require("fs");




async function insertData(data) {
    await models.Restaurant.sync({force:true}).then(async ()=>{
        await models.Menu.sync({force:true}).then(async ()=>{
            await models.MenuItem.sync({force:true}).then(async ()=>{
                let menuIdIndex = 1;
                for (let i = 0; i < data.length; i++) {
                    const restaurantName = data[i].name;
                    const restaurantImage = data[i].image;
                    
                    //
                        const restaurant = await models.Restaurant.create({name: restaurantName, image:restaurantImage});
                    //})


                    for (let i2 = 0; i2 < data[i].menus.length; i2++) {
                        const menuTitle = data[i].menus[i2].title
                        const restaurantId = i + 1;

                        //await models.Menu.sync({force:true}).then(async ()=>{
                            const menu = await models.Menu.create({title:menuTitle, restaurantId:restaurantId});
                        //})
                        
                        for (let i3 = 0; i3 < data[i].menus[i2].items.length; i3++){
                            const itemName = data[i].menus[i2].items[i3].name;
                            const itemPrice = data[i].menus[i2].items[i3].price.toFixed(2);

                            //await models.MenuItem.sync({force:true}).then(async ()=>{
                                const menuItem = await models.MenuItem.create({name:itemName, price:itemPrice, menuId: menuIdIndex});
                            //})
                        }
                        menuIdIndex++;
                    }
                }
            })
        })
    })

    await models.User.sync({force:true}).then(async ()=>{
        await models.User.create({username:"Admin", password:"Admin"})
    })
}




fs.readFile("./restaurants.json", (err, data) => {
    if (err) throw new Error(err);

    const parsedData = JSON.parse(data);

    insertData(parsedData);
});
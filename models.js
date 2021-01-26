const sqlite3 = require("sqlite3").verbose();
const {Sequelize, DataTypes, Model} = require('sequelize');


const sequelize = new Sequelize("database", "username", "password",{
    host: "localhost",
    dialect: "sqlite",
    storage: "./restaurants-seq.sqlite"
});


class Restaurant extends Model {

}
Restaurant.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
},{
    sequelize,
    timestamps: false,
});


class Menu extends Model {

}
Menu.init({
    title: DataTypes.STRING,
    restaurantId: DataTypes.INTEGER
},{
    sequelize,
    timestamps: false,
});

class MenuItem extends Model{

}
MenuItem.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    menuId: DataTypes.INTEGER
},{
    sequelize,
    timestamps: false
});


Restaurant.hasMany(Menu, {as: 'menus', foreignKey: 'restaurantId'})
Menu.belongsTo(Restaurant, {foreignKey: 'restaurantId'})


Menu.hasMany(MenuItem, {as: 'items', foreignKey: 'menuId'});
MenuItem.belongsTo(Menu, {foreignKey: 'menuId'});


module.exports = { sequelize, DataTypes, Model, Restaurant, Menu, MenuItem }
const mongoose = require('mongoose')
const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/conFusion'

const connect = mongoose.connect(url)

connect.then( (db) => {
    console.log("Connected successfully with ", db)

    var newDish = Dishes({
        name : 'Pizza', 
        description : 'Desc - Pizza'
    })

    newDish.save()
    .then( (dish) => {
        console.log(dish)

        return Dishes.find({}).exec()
    })
    .then( (dishes) => {
        console.log(dishes)

        return Dishes.remove({})
    })
    .then( () => {
        return mongoose.connection.close();
    })
    .catch( (err) =>{
        console.log(err)
    })
})
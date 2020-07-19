const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const dbOperations = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbName='conFusion'

MongoClient.connect(url)
.then((client) => {

    console.log('Connected')
    const db = client.db(dbName) 
    
    dbOperations.insertDocument(db, { name: "test-name", description: "test-description"}, "dishes")
    .then((result) => {
        console.log("Insert Document:\n", result)

        return dbOperations.findDocuments(db, "dishes")
    })
    .then((docs) => {
        console.log("Found Documents:\n", docs) 
        
        return dbOperations.updateDocument(db, { name: "test-name" },{ description: "updated-test-description"}, "dishes")
    })
    .then((result) => {
        console.log("Updated Document:\n", result.result) 

       return dbOperations.findDocuments(db, "dishes")
    })
    .then((docs) => {
        console.log("Found Updated Documents:\n", docs) 
                    
        return db.dropCollection("dishes")
    })
    .then((result) => {
        console.log("Dropped Collection: ", result) 
        client.close()
    })
})
.catch( (err) => {
    console.log(err)
})
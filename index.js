const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const dbOperations = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbName='conFusion'

MongoClient.connect(url, (err, client)=>{
    assert.equal(err, null)
    console.log('Connected')
    const db = client.db(dbName) 
    
    dbOperations.insertDocument(db, { name: "test-name", description: "test-description"}, "dishes", (result) => {
        console.log("Insert Document:\n", result) 

        dbOperations.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs) 

            dbOperations.updateDocument(db, { name: "test-name" },{ description: "updated-test-description"}, "dishes", (result) => {
                console.log("Updated Document:\n", result.result) 

                dbOperations.findDocuments(db, "dishes", (docs) => {
                    console.log("Found Updated Documents:\n", docs) 
                    
                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result) 

                        client.close()
                    })
                })
            })
        })
    })
})
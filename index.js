const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const dbOperations = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbName='conFusion'

MongoClient.connect(url, (err, client)=>{
    assert.equal(err, null)
    console.log('Connected')
    const db = client.db(dbName);
    
    dbOperations.insertDocument(db, {name:"test name", description:"test-description"}, "dishes", (result)=>{
        console.log("Insert Documents : ", result)
    })
    // dbOperations.findDocuments(db, "dishes", (docs)=>{
    //     console.log("Found Documents : ", docs)
    // })
    // dbOperations.updateDocument(db, {name:"test name"}, {description:"test-update"}, "dishes", (result) =>{
    //     console.log("Update Document : ", result.result)
    // })
    // dbOperations.findDocuments(db, "dishes", (docs)=>{
    //     console.log("Found Documents : ", docs)
    // })
    db.dropCollection("dishes", (result)=>{
        console.log("Dropped Collection", result)
    })
    
    //ns error while dropping collection
    //because of asynchronous implementation?
    // only when this action is done , do this scene
    //drop collection should be inside collection?
})
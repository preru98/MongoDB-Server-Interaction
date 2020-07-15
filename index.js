const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017/'
const dbName='conFusion'

MongoClient.connect(url, (err, client)=>{
    assert.equal(err, null)
    console.log('Connected')
    const db = client.db(dbName);
    const collection = db.collection('dishes')
    collection.insertOne({"name" : "dishname" ,"description" : "desc"}, (err, result)=>{
        assert.equal(err, null)
        console.log("Inserted")
        console.log(result.ops)

        collection.find({}).toArray((err, docs)=>{
            assert.equal(err, null)
            console.log("Found :")
            console.log(docs)

            db.dropCollection('dishes', (err, result)=>{
                assert.equal(err, null)
                client.close()
            })
        })
    })
})
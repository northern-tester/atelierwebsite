'use strict'

const mongoClient = require('mongodb').MongoClient;
const config = require('../config/config').getConfig;


const executeWithConnection = (promiseToExecute, argument) => {
    return new Promise((res, rej) => {
        mongoClient.connect(config.db.address, async (err, connection) => {
            if (err) {return rej(err);}
            try {
                const db = connection.db('vacbot');
                const result = await promiseToExecute(db, argument);
                return res(result);
            }
            catch (error) {return rej(error);}
        });
    });
};

const addTalkDocument = (db, talk) => {
    return new Promise((res,rej) => {
        db.collection('talks').addOne(talk, (err, result)=> {
            if (err) {return rej(err);}
            return res(result);
        });
    });
}

const getAllTalks = db => {
    return new Promise((res, rej) => {
        db.collection('talks').find().toArray((err, result) => {
            if (err) {return rej(err);}
            return res(result);
        })
    })
}

module.exports = {
    addTalk (talk) {
        return executeWithConnection(addTalkDocument, talk)
    },
    getAllTalks() {
        return executeWithConnection(getAllTalks)
    }
}
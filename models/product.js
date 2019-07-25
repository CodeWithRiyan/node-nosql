const mongodb = require('mongodb');
const getDb = require('../utils/database').getDB;

class Product{
    constructor(title, price, imageUrl, description, id, userId){
        this.title = title,
        this.price = price,
        this.imageUrl = imageUrl,
        this.description = description
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId
    }

    save(){
        const db = getDb();
        let dbOp;
        if(this._id){
            // updated the product
            dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this})
        } else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp.then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err);
        })
    }

    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray().then(products => {
            console.log(products);
            return products;
        }).catch(err => console.log(err));
    }

    static findByPk(prodId){
        const db = getDb();
        return db.collection('products')
        .find({_id: new mongodb.ObjectId(prodId)}).next().then(product => {
            console.log(product);
            return product;
        }).catch(err => {
            console.log(err);
        })
    }

    static deleteById(prodId){
        const db = getDb();
        return db.collection('products')
        .deleteOne({_id: new mongodb.ObjectId(prodId)})
        .then(result => {
            console.log('DELETED')
        }).catch(err => {
            console.log(err);
        })
    }
}


module.exports = Product;
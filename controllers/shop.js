const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/index', {prods:products, pageTitle:'Index', path:'/'});
    }).catch(err => {
        console.log(err);
    })
}

exports.getProductById = (req, res, next) => {
    productId = req.params.productId;
    //Product.findAll({where: {id: productId}}).then(products => {
    //    res.render('shop/product-detail', {product:products[0],pageTitle: products[0].title, path:'/products' });
    //}).catch(err => console.log(err));
    Product.findByPk(productId).then(product => {
        res.render('shop/product-detail', {product:product,pageTitle: product.title, path:'/products' });
    }).catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    req.user.getCart().then(products => {
        res.render('shop/cart', {pageTitle:'Cart Shopping', path:'/cart', products: products});
    }).catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product.findByPk(productId).then(product => {
        return req.user.addToCart(product);
    }).then(result => {
        console.log(result);
        res.redirect('/cart');
    })
}

exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.deleteItemFromCart(prodId).then(result => {
        res.redirect('/cart');
    }).catch(err => console.log(err));
}

exports.ordersProduct = (req, res, next) => {
    req.user.getOrders().then(orders => {
        res.render('shop/orders', {pageTitle:'Orders Page', path:'/orders',orders:orders})
    }).catch(err => console.log(err))
}

exports.listProduct = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/product-list', {prods:products, pageTitle:'Index', path:'/products'});
    }).catch(err => {
        console.log(err);
    })
}

exports.checkoutProduct = (req, res, next) => {
    res.render('shop/checkout', {pageTitle:'Checkout Page', path:'/checkout'})
}

exports.postOrder = (req, res, next) => {
    req.user.addOrder().then(result => {
        res.redirect('/orders');
    }).catch(err => console.log(err))
}
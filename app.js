const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs');
app.set('views', 'views');
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')
const errorController = require('./controllers/errors')
const mongoConnect = require('./utils/database').mongoConnect
const User = require('./models/user')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk('5ce4ae909de3b91747d2a555').then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    }).catch(err => {
        console.log(err);
    });
});

app.use('/admin',adminRoutes)
app.use(userRoutes)
//app.use(errorController.get404)


mongoConnect(() => {
    app.listen(3000);
});
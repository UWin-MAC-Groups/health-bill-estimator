const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const router = express.Router();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

/**
 * Load static resources like the landing page and the site assets like css, js and images
 */
app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname + 'public')));

/**
 * About route. Renders about page* 
 * @param req
 * @param res
 */
 app.get('/about', (req, res) => {
    res.render('pages/about');
});

/**
 * About route. Renders about page* 
 * @param req
 * @param res
 */
 app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

/**
 * App route. Render the app page with the query form.
 * @param req
 * @param res
 */
 router.get('/', (req, res) => {
    res.render('pages/app')
});

/**
 * App route. Render the app page with the search form.
 * @param req
 * @param res
 */
 router.post('/predict', (req, res) => {
    console.log(req.body)
    const url = "https://hbe-model-api.herokuapp.com/predict";

    axios.post(url, req.body)
    .then((response) => {
        console.log(response);
        res.status(200);
        res.render('pages/predict', {
            userInfo: req.body,
            data: response.data.data
        });
    }, (error) => {
        res.status(404).render('pages/error404', {
            reason: "API Error"
        });
    });
});

/**
 * Use router for specified path
 */
app.use('/app', router);

/**
 * Handle invalid routes
 */
app.get('*', (req, res) => res.status(404).render('pages/error404', {
    reason: "Resource not found"
}));
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is running at port " + port);
});

module.exports = app;
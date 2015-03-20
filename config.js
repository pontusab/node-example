/**
 * Config file for application
 *
 * @param {Object} express
 * @param {Object} app
 * @param {Object} bodyParser
 * @param {Object} mongoose
 * @param {Object} swig
 * @return {Void}
*/
module.exports = function(express, app, bodyParser, mongoose, swig) {
   
    // Setting up static assets
    app.use(express.static(__dirname + '/public'));
        
    // Connect to the database
    mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost/programs');

    // Add swig as template engine
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/app/views');
    // app.set('view cache', process.env.PRODUCTION || false );          // Disable in production
    // swig.setDefaults({ cache: process.env.PRODUCTION || false });  // Disable in production

    // Configure app to use bodyParser()
    app.use(bodyParser.urlencoded({ extended: true }));

    // This will let us get the data from a POST
    app.use(bodyParser.json());

};
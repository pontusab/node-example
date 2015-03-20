var programController = require('./controllers/programController');

module.exports = (function() {
    var router = require('express').Router();

    // List all programs
    router.get('/', function(req, res) {
		programController.listAll(req, res);
    });


    // Add new program form
    router.get('/add', function(req, res) {
        programController.addNew(req, res);
    });


    // Handle the post form 
    router.post('/add', function(req, res) {
		programController.save(req, res);
    });


    // Delete program by slug
    router.get('/program/:slug/delete', function(req, res) {
		programController.delete(req, res);
    });


    // Show single program
    router.get('/program/:slug', function(req, res) {
        programController.show(req, res);
    });


    // Program list in xml-format
    router.get('/api', function(req, res) {
		programController.xml(req, res);
    });

    return router;

})();

// Controller dependencies.
var builder 	 = require('xmlbuilder');
var ProgramModel = require('../models/programModel');


/**
 * List all programs
 *
 * @param {Object} req
 * @param {Object} res
 * @return {String}
*/
exports.listAll = function(req, res) {

	ProgramModel
	.find({})
	.sort({'timestamp': 'asc'})
	.exec(function(err, programs) {

		if (err) { 
	    	throw err;
	    }

	    // Add data to swig template
        res.render('index', {
            programs: programs,
        });
	});

}


/**
 * Show single program
 *
 * @param {Object} req
 * @param {Object} res
 * @return {String}
*/
exports.show = function(req, res) {

	var slug = req.params.slug;

	ProgramModel
	.findOne({slug: slug})
	.exec(function(err, program) {

		if (err) { 
	    	throw err;
	    }

	    // Add data to swig template
        res.render('single', {
            program: program,
        });
	});

}


/**
 * Save new program
 *
 * @param {Object} req
 * @param {Object} res
 * @return {Void}
*/
exports.save = function(req, res) {

	var data = req.body;

	var addProgram = new ProgramModel({
		name: data.name,
		leadtext: data.leadtext,
		bline: data.bline,
		synopsis: data.synopsis,
		url: data.url,
		slug: data.slug,
		date: data.date,
		start_time: data.start_time,
	});

	// Call the built-in save method to save to the database
	// We add iso date on the pre save hook, see programModel
	addProgram.save(function(err) {
		
		if (err) {
			throw err;
		}

		// Redirected to start
		res.redirect('/');

	});

}


/**
 * Delete program
 *
 * @param {Object} req
 * @param {Object} res
 * @return {Void}
*/
exports.delete = function(req, res) {

	var slug = req.params.slug;

	// find and delete by slug
	ProgramModel.findOneAndRemove({ slug: slug }, function(err) {
		
		if (err) {
			throw err;
		}

		// Redirected to start
		res.redirect('/');
	});

}


/**
 * List all programs in xml-format
 *
 * @param {Object} req
 * @param {Object} res
 * @return {String}
*/
exports.xml = function(req, res) {

	ProgramModel
	.find({})
	.sort({'timestamp': 'asc'})
	.exec(function(err, programs) {

		if (err) { 
	    	throw err;
	    }

	    // Create xml builder
    	var xml = builder.create('programs');

		programs.forEach(function(program) {

			// Add program to xml
			xml.ele({
			  	'program': {
					'date': program.isodate,
					'start_time': program.start_time,
					'leadtext': program.leadtext,
					'name': program.name,
					'b-line': program.bline,
					'synopsis': program.synopsis,
					'url': program.url
				}
			});

		});

		// Add correct content type for xml
        res.contentType('application/xml');
        
        // Response OK, send xml
        res.status(200).send(xml.toString());	    
	});

}


/**
 * Add program 
 *
 * @param {Object} req
 * @param {Object} res
 * @return {String}
*/
exports.addNew = function(req, res) {
	
	// Add data to swig template
    res.render('form', {
    	title: 'Add new program',
    });

}
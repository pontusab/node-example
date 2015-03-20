// Module dependencies.
var mongoose = require('mongoose');
var slug = require('mongoose-slug-unique');


// Get the Schema instance
var Schema = mongoose.Schema;

// Database schema for program
// Use unique slug based on name
var programSchema = new Schema({
    name: String,
    leadtext: String,
    bline: String,
    synopsis: String,
    url: String,
    slug: String,
    date: String,
    timestamp: String,
    isodate: String,
    start_time: String
}).plugin(slug('name'));

// On every save, add the timestamp for sort order
// And isodate for correct xml date
programSchema.pre('save', function(next) {
	var dateArray = [this.date, this.start_time];

	// Setup date object based on date and start time
	var date = new Date(dateArray.join(' '));
	
	// Add timestamp to db based on start time and date
	this.timestamp = Math.floor(date / 1000);

    // Add iso date to database
    this.isodate = date.toISOString()
	
    next();
});


// Create a model using program schema
var program = mongoose.model('Program', programSchema);

// Make program model available in application
module.exports = program;
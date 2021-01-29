var mongoose = require('mongoose')

// Connecting to the database 
mongoose.connect('mongodb+srv://Liliana:BSrhhxBUT5499zvH@cluster0.hicow.mongodb.net/MemoryLand?retryWrites=true&w=majority',
// mongoose.connect('mongodb://127.0.0.1:27017/memoryland',
	{ useNewUrlParser: true, useUnifiedTopology: true }, err => {
		console.log('connected to mongodb')
	});

	module.exports = mongoose
var express = require('express')
var app = express()

app.use(express.json());

require('./db/mongoose')

//// Step 5 - using the middleware Multer to upload the photo 
var fs = require('fs');
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });

/// Step 6  load the model into app.js
var imgModel = require('./db/model');

// Step 7:  handle our post and get requests to our database
// Retriving the image
app.get('/', (req, res) => {
	imgModel.find({}, (err, items) => {
		if (err) {
			console.log(err);
		}
		else {
			res.render('app', { items: items });
		}
	});
});

// Step 8: Handling the POST request
//Uploading the image
app.post('/images/save', upload.single('image'), (req, res, next) => {
	console.info('the req.body is', req.body)
	console.log('the req.file is:', req.file)
	var obj = {
		name: req.body.name,
		desc: req.body.desc,
		categoryName: "Colors",
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	imgModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/');
		}
	});
});

app.listen('3000' || process.env.PORT, err => {
	if (err)
		throw err
	console.log('Server started')
})
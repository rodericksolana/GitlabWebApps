/*
*
*
*/
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({
       defaultLayout:'main',
       helpers: {
           section: function(name, options){
               if(!this._sections) this._sections = {};
               this._sections[name] = options.fn(this);
               return null;
} }
});

var isPaused = false;
var cifrado = 0;
var decifrado = 0;
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});


if( app.thing == null ) console.log( 'bleat!' );

function VigenereAlgoritm(entrada,clave2, codigo) {

    function doCrypt(isDecrypt) {
    	if (clave2.length == 0) {
    		return 0;
    	}
    	var key = filterKey(clave2);
    	if (key.length == 0) {
    		return 0;
    	}
    	if (isDecrypt) {
    		for (var i = 0; i < key.length; i++)
    			key[i] = (26 - key[i]) % 26;
    	}

    	cifrado = crypt(entrada, key);

      isPaused=true;

    }


    /*
     * Returns the result the Vigenère encryption on the given text with the given key.
     */
    function crypt(input, key) {
    	var output = "";
    	for (var i = 0, j = 0; i < input.length; i++) {
    		var c = input.charCodeAt(i);
    		if (isUppercase(c)) {
    			output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
    			j++;
    		} else if (isLowercase(c)) {
    			output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
    			j++;
    		} else {
    			output += input.charAt(i);
    		}
    	}
    	return output;
    }

    function filterKey(key) {
    	var result = [];
    	for (var i = 0; i < key.length; i++) {
    		var c = key.charCodeAt(i);
    		if (isLetter(c))
    			result.push((c - 65) % 32);
    	}
    	return result;
    }


    // Tests whether the specified character code is a letter.
    function isLetter(c) {
    	return isUppercase(c) || isLowercase(c);
    }

    // Tests whether the specified character code is an uppercase letter.
    function isUppercase(c) {
    	return c >= 65 && c <= 90;  // 65 is the character code for 'A'. 90 is for 'Z'.
    }

    // Tests whether the specified character code is a lowercase letter.
    function isLowercase(c) {
    	return c >= 97 && c <= 122;  // 97 is the character code for 'a'. 122 is for 'z'.
    }

    if(codigo == "true")
    doCrypt(true);
    else
    doCrypt(false);

};



app.get('/',function(req,res){
	res.render('home',{
	pageTestScript: '/qa/tests-home.js'
	});

});

app.get('/vigenere',function(req,res){
	res.render('vigenere',{
		 cifrado : cifrado,
     pageTestScript: '/qa/tests-vigenere.js'
	} );

	});

	app.post('/process', function(req, res){

VigenereAlgoritm(req.body.name , req.body.email,  req.body.tipo );
/*
		console.log('Name (from visible form field): ' + req.body.name);
		console.log('Email (from visible form field): ' + req.body.email);
		console.log('Email (from visible form field): ' + req.body.tipo);
*/


if(isPaused)
		res.send({ success: true, cifrado: cifrado });
    else {
      res.send({ success: false, cifrado: cifrado });

    }
	//	cifrado=5;
	//	res.redirect(303, '/vigenere');

	});

	app.post('/process2', function(req, res){
			res.send({ success: true });
	});


app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate.' );
});

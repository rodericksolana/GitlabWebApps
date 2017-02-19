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

if( app.thing == null ) console.log( 'bleat!' );

function swearOutLoud(entrada,clave2, codigo) {
/*
	var alfabeto=">/*7�5u���?WR�jfsJIl�X@VrA=;Y� 3.P�e�D�n-LToNpC�!aOx+6�vt2d:)4%g��(�SHK<8EBhkbF,Z�cQ�19wzUMymGiq0�";
	longalfa=alfabeto.length;
	texto1=entrada;
	texto2="";
	clave=clave2;
	longitud=texto1.length;
	longclave=clave.length;
	claveta=new Array(longclave);
	for (m=0;m<longclave;m++) {
			for (n=0;n<longalfa;n++) {
			if (clave.substring(m,m+1)==alfabeto.substring(n,n+1)) {claveta[m]=n;break;}
			}
			}
	for (i=0; i<longitud; i++) {
			num1=32+Math.floor(Math.random()*95);
			num2=32+Math.floor(Math.random()*95);
			for (j=0; j<longalfa; j++) {
				if (texto1.substring(i,i+1)==alfabeto.substring(j,j+1)) {num1=j;num2=claveta[i%longclave];break;}
			}
			numero=(num1+num2*codigo+longalfa)%longalfa;
			texto2=texto2+alfabeto.substring(numero,numero+1);
	}
	cifrado=texto2;
isPaused=true;
	console.log("Esto vale al final: " + cifrado);
	*/

	var alfabeto=">/*7�5u���?WR�jfsJIl�X@VrA=;Y� 3.P�e�D�n-LToNpC�!aOx+6�vt2d:)4%g��(�SHK<8EBhkbF,Z�cQ�19wzUMymGiq0�";
	longalfa=alfabeto.length;
	texto1=entrada;
	texto2="";
	clave=clave2;
	longitud=texto1.length;
	longclave=clave.length;
	memo=new Array(longclave);
	claveta=new Array(longclave);
	for (m=0;m<longclave;m++) {
			for (n=0;n<longalfa;n++) {
			if (clave.substring(m,m+1)==alfabeto.substring(n,n+1)) {claveta[m]=n;break;}
			}
			}
	for (i=0; i<longitud; i++) {
			num1=32+Math.floor(Math.random()*95);
			num2=32+Math.floor(Math.random()*95);
			num3=32+Math.floor(Math.random()*95);
			for (j=0; j<longalfa; j++) {
				if (texto1.substring(i,i+1)==alfabeto.substring(j,j+1)) {num1=j;num2=claveta[i%longclave];break;}
			}
			numero=(num1+num2*codigo+longalfa)%longalfa;
			if (codigo==1 && i>=longclave) {
					for (j=0; j<longalfa; j++) if (memo[(i-longclave)%longclave]==alfabeto.substring(j,j+1)) {num3=j;break;}
					numero=(numero+num3)%longalfa;
					}
			if (codigo==-1 && i>=longclave) {
					for (j=0; j<longalfa; j++) if (texto1.substring(i-longclave,i-longclave+1)==alfabeto.substring(j,j+1)) {num3=j;break;}
					numero=(numero-num3+longalfa)%longalfa;
					}
			texto2=texto2+alfabeto.substring(numero,numero+1);
			memo[i%longclave]=alfabeto.substring(numero,numero+1);
	}
	cifrado=texto2;
	isPaused=true;

};



app.get('/',function(req,res){
	res.render('home',{


	});

});

app.get('/vigenere',function(req,res){
	res.render('vigenere',{
		 cifrado : cifrado
	} );

	});

	app.post('/process', function(req, res){

swearOutLoud(req.body.name , req.body.email,  req.body.tipo );
/*
		console.log('Name (from visible form field): ' + req.body.name);
		console.log('Email (from visible form field): ' + req.body.email);
		console.log('Email (from visible form field): ' + req.body.tipo);
*/


if(isPaused)
		res.send({ success: true, cifrado: cifrado });
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

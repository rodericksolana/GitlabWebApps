var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout:'main', });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
		res.locals.partials =
		{alumnos: [
			{
				name: 'Miguel del Moral ',
				materias: [{nombre: 'Inglés' , calif: 100}, {nombre: 'Seguridad Informática', calif: 90}]
			},
			{
				name: 'Rodrigo Solana ',
				materias: [{nombre: 'Inglés' , calif: 80}, {nombre: 'Seguridad Informática', calif: 100}]
			},
			{
				name: 'Rafael Correa ',
				materias: [{nombre: 'Inglés' , calif: 75}, {nombre: 'Seguridad Informática', calif: 80}]
			}
		]};
	next();
});

app.use(function (req, res, next) {
	var promMate = 0;
	var promEsp = 0;
	var div = res.locals.partials.alumnos.length;
	for(var i = 0;i<res.locals.partials.alumnos.length;i++){
		promMate += res.locals.partials.alumnos[i].materias[0].calif;
		promEsp += res.locals.partials.alumnos[i].materias[1].calif;
	}
	res.locals.promMate = promMate/ div;
	res.locals.promEsp = promEsp/ div;
	next();
});

var alumnoActual=  [
	{
		name: 'Miguel del Moral ',
		imagen: '',
		materias: [{nombre: 'Inglés' , calif: 100}, {nombre: 'Seguridad Informática', calif: 90}]
	}
];

app.get('/',function(req,res){
	res.render('home',{

				alumnoActual: alumnoActual

	});

});

app.get('/ejercicio1',function(req,res){
	res.render('ejercicio1',{
						alumnoActual: alumnoActual
		});

	});

app.get('/ejercicio1SL',function(req,res){
	res.render('ejercicio1',{
			currency: {
				name: 'United States dollars',
				abbrev: 'USD',
			},
			tours: [
				{ name: 'Hood River', price: '$99.95' },
				{ name: 'Oregon Coast', price: '$159.95' }
			],
			specialsUrl: '/url',
			currencies: [ 'USD', 'GBP', 'BTC' ],
			layout:null
		}
	);
});

app.get('/ejercicio1MS',function(req,res){
	res.render('ejercicio1',{
			currency: {
				name: 'United States dollars',
				abbrev: 'USD',
			},
			tours: [
				{ name: 'Hood River', price: '$99.95' },
				{ name: 'Oregon Coast', price: '$159.95' }
			],
			specialsUrl: '/url',
			currencies: [ 'USD', 'GBP', 'BTC' ],
			layout:'microsite'
		}
	);
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

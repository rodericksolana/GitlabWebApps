suite('"Cesar" Page Tests', function(){

	test('Esta pagina debe tener una imagen', function(){
	assert($('img').length);
	});

	test('Esta pagina debe tener un link a Home', function(){
			assert($('a[href="/"]').length);
	});

	test('Esta pagina debe tener una tabla', function(){
			assert($('table').length);
	});

	test('Esta pagina debe tener un parrafo', function(){
			assert($('p').length);
	});

	test('Esta pagina debe tener un link a youtube', function(){
			assert($('a[href="https://www.youtube.com/"]').length);
	});


});

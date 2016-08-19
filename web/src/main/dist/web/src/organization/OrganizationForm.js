var form = document.querySelector('form');

form.addEventListener('submit', function(e) {
	e.preventDefault();

	WeDeploy
		.url('http://data.hackadaylibrary.wedeploy.me/organization')
		.post({
			name: form.item.value
		})
		.then(function(response) {
			form.reset();
			form.item.focus();
			console.info('Saved:', response.body());
		})
		.catch(function(error) {
			console.error(error);
		});
}); 
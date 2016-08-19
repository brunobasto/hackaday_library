'use strict';

var authUrl = 'http://auth.hackadaylibrary.wedeploy.me';

var auth = WeDeploy.auth(authUrl);

var googleProvider = new auth.provider.Google();
googleProvider.setProviderScope('email');
googleProvider.setRedirectUri('http://web.hackadaylibrary.wedeploy.me/library/list');

window.loginWithGoogle = function() {
	auth.signInWithRedirect(googleProvider);
};

console.log('Test');

auth.onSignIn(() => {
	console.log('onSignIn', arguments);
});
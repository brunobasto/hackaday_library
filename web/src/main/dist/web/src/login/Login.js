'use strict';

var authUrl = 'http://auth.hackadaylibrary.wedeploy.me';

var auth = WeDeploy.auth(authUrl);

var googleProvider = new auth.provider.Google();
googleProvider.setProviderScope('email');
googleProvider.setRedirectUri('/home');

window.loginWithGoogle = function() {
	auth.signInWithRedirect(googleProvider);
};

auth.onSignIn(() => {
	// User logged
});
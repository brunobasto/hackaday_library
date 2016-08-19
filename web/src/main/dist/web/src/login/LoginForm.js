'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import templates from './LoginForm.soy';

class LoginForm extends Component {

	constructor(config) {
		super(config);
		if (WeDeploy.auth().currentUser) {
			location.href = '/library/list';
		}
	}
	
	loginWithGoogle() {
		window.loginWithGoogle();
	}

}
Soy.register(LoginForm, templates);

export default LoginForm;
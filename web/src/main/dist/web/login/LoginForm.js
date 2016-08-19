'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import templates from './LoginForm.soy';

class LoginForm extends Component {

	loginWithGithub() {
		window.loginWithGithub();
	}

	loginWithGoogle() {
		window.loginWithGoogle();
	}

}
Soy.register(LoginForm, templates);

export default LoginForm;
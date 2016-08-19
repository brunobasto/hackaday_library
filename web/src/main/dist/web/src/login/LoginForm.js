'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import templates from './LoginForm.soy';

class LoginForm extends Component {

	loginWithGoogle() {
		window.loginWithGoogle();
	}

}
Soy.register(LoginForm, templates);

export default LoginForm;
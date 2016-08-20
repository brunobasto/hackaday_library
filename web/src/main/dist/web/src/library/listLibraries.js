'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import templates from './listLibraries.soy';

class ListLibraries extends Component {

	addLibrary() {
		location.href = '/library';
	}
	
	logout() {
		WeDeploy.auth('http://auth.hackadaylibrary.wedeploy.me').signOut().then(function() {
        	location.href = "http://web.hackadaylibrary.wedeploy.me";
    	});
	}


}

ListLibraries.STATE = {
	libraries: {
		value: []
	}
};


Soy.register(ListLibraries, templates);

export default ListLibraries;
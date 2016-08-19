'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import templates from './listLibraries.soy';

class ListLibraries extends Component {

	addLibrary() {
		location.href = '/library';
	}

}

ListLibraries.STATE = {
	libraries: {
		value: []
	}
};


Soy.register(ListLibraries, templates);

export default ListLibraries;
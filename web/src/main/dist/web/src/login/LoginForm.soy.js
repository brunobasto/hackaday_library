/* jshint ignore:start */
import Component from 'metal-component';
import Soy from 'metal-soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from LoginForm.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace LoginForm.
 * @public
 */

goog.module('LoginForm.incrementaldom');

/** @suppress {extraRequire} */
var soy = goog.require('soy');
/** @suppress {extraRequire} */
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.i18n.bidi');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
var IncrementalDom = goog.require('incrementaldom');
var ie_open = IncrementalDom.elementOpen;
var ie_close = IncrementalDom.elementClose;
var ie_void = IncrementalDom.elementVoid;
var ie_open_start = IncrementalDom.elementOpenStart;
var ie_open_end = IncrementalDom.elementOpenEnd;
var itext = IncrementalDom.text;
var iattr = IncrementalDom.attr;

var $templateAlias1 = Soy.getTemplate('Page.incrementaldom', 'render');


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'container text-center');
    ie_open('div', null, null,
        'class', 'row');
      ie_open('div', null, null,
          'class', 'col-md-12 col-md-offset-2');
        ie_open('div', null, null,
            'class', 'jumbotron');
          ie_open('h1');
            itext('WeRead!!');
          ie_close('h1');
          ie_open('p');
            ie_open('button', null, null,
                'type', 'button',
                'class', 'btn btn-danger',
                'data-onclick', 'loginWithGoogle');
              itext('Login with Google');
            ie_close('button');
          ie_close('p');
        ie_close('div');
      ie_close('div');
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'LoginForm.render';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $layout(opt_data, opt_ignored, opt_ijData) {
  var param53 = function() {
    $render(opt_data, null, opt_ijData);
  };
  $templateAlias1(soy.$$augmentMap(opt_data, {content: param53}), null, opt_ijData);
}
exports.layout = $layout;
if (goog.DEBUG) {
  $layout.soyTemplateName = 'LoginForm.layout';
}

exports.render.params = [];
exports.render.types = {};
exports.layout.params = ["element"];
exports.layout.types = {"element":"any"};
templates = exports;
return exports;

});

class LoginForm extends Component {}
Soy.register(LoginForm, templates);
export { LoginForm, templates };
export default templates;
/* jshint ignore:end */

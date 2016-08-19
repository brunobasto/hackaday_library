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
goog.require('goog.asserts');
/** @suppress {extraRequire} */
goog.require('soy.asserts');
/** @suppress {extraRequire} */
goog.require('goog.i18n.bidi');
var IncrementalDom = goog.require('incrementaldom');
var ie_open = IncrementalDom.elementOpen;
var ie_close = IncrementalDom.elementClose;
var ie_void = IncrementalDom.elementVoid;
var ie_open_start = IncrementalDom.elementOpenStart;
var ie_open_end = IncrementalDom.elementOpenEnd;
var itext = IncrementalDom.text;
var iattr = IncrementalDom.attr;


/**
 * @param {{
 *    email: (?),
 *    password: (?),
 *    textSubmit: (?),
 *    name: (?),
 *    social: (?),
 *    textFooter: (?soydata.SanitizedHtml|string|undefined),
 *    textPrimary: (?soydata.SanitizedHtml|string|undefined),
 *    textSecondary: (?soydata.SanitizedHtml|string|undefined)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  var $$temp;
  soy.asserts.assertType(opt_data.textFooter == null || (opt_data.textFooter instanceof Function) || (opt_data.textFooter instanceof soydata.UnsanitizedText) || goog.isString(opt_data.textFooter), 'textFooter', opt_data.textFooter, '?soydata.SanitizedHtml|string|undefined');
  var textFooter = /** @type {?soydata.SanitizedHtml|string|undefined} */ (opt_data.textFooter);
  soy.asserts.assertType(opt_data.textPrimary == null || (opt_data.textPrimary instanceof Function) || (opt_data.textPrimary instanceof soydata.UnsanitizedText) || goog.isString(opt_data.textPrimary), 'textPrimary', opt_data.textPrimary, '?soydata.SanitizedHtml|string|undefined');
  var textPrimary = /** @type {?soydata.SanitizedHtml|string|undefined} */ (opt_data.textPrimary);
  soy.asserts.assertType(opt_data.textSecondary == null || (opt_data.textSecondary instanceof Function) || (opt_data.textSecondary instanceof soydata.UnsanitizedText) || goog.isString(opt_data.textSecondary), 'textSecondary', opt_data.textSecondary, '?soydata.SanitizedHtml|string|undefined');
  var textSecondary = /** @type {?soydata.SanitizedHtml|string|undefined} */ (opt_data.textSecondary);
  if (textPrimary) {
    ie_open('h1', null, null,
        'class', 'login-text-primary');
      textPrimary();
    ie_close('h1');
  }
  ie_open('div', null, null,
      'class', 'loginform');
    if (opt_data.social != null) {
      ie_open('div', null, null,
          'class', 'form-group social');
        ie_open('button', null, null,
            'class', 'btn btn-social btn-github',
            'type', 'button',
            'data-onclick', 'loginWithGithub');
          ie_open('span', null, null,
              'class', 'brand');
            ie_void('span', null, null,
                'class', 'icon icon-12-github');
          ie_close('span');
          ie_open('span', null, null,
              'class', 'btn-label');
            itext('Login with Github');
          ie_close('span');
        ie_close('button');
        ie_open('button', null, null,
            'class', 'btn btn-social btn-google',
            'type', 'button',
            'data-onclick', 'loginWithGoogle');
          ie_open('span', null, null,
              'class', 'brand');
            ie_void('span', null, null,
                'class', 'icon icon-google');
          ie_close('span');
          ie_open('span', null, null,
              'class', 'btn-label');
            itext('Login with Google');
          ie_close('span');
        ie_close('button');
      ie_close('div');
    }
    if (opt_data.name != null) {
      ie_open('div', null, null,
          'class', 'form-group');
        ie_open('label');
          itext('Name');
        ie_close('label');
        ie_open('input', null, null,
            'type', 'name',
            'class', 'form-control',
            'name', 'name',
            'value', ($$temp = opt_data.name) == null ? '' : $$temp,
            'autofocus', '',
            'required', '');
        ie_close('input');
      ie_close('div');
    }
    if (opt_data.email != null) {
      ie_open('div', null, null,
          'class', 'form-group');
        ie_open('label');
          itext('Email');
        ie_close('label');
        ie_open('input', null, null,
            'type', 'email',
            'class', 'form-control',
            'name', 'email',
            'value', ($$temp = opt_data.email) == null ? '' : $$temp,
            'autofocus', '',
            'required', '');
        ie_close('input');
      ie_close('div');
    }
    if (opt_data.password != null) {
      ie_open('div', null, null,
          'class', 'form-group');
        ie_open('label');
          itext('Password');
        ie_close('label');
        ie_open('input', null, null,
            'type', 'password',
            'class', 'form-control',
            'name', 'password',
            'value', ($$temp = opt_data.password) == null ? '' : $$temp,
            'required', '');
        ie_close('input');
      ie_close('div');
    }
    ie_open('div', null, null,
        'class', 'btn-container');
      ie_open('button', null, null,
          'type', 'submit',
          'class', 'btn btn-success',
          'name', 'submit');
        itext((goog.asserts.assert((opt_data.textSubmit) != null), opt_data.textSubmit));
      ie_close('button');
    ie_close('div');
    if (textSecondary) {
      ie_open('p', null, null,
          'class', 'login-text-secondary');
        textSecondary();
      ie_close('p');
    }
  ie_close('div');
  if (textFooter) {
    ie_open('p', null, null,
        'class', 'login-text-footer');
      textFooter();
    ie_close('p');
  }
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'LoginForm.render';
}

exports.render.params = ["textFooter","textPrimary","textSecondary","email","password","textSubmit","name","social"];
exports.render.types = {"textFooter":"html","textPrimary":"html","textSecondary":"html","email":"any","password":"any","textSubmit":"any","name":"any","social":"any"};
templates = exports;
return exports;

});

class LoginForm extends Component {}
Soy.register(LoginForm, templates);
export { LoginForm, templates };
export default templates;
/* jshint ignore:end */

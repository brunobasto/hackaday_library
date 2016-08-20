/* jshint ignore:start */
import Component from 'metal-component';
import Soy from 'metal-soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from OrganizationForm.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace OrganizationForm.
 * @public
 */

goog.module('OrganizationForm.incrementaldom');

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

var $templateAlias1 = Soy.getTemplate('Page.incrementaldom', 'render');


/**
 * @param {{
 *    nome: (?soydata.SanitizedHtml|string|undefined)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  soy.asserts.assertType(opt_data.nome == null || (opt_data.nome instanceof Function) || (opt_data.nome instanceof soydata.UnsanitizedText) || goog.isString(opt_data.nome), 'nome', opt_data.nome, '?soydata.SanitizedHtml|string|undefined');
  var nome = /** @type {?soydata.SanitizedHtml|string|undefined} */ (opt_data.nome);
  ie_open('form', null, null,
      'action', '/organization/create',
      'method', 'POST');
    ie_open('div', null, null,
        'class', 'container');
      ie_open('div', null, null,
          'class', 'row');
        ie_open('div', null, null,
            'class', 'col-md-4');
          ie_open('div', null, null,
              'class', 'form-group');
            ie_open('label', null, null,
                'class', 'control-label',
                'for', 'nome');
              itext('Nome');
            ie_close('label');
            ie_open('input', null, null,
                'type', 'text',
                'class', 'form-control',
                'id', 'nome',
                'placeholder', 'Nome',
                'value', nome);
            ie_close('input');
          ie_close('div');
        ie_close('div');
      ie_close('div');
      ie_open('div', null, null,
          'class', 'row text-right');
        ie_open('button', null, null,
            'type', 'submit',
            'class', 'btn btn-primary');
          itext('Salvar');
        ie_close('button');
      ie_close('div');
    ie_close('div');
  ie_close('form');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'OrganizationForm.render';
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
  $layout.soyTemplateName = 'OrganizationForm.layout';
}

exports.render.params = ["nome"];
exports.render.types = {"nome":"html"};
exports.layout.params = ["element"];
exports.layout.types = {"element":"any"};
templates = exports;
return exports;

});

class OrganizationForm extends Component {}
Soy.register(OrganizationForm, templates);
export { OrganizationForm, templates };
export default templates;
/* jshint ignore:end */

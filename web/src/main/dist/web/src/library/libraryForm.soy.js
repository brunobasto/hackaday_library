/* jshint ignore:start */
import Component from 'metal-component';
import Soy from 'metal-soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from libraryForm.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace LibraryForm.
 * @public
 */

goog.module('LibraryForm.incrementaldom');

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
      'class', 'container');
    ie_open('form', null, null,
        'role', 'form');
      ie_open('div', null, null,
          'class', 'row');
        ie_open('div', null, null,
            'class', 'col-md-offset-4 col-md-8');
          ie_open('h3');
            itext('Bibliotecas');
          ie_close('h3');
          ie_open('div', null, null,
              'class', 'form-group');
            ie_open('label', null, null,
                'class', 'control-label',
                'for', 'organization');
              itext('Organiza\u00E7\u00E3o');
            ie_close('label');
            ie_open('select', null, null,
                'id', 'organization',
                'class', 'form-control');
              var optionList7 = opt_data.options;
              var optionListLen7 = optionList7.length;
              for (var optionIndex7 = 0; optionIndex7 < optionListLen7; optionIndex7++) {
                var optionData7 = optionList7[optionIndex7];
                ie_open('option');
                  itext((goog.asserts.assert((optionData7) != null), optionData7));
                ie_close('option');
              }
            ie_close('select');
          ie_close('div');
          ie_open('div', null, null,
              'class', 'form-group');
            ie_open('label', null, null,
                'class', 'control-label',
                'for', 'name');
              itext('Nome');
            ie_close('label');
            ie_open('input', null, null,
                'type', 'text',
                'class', 'form-control',
                'id', 'name',
                'placeholder', 'Nome',
                'value', opt_data.name);
            ie_close('input');
          ie_close('div');
          ie_open('div', null, null,
              'class', 'form-group');
            ie_open('label', null, null,
                'class', 'control-label',
                'for', 'address');
              itext('Endere\u00E7o');
            ie_close('label');
            ie_open('input', null, null,
                'type', 'text',
                'class', 'form-control',
                'id', 'address',
                'placeholder', 'Endere\u00E7o',
                'value', opt_data.address);
            ie_close('input');
          ie_close('div');
          ie_open('div', null, null,
              'class', 'form-group');
            ie_open('label', null, null,
                'class', 'control-label',
                'for', 'lending');
              itext('Dias de empr\u00E9stimo');
            ie_close('label');
            ie_open('input', null, null,
                'type', 'number',
                'class', 'form-control',
                'id', 'lending',
                'placeholder', 'Dias de empr\u00E9stimo',
                'value', opt_data.lending);
            ie_close('input');
          ie_close('div');
        ie_close('div');
      ie_close('div');
      ie_open('div', null, null,
          'class', 'row text-right');
        ie_open('div', null, null,
            'class', 'col-md-offset-4 col-md-8');
          ie_open('button', null, null,
              'type', 'submit',
              'class', 'btn btn-primary');
            itext('Salvar');
          ie_close('button');
        ie_close('div');
      ie_close('div');
    ie_close('form');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'LibraryForm.render';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $layout(opt_data, opt_ignored, opt_ijData) {
  var param17 = function() {
    $render(opt_data, null, opt_ijData);
  };
  $templateAlias1(soy.$$augmentMap(opt_data, {content: param17}), null, opt_ijData);
}
exports.layout = $layout;
if (goog.DEBUG) {
  $layout.soyTemplateName = 'LibraryForm.layout';
}

exports.render.params = ["options","name","address","lending"];
exports.render.types = {"options":"any","name":"any","address":"any","lending":"any"};
exports.layout.params = ["element"];
exports.layout.types = {"element":"any"};
templates = exports;
return exports;

});

class LibraryForm extends Component {}
Soy.register(LibraryForm, templates);
export { LibraryForm, templates };
export default templates;
/* jshint ignore:end */

/* jshint ignore:start */
import Component from 'metal-component';
import Soy from 'metal-soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from listLibraries.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ListLibraries.
 * @public
 */

goog.module('ListLibraries.incrementaldom');

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
  itext('\u00A0\u00A0');
  ie_open('div', null, null,
      'class', 'container');
    ie_open('div', null, null,
        'class', 'row text-right');
      ie_open('button', null, null,
          'type', 'button',
          'data-onclick', 'logout',
          'class', 'btn btn-danger');
        itext('Logout');
      ie_close('button');
    ie_close('div');
    ie_open('div', null, null,
        'class', 'row');
      ie_open('div', null, null,
          'class', 'list col-md-8 col-md-offset-4');
        ie_open('ul', null, null,
            'class', 'list-group');
          var libraryList31 = opt_data.libraries;
          var libraryListLen31 = libraryList31.length;
          for (var libraryIndex31 = 0; libraryIndex31 < libraryListLen31; libraryIndex31++) {
            var libraryData31 = libraryList31[libraryIndex31];
            ie_open('li', null, null,
                'class', 'listitem list-group-item clearfix',
                'data-index', '0');
              ie_open('div');
                ie_open('span', null, null,
                    'class', 'list-image pull-left avatar-photo');
                  ie_open('img', null, null,
                      'src', 'https://avatars0.githubusercontent.com/u/5216049?v=3&amp;s=96');
                  ie_close('img');
                ie_close('span');
                ie_open('div', null, null,
                    'class', 'list-main-content pull-left');
                  ie_open('div', null, null,
                      'class', 'list-text-primary');
                    itext((goog.asserts.assert((libraryData31.name) != null), libraryData31.name));
                  ie_close('div');
                  ie_open('div', null, null,
                      'class', 'list-text-secondary');
                    itext((goog.asserts.assert((libraryData31.address) != null), libraryData31.address));
                  ie_close('div');
                ie_close('div');
              ie_close('div');
            ie_close('li');
          }
        ie_close('ul');
      ie_close('div');
    ie_close('div');
    ie_open('div', null, null,
        'class', 'row text-right');
      ie_open('button', null, null,
          'type', 'button',
          'data-onclick', 'addLibrary',
          'class', 'btn btn-primary');
        itext('+');
      ie_close('button');
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'ListLibraries.render';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $layout(opt_data, opt_ignored, opt_ijData) {
  var param35 = function() {
    $render(opt_data, null, opt_ijData);
  };
  $templateAlias1(soy.$$augmentMap(opt_data, {content: param35}), null, opt_ijData);
}
exports.layout = $layout;
if (goog.DEBUG) {
  $layout.soyTemplateName = 'ListLibraries.layout';
}

exports.render.params = ["libraries"];
exports.render.types = {"libraries":"any"};
exports.layout.params = ["element"];
exports.layout.types = {"element":"any"};
templates = exports;
return exports;

});

class ListLibraries extends Component {}
Soy.register(ListLibraries, templates);
export { ListLibraries, templates };
export default templates;
/* jshint ignore:end */

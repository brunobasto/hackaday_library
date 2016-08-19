/* jshint ignore:start */
import Component from 'metal-component';
import Soy from 'metal-soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Page.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Page.
 * @public
 */

goog.module('Page.incrementaldom');

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


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  ie_open('!DOCTYPE', null, null,
      'html', '');
    ie_open('html', null, null,
        'lang', 'en');
      ie_open('head');
        ie_open('meta', null, null,
            'charset', 'utf-8');
        ie_close('meta');
        ie_open('title');
          itext('Dashboard \u2013 WeDeploy\u2122 by Liferay');
        ie_close('title');
        ie_open('meta', null, null,
            'name', 'viewport',
            'content', 'width=device-width, initial-scale=1');
        ie_close('meta');
        ie_open('link', null, null,
            'rel', 'shortcut icon',
            'href', '/favicon.ico');
        ie_close('link');
        ie_open('!--', null, null,
            'Fonts', '',
            '--', '');
          ie_open('link', null, null,
              'rel', 'stylesheet',
              'href', 'http://fonts.googleapis.com/css?family=Open+Sans:700,600,400,300|Roboto+Mono');
          ie_close('link');
          ie_open('link', null, null,
              'rel', 'stylesheet',
              'href', '/build/vendor/westyle/build/fonts/galano/font-galano.css');
          ie_close('link');
          ie_open('link', null, null,
              'rel', 'stylesheet',
              'href', '/build/vendor/westyle/build/fonts/icon-12.css');
          ie_close('link');
          ie_open('link', null, null,
              'rel', 'stylesheet',
              'href', '/build/vendor/westyle/build/fonts/icon-16.css');
          ie_close('link');
          ie_open('!--', null, null,
              'Styles', '',
              '--', '');
            ie_open('link', null, null,
                'rel', 'stylesheet',
                'href', '/build/vendor/senna/senna.css');
            ie_close('link');
            ie_open('link', null, null,
                'rel', 'stylesheet',
                'href', '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/tomorrow-night-eighties.min.css');
            ie_close('link');
            ie_open('link', null, null,
                'rel', 'stylesheet',
                'href', '/build/dashboard.css');
            ie_close('link');
          ie_close('head');
          ie_open('body');
            ie_void('div', null, null,
                'class', 'senna-loading-bar');
            ie_open('div', null, null,
                'id', 'content');
              itext((goog.asserts.assert((opt_data.content) != null), opt_data.content));
            ie_close('div');
            ie_void('script', null, null,
                'src', '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/highlight.min.js');
            ie_void('script', null, null,
                'src', 'https://cdn.socket.io/socket.io-1.3.0.js');
            ie_void('script', null, null,
                'src', 'http://cdn.wedeploy.com/api/latest/wedeploy.js');
            ie_void('script', null, null,
                'src', '/build/globals/dashboard.js');
            ie_open('!--', null, null,
                'Analytics', '',
                '--', '');
              itext('\n\t\t\t\t');
              ie_open('script');
                itext('\n\t\t\t\t(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n\t\t\t\t(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n\t\t\t\tm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n\t\t\t\t})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\n\n\t\t\t\tga(\'create\', \'UA-37033501-2\', \'auto\');\n\t\t\t\tga(\'send\', \'pageview\');\n\t\t\t\t');
              ie_close('script');
              itext('\n\t\t\t');
            ie_close('body');
          ie_close('html');
        }
        exports.render = $render;
        if (goog.DEBUG) {
          $render.soyTemplateName = 'Page.render';
        }

exports.render.params = ["content"];
exports.render.types = {"content":"any"};
templates = exports;
return exports;

});

class Page extends Component {}
Soy.register(Page, templates);
export { Page, templates };
export default templates;
/* jshint ignore:end */

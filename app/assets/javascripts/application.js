// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require_tree .

// (function() {
//     setTimeout(function(){
//         alert("It's over Anakin, I have the high ground.")
//     },2000)
// }).call(this);

(function() {
    (function init() {
        HTMLElement.prototype.event_handler = function() {
            var controller = this.dataset.controller;
            var handler = this.dataset.handler;
            if (!controller || !handler) return;
            if (!App.scripts[controller][handler]) throw new Error(handler + ' is not defined in ' + controller);
            
            App.scripts[controller][handler].call(this);
        }
    }).call(this);

    function load() {
        for (var prop in App.scripts) {
            if (App.scripts.hasOwnProperty(prop)) {
                App.scripts[prop].call(App.scripts[prop]);
            }
        }
    }

    function click() {
        if (event.target.tagName == 'INPUT') return;
        if (event.target.tagName == 'SELECT') return;
        event.target.event_handler();
    }

    function keyup() {
        if (event.target.tagName != 'INPUT') return;
        if (event.keyCode === 13) {
            event.target.event_handler();
        }
    }

    window.addEventListener('DOMContentLoaded', load);
    window.addEventListener('keyup', keyup)
    document.addEventListener('click', click);
}).call(this);
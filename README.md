# Backbone + RequireJS + Mongodb Bootstrap

# Introduction

This repo contains an example for setting up your frontend JavaScript code base for sigle-page-app(SPA) with the libraries below quickly, and they have proven to be a great workflow for us so far. 

* [Backbone](http://backbonejs.org/): Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface
* [RequireJS](http://requirejs.org/): RequireJS is a JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments, like Rhino and Node. Using a modular script loader like RequireJS will improve the speed and quality of your code.
* [Jade](http://jade-lang.com/):Jade is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node, and it's a clean, whitespace sensitive syntax for writing html. 
* [Mongodb](http://www.mongodb.org/): MongoDB (from "humongous") is an open-source document database, and the leading NoSQL database. Written in C++
* [Express](http://expressjs.com/): Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications.Directory of node inlucdes the backend RESTFul API interface using Express

# Testing

## Unit Testing

* [Mocha](http://visionmedia.github.io/mocha/): Mocha is a feature-rich JavaScript test framework running on node.js and the browser, making asynchronous testing simple and fun.
* [Chai](http://chaijs.com/): Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
* [JSDom](https://github.com/tmpvar/jsdom): An open-source library that creates a fake DOM, including fake events. 

## Integration Testing

*[Selenium WebDriver](http://docs.seleniumhq.org/projects/webdriver/): Driving a browser natively as a user would either locally or on a remote machine using the Selenium Server it marks a leap forward in terms of browser automation.

## Visual Regression Testing

We could takes the screenshot comparison approach to testing CSS, and then compare whether there is a difference.

* [PhantomCSS](https://github.com/Huddle/PhantomCSS): A [CasperJS](http://github.com/n1k0/casperjs) module for automating visual regression testing with [PhantomJS](http://github.com/ariya/phantomjs/) and [Resemble.js](http://huddle.github.com/Resemble.js/).
* [needle](https://github.com/bfirsh/needle): Needle is a tool for testing your CSS with [Selenium](http://seleniumhq.org/) and [nose](http://somethingaboutorange.com/mrl/projects/nose/).

# Install

    npm install -g grunt-cli
    npm install
    cd node && npm install

# Run
    
    npm start           // developement
    grunt serve:dist   // production

## Mongodb

    mongod --dbpath ~/test/mongodb

# Build

    grunt

Currently, the build files could be found in the __dist__ directory.

# Test

    make test






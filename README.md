# Backbone + RequireJS + Mongodb Bootstrap

# Introduction

This repo contains an example setup for set up your frontend JavaScript code base with the tools below quickly, and they have proven to be a great workflow for us so far. 

* [Backbone](http://backbonejs.org/): Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface
* [RequireJS](http://requirejs.org/): Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface
* [Mongodb](http://www.mongodb.org/): MongoDB (from "humongous") is an open-source document database, and the leading NoSQL database. Written in C++
* [Express](http://expressjs.com/): Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications
* node directory inlucdes the backend RESTFul API interface using Express

# Install

    npm install -g grunt-cli
    npm install && cd node && npm install

# Run

## Mongodb

    mongod --dbpath ~/test/mongodb

## Development

    npm start           // developement
    grunt serve:dist   // production

# Build

    grunt

Currently, the build files could be found in the __dist__ directory.

# Test

    make test

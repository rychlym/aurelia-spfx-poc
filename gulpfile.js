'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

const { AureliaPlugin } = require("aurelia-webpack-plugin");
  
  build.configureWebpack.mergeConfig({
    additionalConfiguration: generatedConfiguration => {
      //generatedConfiguration.resolve.modules.push("src");
      generatedConfiguration.module.rules[0].issuer = {
        // only when the issuer is a .js/.ts file, so the loaders are not applied inside templates
        test: /\.[tj]s$/i,
      };
  
      var rule1 = { test: /\.css$/i,issuer: [{ test: /\.html$/i }], use: "css-loader"} ;
      generatedConfiguration.module.rules.push(rule1)
  
      var rule2 = { test: /\.ts$/i, use: "ts-loader" };
      generatedConfiguration.module.rules.push(rule2);
  
      var rule3 = { test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/, loader: 'expose-loader?Promise' };
      generatedConfiguration.module.rules.push(rule3);
  
      generatedConfiguration.plugins.push(new AureliaPlugin({
        aureliaApp: undefined
      }));
  
      return generatedConfiguration;
    }
  });
  
build.initialize(gulp);

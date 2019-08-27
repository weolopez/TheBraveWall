# How to contribute

## Getting Started
1. #### Downloading Node.js
    1. ##### On windows systems go to [nodejs.org](https://nodejs.org/en/) and download the executable file.
    2. ##### Install node.js
    3. ##### Type node --version to verify node was installed correctly.
## Making Changes (Use Cases)
### New Page (Route)
1. #### Create a new directory
    + ##### Create a new template (.html) file, that will serve as the view.
    + ##### Create a new module (.js) file, that will provide the controller, services, etc.
        + ##### Add the new page as a dependency to the pages module
        + ##### Add any third party dependencies, and inter-project dependent dependencies to your module
### New RestService
### New Component (SiteHeader, OrderDetails....)
### New Unit Test
### New E2E Test
 1. #### Setup
    1. ##### npm install -g protractor   
    2. ##### webdriver-manager update
    3. ##### webdriver-manager start
2. #### Configuration File
    1. ##### Create a configuration file "protractor.conf.js"
        + ##### Key config properties
            
             + ###### SeleniumPort: The port which the selenium server will run on, if blank the server will find its own unused port
             + seleniumAddress: The address of a running selenium server
            + specs: Regular expressions and patterns relative to hte location of the config file
            + exclude: All patterns to exclude
            + capabilities: Browser configurations for testing a single browser.
            + multicapabilities: Browser configuration for testing multiple browsers.
            + rootElement: CSS Selector for the element that contains the angular app
            + allScriptsTimeout: timeout in milliseconds for each script run on the browser
            + getPageTimeout: how long to wait for a page to load
            + framework: Test framework to use i.e: jasmine, jasmine2, mocha, etc
3. #### Write a Test
    1. ##### Tests can be written easily using the Jasmine FrameWork [Jasmine.github.io](http://jasmine.github.io/2.3/introduction.html).
4. #### Run The Test
    1. ##### From the command line run the command: protractor protractor.conf.js(file  name)
    
    

## Making Trivial Changes
### Adding a CONSTANT
### Adding a 3rd party component/dependency

### Documentation

## Submitting Changes
1. ##### Commit all changes locally
2. ##### Pull from your forked repository
3. ##### Push to your forked repository
    + Rebase or merge changes accordingly
4. ##### Make a pull request to the master repository
# Additional Resources
[Angularjs Style Guide from John Papa](https://github.com/johnpapa/angular-styleguide "Angularjs Style Guide")
[Angularjs Unit Testing Guide](https://docs.angularjs.org/guide/unit-testing "Unit Testing")
[Angularjs Contribution Rules](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#rules "Angularjs Contribution Doc")
[Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml "Google JavaScript Style Guide")




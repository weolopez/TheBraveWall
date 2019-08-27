# mobilithonfall2015

**Git Repository for BraveHackers**

## To install (on linux you may need to sudo npm install -g
 1. run: `git clone https://ml5174@codecloud.web.att.com/scm/~ml5174/masterseed.git`
 2. run: `npm install -g gulp`
 3. run: `npm install -g karma`
 4. run: `npm install -g protractor`
 5. run: `webdriver-manager update`

## To build and run
 1. run: `npm install`
 2. run: `gulp build`
 3. run: `gulp start`

## To run continuous unit test
 run: `gulp test`

## To run protractor (end to end testing)
 run: `protractor protractor.conf.js`
 
## Reference John Papa's [Angularjs Style Guide](https://github.com/johnpapa/angular-styleguide "Angular Style Guide")

## To contribute
 1. Fork the repository to your profile.
 2. Cone repository from your profile.
 3. Follow the above instructions.
 4. Commit changes run: `git commit -m 'Relative note to the changes made'`
 5. Pull any changes that may have occured since your last commit, run: `git pull`
 6. Push changes back to your repository run: `git push`
 7. Create a pull request.
 
## TODO Document git error scenarios
 `ERROR Message` : [List of actions to take.]

## Project config files structure
.  
├──  README.md  
├──  gulpfile.js  
├──  gulpfiles  
|── ├──  gulp.config.js  
|── ├──  gulpfile_dist.js  
|── ├──  index_deps.js  
├──  package.json  
├──  bower.json  
├──  .bowerrc  
├──  karma.conf.js  
├──  protractor.conf.js  
├──  .gitignore  

## Source files structure
./src  
├──  index.html  
├──  scss  
├──  assets
├──  lib  
├──  app  
├── ├── pages  
├── ├── components  
├── ├── rest-services  
├──  test  
|──  e2e-test       

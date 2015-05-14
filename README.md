goFast - A Gulp Build Tool
============
###Description
This is a tailored build tool for front end development designed for speed and efficiency.

###Usage
_Note: This should all be pretty straight forward. If your confused on you might want to take a look at a beginner friendly build tool such as [Brunch](brunch.io)_
####Install Dependencies
```
npm install
```
####Commands
__Development__
```
gulp
```
__Deployment to Github Pages__
```
gulp deploy
```
_Note_

+  When using this option any folders/files in `subPages` will be automatically converted to use a hyphenated naming convention and put in the root directory. 
    +   For example if the file path is: `subPages/magic/show.html` it will be converted to `magic-show.html` and placed in the root. So for your link you would need to the following convention `./magic-show`

__Production__
```
gulp build
```

##### Includes the following tools
+ Gulp
+ Jade
+ Stylus
    * Lost-grid
    * Rupture
    * Typographic
    * Kouto-swiss
    * Buttron
    * Custom Mixin
+ IconFont (for automatic svg to icon font generation)
+ Image Minification
+ WebPack (to handle js)
+ PostCss
    * easings
    * cssnext
    * autoprefixer
+ Babel
+ Minification Of Assets (on production)
    + Images
    + Font
    + Css
    + Js
    + Html
+ Automatic Name Revision
+ Error handling and Desktop Notifications
+ BrowserSync (for live reloading and a static server)
+ Browserify (with browserify-shim)
+ Watchify (caching version of browserify)
+ Automatic Asset Injection
+ Automatic Deployment to github
+ Automatic root asset deployment on production
+ The list continues, but those are the main features. If you are interested what else this tool offers take a peak at the source code. 

####Notes
#####Folder Structure
_Not set in stone yet, but will be soon._

+ __Views__ (All jade files and components are located here.)
    + ___components__
        + Various reusable components. 
    + ___includes__
        + Header, footer, ect.
    + ___layouts__
    + __subPages__
        + Any sub-directory pages go here. 
+ __Assets__
    + ___root__
        + All root assets go in this folder which will automatically be injected into the projects root directory on `deploy` or `build` commands. 
        + Useful for putting `404`, `favicon`, ect assets so they don't get in the way during development.
    +  __fonts__
    + __icons__
        + Any `svg` files in this folder will be automatically compiled and converted to a  `fonts`. Additionally, it will generate `css` `class`'s for you based on the file name. The folder in which you can locate these `class`'s is in ` assets\styles\_generated` _Note: this file will be regenerated every time your run a `gulp` command_
        + For optimal results use a `unicode` prefix for the file name. For example `uE001-facbook.svg` the following generated `class` you could then use in your `html` via `.icon.-facebook`
    + Images
        + Any image put in this folder will automatically be compressed
    + __js__ (JavaScript goes here)
    + __stlyes__
        + This is where your `stylus` files will be located. And as of right now I still have not decided on a finial structure, although, everything should be self explanatory. 

__Underscore folders/files__
Any file of folder with an underscore prefix (`_`) will be ignored and not compiled directly into your project. For example, lets consider the `.styl` files, there is no reason to have these files and or folders compiled into your project considering we have a `shared.styl` file in which we define all our imports imports. Nevertheless, there are times when you want or need to have various `.styl` file compiled separately, and this methodology give you a convenient and easy way to do so.  



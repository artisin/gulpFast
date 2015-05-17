Go Fast - A Gulp Build Tool
============
[![Build Status](https://travis-ci.org/artisin/goFast.svg?branch=master)](https://travis-ci.org/artisin/goFast)
[![Dependency Status](https://gemnasium.com/artisin/goFast.svg)](https://gemnasium.com/artisin/goFast)
###Description
This is a tailored build tool for front end development designed for speed and efficiency. I am still working on these docs, so hold on a min if that is what you are looking for.

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
[Check It Out](http://artisin.github.io/goFast/)

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
    * Custom Mixin's
+ PostCss
    * cssnext
    * easings
+ IconFont (for automatic svg to icon font generation)
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
+ Karma (for test)
+ Automatic Hash Name Revision
+ Error handling and Desktop Notifications
+ BrowserSync (for live reloading and a static server)
+ Automatic Asset Injection
+ Automatic Deployment to github
+ Automatic root asset deployment on production
+ The list continues, but those are the main features. If you are interested what else this tool offers take a peak at the source code. 

####Notes
#####Folder Structure
_Not set in stone yet, but will be soon._

+ __Views__ (All jade files and components are located here.)
    + __`_components`__
        + Various reusable components. 
    + __`_includes`__
        + Header, footer, ect.
    + __`_layouts`__
    + __`subPages`__
        + Any sub-directory pages go here. 
        + Note: This directory is automatically removed on development, production, and deploy.
            * Example: In your app directory you have a file in `subPages/magic/show.html` in the dist directory it would be `magic/show.html`
+ __Assets__
    + __`_root`__
        + All root assets go in this folder which will automatically be injected into the projects root directory on `deploy` or `build` commands. 
        + Useful for putting `404`, `favicon`, ect assets so they don't get in the way during development.
    +  __`fonts`__
    + __`icons`__
        + Any `svg` files in this folder will be automatically compiled and converted to a  `fonts`. Additionally, it will generate `css` `class`'s for you based on the file name. The folder in which you can locate these `class`'s is in ` assets\styles\_generated` _Note: this file will be regenerated every time your run a `gulp` command_
        + For optimal results use a `unicode` prefix for the file name. For example `uE001-facbook.svg` the following generated `class` you could then use in your `html` via `.icon.-facebook`
    + __`images`__
        + Any image put in this folder will automatically be compressed
    + __`js`__ (JavaScript goes here)
    + __`stlyes`__
        + This is where your `stylus` files will be located. And as of right now I still have not decided on a finial structure, although, everything should be self explanatory. 

__Underscore folders/files__
Any file of folder with an underscore prefix (`_`) will be ignored and not compiled directly into your project. For example, lets consider the `.styl` files, there is no reason to have these files and or folders compiled into your project considering we have a `shared.styl` file in which we define all our imports imports. Nevertheless, there are times when you want or need to have various `.styl` file compiled separately, and this methodology give you a convenient and easy way to do so.  



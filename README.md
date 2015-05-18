#Gulp Fast - A Gulp Build Tool
####Jade, Stylus(_with the all the goods_), PostCss, Webpack, Babel, Karma, BrowserSync

[![Build Status](https://travis-ci.org/artisin/gulpFast.svg?branch=master)](https://travis-ci.org/artisin/gulpFast)
[![Dependency Status](https://gemnasium.com/artisin/gulpFast.svg)](https://gemnasium.com/artisin/gulpFast)
###Description
This is a tailored build tool for front end development designed for speed and efficiency. I am still working on these docs, so hold on a minute if that is what you are looking for.

###Usage
_Note: This should all be pretty straight forward. If your confused with whats going on you might want to take a look at a beginner friendly option such as [Brunch](http://brunch.io/)_
####Install Dependencies
```
npm install
```
####Commands
__Development__
```
gulp
```
__Test__
```
gulp test
```

__Production__
```
gulp build
```

__Deployment to Github Pages__
```
gulp deploy
```
[Check It Out](http://artisin.github.io/gulpFast/)

_Note_

+  When using this option any folders/files in `subPages` will be automatically converted to use a hyphenated naming convention and put in the root directory. 
    +   For example if the file path is: `subPages/magic/show.html` it will be converted to `magic-show.html` and placed in the root. So for your link you would need to use the following convention `./magic-show`

##### Includes the following tools
+ [Gulp](https://github.com/gulpjs/gulp)
+ [HTML5 Boilerplate](https://html5boilerplate.com/)
+ [Modernizr](http://modernizr.com/)
+ Conditionally loaded [Selectivizr](http://selectivizr.com/) for IE6-8 CSS3 selectors
+ Conditionally loaded [Respond](https://github.com/scottjehl/Respond) for IE6-8 media queries
+ Conditionally loaded [calc() Polyfill](https://github.com/closingtag/calc-polyfill) for IE8 `calc()` usage
+ Conditionally loaded Googleapis CDN for [jQuery](https://jquery.com/)
+ Conditional [browsehappy](http://browsehappy.com/)
+ [Jade](https://github.com/jadejs/jade)
+ [Stylus](https://github.com/stylus/stylus)
    * [Lost-grid](https://github.com/corysimmons/lost)
    * [Rupture](http://jenius.github.io/rupture/)
    * [Typographic](https://github.com/corysimmons/typographic)
    * [Kouto-swiss](kouto-swiss.io)
    * Buttron
        - Those mystical button styles in the `shared_Buttons.styl` that created the magical buttons used in this project. Well don't you fret soon you too will be able to wield the unworldly power of Buttron. Wrighting the docs are next up on the docket. Stay tuned.
    * Various Custom Mixin's
+ [PostCss](https://github.com/postcss/postcss)
    * [cssnext](https://cssnext.github.io/)
    * [cssnano](https://github.com/ben-eb/cssnano) (for minification)
    * [Easings](https://github.com/postcss/postcss-easings)
    * [Focus](https://github.com/postcss/postcss-focus)
    * [Size](https://github.com/postcss/postcss-size)
    * [autoprefixer](https://github.com/postcss/autoprefixer-core)
+ [WebPack](http://webpack.github.io/)
+ [Babel](babeljs.io)
+ [Karma](http://karma-runner.github.io/0.12/index.html)
    * [Mocha](http://mochajs.org/) 
    * [Sinon-chai](https://github.com/domenic/sinon-chai)
+ [BrowserSync](http://www.browsersync.io/) (live reloading)
+ Minification
    * [Images](https://www.npmjs.com/package/gulp-imagemin)
    * [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) (on production for js and css)
    * [Html](https://github.com/jonschlinkert/gulp-htmlmin) (on production)
+ [IconFont](https://github.com/nfroidure/gulp-iconfont) (Create a SVG/TTF/EOT/WOFF font from several SVG icons)
    * With auto generation of `styl` classes 
+ [Static asset revisioning](https://github.com/sindresorhus/gulp-rev)
+ [Error handling and Desktop Notifications](https://github.com/mikaelbr/gulp-notify)
+ Automatic [Asset Injection](https://github.com/klei/gulp-inject)
+ Automatic Deployment to github
    * Via `gulp deploy`
+ Automatic root asset deployment on production
+ If you think I should add something else just drop me a line.

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
    + __`js`__
        * This is where your `javascript` files will be located. And as of right now I still have not decided on a finial structure, although, everything should be self explanatory.
    + __`stlyes`__
        + This is where your `stylus` files will be located. And as of right now I still have not decided on a finial structure, although, everything should be self explanatory. 

#####Underscore folders/files
Any file of folder with an underscore prefix (`_`) will be ignored and not compiled directly into your project. For example, lets consider the `.styl` files, there is no reason to have these files and or folders compiled into your project considering we have a `shared.styl` file in which we define all our imports imports. Nevertheless, there are times when you want or need to have various `.styl` file compiled separately, and this methodology give you a convenient and easy way to do so.  


#####Asset Injection
Any `css` or `js` file with `shared` at the beginning of its name will be automatically injected into your project. Although, upon a `build` or `delpoy` command any `css` file with the a `-` or `_` in its name will not be injected into your project but rather concatenated with your main `shared.styl` file. For example: the file `shared_Buttons.styl` during development will be injected into your project as a seperate file, although, it will be concatenated durring production. However, a file such as `sharedColors.styl` will not be concatenated during production and injected as a seperate asset.


##License
The MIT License (MIT)

Copyright (c) 2015

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
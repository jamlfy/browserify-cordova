# browserify-cordova

browserify in cordova and good practice

## Motivations

I have noticed that many frameworks to build apps in [cordova](http://cordova.apache.org/) are a mess. Because they are built when you send too much unnecessary content to the end user. Content plugins especially in markdown, this represents space in our mobile user, and the least we want is to make use of the space without.


There are three key points to convert your app, that has good performance and good practice.

## Your Project
This is the basic structure to start a project
```
Project
 + src --> Your APP
 |  + images 
 |  + jade
 |  + js
 |  + scss
 + www ---> Your App COMPRESS ;)
 + res ---> Your icons/logos with size
 + hooks
 |   + resize --> The MSL for contructor the icons/logos
 |   + before_prepare
 |       + contruc.js --< The Contructor
 + plugins
 + platforms
 + bower_componets
 + node_moodules
 + Gruntfile.js || gulp.js --> Your creator
 + config.xml
 + package.json
 + bower.json
```

## Recommendations
- Do not use the `www` folder to insert garbage
- Use `HTML/CSS/JS` builders, these have the property of minify the `HTML/CSS/JS`
	- `HTML` - [Jade](http://jade-lang.com/)
	- `CSS` - [SCSS](http://sass-lang.com/)
	- `JS` - uglify with [browserify](http://browserify.org/) because it uses NPM
- Just create a file with your logo and make it all work [ImageMagick](http://www.imagemagick.org/) convert your logo
	- This project contains multiple scripts to work you resize your logo is avoided.
	- To be using these, your logo must be at least 250x250
- Remember it is a mobile, and application size does matter!



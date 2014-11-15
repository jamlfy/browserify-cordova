'use strict';

module.exports = function(grunt) {
	var libxmljs = require("libxmljs"); 
	var xml = grunt.file.read(__dirname + '/config.xml');

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			scss: {
				files: 'src/scss/**/*.scss',
				tasks: [ 'sass' ]
			},
			script: {
				files: 'src/js/*.js',
				tasks: ['browserify' ],
			},
			jade : {
				files: 'src/jade/**/*.jade',
				tasks: ['jade' ]
			},
		},

		browserify: {
			vendor: {
				src: ['src/js/vendor.js'],
				dest: 'www/lib.js'
			},
			app : {
				src: ['src/js/app.js'],
				dest: 'www/app.js'
			},
		},

		sass: {
			release: {
				files: {
					src: ['src/scss/**/*.scss'],
					dest: 'www/main.css'
				},
				options : {
					compass : true,
					debugInfo :true
				}
			},
			debug: {
				files: {
					src: ['src/scss/**/*.scss'],
					dest: 'www/main.css'
				},
				options : {
					compass : true,
					debugInfo :true,
				}
			}
		},

		jade : {
			release: { 
				options: {
					data: {
						debug: true,
						xml : libxmljs.parseXml(xml),
						_ : require('underscore')
					}
				},
				files: {
					"www/index.html": "src/jade/index.jade"
				}
			}
		},

		uglify: {
		 	// Create release JS from script tags and browserified JS bundle
		 	release: {
		 		// mangle: true,
		 		options: {
		  			beautify: false,
		  			compress: false,
		  			mangle: true
		  		},
		  		files: {
		  			'www/app.js': 'www/app.js'
		 		}
		  	}
		}

	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('build', ['browserify', 'sass', 'jade', 'uglify' ]);

};

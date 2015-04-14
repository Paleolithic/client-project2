module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		concat:{
			dist:{
				src:[
					"assets/scripts/dev/vendor/*.js",
					"assets/scripts/dev/lib/*.js",
				],
				dest: "assets/scripts/build/production.js",
			}
		},

		uglify: {
		    build: {
		        src: 'assets/scripts/dev/production.js',
		        dest: 'assets/scripts/build/production.min.js'
		    }
		},

		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'assets/images/dev',
		            src: ['**/*.{png,jpg,gif,svg}'],
		            dest: 'assets/images/build/'
		        }]
		    }
		},

		sass: {
		    dist: {
		        options: {
		            style: 'compressed'
		        },
		        files: {
		            'assets/stylesheets/build/main.css': 'assets/stylesheets/dev/main.scss'
		        }
		    } 
		},

		watch: {
			options: {
		        livereload: true,
		    },
		    scripts: {
		        files: 'assets/scripts/dev/**/*.js',
		        // tasks: ['concat', 'uglify'],
		        options: {
		            spawn: false,
		        },
		    },
		    css: {
			    files: ['assets/stylesheets/dev/*.scss', 'assets/stylesheets/dev/**/*.scss'],
			    tasks: ['sass'],
			    options: {
			        spawn: false,
			    }
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['sass', 'watch']);
	grunt.registerTask('production', ['concat', 'uglify', 'imagemin']);
}
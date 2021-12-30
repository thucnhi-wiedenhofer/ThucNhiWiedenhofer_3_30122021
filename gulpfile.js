const { src, dest , watch, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//images
const imagemin =require('gulp-imagemin');
const webp = require('gulp-webp');


function css( done ){
    //1-identifier le fichier 2- compiler 3- conserver .css

    src('src/scss/style.scss')
        .pipe( sass( ) )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( dest('build/css'))        

    done();
}

function font(done){
    src('src/scss/fontaws.scss')
    .pipe( sass() )
    .pipe( postcss( [ autoprefixer() ] ) )
    .pipe( dest('build/css') )

    done();
}

function norm(done){
    src('src/scss/normalize.scss')
    .pipe( sass() )
    .pipe( postcss( [ autoprefixer() ] ) )
    .pipe( dest('build/css') )

    done();
}

function images() {
   
    return src('src/img/**/*')
    .pipe( imagemin({ optimizationLevel: 3 }))
    .pipe( dest('build/img') );
}

function versionWebp() {
    return src('src/img/**/*.{png,jpg}')
    .pipe( webp())
    .pipe( dest('build/img') )
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*')
}

function icons(){
    return src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(dest('build/webfonts/'));
}

exports.css = css;
exports.font = font;
exports.norm = norm;
exports.dev = dev;
exports.icons = icons;
exports.images = images;
exports.versionWebp = versionWebp;
exports.default = series( images, versionWebp, css, font, norm, dev );
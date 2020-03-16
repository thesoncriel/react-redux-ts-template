/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const _ = require('lodash');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const spritesmith = require('gulp.spritesmith');
const Handlebars = require('handlebars');
const pjson = require('../../package.json');
const settings = require('./settings');

const {
  ROOT_PATH,
  TARGET_PATH,
  SAVE_PATH,
  SASS_FILE_PATH,
  CDN_IMAGE_URL,
  TARGET_PIXEL_RATIO,
} = settings;

const regexImagePathPrefix = /.*\/images\//gi;
const regexActive = /--active/gi;
const regexHover = /--hover/gi;
const regexChecked = /--checked/gi;
const regexReplace = /(--active|--hover|--checked)/gi;
const isRetina = true;

const TARGET_FILES = [
  `${TARGET_PATH}/**/*.png`,
  `!${TARGET_PATH}/**/*@*.png`,
  `!${TARGET_PATH}/**/*.dup`,
  `!${TARGET_PATH}/**/@*.png`,
  `!${TARGET_PATH}/**/@*/*.png`,
];

Handlebars.registerHelper('ifLike', (v1, v2, options) => {
  if (v1.includes(v2)) {
    return options.fn(this);
  }

  return options.inverse(this);
});

function addFields(value) {
  const item = { ...value };
  const {
    source_image, // eslint-disable-line camelcase
    name,
  } = item;

  item.folder = source_image
    .replace(regexImagePathPrefix, '')
    .replace(`/${name}.png`, '');
  item.active = regexActive.test(name);
  item.hover = regexHover.test(name);
  item.checked = regexChecked.test(name);
  item.name = name.replace(regexReplace, '');

  if (!isRetina) {
    if (item.before) {
      item.pos_margin_x = -(item.width / 2);
      item.pos_margin_y = -(item.height / 2);
    }

    return item;
  }

  item.total_width /= TARGET_PIXEL_RATIO;
  item.total_height /= TARGET_PIXEL_RATIO;
  item.offset_x /= TARGET_PIXEL_RATIO;
  item.offset_y /= TARGET_PIXEL_RATIO;
  item.width /= TARGET_PIXEL_RATIO;
  item.height /= TARGET_PIXEL_RATIO;

  if (item.before) {
    item.pos_margin_x = (-1 * item.width) / 2;
    item.pos_margin_y = (-1 * item.height) / 2;
  }

  return item;
}

function filterMobile(item) {
  return item.folder.includes('mobile');
}

function filterElse(item) {
  return !item.folder.includes('mobile');
}

function makeCss(minify = false) {
  const sFileName = minify ? 'sprite.min' : 'sprite';
  const spriteData = gulp.src(TARGET_FILES).pipe(
    spritesmith({
      imgName: 'sprite.png',
      padding: TARGET_PIXEL_RATIO,
      cssName: `${sFileName}.css`,
      cssTemplate: (data) => {
        const aSprites = data.sprites.map(addFields);

        if (minify && aSprites.length > 0) {
          aSprites[0].cdn = true;
          aSprites[0].cdnURL = CDN_IMAGE_URL + aSprites[0].escaped_image;
        } else {
          aSprites[0].cdn = false;
        }

        aSprites[0].version = pjson.version;

        const mData = {
          sprites: aSprites.filter(filterElse),
          mobile: aSprites.filter(filterMobile),
        };
        const template = fs.readFileSync(
          `${ROOT_PATH}/gulp/css-sprite/sprite.css.handlebars`,
          'utf8',
        );
        const compiled = Handlebars.compile(template);

        const ret = compiled(mData);

        return ret;
      },
    }),
  );

  return spriteData;
}

function makeHtml() {
  const spriteData = gulp.src(TARGET_FILES).pipe(
    spritesmith({
      imgName: 'sprite.png',
      padding: TARGET_PIXEL_RATIO,
      cssName: 'sprite-test.html',
      cssTemplate: (data) => {
        const aSprites = data.sprites.map(addFields);

        const mData = {
          sprites: _.groupBy(aSprites, 'folder'),
        };
        const template = fs.readFileSync(
          './gulp/css-sprite/sprite.html.handlebars',
          'utf8',
        );
        const compiled = Handlebars.compile(template);

        const ret = compiled(mData);

        return ret;
      },
    }),
  );

  return spriteData;
}

gulp.task('sprite', () => {
  const spriteData = makeCss();
  return spriteData.pipe(gulp.dest(SAVE_PATH));
});

gulp.task('copy-css-to-sass', () => {
  console.log('copy css to scss...');
  return gulp
    .src(`${ROOT_PATH}/static/sprite/sprite.css`)
    .pipe(concat('sprite.scss'))
    .pipe(replace('sprite.png', '/static/sprite/sprite.png'))
    .pipe(gulp.dest(SASS_FILE_PATH));
});

// TODO: 테스트 해보고 적용하기
gulp.task('sprite-min', () => {
  console.log('css minify making task...');
  return gulp
    .src(`${ROOT_PATH}/static/sprite/sprite.css`)
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(SAVE_PATH));
});

gulp.task('makehtml', () => {
  const spriteData = makeHtml();
  return spriteData.css.pipe(gulp.dest(SAVE_PATH));
});

gulp.task('makesprite', gulp.series(['sprite', 'makehtml']));

// gulp 4.0 업데이트로 아래구문 수행 불가
// gulp.task('makesprite', (cb) => {
//   runSequence(['sprite', 'makehtml'], cb);
// });

exports.sprite = gulp;

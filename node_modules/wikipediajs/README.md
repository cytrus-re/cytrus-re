# wikipediajs

[![Travis build](https://img.shields.io/travis/maximodleon/wikipediajs.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/wikipediajs.svg?style=flat-square)]()
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


Promise-based wikipedia API wrapper

# Table of contents

* [Installation](#installation)
* [Features](#features)
* [Usage](#usage)

# Installation

Install via [npm](https://www.npmjs.com/package/wikipediajs)

```
$ npm install wikipediajs
```

Via a CDN

```html
<script src="https://unpkg.com/wikipediajs/dist/index.umd.min.js" />
```
# Features
* Search wikipedia articles in any language
* Get a random article
* Get feed for Picture of the day, featured article or 'on this day' articles

# Usage

* import module

  ```js
  import wiki from 'wikipediajs'
  ```

  or require

  ```js
   const wiki = require('wikipediajs')
  ```
* Search for article

  ```js
  wiki.search('savanna hawk')
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
  ```

* search for an article in different language

  ```js
  wiki.search('Veulta a san juan', 'es')
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
  ```
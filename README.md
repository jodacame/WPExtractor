# WPExtractor
Wordpress Extractor Info: Module for nodejs

[![NPM](https://nodei.co/npm/wpextractor.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/wpextractor/)


## Installation
```bash
npm install wpextractor --save
```

## Usage
```javascript
var WPExtractor = require("wpextractor");

WPExtractor(URL).then(response => {
    console.log(response);
}).catch(err => {
    console.log("Error",err);
});
```

## Example 
```javascript
var WPExtractor = require("wpextractor");

WPExtractor("https://techcrunch.com").then(response => {
    console.log(response);
    /* OUTPUT
    { theme:
   { name: 'TechCrunch 2017 (Matcha)',
     url: 'https://techcrunch.com',
     description: 'Redesign, recode, re-everything of the TechCrunch website.',
     version: '1.0',
     author:
      { name: 'The hardworking people at TechCrunch',
        url: 'https://techcrunch.com/about' },
     license: '(c) 2017 TechCrunch / AOL;',
     screenshot: 'https://techcrunch.com/wp-content/themes/techcrunch-2017/screenshot.png' },
  version: '4.9.8' }
  */
}).catch(err => {
    console.log("Error",err);
});
```
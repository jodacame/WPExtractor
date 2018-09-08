var WPExtractor = require("./wpextractor");

WPExtractor("https://techcrunch.com").then(response => {
    console.log(response);
}).catch(err => {
    console.log("Error",err);
});
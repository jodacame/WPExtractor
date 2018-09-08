const request = require("request");

var WPExtractor = function(url){
    return new Promise((resolve, reject) => {
        let data = {};
        get(url,function(err,response){
            if (err) {
                reject(err);
            } else {
                let theme = _prepare(response.match(new RegExp('<link.*?href=.*?\/wp-content/themes\/(.*?)\/.*?>', 'i')))
                if (theme){
                    get(url + "/wp-content/themes/" + theme + "/style.css?ver=" + new Date().getTime(), function (errStyle, style) {
                        data.theme = {};
                        //data.theme.name = theme;
                        if(style){
                            
                            let temp = style.split("/*")[1].split("*/")[0].split("\n");
                            let tempKeys = {};
                            temp.forEach( el => {
                                let line = el.split(":");
                                if (line[0])
                                    tempKeys[line[0].toLowerCase().trim().split(" ").join("-")] = el.replace(line[0],"").replace(":","").trim();
                            });
                            
                            if (tempKeys['theme-name']) data.theme['name']          = tempKeys['theme-name'];
                            if (tempKeys['theme-uri'])  data.theme['url']           = tempKeys['theme-uri'];
                            if (tempKeys['description'])data.theme['description']   = tempKeys['description'];
                            if (tempKeys['version'])    data.theme['version']       = tempKeys['version'];
                            data.theme['author']        = {};
                            if (tempKeys['author'])     data.theme['author']['name']= tempKeys['author'];
                            if (tempKeys['author-uri']) data.theme['author']['url'] = tempKeys['author-uri'];
                            if (tempKeys['copyright'])  data.theme['copyright']     = tempKeys['copyright'];
                            if (tempKeys['license'])    data.theme['license']       = tempKeys['license'];
                            data.theme['screenshot']    = url + "/wp-content/themes/" + theme + "/screenshot.png";
                        }                        
                        let generator = _prepare(response.match(new RegExp('<meta.*?name="generator".*?content="(.*?)".*?>|<meta.*?content="(.*?)".*?name="generator".*?>', 'i')))
                        if (generator) {
                            data.version = generator.toLowerCase().replace("wordpress ", "");
                        }
                        resolve(data);
                    });
                }else{
                    reject('Wordpress not found');
                }
                
            }
        });
    });
}
var get = function(url,callback){
    request.get({
        url: url,
        followAllRedirects: true,
        headers: { 'User-Agent': 'WPExtractor/Generic (GMeta; https://www.npmjs.com/package/wpextractor)' }
    }, (err, res, response) => {
        if (err) {
            callback(err,false)
        }else{
            callback(false,response)
        }
    });
}
var _prepare = function (data) {
    return data ? data[1] : false;
}

module.exports = WPExtractor;
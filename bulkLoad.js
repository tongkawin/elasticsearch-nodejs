var client = require('./connection.js');
var articlesJson = require("./articles.json");
var bulkArticlesArray = [];

var makeBulkArray = function (articles, callback) {
    for (var current in articles) {
        bulkArticlesArray.push(
            { index: { _index: 'search-articles', _type: 'articles', _id: articles[current].ID } },
            {
                "ID" : articles[current].ID,
                "Title": articles[current]["Title"],
                "Meta Description": articles[current]["Meta Description"],
                "Meta Keywords": articles[current]["Meta Keywords"],
                "Categories": articles[current]["Categories"],
                "Tags": articles[current]["Tags"],
                "Status": articles[current]["Status"]
            }
        );
    }
    callback(bulkArticlesArray);
}

var indexArticlesBulk = function (bulkArr, callback) {
    client.bulk({
        maxRetries: 5,
        index: 'search-articles',
        type: 'articles',
        body: bulkArr
    }, function (err, resp, status) {
        if (err) {
            console.log(err);
        }
        else {
            callback(resp.items);
        }
    })
}

makeBulkArray(articlesJson, function (response) {
    console.log('Bulk Articles: \n');
    console.log(JSON.stringify(response, null, 2));

    indexArticlesBulk(response, function (response) {
        console.log(response);
    })
});
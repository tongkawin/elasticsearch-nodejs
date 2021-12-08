var client = require('./connection.js');
var DataJson = require("./data.json");
var bulkDataArray = [];

var makeBulkArray = function (data, callback) {
    
    for (var current in data) {
        bulkDataArray.push(
            { index: { _index: 'search-data', _type: 'data', _id: data[current]._id} },
            {
                "Index" : data[current]["_index"],
                "Type": data[current]["_type"],
                "ID": data[current]._id,
                "Version": data[current]["_version"],
                "Score": data[current]._score,
                "RequestUid": data[current]._source["requestUid"],
                "Source": data[current]["_source"],
                "Fields": data[current]["fields"],
                "Sort": data[current]["sort"] 
            }
        );
    }
    callback(bulkDataArray);
}

var indexDataBulk = function (bulkArr, callback) {
    client.bulk({
        maxRetries: 5,
        index: 'search-data',
        type: 'data',
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

makeBulkArray(DataJson, function (response) {
    console.log('Bulk Data: \n');
    console.log(JSON.stringify(response, null, 2));

    indexDataBulk(response, function (response) {
        console.log(response);
    })
});
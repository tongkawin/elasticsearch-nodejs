# elasticsearch-nodejs

Setup
---
* Download Elasticsearh from https://www.elastic.co/downloads/elasticsearch
* Run elasticsearch file in ../elasticsearch-x.x.x/bin
* Run
```
npm install
node connection.js
node health.js
node createIndex.js
node bulkLoad.js
```

File detail
---
`connection.js` for check elasticseach connection.

`health.js` for check elasticseach status.

`createIndex.js` for create data to Elasticsearch Client.

`bulkLoad.js` for load data to Elasticseach Client.

`data.json` is data for seaching.

`app.js` for add route that can be reached at ```http://localhost:3000/search-requestUid/:requestUid``` where `:requestUid` is replaced by searching term like `http://localhost:3000/search-requestUid/:requestUid`  

`../public/js/index.js` is backend script.

`../public/index.html` is frontend.

Running the project
---
```
node app.js
``` 
* Go to http://localhost:3000/

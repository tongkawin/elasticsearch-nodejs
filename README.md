# elasticsearch-nodejs

Setup (for macos)
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

If you have to update data you can run ```node bulkLoad.js```

File detail
---
`connection.js` for check elasticseach connection.

`health.js` for check elasticseach status.

`createIndex.js` for create data to Elasticsearch Client.

`bulkLoad.js` for load data to Elasticseach Client.

`data.json` is data for seaching.

`app.js` for add route that can be reached at ```http://localhost:3000/search-requestUid/:requestUid``` where `:requestUid` is replaced by searching term like `http://localhost:3000/search-requestUid/xxx`  

<img width="1440" alt="Screen Shot 2021-12-09 at 11 00 16 AM" src="https://user-images.githubusercontent.com/69962474/145332281-d1663e67-9be5-432a-936e-5c15df0edfcf.png">

`../public/js/index.js` is backend script.

`../public/index.html` is frontend.

Running the project
---
```
node app.js
``` 
* Go to http://localhost:3000/

<img width="1440" alt="Screen Shot 2021-12-09 at 10 59 36 AM" src="https://user-images.githubusercontent.com/69962474/145332315-ad04511a-f73d-4f8b-a0c4-9c7f84721a02.png">


var client = require('./connection.js');

client.indices.create({  
  index: 'articles'
},function(err,resp,status) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("Create index response: ",resp);
  }
});
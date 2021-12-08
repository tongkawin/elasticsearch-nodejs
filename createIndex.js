var client = require('./connection.js');

client.indices.create({  
  index: 'data'
},function(err,resp,status) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("Create index response: ",resp);
  }
});
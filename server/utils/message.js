var moment = require('moment');

var generateMessage=function(from,text){
return{
    from :from,
    text :text,
    createdAt:moment().valueOf()
    };
};

var generateLocation = function (from,lat,lan) {
  return{
      from:from,
      url:'https://www.google.com/maps?q='+lat+','+lan,
      createdAt:moment().valueOf()
  }
};
module.exports={
    generateMessage : generateMessage,
    generateLocation : generateLocation
};
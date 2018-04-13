var generateMessage=function(from,text){
return{
    from :from,
    text :text,
    createdAt:new Date().getTime()
    };
};

var generateLocation = function (from,lat,lan) {
  return{
      from:from,
      url:'https://www.google.com/maps?q='+lat+','+lan,
      createdAt:new Date().getTime()
  }
};
module.exports={
    generateMessage : generateMessage,
    generateLocation : generateLocation
};
var expect = require('expect');

var msg = require('./message');


describe('generateMessage',function () {
    it('should generate correct message object',function(){
            var from ="Arslan";
            var text="hey Arslan";
            var message = msg.generateMessage(from,text);

            expect(message.createdAt).toBeA('number');
            expect(message).toInclude({from,text});
    });
});

describe('generateLocation',function () {
    it('should generate Location right',function () {
       var from = "DEB";
       var lat =15;
       var lan = 19;
       var url = 'https://www.google.com/maps?q=15,19';
       var message = msg.generateLocation(from,lat,lan);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});
    });
});
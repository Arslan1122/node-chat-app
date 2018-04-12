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
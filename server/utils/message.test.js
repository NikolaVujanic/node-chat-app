var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Vuja';
        var text = 'Some message text!';
        var message = generateMessage(from, text);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toHaveProperty('from', 'Vuja');
        expect(message).toHaveProperty('text', 'Some message text!');
    });
});
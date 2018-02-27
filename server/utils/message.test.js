var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Vuja';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, latitude, longitude);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toHaveProperty('from', 'Vuja');
        expect(message).toHaveProperty('url', 'https://www.google.com/maps?q=15,19');
    });
});
var expect = require('expect');

var {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Vuja',
                room: 'BE Devs'
            },
            {
                id: '2',
                name: 'Boba',
                room: 'FE Devs'
            },
            {
                id: '3',
                name: 'Arez',
                room: 'BE Devs'
            }
        ];
    });

    it('should add new user', () => {
        var usersArr = new Users();
        var user = {
            id: 123,
            name: 'Vuja',
            room: 'BE Devs'
        }
        var resUser = usersArr.addUser(user.id, user.name, user.room);

        expect(usersArr.users).toEqual([resUser]);
    });

    it('should remove user', () => {
        var userId = '3';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = '55';
        var user = users.removeUser(userId);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '1';
        var resUser = users.getUser(userId);

        expect(resUser.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '55';
        var resUser = users.getUser(userId);

        expect(resUser).toBeUndefined();
    });

    it('should return names for BE Devs', () => {
        var userList = users.getUserList('BE Devs');

        expect(userList).toEqual(['Vuja', 'Arez']);
    });

    it('should return names for FE Devs', () => {
        var userList = users.getUserList('FE Devs');

        expect(userList).toEqual(['Boba']);
    });
});
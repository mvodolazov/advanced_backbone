define(function (require) {
    'use strict';

    var _uniqueId = require('lodash/utility/uniqueId'),
        _map = require('lodash/collection/map');

    return {
        generateContacts: generateContacts
    };

    function generateContacts() {
        var names = ['John', 'Oleg', 'Jack', 'Petr', 'Ivan', 'Sergey', 'Vitaliy', 'Svetlana'];
        var groups = ['Job', 'Family', 'Friends'];

        var counter = 0;
        return _map(names, name => {
            return {
                id: _uniqueId(),
                name: name,
                phone: Math.random().toString().substring(2, 12),
                group: groups[counter++ % groups.length]
            }
        });
    }
});
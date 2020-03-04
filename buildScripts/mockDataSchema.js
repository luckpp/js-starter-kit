const schema = {
    'type': 'object',
    'properties': {
        'users': {
            'type': 'array',
            'minItems': 3,
            'maxItems': 5,
            'items': {
                'type': 'object',
                'properties': {
                    'id': {
                        'type': 'number',
                        'unique': true,
                        'minimum': 1
                    },
                    'firstName': {
                        'type': 'string',
                        'chance': 'first'
                    },
                    'lastName': {
                        'type': 'string',
                        'chance': 'last'
                    },
                    'email': {
                        'type': 'string',
                        'chance': 'email'
                    }
                },
                'required': ['id', 'firstName', 'lastName', 'email']
            }
        }
    },
    'required': ['users']
};

module.exports.schema = schema;

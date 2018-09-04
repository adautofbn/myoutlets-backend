const swagger = require('swagger-jsdoc');

const swaggerDef = {
    'basePath': '/',
    'host': 'localhost:3000',
    'info': {
        'description': 'Virtual store with multiple clothing suppliers',
        'title': 'MyOutle`s',
        'version': '1.0.0'
    },
    'paths': {
        '/produto': {
            'get': {
                'summary': 'All products in store',
                'tags': {'': 'produto'},
                'description': 'Returns a list of all products posted in the store',
                'responses': {
                    '200': {
                        'description': 'A JSON array of all products',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'array',
                                    'items': {
                                        'type': 'application/json'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

const options = {
    'apis': ['../routes/**/*.js'],
    'swaggerDefinition': swaggerDef
};

const swaggerSpec = swagger(options);

module.exports = swaggerSpec;
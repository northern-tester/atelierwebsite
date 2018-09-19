'use strict';

exports.getConfig = {
    'db': {
        'address': `mongodb://${process.env.DBADDRESS || 'mongo'}`,
    },
    'feature-toggles': {
        'atelierState': 'pre'
    },
    'recaptcha_example': {
        "secret" : "secret",
        "public": "secret"
    },
    'slack_example': {
        "webhookuri": "webhookuri",
        "channel": "#channel",
        "username": "username"
    }
}
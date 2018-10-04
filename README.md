# Presale Mangement

> Presale, inventory, and order management system

## Build & Setup

From both the __*cc_client*__ and __*mgmt_client*__ directories:

#### client dependencies
``` 
npm install
``` 
 
#### server dependencies

From the __*server*__ directory:

```
npm install
 ```

#### build for production
```
npm run build
```

#### set environment variables

variable | description
--------- | -------
MONGO_URL | your mongodb url
SESSION_SECRET | your session secret
USER_CREATE_AUTH | authorization for creating users
CRYPT_SECRET | string used to encrypt and decrypt sensitive data
AUTO_EMAIL | email used to send confirmation messages
AUTO_PASS | password for AUTO_EMAIL account

These can also be exported from a config.json file in the root directory.

```
{
    MONGO_URL:      'your_mongodb_url',
    SESSION_SECRET: 'your_session_secret',
    .
    .
    .
}
```

## Run
#### nodemon

To install:
``` 
npm i -g nodemon
```

To run (from the server directory):
```
nodemon
``` 
 
#### node
From the __*server*__ directory:
``` 
npm run start
```

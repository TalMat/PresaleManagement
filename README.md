# Presale Mangement

> Presale, inventory, and order management system

## Build & Setup

From both __*cc_client*__ and __*mgmt_client*__ directories:

#### install dependencies
``` 
npm install
``` 
 
#### build for production with minification or...
``` 
npm run build
``` 
 
#### build for production and view the bundle analyzer report
``` 
npm run build --report
```

#### install server dependencies

From the server directory:

``` 
npm install
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
From the server directory:
``` 
node ./bin/www
```

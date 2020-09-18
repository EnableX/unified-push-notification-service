# EnableX real time video communication using Firebase Cloud Messaging for Web

This project will enable you to do EnableX real time video communication using Firebase Cloud Messaging for Web

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.17.0

    $ npm --version
    6.14.4

---

## Prerequisite

### Setup EnableX video calling application

      $ npm install -g http-server
      $ git clone https://github.com/EnableX/One-to-One-Video-Sample-Web-Application
      $ cd One-to-One-Video-Sample-Web-Application

### TLS/SSL
- First, you need to make sure that openssl is installed correctly, and you have `key.pem` and `cert.pem` files. You can generate them using this command:

      $ openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

- This generates a cert-key pair. Then you need to run the server with -S for enabling SSL and -C for your certificate file.

      $ http-server -S -C cert.pem

## Install
- Switch out of the `One-to-One-Video-Sample-Web-Application` directory -

      $ cd ..

- Setup this project -

      $ git clone https://github.com/EnableX/unified-push-notification-service.git
      $ cd unified-push-notification-service
      $ npm install

## Configure app (Backend)

Copy `example.env` as `.env` and then edit it with your settings.

- Create an `EnableX` Free Trial account on https://portal.enablex.io/
- Create a project to get your `APP ID` & `APP Key` & update `ENABLEX_APP_ID` & `ENABLEX_APP_KEY`
- Alternatively, You can set env variable as followed -

      $ export ENABLEX_APP_ID=
      $ export ENABLEX_APP_KEY=

- Either set mongo database connection string as `MONGO_CONN_STRING` -

      $ export MONGO_CONN_STRING=

- OR set your mongo database connection string as `MONGO_HOST`, `MONGO_PORT`, `MONGO_DB`, `MONGO_USER` & `MONGO_PASSWORD` -

      $ export MONGO_HOST=
      $ export MONGO_PORT=
      $ export MONGO_DB=
      $ export MONGO_USER=
      $ export MONGO_PASSWORD=

- Set your EnableX video calling application URL, generated after running `http-server -S -C cert.pem` -

      $ export ENABLX_VIDEO_WEBAPP=

- Open `public`/`users.html` file and set the same value of `ENABLX_VIDEO_WEBAPP`

- Create a `Firebase` project on https://console.firebase.google.com/ > Go to your Dashboard > Click on the “gear” icon and access “project settings”.
- Find `Server Key` and update `FIREBASE_SERVER_KEY`.
- Alternatively, you can also set env variable as followed -

      $ export FIREBASE_SERVER_KEY=

## Configure app (Frontend)

Update following files to Initialise the Firebase app in the service worker by passing in your app's Firebase config object `FIREBASE_CONFIG_OBJECT`. You can find it on https://console.firebase.google.com/ > go to your Dashboard, Click on the “gear” icon and access `Project settings` > `General` > `Your apps` > `Firebase SDK snippet` > `firebaseConfig`.

- Open `public`/`index.html` file and set the value of `FIREBASE_CONFIG_OBJECT`
- Open `public`/`firebase-messaging-sw.js` file and set the value `FIREBASE_CONFIG_OBJECT`


## Running the project

    $ npm start

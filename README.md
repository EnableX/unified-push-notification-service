# EnableX real time video communication with web push notification

This project will give enable you to do EnableX real time video communication with web push notification

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
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install

## Configure app

Copy `example.env` as `.env` and then edit it with your settings. You will need:

- Create an `EnableX` Free Trial account on https://portal.enablex.io/ and create a project to get your APP ID & APP Key & update in .env file or set env variable as followed
	$ export ENABLEX_APP_ID=
	$ export ENABLEX_APP_KEY=
- Create a `Firebase` project on https://console.firebase.google.com/ and go to your Dashboard, Click on the “gear” icon and access “project settings”. Find `Server Key`
	$ export FIREBASE_SERVER_KEY=
- Mongo database connection string
- Git clone https://github.com/EnableX/One-to-One-Video-Sample-Web-Application and run it as independent service on https using https://www.npmjs.com/package/http-server or any other tool and set to ENABLX_VIDEO_WEBAPP in `.env`

## Running the project

    $ npm start

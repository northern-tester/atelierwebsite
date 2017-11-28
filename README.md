# Atelier Website

> The Leeds Testing Atelier needs a website, and this might be it. Web development is for the clinically insane...

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm version required - 3.10.X and above
node version required - v6.9.X and above
Clone this mutha down, cd into atelier website and npm install
In order for the Slack Call for Papers to work, please add config into config/slack_example.json and rename to slack.json, ask the authorities (mainly me :) ) for the Testing Atelier webhook, channel and user details.

```

## Usage

```
npm start - will start the application on port 3000 - navigate to http://localhost:3000
env PORT={port_number} npm start will start on http://localhost:{port_number}

```

## Docker

To build in the root dir, run the following:

```
docker build --rm -f Dockerfile .
```

To run:

```
docker run --rm -d -p 5000:3000 atelierwebsite
```
*Where 5000 is the host port and 3000 is the exposed port in the container


## Contribute

PRs accepted.

## License

MIT © Leeds Testing Atelier
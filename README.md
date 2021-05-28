# MRS Leaderboard

This little one-pager will let you scan and save scores into your device localstorage, using the camera API to scan QR Codes. The purpose is to let visitors "collect" their score on differents waypoints and save them.

![](https://img.shields.io/github/license/clawfire/mrs-leaderboard)
[![Netlify Status](https://api.netlify.com/api/v1/badges/d60a4f11-0049-4cb4-af50-72753b294f74/deploy-status)](https://app.netlify.com/sites/mrs-leaderboard/deploys)


## Features

- Scan a specially formatted QR Code (see below) to save the score on the device
- Sum the different waypoints score and gives the total
- Once you have 50% of total collectable, you unlock a prize (visual feedback to the user)
- Configurable max points collectable
- Works on Android & iOS (and your regular computer)

## Installation

1. Clone the repository
2. `yarn install` or `npm install` to install the devDependencies
3. `yarn run buil` if you want to build it, or `yarn run dev` if you're working on the project

## Usage

### Configure max score

Locate `const max = parseInt(25000);` in `index.js` and change the number (here 25k) by the max a user will be able to collect.

### Format the QR Code
You need to follow this format : `[id];[score]`.
If you want to store 10k points on the first waypoint, it will be `g1;10000` then. Just generate a qrcode with this values.



### Define the waypoints

In order to make the application work gracefully, you need to initialise de waypoints with the following object found at the first lines of `index.js` :
```json
const defaultScore = [{
        id: "g1",
        name: "Les Langues Européenes",
        points: 0
    },
    {
        id: "g2",
        name: "La géographie",
        points: 0
    },
    {
        id: "g3",
        name: "Les Monnaies",
        points: 0
    },
    {
        id: "g4",
        name: "La géographie",
        points: 0
    }
];
```

You can see you need to edit waypoint object like this :
- `id` will be the key used for the QR Code
- `name` is how you want the waypoint to appears in the app
- `points` is the default points (here 0)

## Support
Well you can always [open an Issue](/issues/new) but there's no specific support planned for this project.

## License
This project is release under the [Do No Harm License - Draft](/LICENSE.md)

## Project Status
This project is staled and under no active developpemnt.

## Contributing
Feel free to contribute sending PR.
I am using [parcelJS](http://parceljs.org) for building.

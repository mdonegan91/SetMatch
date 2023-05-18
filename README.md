# 🎬 SetMatch 🎬

### _A React web application built with Firebase that helps film crews track their equipment and assets on set. Easily manage and monitor the inventory of all your gear, from cameras and lights to props and costumes_

#### By _Molly Donegan_

## Description
SetMatch uses the NoSQL cloud-hosted database Firebase for user authentication and holding user data and information about assets on set. Users have the ability to create accounts and create, read, update & delete and filter asset information.

#### 🎥 [Deployed Site](https://6466664f05d69637ea7bf1c0--setmatch.netlify.app/set/1923){:target="_blank" rel="noopener"}
#### ⭐[Technologies Used](#technologies-used)
#### 📺 [Mockups](#mockups)
#### 🎞 [Setup / Installation](#setup-and-installation)
#### 📽️ [Known Bugs](#known-bugs)
#### 📼 [License](#license) 

## Technologies Used
* React
* Firebase / Realtime Database
* JavaScript / JSX
* HTML / CSS
* Webpack

## Mockups

![mockup](/mockup1.png)
![mockup](/mockup2.png)

## Component Diagram
```
Router.js
├── SetPicker.js
├── App.js
│   ├── Header.js
│   ├── Asset.js   
│   ├── Footer.js   
│   ├── Filter.js   
│   ├── Inventory.js   
│   │   ├── Login.js
│   │   ├── AddAssetForm.js
│   │   ├── EditAssetForm.js
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup and Installation

1. Clone this project to your local machine by using the following command:
```
git clone https://github.com/mdonegan91/SetMatch
```
2. Open the `set-match` directory within your CLI.
3. Install all Node packages and dependencies with the command `npm install`.
4. Package and open the project in your browser using `npm run start`.
5. Enjoy!

## Known Bugs
#### Works in progress:
* Filter functionality

### License

* [MIT](https://github.com/mdonegan91/SetMatch/blob/main/LICENSE)

Copyright (c) 2023 _Molly Donegan_

## Contact Information
[mollyrdonegan@gmail.com](mailto:mollyrdonegan@gmail.com)
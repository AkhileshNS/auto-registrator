# How to use

Before you can use this software make sure you have [Node](https://nodejs.org/en/) installed. After that, clone this repo, open a powershell or cmd window in the project folder and execute

`npm i`

After that, setup the project by going into the ./app/constants.js folder and filling out the fields where necessary. Ex:

```javascript
module.exports = {
  Akhilesh: {
    port: 9001,
    name: "Akhilesh",
    usn: "[YOUR USN]",
    password: "[YOUR PASSWORD]",
    branch: "MAT",
    option: 1
  }
}
```

Finally go into package.json and replace Username with whatever name you used:-

```javascript
{
  ...
  "scripts": {
    ...
    "Akhilesh": "node ./app/main",
    "main": "npm-run-all --parallel Akhilesh"
    ...
  }
  ...
}
```

Now just go back to your command prompt or powershell, and just type

`npm run [YOUR USERNAME]`

or

`npm run main`

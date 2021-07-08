# Contest-Watcher
A one stop solution for checking and notifying you about all the upcoming contests in the next day.

### What it does?
It fetches all the upcoming contest details from the clist.by api and sends you chrome notifications when the contest starts. It fetches details of contest day by day. currently the time is in IST only.

### Screenshots

### Demo

### Run the backend
```
cd backend
npm install
npm run start
```

### Add extension to chrome
* Open extensions tab in Chrome, turn developer mode on
* Select `LOAD UNPACKED`, then select the extension folder in dialog box
* Good to go

### Why backend server was needed?
* The backend server was needed because of the CORS, you need to make a fetch request from a server to fetch data from clist.by webisite, you can't make a request from frontend directly it sends you an error so i need to create a server and it is running on a [repl](https://replit.com/@jainaayush01/clist-contests#index.js). 

## 📝 Licence

GNU General Public License Version 3

## 🥳 Contributing

If you find any bug, or wish to add more features feel free to contribute to the project

## 👻 Author

Aayush Jain 
Connect with me here: [Twitter](https://twitter.com/jainaayush01) [GitHub](https://github.com/jainaayush01) [Linkedin](https://linkedin.com/in/jainaayush01)
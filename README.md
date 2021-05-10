# 🎥 Youtube API V3 (Wrapper)

__🔭 A easy to use wrapper around the Youtube Data API which is class based and asynchronous.__

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

☑ Installation:
```
npm install youtube-v3-api 
```

🛒 Sample code snippet:
```JS
const YoutubeAPI = require("../src/index");

// ⚠ Subject to changes
// Find your YOUTUBE API KEY => https://developers.google.com/youtube/v3/docs
const youtube = new YoutubeAPI("YOUTUBE API KEY");

// YoutubeAPI#getVideosByMostPopular(maxResults, params)
youtube.getVideosByMostPopular(10, { regionCode: "US" })
    .then(resp => {
        // Code...
    }).catch(err => {
        // Code...
    })
```

### 📣 Documentation
Refer to the offical Youtube API documentation: https://developers.google.com/youtube/v3/doc

### ✅ Todo:
- Typescript support
- Documentation
- Youtube Oauth

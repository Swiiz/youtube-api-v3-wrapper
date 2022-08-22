# 🎥 Youtube API V3 (Wrapper)

🔭 An easy to use wrapper around the Youtube Data API which is class based and asynchronous.

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

☑ Installation:
```
npm install youtube-api-v3-wrapper
```

🛒 Sample code snippet:
```JS
const { YoutubeAPIClient } = require("youtube-api-v3-wrapper");

// ⚠ Subject to changes
// Find your YOUTUBE API KEY => https://developers.google.com/youtube/v3/docs
const youtube = new YoutubeAPIClient("key", "YOUTUBE API KEY");

// YoutubeAPI#getVideosByMostPopular(maxResults, params)
youtube.getVideosByMostPopular(10, { regionCode: "US" })
    .then(resp => {
        // Code...
    }).catch(err => {
        // Code...
    })
```

### 📣 Documentation
Refer to the offical Youtube API documentation: https://developers.google.com/youtube/v3/docs

### ✅ Todo:
- Documentation
- Add more functions

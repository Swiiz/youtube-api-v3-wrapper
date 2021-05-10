const { YoutubeAPIClient, GoogleOAuth2 } = require("../index");

youtube = new YoutubeAPIClient("key", "KEY");

youtube.searchVideos("image john lennon", 10).then(console.log).catch(console.log);
const { YoutubeAPIClient, GoogleOAuth2 } = require("../index");

youtube = new YoutubeAPIClient("key", "KEY");

(async () => {
    const r = await youtube.searchVideos("image john lennon", 10)
    console.log(r.items)
})();
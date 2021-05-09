const YoutubeAPI = require("../src/index");

const youtube = new YoutubeAPI("AIzaSyBTz-8TtHpTlpnMsb2UFUsvzLRNk0fdhd8");

youtube.getVideosByMostPopular(10, {regionCode: "US"}).then(console.log).catch(err => {
    console.log(err);
})
//youtube.getChannelByUsername("orelsan", 10, {regionCode: "US"}).then(console.log).catch(console.err)
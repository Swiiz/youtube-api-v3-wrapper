/**
 * Made by Swiiz
 */

//TODO Update & Insert (Channels, Playlists, Videos)
//TODO Comments * https://developers.google.com/youtube/v3/docs/comments

const https = require('https');

const API_URL = "https://www.googleapis.com/youtube/v3/";

module.exports = class YoutubeAPI {
    //TODO add other ways of auth
    constructor(key) {
        this.key = key;
        this.oauth = false;
    }

    async searchAll(q, maxResults, params) {
        return getJSON(`${API_URL}search`,
            {
                key: this.key,
                part: "snippet",
                maxResults,
                q,
                ...params
            })
    }

    async searchVideos(q, maxResults, params) {
        return this.searchAll(q, maxResults, {
            type: "video", ...params
        })
    }

    async searchPlaylists(q, maxResults, params) {
        return this.searchAll(q, maxResults, {
            type: "playlist", ...params
        })
    }

    async searchChannels(q, maxResults, params) {
        return this.searchAll(q, maxResults, {
            type: "channel", ...params
        })
    }

    async #getChannels(maxResults, params) {
        return getJSON(`${API_URL}channels`,
            {
                key: this.key,
                part: "snippet",
                maxResults,
                ...params
            })
    }

    async getChannelsByUsername(username, maxResults, params) {
        return this.#getChannels(maxResults, {
            forUsername: username, ...params
        })
    }

    async getChannelById(id, params) {
        return this.#getChannels(params.maxResults || 1, {
            id, ...params
        })
    }

    async getOwnedChannels(maxResults, params) {
        return this.oauth ? this.#getChannels(maxResults, {
            mine: true, ...params
        }) : Promise.reject(new NotProperlyAuthorizedError("oauth"));
    }

    async #getVideos(maxResults, params) {
        return getJSON(`${API_URL}videos`,
            {
                key: this.key,
                part: "snippet",
                maxResults,
                ...params
            })
    }

    async getVideoById(id, params) {
        return this.#getVideos(params.maxResults || 1, {
            id, ...params
        })
    }

    async getVideosByMostPopular(maxResults, params) {
        return this.#getVideos(maxResults, {
            chart: "mostPopular", ...params
        })
    }

    async getVideosByMyRating(maxResults, myRating, params) {
        return this.oauth ? this.#getVideos(maxResults, {
            myRating, ...params
        }) : Promise.reject(new NotProperlyAuthorizedError("oauth"));
    }

    async #getPlaylists(maxResults, params) {
        return getJSON(`${API_URL}playlists`,
            {
                key: this.key,
                part: "snippet",
                maxResults,
                ...params
            })
    }

    async getVideoByChannelId(channelId, maxResults, params) {
        return this.#getVideos(params.maxResults, {
            channelId, ...params
        })
    }

    async getPlaylistById(id, params) {
        return this.#getPlaylists(params.maxResults || 1, {
            id, ...params
        })
    }

    async getOwnedPlaylists(maxResults, params) {
        return this.oauth ? this.#getPlaylists(maxResults, {
            mine: true, ...params
        }) : Promise.reject(new NotProperlyAuthorizedError("oauth"));
    }
}

function getJSON(url, params) {
    return new Promise((resolve, reject) => {
        https.get(url + (url.includes("?") ? "&" : "?") + serializeIntoURIParams(params), (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            resp.on("end", () => {
                try {
                    const r = JSON.parse(data);
                    resolve(r)
                }catch (err) {
                    reject(err);
                }
            });
        }).on("error", (err) => {
            reject(err);
        });
    })
}

function serializeIntoURIParams(params) {
    let str = "";
    for (const key in params) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(params[key]);
    }
    return str;
}

class NotProperlyAuthorizedError extends Error {
    constructor(goodAuthType) {
        super(`You must use ${goodAuthType} authorization type to use this method!`);
    }
}
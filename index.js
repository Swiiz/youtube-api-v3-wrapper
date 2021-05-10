/**
 * Made by Swiiz
 */

//TODO Update & Insert (Channels, Playlists, Videos)
//TODO Comments * https://developers.google.com/youtube/v3/docs/comments

const https = require('https');

const API_URL = "https://www.googleapis.com/youtube/v3/";
const GGA_OAUTH2_URL = "https://accounts.google.com/o/oauth2/v2/"
const API_OAUTH2_URL = "https://oauth2.googleapis.com/";

class GoogleOAuth2 {
    constructor(clientId, clientSecret, redirectURI) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectURI = redirectURI;
    }

    // For scopes see: https://developers.google.com/identity/protocols/oauth2/scopes
    getOauth2Link(scope, access_type = "offline", response_type = "code", params) {
        return makeUrl(`${GGA_OAUTH2_URL}auth`,
            {
                client_id: this.clientId,
                redirect_uri: this.redirectURI,
                scope,
                access_type,
                response_type,
                ...params
            });
    }

    async #getToken(params) {
        return getJSON(`${API_OAUTH2_URL}token`,
            {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectURI,
                ...params
            });
    }

    async getTokenFromCode(code, params) {
        return this.#getToken({
            code,
            grant_type: "authorization_code",
            ...params
        });
    }

    async refreshToken(refresh_token, params) {
        return this.#getToken({
            refresh_token,
            grant_type: "refresh_token",
            ...params
        });
    }

    async revokeToken(token) {
        return getJSON(`${API_OAUTH2_URL}revoke`, { token });
    }

}

class YoutubeAPIClient {
    // authType can be either "key" or "oauth2", key is either the api key or the oauth2 token
    constructor(authType, key) {
        if(authType !== "key" && authType !== "oauth2") return; // TODO ERROR
        this.authParam = authType === "key" ? { key } : {access_token: key};
        this.useOauth2 = authType === "oauth2";
    }

    async searchAll(q, maxResults, params) {
        return getJSON(`${API_URL}search`,
            {
                ...this.authParam,
                part: "snippet",
                maxResults,
                q,
                ...params
            });
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
                ...this.authParam,
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
        return this.useOauth2 ? this.#getChannels(maxResults, {
            mine: true, ...params
        }) : Promise.reject(new NotProperlyAuthorizedError("oauth"));
    }

    async #getVideos(maxResults, params) {
        return getJSON(`${API_URL}videos`,
            {
                ...this.authParam,
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

    async getVideosByMyRating(myRating, maxResults, params) {
        return this.useOauth2 ? this.#getVideos(maxResults, {
            myRating, ...params
        }) : Promise.reject(new NotProperlyAuthorizedError("oauth"));
    }

    async #getPlaylists(maxResults, params) {
        return getJSON(`${API_URL}playlists`,
            {
                ...this.authParam,
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
        return this.useOauth2 ? this.#getPlaylists(maxResults, {
            mine: true, ...params
        }) : Promise.reject(new NotProperlyAuthorizedError("oauth"));
    }
}

function getJSON(url, params) {
    return new Promise((resolve, reject) => {
        https.get(makeUrl(url, params), (resp) => {
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

function makeUrl(url, params) {
    return url + (url.includes("?") ? "&" : "?") + serializeIntoURIParams(params);
}

function serializeIntoURIParams(params) {
    let str = "";
    for (const key in params) {
        if (str !== "") {
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

module.exports = {
    GoogleOAuth2,
    YoutubeAPIClient,
    NotProperlyAuthorizedError,
}
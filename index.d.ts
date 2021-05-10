export namespace YTAPI {
    export type regionCode = string;
    export type datetime = string;
    export type etag = string;

    export type ItemBase = {
        "kind": string,
        "etag": etag
    }

    export type ResponseBase = ItemBase & {
        "regionCode": regionCode
    }
    export type ListResponseBase = ItemBase & {
        "nextPageToken"?: string,
        "prevPageToken"?: string,
        "pageInfo": {
            "totalResults": number,
            "resultsPerPage": number
        }
    }

    type SearchResourceBase = ItemBase & {
        "id": {
            "kind": string,
        },
        "snippet": {
            "publishedAt": datetime,
            "channelId": string,
            "title": string,
            "description": string,
            "thumbnails": {
                (key: string): {
                    "url": string,
                    "width": number,
                    "height": number
                }
            },
            "channelTitle": string,
            "liveBroadcastContent": string
        }
    }
    type SearchResponseBase = ListResponseBase;
    export type VideoSearchResource = SearchResourceBase & { "id": { "videoId": string } }
    export type PlaylistSearchResource = SearchResourceBase & { "id": { "playlistId": string } }
    export type ChannelSearchResource = SearchResourceBase & { "id": { "channelId": string } }
    export type SearchResponse = SearchResponseBase & { "items"?: VideoSearchResource[] | PlaylistSearchResource[] | ChannelSearchResource[] }
    export type VideoSearchResponse = SearchResponseBase & { "items"?: VideoSearchResource[] }
    export type PlaylistSearchResponse = SearchResponseBase & { "items"?: PlaylistSearchResource[] }
    export type ChannelSearchResponse = SearchResponseBase & { "items"?: ChannelSearchResource[] }

    export type ChannelResource = ItemBase & {
        "id": string,
        "snippet": {
            "title": string,
            "description": string,
            "customUrl": string,
            "publishedAt": datetime,
            "thumbnails": {
                (key: string): {
                    "url": string,
                    "width": number,
                    "height": number
                }
            },
            "defaultLanguage": string,
            "localized": {
                "title": string,
                "description": string
            },
            "country": string
        },
        "contentDetails": {
            "relatedPlaylists": {
                "likes": string,
                "favorites": string,
                "uploads": string
            }
        },
        "statistics": {
            "viewCount": number,
            "subscriberCount": number,  // this value is rounded to three significant figures
            "hiddenSubscriberCount": boolean,
            "videoCount": number
        },
        "topicDetails": {
            "topicIds": [
                string
            ],
            "topicCategories": [
                string
            ]
        },
        "status": {
            "privacyStatus": string,
            "isLinked": boolean,
            "longUploadsStatus": string,
            "madeForKids": boolean,
            "selfDeclaredMadeForKids": boolean
        },
        "brandingSettings": {
            "channel": {
                "title": string,
                "description": string,
                "keywords": string,
                "defaultTab": string,
                "trackingAnalyticsAccountId": string,
                "moderateComments": boolean,
                "showRelatedChannels": boolean,
                "showBrowseView": boolean,
                "featuredChannelsTitle": string,
                "featuredChannelsUrls": [
                    string
                ],
                "unsubscribedTrailer": string,
                "profileColor": string,
                "defaultLanguage": string,
                "country": string
            },
            "watch": {
                "textColor": string,
                "backgroundColor": string,
                "featuredPlaylistId": string
            }
        },
        "auditDetails": {
            "overallGoodStanding": boolean,
            "communityGuidelinesGoodStanding": boolean,
            "copyrightStrikesGoodStanding": boolean,
            "contentIdClaimsGoodStanding": boolean
        },
        "contentOwnerDetails": {
            "contentOwner": string,
            "timeLinked": datetime
        },
        "localizations": {
            (key): {
                "title": string,
                "description": string
            }
        }
    }
    export type ListChannelResponse = ListResponseBase & { "items": ChannelResource[] }

    export type VideoResource = ItemBase & {
        "id": string,
        "snippet": {
            "publishedAt": datetime,
            "channelId": string,
            "title": string,
            "description": string,
            "thumbnails": {
                (key): {
                    "url": string,
                    "width": number,
                    "height": number
                }
            },
            "channelTitle": string,
            "tags": [
                string
            ],
            "categoryId": string,
            "liveBroadcastContent": string,
            "defaultLanguage": string,
            "localized": {
                "title": string,
                "description": string
            },
            "defaultAudioLanguage": string
        },
        "contentDetails": {
            "duration": string,
            "dimension": string,
            "definition": string,
            "caption": string,
            "licensedContent": boolean,
            "regionRestriction": {
                "allowed": [
                    string
                ],
                "blocked": [
                    string
                ]
            },
            "contentRating": {
                "acbRating": string,
                "agcomRating": string,
                "anatelRating": string,
                "bbfcRating": string,
                "bfvcRating": string,
                "bmukkRating": string,
                "catvRating": string,
                "catvfrRating": string,
                "cbfcRating": string,
                "cccRating": string,
                "cceRating": string,
                "chfilmRating": string,
                "chvrsRating": string,
                "cicfRating": string,
                "cnaRating": string,
                "cncRating": string,
                "csaRating": string,
                "cscfRating": string,
                "czfilmRating": string,
                "djctqRating": string,
                "djctqRatingReasons": [
                    string
                ],
                "ecbmctRating": string,
                "eefilmRating": string,
                "egfilmRating": string,
                "eirinRating": string,
                "fcbmRating": string,
                "fcoRating": string,
                "fmocRating": string,
                "fpbRating": string,
                "fpbRatingReasons": [
                    string
                ],
                "fskRating": string,
                "grfilmRating": string,
                "icaaRating": string,
                "ifcoRating": string,
                "ilfilmRating": string,
                "incaaRating": string,
                "kfcbRating": string,
                "kijkwijzerRating": string,
                "kmrbRating": string,
                "lsfRating": string,
                "mccaaRating": string,
                "mccypRating": string,
                "mcstRating": string,
                "mdaRating": string,
                "medietilsynetRating": string,
                "mekuRating": string,
                "mibacRating": string,
                "mocRating": string,
                "moctwRating": string,
                "mpaaRating": string,
                "mpaatRating": string,
                "mtrcbRating": string,
                "nbcRating": string,
                "nbcplRating": string,
                "nfrcRating": string,
                "nfvcbRating": string,
                "nkclvRating": string,
                "oflcRating": string,
                "pefilmRating": string,
                "rcnofRating": string,
                "resorteviolenciaRating": string,
                "rtcRating": string,
                "rteRating": string,
                "russiaRating": string,
                "skfilmRating": string,
                "smaisRating": string,
                "smsaRating": string,
                "tvpgRating": string,
                "ytRating": string
            },
            "projection": string,
            "hasCustomThumbnail": boolean
        },
        "status": {
            "uploadStatus": string,
            "failureReason": string,
            "rejectionReason": string,
            "privacyStatus": string,
            "publishAt": datetime,
            "license": string,
            "embeddable": boolean,
            "publicStatsViewable": boolean,
            "madeForKids": boolean,
            "selfDeclaredMadeForKids": boolean
        },
        "statistics": {
            "viewCount": number,
            "likeCount": number,
            "dislikeCount": number,
            "favoriteCount": number,
            "commentCount": number
        },
        "player": {
            "embedHtml": string,
            "embedHeight": number,
            "embedWidth": number
        },
        "topicDetails": {
            "topicIds": [
                string
            ],
            "relevantTopicIds": [
                string
            ],
            "topicCategories": [
                string
            ]
        },
        "recordingDetails": {
            "recordingDate": datetime
        },
        "fileDetails": {
            "fileName": string,
            "fileSize": number,
            "fileType": string,
            "container": string,
            "videoStreams": [
                {
                    "widthPixels": number,
                    "heightPixels": number,
                    "frameRateFps": number,
                    "aspectRatio": number,
                    "codec": string,
                    "bitrateBps": number,
                    "rotation": string,
                    "vendor": string
                }
            ],
            "audioStreams": [
                {
                    "channelCount": number,
                    "codec": string,
                    "bitrateBps": number,
                    "vendor": string
                }
            ],
            "durationMs": number,
            "bitrateBps": number,
            "creationTime": string
        },
        "processingDetails": {
            "processingStatus": string,
            "processingProgress": {
                "partsTotal": number,
                "partsProcessed": number,
                "timeLeftMs": number
            },
            "processingFailureReason": string,
            "fileDetailsAvailability": string,
            "processingIssuesAvailability": string,
            "tagSuggestionsAvailability": string,
            "editorSuggestionsAvailability": string,
            "thumbnailsAvailability": string
        },
        "suggestions": {
            "processingErrors": [
                string
            ],
            "processingWarnings": [
                string
            ],
            "processingHints": [
                string
            ],
            "tagSuggestions": [
                {
                    "tag": string,
                    "categoryRestricts": [
                        string
                    ]
                }
            ],
            "editorSuggestions": [
                string
            ]
        },
        "liveStreamingDetails": {
            "actualStartTime": datetime,
            "actualEndTime": datetime,
            "scheduledStartTime": datetime,
            "scheduledEndTime": datetime,
            "concurrentViewers": number,
            "activeLiveChatId": string
        },
        "localizations": {
            (key): {
                "title": string,
                "description": string
            }
        }
    }
    export type ListVideoResponse = ListResponseBase & { "items": VideoResource[] }

    export type PlaylistResource = ItemBase & {
        "id": string,
        "snippet": {
            "publishedAt": datetime,
            "channelId": string,
            "title": string,
            "description": string,
            "thumbnails": {
                (key): {
                    "url": string,
                    "width": number,
                    "height": number
                }
            },
            "channelTitle": string,
            "tags": [
                string
            ],
            "defaultLanguage": string,
            "localized": {
                "title": string,
                "description": string
            }
        },
        "status": {
            "privacyStatus": string
        },
        "contentDetails": {
            "itemCount": number
        },
        "player": {
            "embedHtml": string
        },
        "localizations": {
            (key): {
                "title": string,
                "description": string
            }
        }
    }
    export type ListPlaylistResponse = ListResponseBase & { "items": PlaylistResource[] }

    export type Error = {
        "message": string,
        "domain": string,
        "reason": string,
        "location": string,
        "locationType": string
    }
    export type ErrorResponse = {
        "error": {
            "code": number,
            "message": string,
            "errors": Error[]
        }
    }

    export type Response<T> = T & YTAPI.ErrorResponse;
    export type ResponsePromise<T> = Promise<Response<T>>;
}


export class GoogleOAuth2 {
    constructor(clientId: string, clientSecret: string, redirectURI: string);
    getOauth2Link(scope: string[], access_type?: "online" | "offline", response_type?: "code" | string, params?: any);
    getTokenFromCode(code: string, params?: any);
    refreshToken(refresh_token: string, params?: any);
    revokeToken(token: string);
}

export class YoutubeAPIClient {
    constructor(authType: "key" | "oauth2", key: string);
    searchAll(q: string, maxResults: number, params?: any): YTAPI.ResponsePromise<YTAPI.SearchResponse>;
    searchVideos(q: string, maxResults: number, params?: any): YTAPI.ResponsePromise<YTAPI.VideoSearchResponse>;
    searchPlaylists(q: string, maxResults: number, params?: any): YTAPI.ResponsePromise<YTAPI.PlaylistSearchResponse>;
    searchChannels(q: string, maxResults: number, params?: any): YTAPI.ResponsePromise<YTAPI.ChannelSearchResponse>;
    getChannelsByUsername(username: string, maxResults: number, params?: any): YTAPI.ResponsePromise<YTAPI.ListChannelResponse>;
    getChannelById(id: string, params?: any): YTAPI.ResponsePromise<YTAPI.ListChannelResponse>;
    getOwnedChannels(maxResults: number, params?: any): YTAPI.ResponsePromise<YTAPI.ListChannelResponse>;
    getVideoById(id: string, params?: any): YTAPI.ResponsePromise<YTAPI.ListVideoResponse>;
    getVideosByMostPopular(maxResults: number, params?: any): YTAPI.ResponsePromise<YTAPI.ListVideoResponse>;
    getVideosByMyRating(myRating: "like" | "dislike", maxResults: number, params?: any): YTAPI.ResponsePromise<YTAPI.ListVideoResponse>;
    getVideoByChannelId(channelId: string, maxResults: number, params?: any): YTAPI.ResponsePromise<YTAPI.ListVideoResponse>;
    getPlaylistById(id: string, params?: any): YTAPI.ResponsePromise<YTAPI.ListPlaylistResponse>;
    getOwnedPlaylists(maxResults: number, params?: any): YTAPI.ResponsePromise<YTAPI.ListPlaylistResponse>;
}

export class NotProperlyAuthorizedError extends Error {
    constructor(goodAuthType: "oauth2" | "key");
}
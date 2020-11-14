import React, { createContext, useContext, useReducer } from 'react';

var TweetStateContext = createContext();
var TweetDispatchContext = createContext();

function TweetReduser(state, action) {
    switch (action.type) {
        case "SET_TWEET_TEXT":
            return { ...state, tweetText: action.payload };
        case "SET_TWEET_LIST":
            return { ...state, tweetList: action.payload };
        case "SET_HASHTAG_LIST":
            return { ...state, hashTags: action.payload };
        case "LIKE_TWEET":
            const tweetId = action.payload;
            const foundIndex = state.tweetList.findIndex(item => item._id === tweetId);
            if (foundIndex === -1)
                return state;
            return {
                ...state, tweetList: [...state.tweetList.slice(0, foundIndex),
                { ...state.tweetList[foundIndex], likes: state.tweetList[foundIndex].likes + 1 },
                ...state.tweetList.slice(foundIndex + 1)]
            };
        default: {
            throw new Error(`Unhandled Action Type ${action.type}`);
        }
    }
}


function TweetProvider({ children }) {
    var [state, dispatch] = useReducer(TweetReduser, {
        tweetText: '',
        tweetList: [],
        hashTags: [],
    });
    return (
        <TweetStateContext.Provider value={state}>
            <TweetDispatchContext.Provider value={dispatch}>
                {children}
            </TweetDispatchContext.Provider>
        </TweetStateContext.Provider>
    )
}

function useTweetState() {
    var context = useContext(TweetStateContext);
    if (context === undefined) {
        throw new Error("useTweetState must be used within a TweetProvider");
    }
    return context;
}

function useTweetDispatch() {
    var context = useContext(TweetDispatchContext);
    if (context === undefined) {
        throw new Error("useTweetDispatch must be used within a TweetProvider");
    }
    return context;
}

export { TweetProvider, useTweetState, useTweetDispatch, setTweetText, LikeTweet, setTweetList ,setHashTagList};

//#######Functions#######//
function setTweetText(dispatch, tweetText) {
    dispatch({
        type: "SET_TWEET_TEXT",
        payload: tweetText
    });
}
function LikeTweet(dispatch, id) {
    dispatch({
        type: "LIKE_TWEET",
        payload: id
    });
}
function setTweetList(dispatch, list) {
    dispatch({
        type: "SET_TWEET_LIST",
        payload: list
    });
}
function setHashTagList(dispatch, list) {
    dispatch({
        type: "SET_HASHTAG_LIST",
        payload: list
    });
}
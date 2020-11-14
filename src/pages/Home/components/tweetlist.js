import React from 'react';
import Tweet from './tweet';

const TweetList = ({ data }) => {
    return (
    <>
        { data.map(tweet => <Tweet data={tweet} />)}
    </>
    );
};
export default TweetList;
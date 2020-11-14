import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom'

import HeaderTitle from './Home/components/header';
import TweetList from './Home/components/tweetlist';
import { getTweetByHashtagReq } from './../api/api_tweet';
import { toast } from 'react-toastify';
import { setTweetList, useTweetDispatch, useTweetState } from '../context/tweetContext';


const TweetByHashtag = (props) => {
    
    // const location = useLocation();
    // const [Tweets, setTweets] = useState([]);
    const { tweetList: Tweets } = useTweetState();
    const tweetDispatch = useTweetDispatch();

    useEffect(() => {
        getTweetByHashtagReq(props.match.params.hashtag, (isOk, data) => {
            if (!isOk)
                return toast.warning(`لود ناموفق هشتگ ها دلیل: ${data}`);
            setTweetList(tweetDispatch, data);
        })
    }, [tweetDispatch,props.match.params.hashtag]);

    return (
        <>
            <HeaderTitle title={props.match.params.hashtag} icon="fa fa-hashtag" />
            <div className="divider-x" />
            <TweetList data={Tweets} />
        </>
    );
}

export default TweetByHashtag;
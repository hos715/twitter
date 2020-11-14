import React, { useEffect } from 'react';

import HeaderTitle from './Home/components/header';
import TweetList from './Home/components/tweetlist';
import { getTweetByUserReq } from './../api/api_tweet';
import { toast } from 'react-toastify';
import { setTweetList, useTweetDispatch, useTweetState } from '../context/tweetContext';


const TweetsByUser = (props) => {
    // const location = useLocation();
    // const [Tweets, setTweets] = useState([]);
    const { tweetList: Tweets } = useTweetState();
    const tweetDispatch = useTweetDispatch();

    useEffect(() => {
        getTweetByUserReq(props.match.params.id, (isOk, data) => {
            if (!isOk)
                return toast.warning(data);
            setTweetList(tweetDispatch, data);
        });
    }, [tweetDispatch,props.match.params.id]);

    return (
        <>
            <HeaderTitle icon="fa fa-user" title={props.match.params.name} />
            <div className="divider-x" />
            {Tweets.length === 0 && 
                <h1 className="text-center text-warning col-12 bg-white  py-4 my-4">هیچ توییتی جهت نمایش وجود ندارد</h1>
            }
            <TweetList data={Tweets} />
        </>
    );
}

export default TweetsByUser;
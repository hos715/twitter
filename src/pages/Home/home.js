import React, { useEffect } from 'react';

import NewTweet from './components/newTweet';
import TweetList from './components/tweetlist';
import HeaderTitle from './components/header';
import { getAllTweets } from './../../api/api_tweet';
import { toast } from 'react-toastify';
import { setTweetList, useTweetDispatch, useTweetState } from '../../context/tweetContext';


const Home = () => {


    const tweetDispatch = useTweetDispatch();
    const { tweetList: Tweets } = useTweetState();
    // const [, setTweets] = useState([]);

    useEffect(() => {
        updateTweets();
      }, []);
    const updateTweets = () => {
        getAllTweets((isOk, data) => {
            if (!isOk)
                return toast.warning(`آقا توئیت ها لود نمیشن از سرور ${data}`);
            toast.success(`لود شد ${data._id}`);
            setTweetList(tweetDispatch, data);
        })
    }
    return (
        <>
            <HeaderTitle title="خانه" icon="fa fa-home" />
            <div className="divider-x" />
            <NewTweet updateTweets={updateTweets} />
            <TweetList data={Tweets} />
        </>
    );
};
export default Home;
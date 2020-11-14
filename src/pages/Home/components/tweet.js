import React from 'react';
import { LikeTweet, setTweetText, useTweetDispatch } from '../../../context/tweetContext';
import { likeTweetReq } from './../../../api/api_tweet';
import { toast } from 'react-toastify';

const Tweet = ({ data }) => {

    const tweetDispatch = useTweetDispatch();

    const renderTweet = (text) => {
        return { __html: text.replace(/#\S+/g, "<a href='/tags/$&' style='text-primart'>$&</a>") };
    };
    const getImage = () => {
        if (data.user.image)
            return data.user.image;
        return "/img/user.png";
    }
    const handleRetweet = () => {
        setTweetText(tweetDispatch, data.text)
    }
    const handleLike = () => {
        likeTweetReq(data._id, (isOk, data) => {
            if (!isOk)
                return toast.error(data);
            LikeTweet(tweetDispatch, data._id)
        })
    }
    return (
        <div className="twit">
            <div style={{ display: "flex" }}>
                <div >
                    <img src={getImage()} className="img-avatar" alt="sender-avatar" />
                </div>
                <div className="twit-item">
                    <div className="twit-item-title">
                        <h6 className="font-weight-bold">{data.user.name}</h6>
                        <p className="text-secondary text-left">{data.user.id}</p>
                    </div>
                    <p className="twit-item-content" dangerouslySetInnerHTML={renderTweet(data.text)} />
                </div>
            </div>
            {data.image &&
                <div>
                    {/* <img src={data.image} style={{ width: "100%", height: "auto" }} alt="tweet-img" /> */}
                    <div style={{ backgroundImage: `url("${data.image}")` }} className="image-attach"></div>
                </div>
            }
            <div className="twit-options text-left" >
                <label className="like-counter">{data.likes}</label>
                <button type="button" className="btn btn-outline-danger btn-twit-round" onClick={handleLike} >
                    <i className="fa fa-heart fa-lg" />
                </button>
                <button type="button" className="btn btn-outline-secondary btn-twit-round" onClick={handleRetweet} >
                    <i className="fa fa-retweet fa-lg" />
                </button>
            </div>
        </div>
    );
};

export default Tweet;
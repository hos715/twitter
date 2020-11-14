import React, { useRef, useState } from 'react';
import { newTweetRequest } from '../../../api/api_tweet';
import { toast } from 'react-toastify';
import { useTweetState,setTweetText as setTweet, useTweetDispatch } from '../../../context/tweetContext';

const NewTweet = ({ updateTweets }) => {

    // const [tweet, setTweet] = useState();
    const {tweetText:tweet} = useTweetState();
    const TweetDispatch = useTweetDispatch();
    const [imageFile, setImageFile] = useState();
    const [imagePath, setImagePath] = useState();
    const inputRef = useRef();
    const tweetTextClick = () => {
        const tweetText = tweet;
        if (!tweetText)
            return;
        const formData = new FormData();
        formData.append("text", tweetText);
        if (imageFile)
            formData.append("image", imageFile);

        newTweetRequest(formData, (isOk, data) => {
            if (!isOk)
                return toast.error(`ارسال ناموفق بود دلیل: ${data}`);
            toast.success("ارسال موفق");
            updateTweets();
            setTweet(TweetDispatch,"");
            setImagePath();
            setImageFile();
        });
    }
    const getImage = () => {
        if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
            return localStorage.getItem("image");
        return "/img/user.png"
    }
    const onChangeImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
        console.log(imageFile);
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePath(e.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    return (
        <>
            <div className="pnl-new-twit" >
                <div style={{ display: "grid" }}>
                    <div className="new-twit">
                        <img className="img-avatar" src={getImage()} alt="avatar" />
                        <input placeholder="توییت کن ..." className="txt-new-twit"
                            value={tweet} onChange={e => setTweet(TweetDispatch,e.target.value)} />
                        <input type={'file'} style={{ display: "none" }} ref={inputRef} onChange={onChangeImage} />
                    </div>
                    {imagePath &&
                        <div>
                            <div style={{ backgroundImage: `url("${imagePath}") ` }} className="image-attach"></div>
                        </div>
                    }
                </div>
                <div className="new-twit" style={{ direction: "ltr" }}>
                    <button type="button" className="btn btn-primary btn-new-twit" onClick={tweetTextClick} >توئیت</button>
                    <button type="button" className="btn btn-outline-danger btn-twit-round" onClick={() => (inputRef.current.click())} >
                        <i className="fa fa-image fa-lg" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default NewTweet;
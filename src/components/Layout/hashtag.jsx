import React, { useEffect } from 'react';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { getHashtags } from '../../api/api_tweet';
import { useTweetDispatch, useTweetState, setHashTagList } from '../../context/tweetContext';




const Hashtag = () => {

    // const [hashtags, sethashtags] = useState([]);
    const { hashTags } = useTweetState();
    const tweetDispatch = useTweetDispatch();
    // const location = useLocation();

    useEffect(() => {
        getHashtags((isOk, data) => {
            if (!isOk)
                return toast.warning(`هشتگ ها لود نمیشن دلیل: ${data}`);
            setHashTagList(tweetDispatch, data);
        })
    }, [tweetDispatch])

    return (
        <div className="hashtags-Panel">
            {hashTags.map(item =>
                <Link to={"/hashtags/" + item.text} className="btn btn-outline-primary hashtag">
                    <img src={"/img/hashtag.png"} alt="هشتگ" />
                    <h6>
                        {item.text}
                    </h6>
                </Link>
            )}

        </div>
    );
};
export default Hashtag;
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { config } from "../utils";

export default function PostDetailPage() {

    const param = useParams();

    const [post, setPost] = useState(null);

    const handleFetchPost = async () => {
        try {
            const postData = await axios.get(`${config.API_URL}/posts/${param.postId}`)
            setPost(postData.data)
        } catch (e) {
            console.log('handle fetch data', e)
        }
    }

    useEffect(() => {
        handleFetchPost()
    }, [param.postId])

    return <div>{
        //post && ... để xét xem post có data chưa? nếu có thì return về cái đống div chứa post detail
        post && <div className="post">
            <p>Title: {post.title}</p>
            <p>Author: {post.author}</p>
            <p>Description: {post.description}</p>
        </div>
    }</div>
}
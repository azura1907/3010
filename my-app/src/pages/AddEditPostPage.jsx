import axios from "axios"
import { useEffect } from "react";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { config } from "../utils"

export default function AddEditPostPage() {
    const param = useParams();

    const [postForm, setPostForm] = useState(
        {
            title: '',
            author: '',
            description: ''
        }
    )

    const handleChangePost = (event) => {
        const name = event.target.name
        const value = event.target.value

        setPostForm({
            ...postForm,
            [name]: value
        })
    }

    const navigate = useNavigate();

    const handleAddPost = async (event) => {
        event.preventDefault();
        try {
            if (param.postId) {
                //edit mode
                //patch posts/id

                const newPost = await axios.patch(`${config.API_URL}/posts/${param.postId}`, postForm)
                navigate(`/detail/${newPost.data.id}`)
            }

            const newPost = await axios.post(`${config.API_URL}/posts`, postForm)
            navigate(`/detail/${newPost.data.id}`)
        } catch (e) {
            console.log('handle add post: ', e)
        }
    }

    const handleGetPostDetail = async () => {
        try {
            //get post detail by id
            const postData = await axios.get(`${config.API_URL}/posts/${param.postId}`)
            console.log(postData)
            setPostForm(postData.data)
        } catch (e) {
            console.log('handle get post detail: ', e)
        }
    }

    useEffect(() => {
        handleGetPostDetail()
    }, [param.postId])

    return (
        <div>
            <form>
                <input placeholder="title" value={postForm.title} name="title" onChange={handleChangePost}></input><br />
                <input placeholder="author" value={postForm.author} name="title" onChange={handleChangePost}></input><br />
                <input placeholder="description" value={postForm.description} name="title" onChange={handleChangePost}></input><br />
                <button type="submit" onClick={handleAddPost}>{param.postId ? 'Edit' : 'Add'}Post</button>
            </form>
        </div>
    )
}
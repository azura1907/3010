import PostList from "../components/PostList";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { config } from '../utils'

export default function HomePage() {
    const [listPost, setListPost] = useState([])

    const [searchValue, setSearchValue] = useState('');

    const handleFetchData = async () => {
        try {
            const postData = await axios.get(`${config.API_URL}/posts`)
            setListPost(postData.data)

        } catch (e) {
            console.log('handle fetch data', e)
        }
    }

    useEffect(() => {
        handleFetchData();
    }, [])

    const handleRemovePost = async (post) => {
        try {
            await axios.delete(`${config.API_URL}/posts/${post.id}`)
            handleFetchData();
        } catch (e) {
            console.log('handle remove post', e)
        }
    }

    const filteredPosts = [...listPost].filter((post) => {
        return post.title.toLowerCase().includes(searchValue);
    })

    return (
        <div>
            <input placeholder="input to search" onChange={(event) => {
                setSearchValue(event.target.value)
            }}></input>
            Home Page
            <PostList posts={filteredPosts} handleRemovePost={handleRemovePost} />
        </div>
    )
}
import { useState } from "react";
import Post from "./Post";

function PostList(props) {
    //tạo pots = listPost lấy từ props
    const { posts, handleRemovePost } = props;

    return <div>
        {
            posts.map((post) => {
                return <Post key={post.id} post={post} handleRemovePost={handleRemovePost} />
            })
        }
    </div>
}
export default PostList
import { useEffect, useState } from "react";
import { getAllBlogs } from "../api/internal";
import Loader from '../components/Loader'
import styles from './Blogs.module.css';
import { useNavigate } from "react-router-dom";

function AllBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('')
    const navigate = useNavigate()



    useEffect(
        () => {
            (
                async function fetchBlogDetails() {
                    const response = await getAllBlogs();
                    if (response.status === 200) {
                        setBlogs(response.data.blogs)
                        setError(false)
                    }
                    else {
                        console.log(`here else of useeffect with status of ${response.status}`)
                        setError(response.response.data.message)
                    }
                }
            )();

            // cleanup Function
            return setBlogs([])
        }
        ,
        [])

    if (error === '') {
        return (
            <Loader text='Blog Details loading' />
        )
    }

    let response
    if (error === false) {
        response = <div className={styles.container}>
            {blogs.map(
                (blog) => (
                    <div
                        key={blog.id}
                        onClick={() => navigate(`/blog/${blog.id}`)} 
                        className={styles.blogsWrapper}
                        >
                        <h2>{blog.title}</h2>
                        <img src={blog.photo} alt='Not found' />
                        <p>{blog.content}</p>
                    </div>
                )
            )}
        </div>

    }
    else {
        response = (<div>{error}</div>)
    }


    return response
}

export default AllBlogs;
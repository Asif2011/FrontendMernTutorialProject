import { useParams } from "react-router-dom"
import style from './BlogsDetails.module.css'
import { getBlogByID } from "../api/internal"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import { useNavigate } from "react-router-dom"
import { updateBlogByID, deleteBlogByID } from "../api/internal"



function BlogDetailsPage() {
    let page
    const navigator = useNavigate()
    const [blog, setBlog] = useState({})
    const [error, setError] = useState('')
    const [editState, setEditState] = useState(false)
    const params = useParams()





    useEffect(
        () => {
            async function getBlog() {
                const blogID = params.id
                try {
                    const response = await getBlogByID(blogID)
                    if (response.status === 200) {
                        setBlog(response.data.blog)
                        console.dir(JSON.stringify(response.data.blog))
                        setError(false)

                    }
                    else {
                        setError(true)
                    }
                }
                catch (e) {
                    console.log(`error to fetch a blog: ${e}`)
                    setError(e)
                }
            } getBlog()
            return setBlog({})
        },
        [params]
    )
    //end of use effect



    if (error === '') {
        return <Loader text="Blog loading" />
    }

    const handleContent = (e) => {
        setBlog({ ...blog, content: e.target.value })
    }

    const handleTitle = (e) => {
        setBlog({ ...blog, title: e.target.value })
    }

    const handlePhoto = (e) => {
        // setPhoto(e.target.files[0])
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setBlog({ ...blog, photo: reader.result })
        }
    }

    const updateBlog = async (newblogdata) => {
        let response;
        try {
            response = await updateBlogByID(newblogdata)
            if (response.status === 200) {
                navigator('/blogs')
                console.log('blog updated')
            }
        } catch (e) {
            setError(e)
            console.log(`error occrred while blog updating is: ${error}`)
        }
    }

    const handleEditUpdateEvent = () => {
        // () => editState ? setEditState(false) : setEditState(true)}>
        // {editState ? 'Save' : 'Edit'
        if (editState) {
            const newBlog = {
                title: blog.title,
                content: blog.content,
                blogId: blog._id,
                author: blog.author._id,
                photo: blog.photo
            }
            updateBlog(newBlog)
            navigator('/blogs')
            // updating the blog
            setEditState(false)
        }
        else {
            setEditState(true)
        }

    }

    const handleDelete = async () => {
        try {
            await deleteBlogByID(blog._id)
        } catch (error) {
            console.dir(error)
            return error
        }
        navigator('/blogs')
    }

    if (error === false) {
        page = (
            <div className={style.wrapper}>
                <div className={style.blogWrapper}>
                    <h1>Blog Details</h1>
                    <img src={blog.photo} alt="Not found" />
                    <input className={style.titleText} type="text" disabled={!editState} value={blog.title} onChange={handleTitle} />
                    <textarea className={style.contentTextarea} disabled={!editState} value={blog.content} onChange={handleContent} />
                </div>
                <div className={style.optionsWrapper} >
                    <input type='file' disabled={!editState} id='chooseImage' accept="image/*" onChange={handlePhoto} />
                    <div>
                        <input type="range" disabled={!editState} defaultValue={0} id="slider" onChange={(e) => {
                            if (e.target.value === '100') {
                                if (window.confirm('Are you sure you want to delete this blog?')) {
                                    handleDelete()
                                } else {
                                    e.target.value = 0
                                }
                            }
                        }} style={{ transition: 'all 0.5s ease-in-out' }} />
                        <p>Slide to delete</p>
                    </div>
                    <div></div>
                    <div>
                        <button style={{ backgroundColor: editState ? 'green' : 'red' }} className={style.updateButton} onClick={handleEditUpdateEvent}>
                            {editState ? 'Update' : 'Edit'}
                        </button>
                    </div>

                </div>
            </div>
        )
    }
    else {
        page = (<div className={style.blogWrapper}>
            <h2>Blog Details</h2>
            <p>Blog not found due to error: {error}</p>
        </div>)
    }
    return page

}

export default BlogDetailsPage
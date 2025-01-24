import TextInput from '../components/TextInput'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBlogAPI } from '../api/internal'
import { useSelector } from 'react-redux'
import style from './CreateBlog.module.css'

function CreateBlog() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [image, setImage] = useState('')
    const _id = useSelector((state) => state.user._id);



    const handleCreate = async () => {
        const data = {
            title: title,
            content: content,
            photo: image,
            author: _id
        }
        let response = await createBlogAPI(data)
        if (response.status === 200) {
            navigate('/blogs')
        }
        else {
            setError(response.response.data.message)
        }
    }

    const getPhoto = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {

            setImage(reader.result)
        }
    }

    return (
        <div className={style.wrapper}>
            <h1>Create Blog</h1>
            <div className={style.header}>
            <TextInput type='text' value={title} name='Title2' label="Title" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <textarea className={style.content} maxLength='400' value={content} label="Content" onChange={(e) => setContent(e.target.value)} />
            <div className={style.buttonsWrapper}>
            <input id='photo' type='file' name='image' accept='image/jpg, image/jpeg, image/png'
                onChange={getPhoto} />
            {image===''?'':<img src={image} className={style.imageview} alt='Not found' />}
            <button onClick={handleCreate}>Create Blog</button>
            </div>
            <div>
            {error!==''?<p className={style.errorMessage}>{error}</p>:''}
            </div>
        </div>
    )
}

export default CreateBlog;  //export the component
import { useEffect, useState } from "react"
import { getNews } from "../api/external"
import style from './Home.module.css'
import Loader from "../components/Loader"


function Home() {
    const [articles, setArticles] = useState([])
    const [error, setError] = useState('')


    useEffect(() => {
        (
            async function newAPICall() {
                const gotton_articles = await getNews()
                if (gotton_articles.length !== 0) {
                    setArticles(gotton_articles)
                    setError(false)
                }
                else {
                    setError(true)
                }
            }
        )();

        // cleanup function
        setArticles([])
    }, []);
    if (error==='') {
        return (
            <Loader text='made by Asif guided by Azaad chai wala channel' />
        )
    }

    function handleClick(url) {
        window.open(url, "_blank")
    }


    return (<>
        <div className={style.header} >
            News on Financial Freedom latest articles
        </div>
        <div className={style.grid}>
            {
                !error?
                articles.map((article) => (
                    <div className={style.card} key={article.url} onClick={() => handleClick(article.url)}>
                        <img src={article.urlToImage} alt={'not found'} />
                        <h3>{article.title}</h3>
                    </div>
                ))
                : 
                <div><p>{error}</p></div>
            }
        </div>
        <div>Home Page</div>
    </>
    )
}
export default Home
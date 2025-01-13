import axios from "axios";

// const newAPIKey = process.env.REACT_APP_NEWS_API_KEY
// const keyword = 'freedom'
// const API_URL = `https://newsapi.org/v2/everything?q=${keyword}&from=2024-11-03&sortBy=popularity&apiKey=${newAPIKey}`
const API_URL = 'https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json'
export const getNews = async () => {
    let response
    try {
        response = await axios.get(API_URL);
        response = response.data.articles.slice(0, 15)
    }
    catch (error) {
        return error
    }
    return response
}



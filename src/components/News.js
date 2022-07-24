import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResult, setTotalResult] = useState(0)



    const updateNews = async () => {
        props.setProgress(10);
        // const url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=3aaaa6e4fa754609814efae2e9a90d21&page=1";
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);

        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setArticles(parseData.articles);
        setTotalResult(parseData.totalResult);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])

    const handlePrevClick = async () => {
        setPage(page - 1);
        updateNews();
    }
    const handleNextClick = async () => {
        setPage(page + 1);
        updateNews();
    }



    const fetchMoreData = async () => {
        setPage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}`;
        const data = await fetch(url);
        let parseData = await data.json();

        setArticles(articles.concat(parseData.articles))
        setTotalResult(parseData.totalResult)
    };




    return (
        <>
            <h1 className="text-center " style={{ margin: '35px 0px' }}>NewsApp -{props.category} Heading</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLenght={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResult}
                loader={<Spinner />}
            >
                <div className="container ">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title ? element.title : " "} description={element.description ? element.description : ""} imageUrl={element.urlToImage} url={element.url} author = {element.author} date= {element.publishedAt} source = {element.source.name} />
                            </div>
                        })}
                    </div>
                </div>


            </InfiniteScroll>

        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}
News.propType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;

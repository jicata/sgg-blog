import './articles.css'
import Article from "./article/article.jsx";

const Articles = () => (
        <section className="articles">
            <h1 className="articles__heading">Articles</h1>
            <Article />
            <Article />
        </section>
    );

export default Articles;
import {Link} from "react-router-dom";
import './RelatedArticle.css';

const RelatedArticle = ({title, category, href, imageSrc}) => {
    return (
        <Link to={href}>
            <div className="related-article">
                <span>{title}</span>
                <img className={"related-article__img"} src={imageSrc} alt={title}/>
                <span>{category}</span>
            </div>
        </Link>
    )
}

export default RelatedArticle;
import {Link} from "react-router-dom";
import {formatDate} from "../../../../helpers/helpers.ts";
import './HeadingMetadata.css';

const HeadingMetadata = ({category, createdOn, modifiedOn}) => {
    return (
        <div className={"heading-metadata"}>
            <p>Filed under <Link className={"heading-metadata__category-url"} to={`/${category.toLowerCase()}`}>{category}</Link> on <span className={"heading-metadata__date"}>{formatDate(createdOn)}.</span></p>
            {modifiedOn && (<p>Last updated on <span className={"heading-metadata__date"}>{formatDate(modifiedOn)}</span></p>)}
        </div>
    )   
}

export default HeadingMetadata;
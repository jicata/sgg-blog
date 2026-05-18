import './ArticleHeading.css'
import MaxWidthWrapper from "../../../components/MaxWidthWrapper/max-width-wrapper.tsx";
import HeadingMetadata from "./HeadingMetadata/HeadingMetadata.jsx";

const ArticleHeading = ({id, title, subtitle, category, createdOn, modifiedOn}) => {
    
    return (
        <MaxWidthWrapper className={"article-heading"}>
            <h1 className={"article-heading__title"}>{title}</h1>
            <span className={"article-heading__subtitle"}>{subtitle}</span>
            <HeadingMetadata category={category} createdOn={createdOn} modifiedOn={modifiedOn} />
        </MaxWidthWrapper>
    )
}

export default ArticleHeading;
import MaxWidthWrapper from "../../../components/MaxWidthWrapper/max-width-wrapper.tsx";
import RelatedArticle from "./RelatedArticle/RelatedArticle.jsx";
import './RelatedArticles.css';

const relatedArticles = [
    {
        title: "Related Article",
        category: "Lorem",
        href: "/article/lorem",
        imageSrc: "/../../../../public/article/potato.jpg",
    },
    {
        title: "Related Article",
        category: "Lorem",
        href: "/article/lorem",
        imageSrc: "/../../../../public/article/potato.jpg",
    },
    {
        title: "Related Article",
        category: "Lorem",
        href: "/article/lorem",
        imageSrc: "/../../../../public/article/potato2.jpg",
    },
    {
        title: "Related Article",
        category: "Lorem",
        href: "/article/lorem",
        imageSrc: "/../../../../public/article/potato.jpg",
    },
    {
        title: "Related Article",
        category: "Lorem",
        href: "/article/lorem",
        imageSrc: "/../../../../public/article/potato.jpg",
    }
]

const RelatedArticles = () => {
    return(
        <MaxWidthWrapper className={"related-articles"}>
            <h5 className={"related-articles__heading"}>Related Articles</h5>
            <div className={"related-articles__grid"}>
                {relatedArticles.map((article, index) => <RelatedArticle key={index} {...article} />)}
            </div>
        </MaxWidthWrapper>
    )
}

export default RelatedArticles
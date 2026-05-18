import './ArticleGrid.css'

const ArticleGrid = ({withToc, children}) => {
    return (
        <article className={`article-grid ${(withToc ? 'article-grid--with-toc' : '')}`}>
            {children}
        </article>
    )
}

export default ArticleGrid;
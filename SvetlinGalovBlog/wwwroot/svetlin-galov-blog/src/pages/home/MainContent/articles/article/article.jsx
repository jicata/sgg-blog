import './article.css'

export default function Article() {
    return (
        <article className="article">
            <a className="article__title" href='/'>
                <h3>This is an article</h3>
            </a>
     
            <p className="article__preview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend fringilla mi. Sed est dui, sodales nec odio ut, accumsan lacinia velit. Proin in libero id mauris rutrum dictum. Fusce consequat consequat sem a euismod. Aenean molestie dictum turpis sed ornare. Nam efficitur eu mauris id placerat. Vestibulum dapibus sem non urna maximus iaculis. Duis eleifend blandit auctor. Duis scelerisque congue ante, a semper enim rutrum id. Praesent ac scelerisque nisi, nec posuere lorem.</p>
            
            <a href="/" className="article__follow-up">
                Read more
            </a>
        </article>
    )
}
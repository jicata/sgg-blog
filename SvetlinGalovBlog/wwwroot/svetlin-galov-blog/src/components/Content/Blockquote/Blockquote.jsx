import './Blockquote.css'

const Blockquote = ({
                            className,
                            content,
                            children,
                            ...delegates
                        }) => {
    return (
        <blockquote className={`blockquote ${className ? className : ''}`}
                   {...delegates}>
            {content}
            {children}
        </blockquote>
    )
}

export default Blockquote;
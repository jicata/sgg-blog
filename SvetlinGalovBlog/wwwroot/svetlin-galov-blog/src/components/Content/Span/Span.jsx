import './Span.css'

const Span = ({
                            className,
                            content,
                            children,
                            ...delegates
                        }) => {
    return (
        <span className={`span ${className ? className : ''}`}
                   {...delegates}>
            {content}
            {children}
        </span>
    )
}

export default Span;
import './Paragraph.css'

const Paragraph = ({
                            className,
                            content,
                            children,
                            ...delegates
                        }) => {
    return (
        <p className={`paragraph ${className ? className : ''}`}
                   {...delegates}>
            {content}
            {children}
        </p>
    )
}

export default Paragraph;
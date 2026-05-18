import './CodeBlock.css'

const CodeBlock = ({
                       className,
                       content,
                       children,
                       ...delegates
                   }) => {
    console.log('hi im', delegates)
    return (
        <pre className={`code-block ${className ? className : ''}`} {...delegates}>
            <code className={"code"}>
                 {content}
            </code>
            {children}
            
        </pre>

    )
}

export default CodeBlock;
import './max-width-wrapper.css';
import {HTMLAttributes} from "react";

interface MaxWidthWrapperProps extends HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
    maxWidth?: string;
    children: React.ReactNode;
    className?: string;
    paddingInline?: string;
}

const MaxWidthWrapper = ({
                             as = 'div',
                             maxWidth,
                             children,
                             className,
                             paddingInline,
                             ...delegated
                         }: MaxWidthWrapperProps) => {
    const Component = as;
    return (
        <Component
            className={`max-width-wrapper ${className ? className : ''}`}
            style={{'maxWidth': maxWidth, 'paddingInline': paddingInline}}
            {...delegated}>
            {children}
        </Component>
    )
}

export default MaxWidthWrapper;
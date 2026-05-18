import './UnorderedList.css'
import React from "react";

interface UnorderedListProps {
    children: React.ReactNode;
}

const UnorderedList = ({children} : UnorderedListProps) => {
    return (
        <ul className="unordered-list">
            {React.Children.map(children, (child, index) => {
                return <li className="list-item" key={index}>{child}</li>
            })}
        </ul>
    )
}

export default UnorderedList;
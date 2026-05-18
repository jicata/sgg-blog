import './Tags.css';

interface TagsProps {
    items: string[];
}

const Tags = ({items}: TagsProps) => {
    return (
        <div className="tags">
            {items.map((tag, index) => <span className="tag" key={index}>{tag}</span>)}
        </div>
    );
}

export default Tags;

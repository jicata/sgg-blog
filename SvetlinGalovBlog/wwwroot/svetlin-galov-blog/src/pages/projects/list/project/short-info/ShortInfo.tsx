import './ShortInfo.css';

interface ShortInfoProps {
    country: string;
    impact: string;
    when: string;
}

const ShortInfo = ({country, impact, when}: ShortInfoProps) => {
    return (
        <div className="short-info">
            <span>{country}</span>
            <span>{impact}</span>
            <span>{when}</span>
        </div>
    );
}

export default ShortInfo;

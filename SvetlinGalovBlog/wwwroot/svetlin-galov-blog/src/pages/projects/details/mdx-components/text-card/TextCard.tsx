import './TextCard.css'

interface TextCardProps {
    bulletNumber?: string;
    heading: string;
    children: React.ReactNode;
}

const TextCard = ({bulletNumber, heading, children = ''} : TextCardProps) => {
    return (
        <div className={'text-card'}>
            {bulletNumber && (<span className="text-card__bullet-number">{bulletNumber}</span>)}
            <div className="text-card__content">
                <h3 className="text-card__heading">{heading}</h3>
                <div className="text-card__text">{children}</div>
            </div>
        </div>
    )
}

export default TextCard;
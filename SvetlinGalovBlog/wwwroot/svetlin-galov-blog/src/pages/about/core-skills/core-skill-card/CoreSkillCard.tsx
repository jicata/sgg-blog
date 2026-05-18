import './CoreSkillCard.css'

interface CoreSkillsProps {
    bulletNumber?: string;
    heading: string;
    content: string;
    children: React.ReactNode;
}

const CoreSkillCard = ({bulletNumber, heading, content,children = ''}: CoreSkillsProps) => {
    return (
        <div className={'core-skill-card'}>
            <h3 className="text-card__heading">{heading}</h3>
            <div className="text-card__text">{content}</div>
            {children}
        </div>
    )
}   

export default CoreSkillCard;
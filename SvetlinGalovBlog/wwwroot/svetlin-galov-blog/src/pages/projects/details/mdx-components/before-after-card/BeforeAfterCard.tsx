import './BeforeAfterCard.css'
import BasicCard from "../../../shared/components/basic-card/BasicCard.tsx";

interface BeforeAfterCardProps {
    heading: string;
    beforeText: string;
    afterText: string;
}

const BeforeAfterCard = ({heading, beforeText, afterText} : BeforeAfterCardProps) => {
    return (
        <BasicCard>
            <h4 className="before-after-card__heading">{heading}</h4>
            <span className="before-after-card__before">Before</span>
            <p className="before-after-card__before-text">{beforeText}</p>
            <div className="before-after-card__divider"></div>
            <span className="before-after-card__after">After</span>
            <p className="before-after-card__after-text">{afterText}</p>
        </BasicCard>
    )
}

export default BeforeAfterCard;
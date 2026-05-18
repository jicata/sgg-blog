import './StatCard.css'
import BasicCard from "../../../shared/components/basic-card/BasicCard.tsx";

interface StatCardProps {
    statNumber: string;
    statDescription: string;
}

const StatCard = ({statNumber, statDescription} : StatCardProps) => {
    return (
        <BasicCard>
            <span className="stat-card__number">{statNumber}</span>
            <p className="stat-card__description">{statDescription}</p>
        </BasicCard>
    )
}

export default StatCard;
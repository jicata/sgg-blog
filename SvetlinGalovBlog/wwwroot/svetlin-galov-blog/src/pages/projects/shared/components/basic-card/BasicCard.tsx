import './BasicCard.css'

interface BasicCardProps {
    children: React.ReactNode;
}

const BasicCard = ({children} : BasicCardProps) => {
    return (
        <div className="basic-card">
            {children}
        </div>
    )
}

export default BasicCard;
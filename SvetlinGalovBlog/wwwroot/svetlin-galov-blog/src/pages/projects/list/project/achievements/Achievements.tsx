import './Achievements.css';

interface AchievementsProps {
    items: string[];
}

const Achievements = ({items}: AchievementsProps) => {
    return (
        <ul className="achievements">
            {items.map((item, index) => (
                <li className="achievement" key={index}>
                    <span className="achievement__bullet">•</span>
                    <span className="achievement__content">{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default Achievements;

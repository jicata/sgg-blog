import './SectionLabel.css'

interface SectionLabelProps{
    children: React.ReactNode;
}

const SectionLabel = ({children} : SectionLabelProps) => {
    return (
        <span className="section-label">
            — {children}
        </span>
    )
}

export default SectionLabel;
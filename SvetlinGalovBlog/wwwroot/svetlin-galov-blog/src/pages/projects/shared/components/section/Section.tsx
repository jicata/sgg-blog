import './Section.css'
import SectionLabel from "./section-label/SectionLabel.tsx";

interface SectionProps {
    label: string;
    children: React.ReactNode;
}

const Section = ({label, children} : SectionProps) => {
    return (
        <section className="section">
            <SectionLabel>{label}</SectionLabel>
            {children}
        </section>
    )
}

export default Section;
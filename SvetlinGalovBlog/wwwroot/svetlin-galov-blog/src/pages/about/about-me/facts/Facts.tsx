import './Facts.css'
import SectionLabel from "../../../projects/shared/components/section/section-label/SectionLabel.tsx";

const facts = [
    {
        factLabel: 'Based in',
        factContent: 'Sofia, Bulgaria, remote-first'
    },
    {
        factLabel: 'Languages',
        factContent: 'Bulgarian (native), English (fluent), Spanish (A2), Danish (A1)'
    },
    {
        factLabel: 'Studies',
        factContent: 'Multimedia Design & Communications BA, Practical Software Engineering Diploma'
    },
    {
        factLabel: 'Off the clock',
        factContent: 'Raising a family, Building & Construction DIY, Gardening, Hiking, Playing the guitar'
    },
]

const Facts = () => {
    return (
        <div className="facts">
            {facts.map((fact, index) => {
                return (
                    <div className="fact" key={index}>
                        <span className={"fact-label"}>{fact.factLabel}</span>
                        <span className={"fact-content"}>{fact.factContent}</span>
                    </div>
                )
            })}
        </div>
    )
}
export default Facts
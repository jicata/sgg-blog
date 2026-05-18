import './CoreSkillsHeading.css'
import SectionLabel from "../../../projects/shared/components/section/section-label/SectionLabel.tsx";

const CoreSkillsHeading = () => {
    return (
        <div className="core-skills__heading">
            <SectionLabel>What I do</SectionLabel>
            <h2 className="core-skills__heading-text">Here's <span className={"highlighted"}>what
                I actually do</span> all day</h2>
            <p className="core-skill__subheading">
                Basically my excuse to nerd out about systems, pixels, and AI, while pretending it's all very serious
                professional work.
            </p>
        </div>
    )
}
export default CoreSkillsHeading
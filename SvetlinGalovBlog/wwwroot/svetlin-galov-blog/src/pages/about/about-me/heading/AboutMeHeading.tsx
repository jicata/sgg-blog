import './AboutMeHeading.css'
import SectionLabel from "../../../projects/shared/components/section/section-label/SectionLabel.tsx";

const AboutMeHeading = () => {
    return (
        <div className="about-me-heading">
            <SectionLabel>Nice to meet you</SectionLabel>
            <h2 className="about-me-heading__heading-text">Beyond the <span className={"highlighted"}>portfolio</span>
            </h2>
            <img className="about-me-heading__img" src="public/man-at-comp.jpg"/>
        </div>
    )
}
export default AboutMeHeading
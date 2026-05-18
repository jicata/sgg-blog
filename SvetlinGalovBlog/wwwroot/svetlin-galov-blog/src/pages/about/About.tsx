import './About.css'
import MaxWidthWrapper from "../../components/MaxWidthWrapper/max-width-wrapper.tsx";
import CoreSkills from "./core-skills/CoreSkills.tsx";
import AboutMe from "./about-me/AboutMe.tsx"; 

const About = () => {
    return (
        <MaxWidthWrapper>
            <CoreSkills />
            <AboutMe />
        </MaxWidthWrapper>
    )
}
export default About
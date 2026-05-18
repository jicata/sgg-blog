import './AboutMe.css'
import AboutMeHeading from "./heading/AboutMeHeading.tsx";
import Facts from "./facts/Facts.tsx";

const AboutMe = () => {
    return (
        <header className="about-me-header">
            <AboutMeHeading/>
            <p>I'm curious about how things work, products, teams, technology, people. That curiosity is probably why I
                ended up in UX in the first place, and why I keep trying to solve people's problems.</p>
            <p>
                Outside of design, I recharge in many creative ways. And yes, I genuinely enjoy organizing component
                libraries. Some people relax with meditation. I refactor tokens.
            </p>
            <Facts />
        </header>
    )
}
export default AboutMe
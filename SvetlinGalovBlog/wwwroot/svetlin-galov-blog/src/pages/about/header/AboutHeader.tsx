import './AboutHeader.css'
import MaxWidthWrapper from "../../../components/MaxWidthWrapper/max-width-wrapper.tsx";

const AboutHeader = () => {
    return (
        <header className="about-header">
            <MaxWidthWrapper>
                <h1 className="about-header__heading">
                    Hi there! I'm Svetlin.
                </h1>
                <p className="about-header__paragraph">I’m a Fullstack Tech Lead with nearly a decade of experience designing and building distributed systems in .NET and the cloud.</p>
                <p className="about-header__paragraph">I design and create enterprise level solutions. APIs, messaging systems, infrastructure, databases and the architecture that keeps complex products running.</p>
                <p className="about-header__paragraph">These days I lead international teams, overseeing the full SDLC, while still spending most of my time doing what I do best: producing clean, maintainable and scalable architectural solutions that solve difficult technical problems.</p>
            </MaxWidthWrapper>
        </header>
    )
}
export default AboutHeader
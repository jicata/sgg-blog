import './CoreSkills.css'
import CoreSkillsHeading from "./heading/CoreSkillsHeading.tsx";
import Cluster from "../../projects/shared/components/cluster/Cluster.tsx";
import TextCard from "../../projects/details/mdx-components/text-card/TextCard.tsx";
import Tags from "../../projects/shared/components/tags/Tags.tsx";
import CoreSkillCard from "./core-skill-card/CoreSkillCard.tsx";
import Stack from "../../projects/shared/components/Stack/Stack.tsx"; 

const skills = [
    {
        heading: "Backend & Database Design",
        content: "Turning ambiguous problems into clear, structured interfaces. I work across the full product lifecycle, from early discovery to polished interactions, always optimizing for the people who'll actually use the thing",
        tags: ["stuff", "uh yeah"]
    },
    {
        heading: "Backend & Database Design",
        content: "Turning ambiguous problems into clear, structured interfaces. I work across the full product lifecycle, from early discovery to polished interactions, always optimizing for the people who'll actually use the thing",
        tags: ["stuff", "uh yeah"]
    },
    {
        heading: "Backend & Database Design",
        content: "Turning ambiguous problems into clear, structured interfaces. I work across the full product lifecycle, from early discovery to polished interactions, always optimizing for the people who'll actually use the thing",
        tags: ["stuff", "uh yeah"]
    },
    {
        heading: "Backend & Database Design",
        content: "Turning ambiguous problems into clear, structured interfaces. I work across the full product lifecycle, from early discovery to polished interactions, always optimizing for the people who'll actually use the thing",
        tags: ["stuff", "uh yeah"]
    }
]

const CoreSkills = () => {
    return (
        <section className="core-skills">
           <CoreSkillsHeading/>
            <Stack>
                {skills.map((skill, index) => (
                    <CoreSkillCard
                        key={index}
                        heading={skill.heading}
                        content = {skill.content}>
                        <Tags items={skill.tags}>
                        </Tags>
                    </CoreSkillCard>
                ))}
            </Stack>
        </section>
    )
}
export default CoreSkills
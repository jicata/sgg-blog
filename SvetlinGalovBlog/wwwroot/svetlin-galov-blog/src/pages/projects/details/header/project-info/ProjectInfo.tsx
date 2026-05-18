import Tags from "../../../shared/components/tags/Tags.tsx";
import ShortInfo from "../../../list/project/short-info/ShortInfo.tsx";

interface ProjectInfoProps{
    tags: string[];
    name: string;
    country: string;
    impact: string;
    when: string;
}

const ProjectInfo = ({tags, name, country, impact, when} : ProjectInfoProps) => {
    return (
        <div className={"project-details-info"}>

            <Tags items={tags}/>
            <h1>{name}</h1> 
            <ShortInfo country={country} impact={impact} when={when} />
        </div>
    )
}

export default ProjectInfo;
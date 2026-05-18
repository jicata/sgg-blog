import {Project, ProjectShort} from "../../types/project.ts";

const allProjects: Project[] = [
    {
        name: "Software University",
        position: "Backend Developer",
        country: "Bulgaria",
        impact: "Europe",
        when: "2017-2020",
        imgSrc: "/projects/softuni.png",
        overview: "Mauris volutpat, risus et pulvinar lacinia, tellus elit eleifend augue, et tempor eros diam porttitor magna.",
        achievements: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Aenean faucibus egestas erat, eget placerat neque.",
            "Duis eget facilisis augue."
        ],
        tags: [".NET Framework", "Javascript", "SQL", "C#"],
        slug: "softuni"
    },
    {
        name: "Dow Jones",
        position: "Senior Software Engineer",
        country: "Bulgaria",
        impact: "Global",
        when: "2020-2023",
        imgSrc: "/projects/dowjones.png",
        overview: "Mauris volutpat, risus et pulvinar lacinia, tellus elit eleifend augue, et tempor eros diam porttitor magna.",
        achievements: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Aenean faucibus egestas erat, eget placerat neque.",
            "Duis eget facilisis augue."
        ],
        tags: ["Cloud", "AWS", ".NET Core", "Rabbit MQ", "Terraform"],
        slug: "dowjones"
    },
    {
        name: "VSG Bulgaria",
        position: "Techical Lead",
        country: "Bulgaria",
        impact: "USA",
        when: "2023-Present",
        imgSrc: "/projects/vsg.png",
        overview: "Mauris volutpat, risus et pulvinar lacinia, tellus elit eleifend augue, et tempor eros diam porttitor magna.",
        achievements: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Aenean faucibus egestas erat, eget placerat neque.",
            "Duis eget facilisis augue."
        ],
        tags: [
            "Cloud",
            "GCP",
            "Team Lead",
            ".NET Core",
            "Pub/Sub",
            "SQL"
        ],
        slug: "vsg"
    },
];

const allProjectsShort: ProjectShort[] = [
    {
        slug: "vsg",
        title: "VSG Bulgaria",
    },
    {
        slug: "dowjones",
        title: "Dow Jones",
    },
    {
        slug: "softuni",
        title: "Software University",
    }
];


const getAll = async (): Promise<Project[]> => {
    return allProjects;
}

const getBySlug = async (slug: string): Promise<Project> => {
    const projectBySlug = allProjects.find(c => c.slug === slug);

    if (!projectBySlug) {
        throw new Error(`Project with slug ${slug} not found`);
    }

    return projectBySlug;
}

const getShortBySlug = async (slug: string): Promise<ProjectShort> => {
    const projectBySlug = allProjectsShort.find(c => c.slug === slug);

    if (!projectBySlug) {
        throw new Error(`Project with slug ${slug} not found`);
    }

    return projectBySlug;
}

const getAllProjectsShort = async ():Promise<ProjectShort[]> => {
    return allProjectsShort;
}

export const projectsApi = {getBySlug, getAll, getShortBySlug, getAllProjectsShort};

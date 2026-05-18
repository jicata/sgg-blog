import { useQuery } from '@tanstack/react-query';
import { projectsApi} from "../services/api/projectsApi.ts";

const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: projectsApi.getAll,
    })
}

const useProjectBySlug = (slug: string) => {
    return useQuery({
        queryKey: ['projects', slug],
        queryFn: () =>  projectsApi.getBySlug(slug)
    })
}

const useProjectShortBySlug = (slug: string) => {
    return useQuery({
        queryKey: ['projectsShort', slug],
        queryFn: () => projectsApi.getShortBySlug(slug),
    });
};

const useProjectsShort = () => {
    return useQuery({
        queryKey: ['projectsShort'],
        queryFn: () => projectsApi.getAllProjectsShort()
    })
}


export
{
    useProjects, 
    useProjectsShort,
    useProjectBySlug,
    useProjectShortBySlug
};
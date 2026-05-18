import React from "react";

export interface Project {
    name: string;
    position: string;
    country: string;
    impact: string;
    when: string;
    overview: string;
    achievements: string[];
    tags: string[];
    imgSrc: string;
    slug: string;
}

export interface ProjectShort {
    slug: string;
    title: string;
}
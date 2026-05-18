import {createRoot} from 'react-dom/client'
import {StrictMode} from "react";
import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider} from 'react-router-dom';
import './main.css';
import MainLayout from "./layouts/MainLayout.tsx";
import HomePage from "./pages/home/HomePage.jsx";
import Contact from "./pages/contact/contact.jsx";
import ArticlePage from "./pages/article/ArticlePage.jsx";
import ProjectsList from "./pages/projects/list/ProjectsList.tsx";
import ProjectDetails from "./pages/projects/details/ProjectDetails.tsx";
import ProjectDetailsLayout from "./layouts/projects/ProjectDetailsLayout.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import About from "./pages/about/About.tsx";
import AboutLayout from "./layouts/about/AboutLayout.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        element: <BaseLayout />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    { path: "/", element: <HomePage /> },
                    { path: "/contact", element: <Contact /> },
                    { path: "/article", element: <ArticlePage /> },
                    { path: "/projects", element: <ProjectsList /> },
                    { path: "/AboutMe", element: <About /> },
                ],
            },
            {
                element: <ProjectDetailsLayout />,
                children: [
                    { path: "/projects/:name", element: <ProjectDetails /> },
                ],
            },
            {
                element: <AboutLayout />,
                children: [
                    { path: "/about", element: <About /> },
                ],
            },
        ],
    },
]);
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
)
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import MainLayout from './layouts/MainLayout.tsx';
import HomePage from './pages/home/HomePage';
import Contact from './pages/contact/contact.jsx';
import ProjectsList from './pages/projects/list/ProjectsList.tsx';
import ProjectDetails from './pages/projects/details/ProjectDetails.tsx';
import ProjectDetailsLayout from './layouts/projects/ProjectDetailsLayout.tsx';
import BaseLayout from './layouts/BaseLayout.tsx';
import About from './pages/about/About.tsx';
import AboutLayout from './layouts/about/AboutLayout.tsx';
import NotFoundPage from './pages/not-found/NotFoundPage.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        element: <BaseLayout />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    { path: '/', element: <HomePage /> },
                    { path: '/contact', element: <Contact /> },
                    { path: '/projects', element: <ProjectsList /> },
                ],
            },
            {
                element: <ProjectDetailsLayout />,
                children: [
                    { path: '/projects/:name', element: <ProjectDetails /> },
                ],
            },
            {
                element: <AboutLayout />,
                children: [
                    { path: '/about', element: <About /> },
                ],
            },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    </StrictMode>
);
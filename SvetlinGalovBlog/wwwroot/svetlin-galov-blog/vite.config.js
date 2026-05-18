import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

export default defineConfig({
    plugins: [
        { enforce: 'pre', ...mdx({ providerImportSource: '@mdx-js/react' }) },
        react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    ],
    build: {
        // Output directly into the .NET host's wwwroot so UseStaticFiles() serves it.
        // The .csproj PublishSpa target runs `npm run build` from the SPA directory,
        // so `../` resolves to SvetlinGalovBlog/wwwroot/ at publish time.
        outDir: '../',
        emptyOutDir: false,
    },
})
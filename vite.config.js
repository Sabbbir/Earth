// vite.config.js

import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    plugins: [
        glsl({
            // By default, this plugin handles .glsl, .vs, .fs extensions
            // You can specify additional options if needed
            // include: '**/*.glsl',
        }),
    ],
});

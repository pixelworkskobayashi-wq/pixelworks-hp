// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import fs from 'fs';

const LOCAL_WORKS_DIR = 'D:/Pixel Works/HP2026/works';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [{
      name: 'local-works-images',
      configureServer(server) {
        server.middlewares.use('/works', (req, res, next) => {
          const filePath = path.join(LOCAL_WORKS_DIR, req.url || '');
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });
      }
    }]
  }
});

// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import fs from 'fs';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.xml':  'application/xml',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.css':  'text/css',
  '.ico':  'image/x-icon',
  '.exr':  'application/octet-stream',
  '.pcd':  'application/octet-stream',
  '.mtl':  'model/mtl',
  '.obj':  'model/obj',
};

const LOCAL_WORKS_DIR = 'D:/Pixel Works/HP2026/works';
const LOCAL_VR_D5_DIR  = 'D:/Pixel Works/HP2026/works/vr/D5VirtualTour_473196/_Resource';
const LOCAL_VR_D5B_DIR = 'D:/Pixel Works/HP2026/works/vr/D5VirtualTour_2adb17/_Resource';
const LOCAL_VR_D5C_DIR = 'D:/Pixel Works/HP2026/works/vr/D5VirtualTour_545cb3/_Resource';
const LOCAL_VR_D5D_DIR = 'D:/Pixel Works/HP2026/works/vr/D5VirtualTour_6512c2/_Resource';
const LOCAL_VR_D5E_DIR  = 'D:/Pixel Works/HP2026/works/vr/D5VirtualTour_361d45/_Resource';
const LOCAL_PHOTO_DIR   = 'D:/Pixel Works/HP2026/works/photo';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [{
      name: 'local-works-images',
      configureServer(server) {
        server.middlewares.use('/photo', (req, res, next) => {
          const urlPath = decodeURIComponent((req.url || '').split('?')[0]);
          const filePath = path.join(LOCAL_PHOTO_DIR, urlPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mime = MIME_TYPES[ext] || 'application/octet-stream';
            res.setHeader('Content-Type', mime);
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });

        server.middlewares.use('/works', (req, res, next) => {
          const filePath = path.join(LOCAL_WORKS_DIR, req.url || '');
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });

        server.middlewares.use('/vr/d5tour', (req, res, next) => {
          const urlPath = (req.url || '').split('?')[0];
          const filePath = path.join(LOCAL_VR_D5_DIR, urlPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mime = MIME_TYPES[ext] || 'application/octet-stream';
            res.setHeader('Content-Type', mime);
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });

        server.middlewares.use('/vr/d5tour2', (req, res, next) => {
          const urlPath = (req.url || '').split('?')[0];
          const filePath = path.join(LOCAL_VR_D5B_DIR, urlPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mime = MIME_TYPES[ext] || 'application/octet-stream';
            res.setHeader('Content-Type', mime);
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });

        server.middlewares.use('/vr/d5tour3', (req, res, next) => {
          const urlPath = (req.url || '').split('?')[0];
          const filePath = path.join(LOCAL_VR_D5C_DIR, urlPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mime = MIME_TYPES[ext] || 'application/octet-stream';
            res.setHeader('Content-Type', mime);
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });

        server.middlewares.use('/vr/d5tour4', (req, res, next) => {
          const urlPath = (req.url || '').split('?')[0];
          const filePath = path.join(LOCAL_VR_D5D_DIR, urlPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mime = MIME_TYPES[ext] || 'application/octet-stream';
            res.setHeader('Content-Type', mime);
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });

        server.middlewares.use('/vr/d5tour5', (req, res, next) => {
          const urlPath = (req.url || '').split('?')[0];
          const filePath = path.join(LOCAL_VR_D5E_DIR, urlPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mime = MIME_TYPES[ext] || 'application/octet-stream';
            res.setHeader('Content-Type', mime);
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

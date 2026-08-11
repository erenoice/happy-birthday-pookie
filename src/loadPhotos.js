/* Loads every image in src/assets/photos/ so you can reference them by
   filename in content.js. You don't need to edit this file. */

const modules = import.meta.glob('./assets/photos/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP, HEIC}', {
  eager: true,
  import: 'default',
});

const photos = {};
for (const path in modules) {
  const name = path.split('/').pop();
  photos[name] = modules[path];
}

export function getPhoto(filename) {
  if (!filename) return null;
  return photos[filename] || null;
}

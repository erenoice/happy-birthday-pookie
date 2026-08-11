# 🎂 A Birthday Site 💛

A little scrolling scrapbook to wish someone the happiest birthday — colorful,
playful, and full of your own photos and words. Built with **React + Vite**
(the front-end of your MERN stack). No database, no back-end, nothing to set up
beyond `npm install`.

---

## ▶️ Run it (3 steps)

You'll need [Node.js](https://nodejs.org) installed (v18+).

```bash
npm install      # installs React + Vite
npm run dev      # starts the site — opens at http://localhost:5173
```

That's it. Leave `npm run dev` running and the page reloads every time you save a file.

---

## ✏️ Make it yours

Everything you'd want to change lives in **two places**:

### 1. The words → `src/content.js`
Open it and edit the text: his name, your name, the letter, the list of reasons,
your story, the birthday wish, the cities, the closing. It's all commented so you
know what each bit does. **This is the only file you really need to touch.**

### 2. The photos → `src/assets/photos/`
1. Drop your image files into that folder (jpg / png / webp).
2. In `content.js`, put each file's **exact name** in a `file:` field.

The file names it's already looking for are: `hero.jpg`, `us1.jpg` … `us6.jpg`.
Rename your photos to match those, **or** change the names in `content.js` — either works.
Any photo you haven't added yet just shows a friendly placeholder box, so the site
always looks fine while you're still gathering pictures.

> 💡 Portrait (tall) photos fit the frames best.

### Bonus touches
- **Long-distance countdown:** in `content.js → distance.reunionDate`, set the date
  you'll next see each other (like `"2026-09-15"`) to show a live "X days until…" counter.
- **Colors:** to re-skin the whole thing, change the palette values at the top of
  `src/styles.css` (the `--tomato`, `--blush`, etc. lines).
- **Tab title:** change `<title>` in `index.html`.

---

## 🚀 Sending it to him

Once it looks perfect locally, publish it free so he can open a link:

```bash
npm run build        # creates a "dist" folder
```

Then drag-and-drop that `dist` folder onto **[Netlify Drop](https://app.netlify.com/drop)**
or **[Vercel](https://vercel.com)** — you'll get a shareable link in seconds. 🎉

---

Made with love. Go make his day. 💛

/* =========================================================================
   content.js  💛  THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Change the words below to your own. Add photos by:
     1. dropping image files into  src/assets/photos/
     2. writing the exact file name in the "file" fields below
   (If a photo isn't there yet, the site shows a cute placeholder instead —
    so nothing breaks while you're still gathering pictures.)
   ========================================================================= */

const content = {
  // --- the basics ---
  names: {
    him: "Pookiiee",        
    me: "Your Pookiee", 
  },

  // --- HERO (the very top) ---
  hero: {
    eyebrow: "a little something, from me to you",
    subtitle:
      "I couldn't be there today, so I built you a whole tiny corner of the internet instead. Scroll slowly — it's all yours.",
    photoFile: "hero.jpg",     // a favorite photo of him (or of you two). Optional.
    badge: "it's your day",
  },

  // --- LETTER (a note from you) ---
  letter: {
    heading: "a note, before anything else",
    paragraphs: [
      "Happy birthday to my favorite person. I keep starting this note and deleting it because there's too much to say and not enough words that feel big enough.",
      "So here's the short version: I'm sooo sooooo grateful to have youuu Bitchemm. On the days that are easy and the ones that really aren't, I'd pick you every single time.",
      "I wish I could hand you this in person with cake and my terrible singing. But for now, this little site will have to do the hugging for me:(",
    ],
    signoff: "all my love, always",   // shows above your name in handwriting
  },

  // --- GALLERY (your scrapbook of photos) ---
  gallery: {
    heading: "us, in no particular order",
    lead: "A few of my favorites.",
    photos: [
      { file: "us1.jpg", caption: "the day it all started" },
      { file: "us2.jpg", caption: "us, being ridiculous" },
      { file: "us3.jpg", caption: "you slaying" },
      { file: "us4.jpg", caption: "that trip" },
      { file: "us5.jpg", caption: "golden hour, you & your gorgeous mom<3" },
      { file: "us6.jpg", caption: "just because" },
    ],
  },

  // --- REASONS (things you adore about him) ---
  reasons: {
    heading: "reasons I'm obsessed with you",
    lead: "A non-exhaustive, extremely biased list.",
    items: [
      "The way you laugh. I love your smile and laugh bitchhh",
      "You always think of me before even yourself (you shouldn't btw)",
      "You remember the tiny things I mention once and forgot about them myself",
      "Your big big hands:)",
      "You make ordinary Tuesdays feel so much more special.",
      "You, generally. The whole package. Ridiculous.",
    ],
  },

  // --- TIMELINE (your story so far) ---
  timeline: {
    heading: "our story so far",
    lead: "The greatest hits.",
    items: [
      { emoji: "✨", date: "the beginning", title: "we met", text: "and I had absolutely no idea what was coming." },
      { emoji: "☕", date: "early days", title: "talks all night", text: "We'd stay up all night just purely talking.. we were crazy even back then!" },
      { emoji: "🏙️", date: "somewhere in the middle", title: "we fell more in love", text: "dekhte dekhte saalo beet gye saath and humesha aise feel hota tha that we;ve know each other since childhood!" },
      { emoji: "💛", date: "today", title: "your birthday", text: "another year of you. My favorite thing!!" },
    ],
  },

  // --- MAKE A WISH (the interactive cake) ---
  wish: {
    heading: "okay — make a wish",
    hint: "click the ALL candles to blow them out 🎂",
    secret:
      "My wish is already used up on getting to do life with you. So use yours on something big!!",
  },

  // --- DISTANCE (because you can't be there) ---
  distance: {
    heading: "we're a little far apart today",
    lead: "But only on the map.",
    me: { city: "Chennai :(", emoji: "📍" },
    him: { city: "Delhi :(", emoji: "📍" },
    note: "Distance is just the boring part between the good parts.",
    // OPTIONAL: set a date you'll see each other again for a live countdown.
    // Format: "YYYY-MM-DD". Leave as null to hide the countdown.
    reunionDate: null,   // e.g. "2026-09-15"
  },

  // --- CLOSING (the big finish) ---
  closing: {
    big: "Happy birthday, you. Here's to you, and to us, and to every ordinary day I get to spend loving you.",
    button: "one more surprise",
    signoff: "with all the love,",
  },
};

export default content;

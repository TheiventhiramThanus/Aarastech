import path from "node:path";
import { mkdir, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAb5zcAO7ols-2KHFeq-ET4udpYZWGHQd8",
  authDomain: "aarastech-e455d.firebaseapp.com",
  projectId: "aarastech-e455d",
  storageBucket: "aarastech-e455d.appspot.com",
  messagingSenderId: "993187056747",
  appId: "1:993187056747:web:4b88b0fa61ad2f7d1bb52e",
  measurementId: "G-P787KLEGDV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadBlogModule() {
  const outdir = path.resolve(".tmp");
  const outfile = path.join(outdir, "blogPosts.bundle.mjs");
  await mkdir(outdir, { recursive: true });
  await build({
    entryPoints: [path.resolve("src/app/data/blogPosts.ts")],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    logLevel: "silent",
  });

  return import(`${pathToFileURL(outfile).href}?t=${Date.now()}`);
}

function toContentText(content) {
  return content
    .map((block) => block.heading ? `${block.heading}\n${block.body}` : block.body)
    .join("\n\n");
}

async function deleteCollection(collectionName) {
  const snap = await getDocs(collection(db, collectionName));
  if (snap.empty) return 0;

  let deleted = 0;
  for (let i = 0; i < snap.docs.length; i += 450) {
    const batch = writeBatch(db);
    snap.docs.slice(i, i + 450).forEach((entry) => {
      batch.delete(entry.ref);
      deleted += 1;
    });
    await batch.commit();
  }

  return deleted;
}

async function writePosts(posts) {
  let written = 0;
  for (let i = 0; i < posts.length; i += 450) {
    const batch = writeBatch(db);
    posts.slice(i, i + 450).forEach(({ id, content, ...post }) => {
      batch.set(doc(db, "blog_posts", post.slug), {
        ...post,
        status: "Published",
        views: id === 1 ? 1205 : 0,
        contentText: toContentText(content),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      written += 1;
    });
    await batch.commit();
  }

  return written;
}

const { blogPosts } = await loadBlogModule();
const deleted = await deleteCollection("blog_posts");
const written = await writePosts(blogPosts);
await rm(path.resolve(".tmp"), { recursive: true, force: true });

console.log(`Deleted ${deleted} old blog_posts documents.`);
console.log(`Saved ${written} merged blog posts to Firestore.`);

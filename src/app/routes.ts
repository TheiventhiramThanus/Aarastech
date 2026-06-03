import { createBrowserRouter, redirect } from "react-router";
import { lazy } from "react";
import { Layout } from "./Layout";

const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then((module) => ({ default: module.AboutPage })));
const ServicesPage = lazy(() => import("./pages/ServicesPage").then((module) => ({ default: module.ServicesPage })));
const BlogPage = lazy(() => import("./pages/BlogPage").then((module) => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage").then((module) => ({ default: module.BlogPostPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((module) => ({ default: module.ContactPage })));
const CommunityPage = lazy(() => import("./pages/CommunityPage").then((module) => ({ default: module.CommunityPage })));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:slug", Component: BlogPostPage },
      { path: "contact", Component: ContactPage },
      { path: "community", Component: CommunityPage },
      { path: "login", Component: () => null },
      { path: "dashboard", Component: () => null },
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);

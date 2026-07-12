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
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage").then((module) => ({ default: module.PrivacyPolicyPage })));
const TermsConditionsPage = lazy(() => import("./pages/TermsConditionsPage").then((module) => ({ default: module.TermsConditionsPage })));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicyPage").then((module) => ({ default: module.CookiePolicyPage })));
const DisclaimerPage = lazy(() => import("./pages/DisclaimerPage").then((module) => ({ default: module.DisclaimerPage })));

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
      { path: "resources", loader: () => redirect("/blog") },
      { path: "resources/:slug", loader: ({ params }) => redirect(`/blog/${params.slug}`) },
      { path: "contact", Component: ContactPage },
      { path: "community", Component: CommunityPage },
      { path: "privacy-policy", Component: PrivacyPolicyPage },
      { path: "terms-and-conditions", Component: TermsConditionsPage },
      { path: "terms", loader: () => redirect("/terms-and-conditions") },
      { path: "cookie-policy", Component: CookiePolicyPage },
      { path: "disclaimer", Component: DisclaimerPage },
      { path: "login", loader: () => redirect("/") },
      { path: "dashboard", loader: () => redirect("/") },
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);

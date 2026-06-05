import { DEFAULT_OG_IMAGE } from "../lib/seo";

export type ResourcePage = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  audience: string;
  readTime: string;
  date: string;
  color: string;
  image: string;
  keywords: string[];
  quickAnswer: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  links: { label: string; href: string; note: string }[];
};

export const resourcePages: ResourcePage[] = [
  {
    id: 1,
    slug: "top-50-free-certificate-courses-2026",
    title: "Top 50 Free Certificate Courses 2026",
    excerpt: "A practical starting list of official platforms where students can find free learning paths, badges, and certificate-style credentials.",
    category: "Certificates",
    audience: "Students and beginners",
    readTime: "9 min read",
    date: "5 Jun 2026",
    color: "#0697A7",
    image: DEFAULT_OG_IMAGE,
    keywords: ["free certificate courses 2026", "free online courses", "free certificates for students"],
    quickAnswer: "Start with official platforms such as Microsoft Learn, Google Cloud Skills Boost, IBM SkillsBuild, AWS Skill Builder, freeCodeCamp, Kaggle Learn, Cisco Networking Academy, and LinkedIn Learning trials where available. Always verify certificate availability on the provider page before starting.",
    sections: [
      {
        heading: "Best places to start",
        body: "Free certificate hunting works best when you focus on official education platforms instead of random download sites. The safest route is to pick a platform, complete one learning path, add the credential or project to your LinkedIn profile, and then move to the next path.",
        bullets: ["Microsoft Learn for Azure, AI, data, and fundamentals", "Google Cloud Skills Boost for cloud and AI labs", "IBM SkillsBuild for AI, workplace, and technology skills", "AWS Skill Builder for cloud and generative AI basics", "freeCodeCamp for long-form coding certifications"],
      },
      {
        heading: "How to avoid wasting time",
        body: "Not every free course includes a certificate, and some platforms use badges, trophies, or completion records instead. That is still useful if the learning is strong, but you should check the outcome before spending hours on a course.",
        bullets: ["Look for certificate, badge, credential, or completion wording", "Check whether the course is free in your country", "Avoid pages asking for payment to unlock an official student benefit"],
      },
      {
        heading: "Portfolio value",
        body: "Certificates help you get noticed, but projects prove skill. For every course you complete, build one small output: a landing page, GitHub repo, dashboard, chatbot, design case study, or automation workflow.",
      },
    ],
    links: [
      { label: "Microsoft Learn", href: "https://learn.microsoft.com/training/", note: "Official Microsoft training paths and credentials." },
      { label: "Google Cloud Skills Boost", href: "https://www.cloudskillsboost.google/paths", note: "Official Google Cloud learning paths and labs." },
      { label: "IBM SkillsBuild", href: "https://skillsbuild.org/", note: "Free skills, courses, and credentials from IBM." },
      { label: "AWS Skill Builder", href: "https://skillbuilder.aws/", note: "Official AWS digital courses and learning plans." },
      { label: "freeCodeCamp Learn", href: "https://www.freecodecamp.org/learn/", note: "Free coding curriculum and certifications." },
    ],
  },
  {
    id: 2,
    slug: "microsoft-ai-skills-complete-guide",
    title: "Microsoft AI Skills Complete Guide",
    excerpt: "How students can use Microsoft Learn to build AI, Azure, Copilot, and data skills with official learning paths.",
    category: "AI Courses",
    audience: "AI beginners",
    readTime: "7 min read",
    date: "5 Jun 2026",
    color: "#7c3aed",
    image: DEFAULT_OG_IMAGE,
    keywords: ["Microsoft AI skills", "Microsoft Learn AI", "free Microsoft AI courses"],
    quickAnswer: "Use Microsoft Learn for official AI, Azure, Copilot, and data fundamentals training. Start with beginner learning paths, complete modules consistently, then build a small project that demonstrates what you learned.",
    sections: [
      {
        heading: "What to learn first",
        body: "If you are new to AI, do not jump straight into advanced architecture. Start with AI fundamentals, responsible AI, prompt engineering, Azure AI services, and basic data concepts. This gives you vocabulary and confidence before certification-level study.",
      },
      {
        heading: "Student workflow",
        body: "A simple weekly plan works well: complete two Microsoft Learn modules, take notes in public, and publish one mini-demo. That mini-demo could be a chatbot prompt flow, image analysis example, or AI-powered productivity workflow.",
        bullets: ["Week 1: AI fundamentals", "Week 2: Responsible AI and prompt basics", "Week 3: Azure AI services overview", "Week 4: Build and publish a mini project"],
      },
      {
        heading: "How to show proof",
        body: "Use your Microsoft Learn profile, LinkedIn featured section, GitHub README, and portfolio website to show progress. Recruiters care more when your learning is connected to visible work.",
      },
    ],
    links: [
      { label: "Microsoft Learn", href: "https://learn.microsoft.com/training/", note: "Official Microsoft training home." },
      { label: "Microsoft AI learning hub", href: "https://learn.microsoft.com/training/ai/", note: "AI-focused Microsoft Learn content." },
      { label: "Microsoft Certifications", href: "https://learn.microsoft.com/credentials/", note: "Official credentials and exam paths." },
    ],
  },
  {
    id: 3,
    slug: "best-free-ai-courses-for-students",
    title: "Best Free AI Courses for Students",
    excerpt: "A beginner-friendly roadmap for learning AI using official free course platforms and project-based practice.",
    category: "AI Courses",
    audience: "Students",
    readTime: "8 min read",
    date: "5 Jun 2026",
    color: "#10b981",
    image: DEFAULT_OG_IMAGE,
    keywords: ["best free AI courses", "free AI courses for students", "AI learning roadmap"],
    quickAnswer: "The best free AI course stack for students is: Microsoft Learn for fundamentals, Google Cloud Skills Boost for practical labs, IBM SkillsBuild for AI literacy, Kaggle Learn for machine learning practice, and freeCodeCamp for coding foundations.",
    sections: [
      {
        heading: "Pick one goal first",
        body: "AI is too wide to learn randomly. Choose one track: AI for productivity, AI for coding, machine learning, data science, cloud AI, or AI app development. Your course choices become clearer once the goal is clear.",
      },
      {
        heading: "Recommended sequence",
        body: "Start with high-level AI literacy, then move into Python and data, then cloud AI tools, then a project. This order helps you understand both concepts and implementation.",
        bullets: ["AI literacy and responsible AI", "Python basics", "Data handling and notebooks", "Machine learning fundamentals", "One deployed AI mini project"],
      },
      {
        heading: "Project ideas",
        body: "Students should build small but complete projects: a study planner chatbot, resume analyzer, AI notes summarizer, image caption demo, or FAQ bot for a local business. These are easier to explain than abstract certificates.",
      },
    ],
    links: [
      { label: "IBM SkillsBuild AI", href: "https://skillsbuild.org/adult-learners/explore-learning/artificial-intelligence", note: "Free AI learning journeys from IBM." },
      { label: "Kaggle Learn", href: "https://www.kaggle.com/learn", note: "Short practical data and ML courses." },
      { label: "Google Cloud AI training", href: "https://cloud.google.com/training/machinelearning-ai", note: "Google Cloud AI and ML training." },
      { label: "freeCodeCamp", href: "https://www.freecodecamp.org/learn/", note: "Coding foundations and certifications." },
    ],
  },
  {
    id: 4,
    slug: "how-to-get-linkedin-premium-free-student-guide",
    title: "How to Get LinkedIn Premium Free as a Student",
    excerpt: "Legitimate ways to check student promotions, free trials, and career bundles without falling for reseller scams.",
    category: "Student Benefits",
    audience: "University students",
    readTime: "6 min read",
    date: "5 Jun 2026",
    color: "#0A66C2",
    image: DEFAULT_OG_IMAGE,
    keywords: ["LinkedIn Premium free student", "LinkedIn Premium free trial", "student career tools"],
    quickAnswer: "The legitimate ways to get LinkedIn Premium free are through official LinkedIn trials, verified student promotions, or partner offers. Do not buy access from resellers or share your LinkedIn login with anyone.",
    sections: [
      {
        heading: "Start with official pages",
        body: "LinkedIn Premium offers and trials change by account, country, and eligibility. The safest approach is to check the official Premium page and your own LinkedIn account upgrade screen.",
      },
      {
        heading: "Student promotions",
        body: "Some student offers may be run through Microsoft, LinkedIn, or verified education partners. Read renewal terms carefully because free promotional access can convert into a paid subscription after the offer period.",
        bullets: ["Confirm eligibility on the official page", "Read renewal and cancellation terms", "Use your own account only", "Never pay a third party for a free student offer"],
      },
      {
        heading: "What to do once you get access",
        body: "Use Premium to research companies, message recruiters carefully, complete LinkedIn Learning courses, and improve your profile. The goal is not the badge; it is better internship and job discovery.",
      },
    ],
    links: [
      { label: "LinkedIn Premium", href: "https://premium.linkedin.com/", note: "Official LinkedIn Premium page." },
      { label: "LinkedIn Premium Help", href: "https://www.linkedin.com/help/linkedin/answer/a545596/", note: "Official difference between free and Premium accounts." },
      { label: "LinkedIn student promo help", href: "https://www.linkedin.com/help/linkedin/answer/a9971020", note: "Official help page for Microsoft 365 student promotional offers where available." },
    ],
  },
  {
    id: 5,
    slug: "free-domain-for-students-safe-options",
    title: "Free Domain for Students: Safe Options",
    excerpt: "How students can get a domain or publish a portfolio safely using official student packs and free hosting platforms.",
    category: "Web Development",
    audience: "Students building portfolios",
    readTime: "7 min read",
    date: "5 Jun 2026",
    color: "#06b6d4",
    image: DEFAULT_OG_IMAGE,
    keywords: ["free domain for students", "student domain", "free portfolio hosting"],
    quickAnswer: "The safest free options are GitHub Student Developer Pack partner offers, GitHub Pages, Netlify subdomains, Vercel projects, and Cloudflare Pages. For a professional brand, buy a real domain when you can.",
    sections: [
      {
        heading: "Domain vs hosting",
        body: "A domain is the address. Hosting is where your website files live. Students often confuse the two. You can publish a portfolio for free using a platform subdomain first, then connect a custom domain later.",
      },
      {
        heading: "Safe free routes",
        body: "Use official student programs or reputable hosting providers. Avoid suspicious sites promising lifetime free premium domains, because they can disappear or take control of your address.",
        bullets: ["GitHub Pages for static portfolios", "Netlify or Vercel subdomains for frontend projects", "Cloudflare Pages for static deployments", "GitHub Student Developer Pack for student partner offers"],
      },
      {
        heading: "When to buy a domain",
        body: "Once your portfolio is ready, a paid .com, .dev, or country domain is often worth it. It looks more professional on resumes and is easier to remember.",
      },
    ],
    links: [
      { label: "GitHub Student Developer Pack", href: "https://github.com/education/students", note: "Official student pack and eligibility." },
      { label: "GitHub Pages", href: "https://pages.github.com/", note: "Free static site hosting from GitHub." },
      { label: "Netlify", href: "https://www.netlify.com/", note: "Frontend hosting with free project subdomains." },
      { label: "Vercel", href: "https://vercel.com/", note: "Frontend deployment platform." },
      { label: "Cloudflare Pages", href: "https://pages.cloudflare.com/", note: "Static site deployment platform." },
    ],
  },
  {
    id: 6,
    slug: "top-internship-websites-in-sri-lanka",
    title: "Top Internship Websites in Sri Lanka",
    excerpt: "A practical list of places Sri Lankan students can check for internships, trainee roles, and verified early-career opportunities.",
    category: "Careers",
    audience: "Sri Lankan students",
    readTime: "8 min read",
    date: "5 Jun 2026",
    color: "#10b981",
    image: DEFAULT_OG_IMAGE,
    keywords: ["internship websites Sri Lanka", "IT internships Sri Lanka", "software internships Sri Lanka"],
    quickAnswer: "Sri Lankan students should check company career pages, LinkedIn, topjobs, XpressJobs, ikmanJOBS, ICTA opportunities, university career offices, and trusted internship platforms. Always verify the company before applying.",
    sections: [
      {
        heading: "Best search routine",
        body: "Do not rely on one website. Check job portals, LinkedIn, company career pages, and university groups every week. Internships move quickly, and early applicants often get more responses.",
      },
      {
        heading: "Safety checks",
        body: "Internship scams exist. Be cautious if a company asks you to pay for an internship, share bank details early, or work on a large unpaid project before any interview.",
        bullets: ["Check the company website and LinkedIn page", "Search for employee profiles", "Verify email domains", "Avoid paying for internship placement", "Ask your university career office if unsure"],
      },
      {
        heading: "How to stand out",
        body: "Send a short resume, a portfolio link, GitHub projects, and a brief message explaining what you can contribute. Even one deployed project can make a beginner profile stronger.",
      },
    ],
    links: [
      { label: "ICTA Internship Program", href: "https://www.icta.lk/careers/our-internship-program/", note: "Official ICTA internship information." },
      { label: "LinkedIn Jobs", href: "https://www.linkedin.com/jobs/", note: "Search internships and entry-level roles." },
      { label: "topjobs", href: "https://www.topjobs.lk/", note: "Sri Lanka job portal." },
      { label: "XpressJobs", href: "https://www.xpress.jobs/", note: "Sri Lanka hiring platform." },
      { label: "ikmanJOBS", href: "https://ikman.lk/en/jobs", note: "Sri Lanka jobs marketplace." },
      { label: "InternLK", href: "https://www.internlk.com/", note: "Internship-focused platform." },
    ],
  },
  {
    id: 7,
    slug: "best-ai-tools-for-students",
    title: "Best AI Tools for Students",
    excerpt: "A safe, practical student guide to using AI tools for studying, coding, writing, research, and productivity.",
    category: "AI Tools",
    audience: "Students",
    readTime: "8 min read",
    date: "5 Jun 2026",
    color: "#7c3aed",
    image: DEFAULT_OG_IMAGE,
    keywords: ["best AI tools for students", "AI tools for studying", "free AI tools"],
    quickAnswer: "Useful AI tools for students include ChatGPT, Microsoft Copilot, Google Gemini, Perplexity, Notion AI, Grammarly, Canva AI, GitHub Copilot for eligible students, and coding assistants inside IDEs. Use them to learn, not to copy blindly.",
    sections: [
      {
        heading: "Use AI ethically",
        body: "AI can help you brainstorm, summarize, debug, quiz yourself, and improve writing. It should not replace your own thinking or violate university rules. Always check your institution's academic policy.",
      },
      {
        heading: "Best use cases",
        body: "Students get the most value when AI becomes a tutor, not a shortcut. Ask it to explain concepts, create practice questions, review your notes, and suggest project ideas.",
        bullets: ["Summarize lecture notes", "Create flashcards", "Explain code errors", "Generate project outlines", "Practice interview questions"],
      },
      {
        heading: "Privacy reminder",
        body: "Do not paste private student records, confidential company data, exam answers, passwords, or client information into AI tools. Treat AI chats as external services unless your school says otherwise.",
      },
    ],
    links: [
      { label: "ChatGPT", href: "https://chat.openai.com/", note: "AI assistant for learning and productivity." },
      { label: "Microsoft Copilot", href: "https://copilot.microsoft.com/", note: "Microsoft AI assistant." },
      { label: "Google Gemini", href: "https://gemini.google.com/", note: "Google AI assistant." },
      { label: "GitHub Copilot for students", href: "https://github.com/education/students", note: "Student eligibility and developer tools." },
      { label: "Canva", href: "https://www.canva.com/", note: "Design and presentation tools." },
    ],
  },
  {
    id: 8,
    slug: "canva-education-student-guide",
    title: "Canva Education Student Guide",
    excerpt: "How students and teachers can understand Canva for Education eligibility, access, and safe portfolio use.",
    category: "Design Tools",
    audience: "Students and teachers",
    readTime: "6 min read",
    date: "5 Jun 2026",
    color: "#00C4CC",
    image: DEFAULT_OG_IMAGE,
    keywords: ["Canva Education student", "Canva Pro student guide", "free Canva for students"],
    quickAnswer: "Canva for Education is an official Canva program for eligible K-12 teachers and students invited through eligible schools. University students should check Canva's current eligibility rules before assuming Pro access is included.",
    sections: [
      {
        heading: "Who should check Canva Education",
        body: "Canva Education is especially useful for school presentations, posters, lesson materials, infographics, and classroom collaboration. Eligibility depends on Canva's official rules and your school setup.",
      },
      {
        heading: "How students can use it",
        body: "Students can use Canva to create clean resumes, portfolio graphics, project thumbnails, presentation decks, social posts, and class materials. Good design helps your work look more professional.",
      },
      {
        heading: "Avoid fake access",
        body: "Do not buy Canva Education access from random sellers. Use official school invitations or Canva's own application process where available.",
      },
    ],
    links: [
      { label: "Canva for Education", href: "https://www.canva.com/education/", note: "Official Canva Education page." },
      { label: "Canva Help", href: "https://www.canva.com/help/", note: "Official help center for eligibility and setup." },
    ],
  },
  {
    id: 9,
    slug: "figma-education-plan-guide",
    title: "Figma Education Plan Guide",
    excerpt: "How eligible students and educators can use Figma for interface design, portfolio projects, and UI/UX learning.",
    category: "Design Tools",
    audience: "UI/UX beginners",
    readTime: "7 min read",
    date: "5 Jun 2026",
    color: "#F24E1E",
    image: DEFAULT_OG_IMAGE,
    keywords: ["Figma Education plan", "Figma free for students", "UI UX student tools"],
    quickAnswer: "Figma offers an Education plan for eligible students and educators. Use it to learn UI design, build case studies, prototype apps, and create portfolio-ready design systems.",
    sections: [
      {
        heading: "What to build first",
        body: "Start with simple screens: login page, dashboard, mobile app profile, landing page, and checkout flow. These help you practice layout, spacing, hierarchy, and component thinking.",
      },
      {
        heading: "Portfolio workflow",
        body: "A strong UI/UX portfolio should show the problem, research notes, wireframes, final screens, and what changed after feedback. Figma is useful because you can keep all of that in one file.",
      },
      {
        heading: "Eligibility reminder",
        body: "Figma education eligibility can change, so always apply through the official page and keep proof of student or educator status ready.",
      },
    ],
    links: [
      { label: "Figma Education", href: "https://www.figma.com/education/", note: "Official education plan page." },
      { label: "Figma Education Help", href: "https://help.figma.com/hc/en-us/articles/360041061214-Figma-for-Education", note: "Official help center guide." },
      { label: "Figma Learn", href: "https://www.figma.com/resource-library/", note: "Templates and learning resources." },
    ],
  },
  {
    id: 10,
    slug: "how-to-build-a-portfolio-website",
    title: "How to Build a Portfolio Website",
    excerpt: "A beginner-friendly plan for creating a portfolio website that helps students win internships and freelance work.",
    category: "Portfolio",
    audience: "Students and freshers",
    readTime: "9 min read",
    date: "5 Jun 2026",
    color: "#ec4899",
    image: DEFAULT_OG_IMAGE,
    keywords: ["how to build a portfolio website", "student portfolio website", "developer portfolio"],
    quickAnswer: "A good portfolio needs five pages or sections: intro, projects, skills, about, and contact. Add live demos, GitHub links, short case studies, and a clear call to action.",
    sections: [
      {
        heading: "Portfolio structure",
        body: "Keep the first version simple. A recruiter should understand who you are, what you build, and how to contact you within 30 seconds.",
        bullets: ["Hero section with role and location", "Three strong projects", "Skills grouped by category", "About section with learning story", "Contact links and resume"],
      },
      {
        heading: "Project case studies",
        body: "Do not just show screenshots. Explain the problem, tools used, your role, key decisions, and what you learned. This turns a beginner project into evidence of thinking.",
      },
      {
        heading: "Technical checklist",
        body: "Use a custom domain if possible, compress images, add metadata, make it mobile-friendly, and test contact links. A broken portfolio can hurt more than no portfolio.",
      },
    ],
    links: [
      { label: "GitHub Pages", href: "https://pages.github.com/", note: "Free static portfolio hosting." },
      { label: "Netlify", href: "https://www.netlify.com/", note: "Deploy frontend portfolios." },
      { label: "Vercel", href: "https://vercel.com/", note: "Deploy React and Next.js portfolios." },
      { label: "MDN Web Docs", href: "https://developer.mozilla.org/", note: "HTML, CSS, and JavaScript reference." },
    ],
  },
  {
    id: 11,
    slug: "github-student-developer-pack-guide",
    title: "GitHub Student Developer Pack Guide",
    excerpt: "How eligible students can use GitHub Education benefits for coding, hosting, domains, cloud, and learning tools.",
    category: "Student Benefits",
    audience: "Students",
    readTime: "7 min read",
    date: "5 Jun 2026",
    color: "#ffffff",
    image: DEFAULT_OG_IMAGE,
    keywords: ["GitHub Student Developer Pack", "GitHub student pack guide", "free developer tools students"],
    quickAnswer: "The GitHub Student Developer Pack gives eligible students access to developer tools and partner offers. Benefits change over time, so always check the official GitHub Education page.",
    sections: [
      {
        heading: "Who can apply",
        body: "GitHub says the pack is for eligible students enrolled in a degree or diploma-granting course of study, usually with proof such as a school email or dated enrollment document.",
      },
      {
        heading: "How to use benefits wisely",
        body: "Do not activate every offer on day one. Pick benefits that support your current goal: portfolio, cloud project, coding practice, design, or deployment.",
        bullets: ["Start with GitHub Pro and Copilot if eligible", "Use hosting or domain offers for a portfolio", "Use cloud credits only after planning a project", "Track expiry dates"],
      },
      {
        heading: "Security warning",
        body: "Never buy GitHub Student Pack access. Do not share account credentials. Resold access can violate terms and risk your account.",
      },
    ],
    links: [
      { label: "GitHub Education Students", href: "https://github.com/education/students", note: "Official student pack page." },
      { label: "GitHub Docs", href: "https://docs.github.com/", note: "Official GitHub documentation." },
    ],
  },
  {
    id: 12,
    slug: "google-cloud-skills-boost-guide",
    title: "Google Cloud Skills Boost Guide",
    excerpt: "How beginners can use Google Cloud Skills Boost for cloud, AI, Gemini, data, and hands-on labs.",
    category: "Cloud Learning",
    audience: "Cloud beginners",
    readTime: "7 min read",
    date: "5 Jun 2026",
    color: "#4285F4",
    image: DEFAULT_OG_IMAGE,
    keywords: ["Google Cloud Skills Boost", "Google Cloud free courses", "Gemini AI labs"],
    quickAnswer: "Google Cloud Skills Boost is Google's official training platform for cloud and AI learning paths. Some content is free, while labs and credits can vary by program and account.",
    sections: [
      {
        heading: "What to learn first",
        body: "Start with cloud fundamentals, then move into AI and data paths. If you are a student, focus on practical labs that can become portfolio stories.",
      },
      {
        heading: "Best project ideas",
        body: "Build a small AI app, deploy a static website, explore BigQuery sample data, or create a Gemini-powered workflow. Document the steps in your portfolio.",
      },
      {
        heading: "Cost control",
        body: "Cloud labs can involve credits or billing. Read instructions carefully, shut down resources after practice, and avoid creating paid services unless you understand the cost.",
      },
    ],
    links: [
      { label: "Google Cloud Skills Boost paths", href: "https://www.cloudskillsboost.google/paths", note: "Official learning paths." },
      { label: "Google Cloud AI training", href: "https://cloud.google.com/training/machinelearning-ai", note: "AI and machine learning training." },
      { label: "Google Cloud documentation", href: "https://cloud.google.com/docs", note: "Official documentation." },
    ],
  },
  {
    id: 13,
    slug: "ibm-skillsbuild-ai-courses-guide",
    title: "IBM SkillsBuild AI Courses Guide",
    excerpt: "A student-friendly guide to using IBM SkillsBuild for AI, technology, and workplace skill development.",
    category: "AI Courses",
    audience: "Beginners",
    readTime: "6 min read",
    date: "5 Jun 2026",
    color: "#0F62FE",
    image: DEFAULT_OG_IMAGE,
    keywords: ["IBM SkillsBuild AI", "free AI courses IBM", "IBM free certificates"],
    quickAnswer: "IBM SkillsBuild offers free learning resources, including AI and technology skills. It is a useful platform for beginners who want structured learning and credential-style proof.",
    sections: [
      {
        heading: "Why use SkillsBuild",
        body: "IBM SkillsBuild is beginner-friendly and covers more than pure coding. Students can learn AI literacy, workplace skills, cybersecurity basics, data, and career readiness.",
      },
      {
        heading: "Learning routine",
        body: "Pick one journey and finish it before starting another. Keep notes and convert every major lesson into a small LinkedIn post or portfolio reflection.",
      },
      {
        heading: "Certificate value",
        body: "Credentials help when they are connected to action. Add the credential to your profile, but also build a small project or write a short explanation of what you learned.",
      },
    ],
    links: [
      { label: "IBM SkillsBuild", href: "https://skillsbuild.org/", note: "Official IBM SkillsBuild platform." },
      { label: "IBM SkillsBuild AI", href: "https://skillsbuild.org/adult-learners/explore-learning/artificial-intelligence", note: "AI learning section." },
    ],
  },
  {
    id: 14,
    slug: "aws-skill-builder-ai-learning-guide",
    title: "AWS Skill Builder AI Learning Guide",
    excerpt: "How students can start with AWS Skill Builder for cloud fundamentals, generative AI basics, and certification prep.",
    category: "Cloud Learning",
    audience: "Cloud and AI beginners",
    readTime: "7 min read",
    date: "5 Jun 2026",
    color: "#FF9900",
    image: DEFAULT_OG_IMAGE,
    keywords: ["AWS Skill Builder AI", "free AWS AI courses", "AWS cloud learning"],
    quickAnswer: "AWS Skill Builder is AWS's official learning platform. Start with cloud fundamentals, then explore generative AI and AI practitioner learning paths if they match your goal.",
    sections: [
      {
        heading: "Start with cloud basics",
        body: "AI on AWS makes more sense when you understand cloud basics: compute, storage, networking, IAM, pricing, and deployment. Do not skip fundamentals.",
      },
      {
        heading: "AI learning path",
        body: "After fundamentals, explore generative AI concepts, responsible AI, Bedrock concepts, and AI practitioner material. Use official AWS content first before random exam dumps.",
      },
      {
        heading: "Portfolio project",
        body: "Create a small architecture diagram, deploy a static app, or document a serverless workflow. Employers like seeing that you can explain cloud choices clearly.",
      },
    ],
    links: [
      { label: "AWS Skill Builder", href: "https://skillbuilder.aws/", note: "Official AWS learning platform." },
      { label: "AWS Training", href: "https://aws.amazon.com/training/", note: "AWS training and certification home." },
      { label: "AWS Documentation", href: "https://docs.aws.amazon.com/", note: "Official AWS docs." },
    ],
  },
  {
    id: 15,
    slug: "freecodecamp-certification-guide",
    title: "freeCodeCamp Certification Guide",
    excerpt: "How beginners can use freeCodeCamp certifications to learn web development, JavaScript, frontend, backend, and data skills.",
    category: "Coding",
    audience: "Coding beginners",
    readTime: "7 min read",
    date: "5 Jun 2026",
    color: "#0A0A23",
    image: DEFAULT_OG_IMAGE,
    keywords: ["freeCodeCamp certification", "free coding certificates", "learn web development free"],
    quickAnswer: "freeCodeCamp is one of the strongest free coding paths for beginners because it combines lessons with projects. Complete certifications, then customize the projects for your own portfolio.",
    sections: [
      {
        heading: "Best first certification",
        body: "Start with Responsive Web Design if you are brand new. It teaches HTML, CSS, accessibility, layout, and projects that can become portfolio pieces.",
      },
      {
        heading: "How to study",
        body: "Do not rush through answers. Rebuild each project in your own style after completing the required version. This turns practice into proof.",
        bullets: ["Complete lessons", "Finish required projects", "Rebuild one project from scratch", "Deploy it", "Write what you learned"],
      },
      {
        heading: "Next steps",
        body: "After web design, move into JavaScript, frontend libraries, backend APIs, or data visualization depending on your career direction.",
      },
    ],
    links: [
      { label: "freeCodeCamp Learn", href: "https://www.freecodecamp.org/learn/", note: "Official free curriculum." },
      { label: "freeCodeCamp News", href: "https://www.freecodecamp.org/news/", note: "Tutorials and guides." },
    ],
  },
  {
    id: 16,
    slug: "kaggle-learn-machine-learning-guide",
    title: "Kaggle Learn Machine Learning Guide",
    excerpt: "How students can use Kaggle Learn to practice Python, pandas, machine learning, data visualization, and notebooks.",
    category: "Data Science",
    audience: "Data beginners",
    readTime: "6 min read",
    date: "5 Jun 2026",
    color: "#20BEFF",
    image: DEFAULT_OG_IMAGE,
    keywords: ["Kaggle Learn", "free machine learning courses", "data science for students"],
    quickAnswer: "Kaggle Learn is useful for short, hands-on lessons in Python, pandas, machine learning, SQL, and visualization. Pair it with notebooks and datasets to build portfolio proof.",
    sections: [
      {
        heading: "Why Kaggle works",
        body: "Kaggle is practical. You learn concepts inside notebooks and can immediately apply them to datasets. That is better than only watching lectures.",
      },
      {
        heading: "Beginner sequence",
        body: "Start with Python, then pandas, visualization, intro to machine learning, and SQL. Keep your notebooks clean so they can be shared.",
      },
      {
        heading: "Portfolio project",
        body: "Choose one simple dataset, ask three questions, clean the data, create charts, and write conclusions. A clear beginner analysis is better than a complex copied notebook.",
      },
    ],
    links: [
      { label: "Kaggle Learn", href: "https://www.kaggle.com/learn", note: "Official Kaggle learning courses." },
      { label: "Kaggle Datasets", href: "https://www.kaggle.com/datasets", note: "Datasets for practice projects." },
    ],
  },
  {
    id: 17,
    slug: "roadmap-sh-learning-paths-guide",
    title: "roadmap.sh Learning Paths Guide",
    excerpt: "How to use roadmap.sh to plan frontend, backend, DevOps, AI, cybersecurity, and full-stack learning paths.",
    category: "Career Roadmaps",
    audience: "Self-learners",
    readTime: "6 min read",
    date: "5 Jun 2026",
    color: "#F97316",
    image: DEFAULT_OG_IMAGE,
    keywords: ["roadmap.sh guide", "developer roadmap", "frontend backend roadmap"],
    quickAnswer: "roadmap.sh is useful for seeing what to learn and in what order. Use it as a map, not a checklist you must finish completely before building projects.",
    sections: [
      {
        heading: "How to avoid overwhelm",
        body: "Roadmaps can look huge. Pick one role, highlight the essentials, and start building. You do not need to master every box before applying for internships.",
      },
      {
        heading: "Project-first learning",
        body: "Use the roadmap to choose the next concept required by your project. For example, learn APIs because your portfolio app needs data, not because a list said so.",
      },
      {
        heading: "Best beginner paths",
        body: "Frontend, backend, full-stack, DevOps, cybersecurity, and AI/data paths are all useful. Choose based on the kind of work you want to do.",
      },
    ],
    links: [
      { label: "roadmap.sh", href: "https://roadmap.sh/", note: "Developer roadmaps and learning paths." },
    ],
  },
  {
    id: 18,
    slug: "resume-linkedin-optimization-for-internships",
    title: "Resume and LinkedIn Optimization for Internships",
    excerpt: "A simple checklist students can use to improve resumes, LinkedIn profiles, and internship applications.",
    category: "Careers",
    audience: "Internship seekers",
    readTime: "8 min read",
    date: "5 Jun 2026",
    color: "#0A66C2",
    image: DEFAULT_OG_IMAGE,
    keywords: ["resume for internships", "LinkedIn profile for students", "internship application tips"],
    quickAnswer: "Your resume and LinkedIn should show a clear role target, relevant projects, skills, education, contact details, and proof of work. Keep it honest, specific, and easy to scan.",
    sections: [
      {
        heading: "Resume structure",
        body: "Use one page if you are a student. Lead with your name, role target, contact links, education, skills, projects, and experience. Projects matter a lot when you do not have work history.",
      },
      {
        heading: "Project bullets",
        body: "A good project bullet explains what you built, what tools you used, and what result it created. Avoid vague lines like 'worked on website'.",
        bullets: ["Built a React portfolio with responsive layout", "Created Firebase contact form and admin dashboard", "Deployed project on Netlify with custom domain", "Improved page speed by compressing images"],
      },
      {
        heading: "LinkedIn basics",
        body: "Add a clear headline, profile photo, portfolio link, GitHub link, featured projects, and a short About section. Post small learning updates weekly.",
      },
    ],
    links: [
      { label: "LinkedIn Jobs", href: "https://www.linkedin.com/jobs/", note: "Search internships and entry-level roles." },
      { label: "GitHub", href: "https://github.com/", note: "Host project code." },
      { label: "Canva resume templates", href: "https://www.canva.com/resumes/templates/", note: "Resume template inspiration." },
    ],
  },
  {
    id: 19,
    slug: "cybersecurity-free-learning-roadmap",
    title: "Cybersecurity Free Learning Roadmap",
    excerpt: "A beginner roadmap for learning cybersecurity with official documentation, labs, and safe practice environments.",
    category: "Cybersecurity",
    audience: "Security beginners",
    readTime: "8 min read",
    date: "5 Jun 2026",
    color: "#EF4444",
    image: DEFAULT_OG_IMAGE,
    keywords: ["cybersecurity free learning", "cybersecurity roadmap", "free security courses"],
    quickAnswer: "Start cybersecurity with networking basics, Linux basics, web fundamentals, security concepts, and legal practice labs. Never test on systems you do not own or have permission to use.",
    sections: [
      {
        heading: "Beginner sequence",
        body: "Cybersecurity is built on fundamentals. Learn networking, operating systems, web apps, basic scripting, and common vulnerabilities before advanced tools.",
      },
      {
        heading: "Safe practice",
        body: "Practice only in legal labs, CTFs, intentionally vulnerable machines, or your own test environment. Real-world systems require explicit permission.",
        bullets: ["Use CTF platforms", "Document what you learn", "Avoid illegal scanning", "Learn responsible disclosure basics"],
      },
      {
        heading: "Portfolio ideas",
        body: "Write security notes, create a home lab diagram, summarize OWASP Top 10 concepts, and publish safe walkthroughs from allowed practice environments.",
      },
    ],
    links: [
      { label: "OWASP", href: "https://owasp.org/", note: "Web security community and resources." },
      { label: "Cisco Networking Academy", href: "https://www.netacad.com/", note: "Networking and cybersecurity learning." },
      { label: "TryHackMe", href: "https://tryhackme.com/", note: "Cybersecurity labs and learning paths." },
    ],
  },
  {
    id: 20,
    slug: "student-tech-toolkit-2026",
    title: "Student Tech Toolkit 2026",
    excerpt: "A curated toolkit for students building skills in coding, design, AI, cloud, productivity, and portfolio creation.",
    category: "Student Benefits",
    audience: "Students",
    readTime: "8 min read",
    date: "5 Jun 2026",
    color: "#A855F7",
    image: DEFAULT_OG_IMAGE,
    keywords: ["student tech toolkit 2026", "free tools for students", "student developer tools"],
    quickAnswer: "A strong student tech toolkit includes GitHub, VS Code, Figma, Canva, Notion, Google Drive, Microsoft Learn, freeCodeCamp, Kaggle, Netlify or Vercel, and one AI assistant used responsibly.",
    sections: [
      {
        heading: "Core setup",
        body: "Start with tools you will use every week: code editor, GitHub, portfolio hosting, notes app, design tool, and learning platform. Too many tools can slow you down.",
      },
      {
        heading: "Recommended categories",
        body: "Choose one tool per category first. You can upgrade later when your workflow becomes clear.",
        bullets: ["Coding: VS Code and GitHub", "Design: Figma or Canva", "Learning: Microsoft Learn, freeCodeCamp, Kaggle", "Deployment: Netlify, Vercel, or GitHub Pages", "Productivity: Notion, Google Drive, or Microsoft 365"],
      },
      {
        heading: "Monthly habit",
        body: "Every month, finish one course, publish one project update, improve your portfolio, and apply to a small number of relevant internships.",
      },
    ],
    links: [
      { label: "GitHub Education", href: "https://github.com/education/students", note: "Student developer benefits." },
      { label: "VS Code", href: "https://code.visualstudio.com/", note: "Code editor." },
      { label: "Figma Education", href: "https://www.figma.com/education/", note: "Design tool for eligible students and educators." },
      { label: "Microsoft Learn", href: "https://learn.microsoft.com/training/", note: "Official Microsoft learning platform." },
      { label: "freeCodeCamp", href: "https://www.freecodecamp.org/learn/", note: "Free coding curriculum." },
    ],
  },
];

export const getResourcePage = (slug: string) =>
  resourcePages.find((resource) => resource.slug === slug);

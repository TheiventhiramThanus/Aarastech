import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, SITE_URL } from "../lib/seo";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  schema?: string | string[];
  ogImage?: string;
  keywords?: string;
  author?: string;
  ogType?: string;
  robots?: string;
}

export function SEO({ title, description, canonicalUrl, schema, ogImage, keywords, author, ogType, robots }: SEOProps) {
  const currentUrl = canonicalUrl || (typeof window !== "undefined" ? window.location.href : SITE_URL);
  const finalOgImage = ogImage || DEFAULT_OG_IMAGE;
  const finalOgType = ogType || "website";
  const schemaItems = Array.isArray(schema) ? schema : schema ? [schema] : [];
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="application-name" content="AarasTech" />
      <meta name="theme-color" content="#050505" />
      <meta name="format-detection" content="telephone=yes" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={finalOgType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="AarasTech" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:alt" content="AarasTech digital technology company logo" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={finalOgImage} />
      <meta property="twitter:image:alt" content="AarasTech digital technology company logo" />
      
      <link rel="canonical" href={currentUrl} />

      {schemaItems.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {schemaItem}
        </script>
      ))}
    </Helmet>
  );
}

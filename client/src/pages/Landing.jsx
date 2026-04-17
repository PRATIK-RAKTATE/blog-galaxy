import { Helmet } from "react-helmet-async";
import { CompareModes } from "../components/landing/CompareModes";
import { Footer } from "../components/landing/Footer";
import { Hero } from "../components/landing/Hero";
import { Nav } from "../components/landing/Nav";
import { Pricing } from "../components/landing/Pricing";
import { Problem } from "../components/landing/Problem";
import { TrustStrip } from "../components/landing/TrustStrip";
import {
  compareModes,
  footer,
  hero,
  navItems,
  pricing,
  problem,
  site,
  trustStrip,
} from "../content/landing";
import { useReducedMotion } from "../hooks/useReducedMotion";

function buildSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: site.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: site.description,
      url: site.url,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: `${site.url}og/landing-cover.svg`,
    },
  ];
}

export default function Landing() {
  const reducedMotion = useReducedMotion();
  const schemas = buildSchemas();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <link rel="canonical" href={site.url} />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:image" content={site.ogImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={site.title} />
        <meta property="twitter:description" content={site.description} />
        <meta property="twitter:image" content={site.ogImage} />
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>
      <div className="site-shell min-h-screen">
        <div className="site-shell__content">
          <Nav items={navItems} cta={hero.primaryCta} />
          <main>
            <Hero content={hero} reducedMotion={reducedMotion} />
            <TrustStrip content={trustStrip} reducedMotion={reducedMotion} />
            <Problem lines={problem} reducedMotion={reducedMotion} />
            <CompareModes items={compareModes} reducedMotion={reducedMotion} />
            <Pricing content={pricing} reducedMotion={reducedMotion} />
          </main>
          <Footer content={footer} reducedMotion={reducedMotion} />
        </div>
      </div>
    </>
  );
}

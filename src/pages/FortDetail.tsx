import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useFort } from "@/hooks/useForts";

const FortDetail = () => {
  const { slug } = useParams();
  const { fort, loading } = useFort(slug);

  if (loading) {
    return (
      <main className="min-h-screen container mx-auto py-20 text-center">
        <Helmet>
          <title>Loading… • Historic Forts Explorer</title>
          <meta name="description" content="Loading fort details" />
          <link rel="canonical" href={`/fort/${slug ?? ""}`} />
        </Helmet>
        <h1 className="text-3xl font-bold">Loading…</h1>
      </main>
    );
  }

  if (!fort) {
    return (
      <main className="min-h-screen container mx-auto py-20 text-center">
        <Helmet>
          <title>Fort Not Found • Historic Forts Explorer</title>
          <meta name="description" content="The requested fort could not be found." />
          <link rel="canonical" href={`/fort/${slug ?? ""}`} />
        </Helmet>
        <h1 className="text-3xl font-bold">Fort Not Found</h1>
        <p className="mt-2 text-muted-foreground">We couldn't locate that page.</p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: fort.name,
    description: fort.description,
    image: fort.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: fort.location,
    },
    keywords: ["fort", "history", fort.period],
  };

  return (
    <article className="min-h-screen">
      <Helmet>
        <title>{`${fort.name} • Historic Forts Explorer`}</title>
        <meta name="description" content={fort.description} />
        <link rel="canonical" href={`/fort/${fort.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <header className="relative">
        <img
          src={fort.image}
          alt={`${fort.name} in ${fort.location}`}
          className="h-[36vh] w-full object-cover md:h-[48vh]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
      </header>

      <main className="container mx-auto -mt-12 space-y-6 px-6 pb-16">
        <div className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur">
          <h1 className="text-3xl font-bold md:text-4xl">{fort.name}</h1>
          <p className="mt-1 text-muted-foreground">{fort.location} • {fort.period}</p>
          <p className="mt-4 text-pretty text-base text-muted-foreground">{fort.description}</p>
          <div className="mt-6">
            <Button asChild variant="hero">
              <a href="#history">Read Full History</a>
            </Button>
          </div>
        </div>

        <section id="history" className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold">History</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground whitespace-pre-line">
            {fort.history}
          </p>
        </section>

        <nav className="pt-2">
          <Button asChild variant="outline">
            <Link to="/">← Back to all forts</Link>
          </Button>
        </nav>
      </main>
    </article>
  );
};

export default FortDetail;

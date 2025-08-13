import Hero from "@/components/Hero";
import FortCard from "@/components/FortCard";
import { Helmet } from "react-helmet-async";
import { useForts } from "@/hooks/useForts";

const Index = () => {
  const { forts, loading } = useForts();
  console.log(forts)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: forts.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `/fort/${f.slug}`,
      name: f.name,
    })),
  };

  return (
    <>
      <Helmet>
        <title>Historic Forts Explorer</title>
        <meta name="description" content="Explore famous forts worldwide—photos, history, facts, and visiting tips." />
        <link rel="canonical" href="/" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main>
        <section className="container mx-auto space-y-8 px-6 py-8 md:py-12">
          <Hero />

          <section id="forts" className="mt-10">
            <h2 className="text-2xl font-semibold md:text-3xl">Featured Forts</h2>
            <p className="mt-2 text-muted-foreground">A curated selection to get you started.</p>

            {loading ? (
              <p className="mt-6 text-muted-foreground">Loading forts…</p>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {forts.map((f) => (
                  <FortCard key={f.slug} fort={f} />
                ))}
                {forts.length === 0 && (
                  <p className="text-muted-foreground">No forts available. Please add data to /public/data/forts.json.</p>
                )}
              </div>
            )}
          </section>

          <section id="about" className="mt-16 rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-semibold">About this project</h2>
            <p className="mt-2 text-muted-foreground text-pretty">
              This lightweight archive showcases historic forts with concise descriptions and imagery. Built with React, Tailwind, and a polished design system for clarity and speed.
            </p>
          </section>
        </section>
      </main>
    </>
  );
};

export default Index;

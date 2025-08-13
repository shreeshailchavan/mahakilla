import heroFort from "@/assets/forts/hero-fort.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border shadow-sm">
      <img
        src={heroFort}
        alt="Ancient coastal fort at golden hour with rugged stone walls"
        className="h-[48vh] w-full object-cover md:h-[60vh]"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/10" />
      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="mx-auto w-full max-w-6xl px-6 py-10 md:py-16">
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-border/60">
              A living archive of forts
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Explore Historic Forts Around Maharashtra
            </h1>
            <p className="mt-3 text-pretty text-muted-foreground md:text-lg">
              Discover striking architecture, pivotal histories, and travel-worthy
              details—curated with beautiful imagery and concise timelines.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild variant="hero" className="">
                <a href="#forts" aria-label="Browse forts gallery">Browse Forts</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#about" aria-label="Learn about this project">About this project</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;

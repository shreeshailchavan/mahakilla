import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fort } from "@/data/forts";
import { Link } from "react-router-dom";

interface FortCardProps {
  fort: Fort;
}

const FortCard = ({ fort }: FortCardProps) => {
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-colors">
      <div className="relative">
        <img
          src={fort.image}
          alt={`${fort.name} in ${fort.location}`}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/30 via-transparent to-transparent" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-balance text-xl md:text-2xl">{fort.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{fort.location} • {fort.period}</p>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-pretty text-sm md:text-base text-muted-foreground">{fort.description}</p>
        <div className="mt-4">
          <Button asChild variant="subtle">
            <Link to={`/fort/${fort.slug}`} aria-label={`Learn more about ${fort.name}`}>
              Learn More
            </Link>
          </Button>
        </div>
      </CardContent>
    </article>
  );
};

export default FortCard;

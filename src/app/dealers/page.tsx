import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DealerLocator } from "@/components/dealers/DealerLocator";
import { dealers, dealerCities } from "@/lib/data/dealers";

export const metadata = {
  title: "Find a Dealer",
  description: "Locate a SolBath showroom or dealer partner near you.",
};

export default function DealersPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Showrooms & Dealers"
          title="Find a SolBath partner near you"
          description="See finishes and full room setups in person, or speak to a dealer partner for bulk and project quotes."
        />
        <div className="mt-12">
          <DealerLocator dealers={dealers} cities={dealerCities} />
        </div>
      </Container>
    </div>
  );
}

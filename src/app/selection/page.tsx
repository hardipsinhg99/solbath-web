import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SelectionList } from "@/components/selection/SelectionList";

export const metadata = {
  title: "My Selection",
  description: "Products you've shortlisted for a quote.",
};

export default function SelectionPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="My Selection"
          title="Your shortlisted products"
          description="Review your selection, then submit it as a single quote request or share it with our team on WhatsApp."
        />
        <div className="mt-12 max-w-2xl">
          <SelectionList />
        </div>
      </Container>
    </div>
  );
}

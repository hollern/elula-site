import { Benefits } from "@/components/sections/benefits";
import { FinalCta } from "@/components/sections/final-cta";
import { HomeHero } from "@/components/sections/home-hero";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { UseCases } from "@/components/sections/use-cases";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProblemSolution />
      <Benefits />
      <UseCases />
      <FinalCta />
    </>
  );
}

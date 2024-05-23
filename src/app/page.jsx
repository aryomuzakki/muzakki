import Experiences from "@/components/Home/Experiences";
import Hero from "@/components/Home/Hero";
import Stacks from "@/components/Home/Stacks";

export default function Home() {
  return (
    <main className="tw-min-h-screen">
      <Hero />
      <Stacks />
      <Experiences />
    </main>
  );
}

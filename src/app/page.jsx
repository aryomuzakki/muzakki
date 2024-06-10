import Hero from "@/components/Home/Hero";
import Stacks from "@/components/Home/Stacks";
import Experiences from "@/components/Home/Experiences";
import Projects from "@/components/Home/Projects";
import Contact from "@/components/Home/Contact";

export default function Home() {
  return (
    <main className="tw-min-h-screen">
      <Hero />
      <Stacks />
      <Experiences />
      <Projects />
      <Contact />
    </main>
  );
}

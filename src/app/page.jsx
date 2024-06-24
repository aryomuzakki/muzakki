import Header from "@/components/Layout/Header";
import Hero from "@/components/Home/Hero";
import Stacks from "@/components/Home/Stacks";
import Experiences from "@/components/Home/Experiences";
import Projects from "@/components/Home/Projects";
import Contact from "@/components/Home/Contact";
import Footer from "@/components/Layout/Footer";

export default function Home() {
  return (
    <main className="tw-min-h-screen">
      <Header />
      <Hero />
      <Stacks />
      <Experiences />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

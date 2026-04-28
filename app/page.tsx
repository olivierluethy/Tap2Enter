import Header from "./components/Header";
import Hero from "./components/Hero";
import EmotionalImpact from "./components/EmotionalImpact";
import Problem from "./components/Problem";
import Workflow from "./components/Workflow";
import Solution from "./components/Solution";
import BeforeAfter from "./components/BeforeAfter";
import ForOrganizers from "./components/ForOrganizers";
import ForUsers from "./components/ForUsers";
import CTA from "./components/CTA";
import Trust from "./components/Trust";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <EmotionalImpact />
        <Problem />
        <Workflow />
        <Solution />
        <BeforeAfter />
        <ForOrganizers />
        <ForUsers />
        <CTA />
        <Trust />
      </main>
      <Footer />
    </>
  );
}

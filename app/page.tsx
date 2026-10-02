import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Trust from "@/components/trust";
import How from "@/components/how";
import Escrow from "@/components/escrow";
import Fixed from "@/components/fixed";
import Audiences from "@/components/audiences";
import Board from "@/components/board";
import Order from "@/components/order";
import Voices from "@/components/voices";
import Money from "@/components/money";
import Finale from "@/components/finale";
import { RipReveal } from "@/components/wild";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <RipReveal cover="bg-paper-2">
          <Trust />
        </RipReveal>
        <RipReveal cover="bg-paper">
          <How />
        </RipReveal>
        <Escrow />
        <RipReveal cover="bg-paper">
          <Fixed />
        </RipReveal>
        <RipReveal cover="bg-paper">
          <Audiences />
        </RipReveal>
        <RipReveal cover="bg-paper-2">
          <Board />
        </RipReveal>
        <RipReveal cover="bg-paper">
          <Order />
        </RipReveal>
        <RipReveal cover="bg-paper">
          <Voices />
        </RipReveal>
        <RipReveal cover="bg-paper-2">
          <Money />
        </RipReveal>
        <Finale />
      </main>
    </>
  );
}

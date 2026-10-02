import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Trust from "@/components/trust";
import How from "@/components/how";
import Escrow from "@/components/escrow";
import Audiences from "@/components/audiences";
import Board from "@/components/board";
import Voices from "@/components/voices";
import Money from "@/components/money";
import Finale from "@/components/finale";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Trust />
        <How />
        <Escrow />
        <Audiences />
        <Board />
        <Voices />
        <Money />
        <Finale />
      </main>
    </>
  );
}

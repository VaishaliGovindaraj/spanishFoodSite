import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SpanishFood from "@/components/SpanishFood";


export default function Home() {
  return (
    <div className="font-sans flex flex-col bg-[url(/hotel19.jpeg)] bg-cover bg-center bg-no-repeat ">
        <Header title="Spanish Foods"/>
        <SpanishFood />
        <Footer />
      </div>
  );
}

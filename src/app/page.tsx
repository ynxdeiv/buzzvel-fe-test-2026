import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { footer, navigation } from "@/content/landing";

export default function HomePage() {
  return (
    <>
      <Header navigation={navigation} />
      <main id="main" />
      <Footer content={footer} />
    </>
  );
}

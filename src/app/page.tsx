import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero/Hero";
import { footer, hero, navigation } from "@/content/landing";
import { getLandingImages } from "@/lib/prismic/getLandingImages";

export default async function HomePage() {
  const images = await getLandingImages();
  const avatars = images.learner_avatars.map((item) => item.avatar);

  return (
    <>
      <Header navigation={navigation} />
      <main id="main">
        <Hero content={hero} image={images.hero_image} avatars={avatars.slice(0, 3)} />
      </main>
      <Footer content={footer} />
    </>
  );
}

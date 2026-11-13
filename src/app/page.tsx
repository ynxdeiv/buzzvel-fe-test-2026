import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Categories } from "@/components/sections/Categories/Categories";
import { FeaturedCourse } from "@/components/sections/FeaturedCourse/FeaturedCourse";
import { FinalCta } from "@/components/sections/FinalCta/FinalCta";
import { Hero } from "@/components/sections/Hero/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks/HowItWorks";
import { People } from "@/components/sections/People/People";
import { Testimonial } from "@/components/sections/Testimonial/Testimonial";
import {
  categories,
  categoriesIntro,
  featuredCourse,
  finalCta,
  footer,
  hero,
  howItWorksIntro,
  navigation,
  peopleIntro,
  steps,
  testimonial,
} from "@/content/landing";
import { getLandingImages } from "@/lib/prismic/getLandingImages";

export default async function HomePage() {
  const images = await getLandingImages();
  const avatars = images.learner_avatars.map((item) => item.avatar);

  return (
    <>
      <Header navigation={navigation} />
      <main id="main">
        <Hero content={hero} image={images.hero_image} avatars={avatars.slice(0, 3)} />
        <Categories intro={categoriesIntro} categories={categories} />
        <FeaturedCourse content={featuredCourse} image={images.featured_course_image} />
        <HowItWorks intro={howItWorksIntro} steps={steps} />
        <Testimonial content={testimonial} avatar={images.testimonial_avatar} />
        <People intro={peopleIntro} photos={images.people_gallery.map((item) => item.photo)} />
        <FinalCta content={finalCta} avatars={avatars.slice(0, 4)} />
      </main>
      <Footer content={footer} />
    </>
  );
}

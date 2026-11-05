import HomeCourses from "@/components/HomeCourses";
import HomeCoursesPoster from "@/components/HomeCoursesPoster";
import HomeHero from "@/components/HomeHero";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Home", path: "/" });

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeCoursesPoster />
      <HomeCourses />
    </>
  );
}

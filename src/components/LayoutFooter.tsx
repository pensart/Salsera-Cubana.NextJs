import { cacheLife } from "next/cache";

export default async function LayoutFooter() {
  "use cache";
  cacheLife("days");

  return (
    <div className="bg-black py-4 px-page">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-neutral-500">
          <small>&copy; {new Date().getFullYear()} - Tamara Colombat</small>
        </div>
      </div>
    </div>
  );
}

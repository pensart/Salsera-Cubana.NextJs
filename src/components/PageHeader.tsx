export default function PageHeader({ title }: { title: string }) {
  return (
    <header className="relative bg-black pt-20 md:pt-26 pb-4 px-page">
      <div className="grid items-end w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-4xl md:text-6xl text-white leading-none font-title">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
}

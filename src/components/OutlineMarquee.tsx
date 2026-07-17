const ITEMS = ["Abu Dhabi", "Dubai", "Sidra Tower", "Al Rawdhat", "AS Business Centre"];

export default function OutlineMarquee() {
  const sequence = (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="flex shrink-0 items-center">
          <span className="outline-text font-display uppercase whitespace-nowrap text-[clamp(4rem,10vw,9rem)] leading-none">
            {item}
          </span>
          <span className="mx-8 h-2 w-2 shrink-0 rounded-full bg-charcoal/30" />
        </span>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden bg-cream py-10" aria-hidden="true">
      <div className="outline-marquee-track flex w-max items-center">
        <div className="flex items-center">{sequence}</div>
        <div className="flex items-center">{sequence}</div>
      </div>
    </div>
  );
}

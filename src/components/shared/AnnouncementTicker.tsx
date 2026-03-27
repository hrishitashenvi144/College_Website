import { announcements } from "@/data/data";

const AnnouncementTicker = () => {
  const text = announcements.join(" ◆ ");
  return (
    <div className="w-full overflow-hidden glass-strong py-3 group">
      <div
        className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{ animation: "ticker-scroll 40s linear infinite" }}
      >
        <span className="text-sm text-foreground/80 px-4">{text} ◆ {text}</span>
      </div>
    </div>
  );
};

export default AnnouncementTicker;

import WaveformPlayer from "./WaveformPlayer";

type Props = {
  title: string;
  tag?: string;
  src: string;
  lyrics?: string[];
  currentlyPlayingSrc: string | null;
  onPlayRequest: (src: string | null) => void;
};

export default function AudioCard({
  title,
  tag,
  src,
  lyrics,
  currentlyPlayingSrc,
  onPlayRequest,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        {tag && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {tag}
          </p>
        )}
      </div>

      <div className="mt-5">
        <WaveformPlayer
          src={src}
          currentlyPlayingSrc={currentlyPlayingSrc}
          onPlayRequest={onPlayRequest}
        />
      </div>

      {lyrics && (
        <div className="mt-5 rounded-xl border border-zinc-200 border-l-4 border-l-cantata-accent bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-800/80">
          <div className="text-xs font-semibold uppercase tracking-wide text-cantata-accent">
            Lyrics
          </div>
          <div className="mt-2 space-y-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {lyrics.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

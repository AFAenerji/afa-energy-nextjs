interface EmbossedCardProps {
  ghostNumber: string;
  badge: string;
  title: string;
  bodyLines: string[];
  topBg: string;
  isGold?: boolean;
}

export default function EmbossedCard({
  ghostNumber,
  badge,
  title,
  bodyLines,
  topBg,
  isGold = false,
}: EmbossedCardProps) {
  const textColor = isGold ? '#0F2E2C' : 'rgba(255,255,255,0.90)';
  const ghostColor = isGold ? 'rgba(15,46,44,0.08)' : 'rgba(255,255,255,0.07)';
  const badgeBg = isGold ? 'rgba(15,46,44,0.18)' : 'rgba(255,255,255,0.15)';
  const badgeColor = isGold ? '#0F2E2C' : 'rgba(255,255,255,0.90)';

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        boxShadow: '8px 8px 18px rgba(0,0,0,0.14), -5px -5px 12px rgba(255,255,255,0.85)',
      }}
    >
      {/* Üst panel (renkli) */}
      <div
        className="relative px-6 py-8"
        style={{
          backgroundColor: topBg,
          minHeight: '180px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Ghost number */}
        <div
          className="absolute top-2 right-4 font-black leading-none pointer-events-none select-none"
          style={{
            fontSize: '120px',
            color: ghostColor,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          {ghostNumber}
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center justify-center px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4 self-start relative z-10"
          style={{
            backgroundColor: badgeBg,
            color: badgeColor,
            letterSpacing: '0.08em',
          }}
        >
          {badge}
        </div>

        {/* Başlık - max 2 satır */}
        <h3
          className="font-bold text-xl leading-tight relative z-10"
          style={{
            color: textColor,
            fontFamily: 'Montserrat, sans-serif',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </h3>
      </div>

      {/* Alt panel (beyaz) */}
      <div className="bg-white p-6">
        <ul className="space-y-2">
          {bodyLines.map((line, index) => (
            <li
              key={index}
              className="text-sm leading-relaxed flex items-start gap-2"
              style={{ color: '#4A5568' }}
            >
              <span
                className="inline-block mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#28AFB0' }}
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

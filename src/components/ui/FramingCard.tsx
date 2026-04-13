interface FramingCardProps {
  title: string;
  description: string;
  iconComponent?: React.ReactNode;
}

export default function FramingCard({ title, description, iconComponent }: FramingCardProps) {
  return (
    <div
      className="relative bg-afa-card rounded-xl p-7"
      style={{
        boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.06), inset -3px -3px 8px rgba(255,255,255,0.85)',
      }}
    >
      {/* Sol altın şerit */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          background: 'linear-gradient(180deg, #FFCB00, #E6B800)',
          borderRadius: '4px 0 0 4px',
        }}
      />

      {/* İkon circle (opsiyonel) */}
      {iconComponent && (
        <div
          className="w-7 h-7 bg-afa-primary rounded-full flex items-center justify-center mb-3"
          style={{
            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.15), inset -1px -1px 3px rgba(255,255,255,0.3)',
          }}
        >
          {iconComponent}
        </div>
      )}

      {/* Başlık */}
      <h3
        className="text-base font-bold mb-2"
        style={{ color: '#0F2E2C' }}
      >
        {title}
      </h3>

      {/* Açıklama */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: '#4A5568' }}
      >
        {description}
      </p>
    </div>
  );
}

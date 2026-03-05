export default function SuccessState() {
  return (
    <div className="rounded-xl border border-afa-primary/20 bg-afa-primary/5 p-10 text-center">
      <div className="w-16 h-16 rounded-full bg-afa-primary/10 flex items-center justify-center mx-auto mb-6">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-afa-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h3 className="text-2xl font-extrabold text-afa-deep mb-3 tracking-tight">
        Talebiniz Alındı
      </h3>
      <p className="text-base text-afa-neutral-600 leading-relaxed max-w-md mx-auto">
        Ekibimiz en kısa sürede sizinle iletişime geçecektir. Ortalama yanıt süremiz 24 saattir.
      </p>

      {/* Signature accent */}
      <div className="mt-8 flex justify-center">
        <div className="h-[2px] w-10 bg-afa-gold rounded-sm" />
      </div>
    </div>
  );
}

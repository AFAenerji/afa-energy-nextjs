type Props = {
  text: string;
};

/**
 * DisclaimerSection v15.4 — bg afa-light, border-top gray-200.
 * 12px gray-600 text, centered.
 */
export default function DisclaimerSection({ text }: Props) {
  return (
    <section
      id="disclaimer"
      className="bg-afa-light border-t border-gray-200 py-5 px-4 text-center"
    >
      <div className="mx-auto max-w-[660px]">
        <p className="text-xs text-gray-600 leading-relaxed m-0">
          {text}
        </p>
      </div>
    </section>
  );
}

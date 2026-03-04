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
      style={{
        backgroundColor: "#F5F5F5",
        borderTop: "1px solid #E5E7EB",
        padding: "20px 16px",
        textAlign: "center",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "660px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "#4B5563",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {text}
        </p>
      </div>
    </section>
  );
}

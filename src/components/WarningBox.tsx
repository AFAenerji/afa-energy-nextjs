type Props = {
  title: string;
  body: string;
  variant: "important";
};

/**
 * WarningBox — SEALED styling.
 * bg: #F5F5F5 (afa-light). border-left: 3px #FFCB00 (afa-gold).
 * No gold bg variants allowed.
 */
export default function WarningBox({ title, body }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        borderLeft: "3px solid #FFCB00",
        borderRadius: "6px",
        padding: "16px",
      }}
    >
      <p
        style={{
          fontWeight: 700,
          color: "#0F2E2C",
          fontSize: "14px",
          margin: 0,
          marginBottom: "4px",
        }}
      >
        {title}
      </p>
      <p
        style={{
          color: "#4B5563",
          fontSize: "14px",
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {body}
      </p>
    </div>
  );
}

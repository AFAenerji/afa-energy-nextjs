interface TableRow {
  investorType: string;
  approachToUncertainty: string;
  decisionThreshold: string;
}

interface RiskSectionProps {
  kicker: string;
  h2: string;
  tableHeaders: [string, string, string];
  tableRows: TableRow[];
}

export default function RiskSection({ kicker, h2, tableHeaders, tableRows }: RiskSectionProps) {
  return (
    <section
      aria-labelledby="y5-title"
      className="bg-white"
      style={{ padding: '80px 0' }}
    >
      <div className="max-w-[1180px] mx-auto px-[52px]">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: '#28AFB0', letterSpacing: '0.18em' }}
          >
            {kicker}
          </div>
          <h2
            id="y5-title"
            className="text-3xl font-bold"
            style={{ color: '#0F2E2C', fontFamily: 'Montserrat, sans-serif' }}
          >
            {h2}
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#18625F' }}>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: '#FFFFFF', width: '26%' }}
                >
                  {tableHeaders[0]}
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: '#FFFFFF', width: '37%' }}
                >
                  {tableHeaders[1]}
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: '#FFFFFF', width: '37%' }}
                >
                  {tableHeaders[2]}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#EEF7F7' : '#FFFFFF',
                    borderBottom: index < tableRows.length - 1 ? '1px solid rgba(24,98,95,0.15)' : 'none',
                  }}
                >
                  <td
                    className="p-4 text-sm font-semibold"
                    style={{ color: '#0F2E2C' }}
                  >
                    {row.investorType}
                  </td>
                  <td
                    className="p-4 text-sm leading-relaxed"
                    style={{ color: '#4A5568' }}
                  >
                    {row.approachToUncertainty}
                  </td>
                  <td
                    className="p-4 text-sm leading-relaxed"
                    style={{ color: '#4A5568' }}
                  >
                    {row.decisionThreshold}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[class*="px-"] {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          table {
            font-size: 13px;
          }
          th, td {
            padding: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}

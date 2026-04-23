type StatusKey = "pending" | "waiting" | "ready"

interface Props {
    label: string
    value: number
    status?: StatusKey
}

const VALUE_COLORS: { [K in StatusKey]: string} = {
    pending: "text-[var(--color-pending-text)]",
    waiting: "text-[var(--color-waiting-text)]",
    ready: "text-[var(--color-ready-text)]",
}

export function MetricCard({ label, value, status }: Props) {
    const valueColor = status ? VALUE_COLORS[status] : "text-[var(--text)]"
    
    return (
        <div 
        className="rounded-x1 px-3 py-3 p-3"
        style={{ background: "var(--bg2)", boxShadow: "var(--shadow-metric)" }}
        >
            <p className="text-[11px] text-[var(--text3)] mb-1">{label}</p>
            <p className={`text-[22px] font-medium ${valueColor}`}>{value}</p>
        </div>
    )
}
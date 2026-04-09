interface Props {
    label: string
    value: number
    valueClassName?: string
}

export function MetricCard({ label, value, valueClassName }: Props) {
    return (
        <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-[11px] text-gray-500 mb-1">{label}</p>
            <p className={`text-[22px] font-medium text-gray-900 ${valueClassName ?? ""}`}>
                {value}
            </p>
        </div>
    )
}
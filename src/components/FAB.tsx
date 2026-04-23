interface Props {
    onClick: () => void
}

export function FAB({ onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-7 right-5 w-13 h-13 rounded-full flex items-center justify-center text-2xl text-white active:scale-95 transition-transform z-40"
            style={{
                background: "var(--color-brand-primary)",
                boxShadow: "var(--shadow-fab)",
            }}
            aria-label="Novo veículo"
        >
            +
        </button>
    )
}
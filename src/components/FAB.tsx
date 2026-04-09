interface Props {
    onClick: () => void
}

export function FAB({ onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-7 right-5 w-13 h-13 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl shadow-none active:scale-95 transition-transform z-40"
            aria-label="Novo veículo"
        >
            +
        </button>
    )
}
interface AddConcertButtonProps {
    onClick: () => void;
}

export default function AddConcertButton({ onClick }: AddConcertButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
          bg-blue-500 
          hover:bg-blue-600 
          text-white 
          font-semibold 
          py-2 
          px-4 
          rounded-lg 
          shadow-md 
          transition 
          duration-200 
          ease-in-out
        "
        >
            Add Concert
        </button>
    );
}

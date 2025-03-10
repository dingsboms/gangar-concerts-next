// components/concertTile.tsx
import { Concert } from "../../generated-api";

interface ConcertTileProps {
    concert: Concert;
    onClick: (concert: Concert) => void;
}

export default function ConcertTile({ concert, onClick }: ConcertTileProps) {
    return (
        <li
            onClick={() => onClick(concert)}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-gray-50 cursor-pointer"
        >
            <h2 className="text-xl font-semibold">{concert.title}</h2>
            <p>Location: {concert.location}</p>
            <p>
                Date:{" "}
                {concert.date
                    ? new Date(concert.date).toLocaleDateString()
                    : "TBA"}
            </p>
            <p>ID: {concert.id ?? "Not Assigned"}</p>
            <p className="text-sm text-gray-500">
                Created: {concert.created
                    ? new Date(concert.created).toLocaleString()
                    : "Unknown"}
            </p>
            <p className="text-sm text-gray-500">
                Last Modified: {concert.lastModified
                    ? new Date(concert.lastModified).toLocaleString()
                    : "Not Modified"}
            </p>
        </li>
    );
}

import { useEffect, useState } from "react";
import { getGifts } from "../../services/sheetsService";
import './globals.css'

interface Gift {
  name: string;
  [key: string]: unknown;
}

export default function GiftList() {
  const [gifts, setGifts] = useState<Gift[]>([]);

  useEffect(() => {
    async function fetchGifts() {
      const data = await getGifts();
      setGifts(data);
    }
    fetchGifts();
  }, []);

  return (
    <div>
      {gifts.length === 0 ? (
        <p>No hay regalos disponibles.</p>
      ) : (
        <ul>
          {gifts.map((gift, idx) => (
            <li key={idx}>{gift.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
"use client";

import { useState, useRef } from "react";

import TextBox from "@/components/textbox";
import Button from "@/components/button";
import Thumbnail from "@/components/thumbnail";

import { getThumbUrl } from "@/utils/ythumb";
import { calculateElo } from "@/utils/elo";

type ThumbData = {
  id: number;
  imageUrl: string;
  title: string;
  score: number;
};

export default function Home() {
  const thumbUrlRef = useRef<HTMLInputElement>(null);

  const [thumbs, setThumbs] = useState<ThumbData[]>([]);
  const [compareMode, setCompareMode] = useState<boolean>(false);

  const [player1, setPlayer1] = useState<ThumbData>();
  const [player2, setPlayer2] = useState<ThumbData>();

  let lastN1 = -1;
  let lastN2 = -1;

  const handleAddThumbUrl = () => {
    const url = getThumbUrl(thumbUrlRef.current?.value ?? "");
    if (!url) alert("Invalid YouTube Url");
    else {
      const newThumb: ThumbData = {
        id: thumbs.length > 0 ? Math.max(...thumbs.map((t) => t.id)) + 1 : 1,
        imageUrl: url,
        title: "Cool youtube vid",
        score: 1000,
      };
      setThumbs((t) => [...t, newThumb]);
    }

    if (thumbUrlRef.current) {
      thumbUrlRef.current.value = "";
    }
  };

  const handleThumbClick = (playerN: number) => {
    const [newScoreA, newScoreB] = calculateElo(
      player1?.score ?? 1000,
      player2?.score ?? 1000,
      playerN === 1 ? 1 : 0
    );

    setThumbs(
      thumbs.map((t) => (t.id === player1?.id ? { ...t, score: newScoreA } : t))
    );

    setThumbs(
      thumbs.map((t) => (t.id === player2?.id ? { ...t, score: newScoreB } : t))
    );

    loadNewPlayer();
  };

  const loadNewPlayer = () => {
    let n1, n2;
    const max = thumbs.length - 1;

    do {
      n1 = Math.floor(Math.random() * (max + 1));
      n2 = Math.floor(Math.random() * (max + 1));
    } while (n1 === n2 || (lastN1 === n1 && lastN2 === n2));

    lastN1 = n1;
    lastN2 = n2;

    setPlayer1(thumbs[n1]);
    setPlayer2(thumbs[n2]);
  };

  return (
    <>
      {/* compare mode */}
      {compareMode && (
        <main className="flex flex-col min-h-lvh px-4 my-4">
          <h2 className="text-center mb-4 text-xl font-medium">
            Which video you want to watch?
          </h2>
          <div className="flex flex-col gap-2 mb-4">
            {/* Thumb 1 */}
            {player1 && (
              <span
                onClick={() => {
                  handleThumbClick(1);
                }}
              >
                <Thumbnail
                  key={player1.id}
                  id={player1.id}
                  title={player1.title}
                  imageUrl={player1.imageUrl}
                  score={player1.score}
                  onDelete={() => {}}
                  showData={false}
                />
              </span>
            )}
            {/* Thumb 2 */}
            {player2 && (
              <span
                onClick={() => {
                  handleThumbClick(2);
                }}
              >
                <Thumbnail
                  key={player2.id}
                  id={player2.id}
                  title={player2.title}
                  imageUrl={player2.imageUrl}
                  score={player2.score}
                  onDelete={() => {}}
                  showData={false}
                />
              </span>
            )}
          </div>

          <Button
            onClick={() => {
              setCompareMode(false);
            }}
            variant="tertiary"
          >
            See Rankings
          </Button>
        </main>
      )}

      {/* normal mode */}
      {!compareMode && (
        <main className="flex flex-col">
          {/* Upload Yt Thumb */}
          <div className="p-4 border rounded-2xl my-2 mx-4 shadow-md">
            <h2 className="text-sm text-gray-500 font-medium">
              Enter YouTube Video Url
            </h2>

            <div className="flex flex-col gap-2">
              <TextBox ref={thumbUrlRef} />
              <Button onClick={handleAddThumbUrl}>Add Thumbnail</Button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex flex-col px-4 gap-6 mt-4">
            {thumbs.length >= 2 && (
              <Button
                onClick={() => {
                  loadNewPlayer();
                  setCompareMode(true);
                }}
              >
                Compare
              </Button>
            )}

            {thumbs
              .sort((a, b) => b.score - a.score)
              .map((thumb) => (
                <Thumbnail
                  key={thumb.id}
                  id={thumb.id}
                  title={thumb.title}
                  imageUrl={thumb.imageUrl}
                  score={thumb.score}
                  onDelete={() => {
                    setThumbs((t) => t.filter((_) => _.id != thumb.id));
                  }}
                />
              ))}
          </div>
        </main>
      )}
    </>
  );
}

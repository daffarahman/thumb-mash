import Image from "next/image";

interface ThumbnailProps {
  id: number;
  title: string;
  imageUrl: string;
  score: number;
  onDelete: (id: number) => void;
  showData?: boolean;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  id,
  title,
  imageUrl,
  score,
  onDelete,
  showData = true,
}) => {
  return (
    <div className="w-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        width={256}
        height={144}
        className="w-full border rounded-lg object-cover"
      />

      {/*<p className="mt-1 font-medium">{title}</p>*/}

      {showData && (
        <div className="mt-2 flex flex-row gap-2 items-center">
          <p className="bg-blue-400 text-sm px-2 py-1 font-bold text-white rounded-md">
            Score: {score}
          </p>

          <button
            onClick={() => onDelete(id)}
            className="bg-red-600 font-bold text-white px-2 py-1 text-sm rounded-md"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Thumbnail;

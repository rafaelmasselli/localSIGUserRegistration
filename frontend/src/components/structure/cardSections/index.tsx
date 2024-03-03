import { Link } from "react-router-dom";

interface ICardSections {
  rote: string;
  title: string;
  description: string;
}

export function CardSections({ description, rote, title }: ICardSections) {
  return (
    <Link to={rote}>
      <div className="w-full p-4 shadow-lg lg:max-w-lg hover:bg-slate-100 transition-all mt-10">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}

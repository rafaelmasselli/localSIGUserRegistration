interface StepProps {
  index: number;
  active: boolean;
  className: string;
}

export function Step({ index, active, className }: StepProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`p-1 px-10 rounded ${
          active ? "bg-blue-600 text-white" : "bg-gray-300 text-blackAlpha"
        } ${active ? "scale-120" : ""} ${className}`}
      >
        {index}
      </div>
    </div>
  );
}

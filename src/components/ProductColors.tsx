type ProductColorsProps = {
  currentColor: string;
  colors: string[];
  changeColor: (color: string) => void;
};

export default function ProductColors({
  currentColor,
  colors,
  changeColor,
}: ProductColorsProps) {
  return (
    <div className="mt-6">
      <h4 className="text-md font-medium tracking-wider capitalize">colors</h4>
      <div className="mt-2">
        {colors.map((color) => {
          return (
            <button
              key={color}
              type="button"
              className={`rounded-full w-6 h-6 mr-2 border-2 ${
                color === currentColor && "border-primary"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => changeColor(color)}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

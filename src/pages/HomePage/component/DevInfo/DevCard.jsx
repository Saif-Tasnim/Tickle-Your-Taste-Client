export const DevCard = ({ title, subtitle, period, description, i }) => {
  const customBg =
    i === "0" ? "bg-purple-500" : "bg-lime-500";
  return (
    <div className={`h-[332px] flex flex-col items-center justify-center ${customBg}`}>
      <h4 className={`text-center text-xl md:text-2xl font-bold pb-3`}>{title}</h4>
      <p className="text-lg text-gray-950 py-3">{subtitle}</p>
      <p className="text-gray-950 py-1">{period}</p>
      <p className="text-gray-950 pt-6 italic text-center">{description}</p>
    </div>
  );
};

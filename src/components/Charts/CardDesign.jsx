
import { Card } from "@tremor/react";

const CardDesign = ({ bg, title, subtitle, value, icon }) => {
  return (
    <Card maxWidth="max-w-sm" decoration="top" decorationColor={bg}>
     <div className="flex items-center gap-x-4 justify-center border">
        <div>
        <h2 className="text-base md:text-xl lg:text-2xl px-2 font-bold whitespace-no-wrap text-gray-600">
						{title}
						<span className="text-clip md:text-sm lg:text-sm px-2 font-medium whitespace-no-wrap text-gray-500">
							{subtitle}
						</span>
					</h2>
        </div>
        <div className="text-[20px] text-gray-700 px-2">
          {icon}
        </div>
      </div>
      <div>
      <h2 className="text-[40px] flex justify-center font-bold px-4 lg:px-8 text-gray-600">
        {value}
      </h2>
      </div>
  </Card>
  );
};

export default CardDesign;

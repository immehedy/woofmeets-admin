const ModalBoxData = ({ heading, price, unit, icon }) => {
  return (
    <div className="flex items-center gap-2 text-gray-600 font-bold px-2 py-1 mt-4 mb-2 border-2 border-orange-400 shadow-md rounded-md">
      <div className="flex-1 text-[14px]">
        <h4>{heading}</h4>
      </div>
      <div>
        <h4 className="text-right text-[14px]">{price ? `$${price}` : icon}</h4>
        {unit && <p className="text-[12px]">Per {unit}</p>}
      </div>
    </div>
  );
};

export default ModalBoxData;

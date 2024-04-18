function User() {
  return (
    <div>
      <div className="relative flex w-[100%] justify-center top-[-8rem]">
        <div className="bg-white relative w-[60%] rounded-lg overflow-hidden shadow-md xl:w-[70%] lg:w-[80%] md:w-[90%] sm:w-[91%] sm:bottom-[3rem]">
          <div className=" w-[100%] flex bg-primary-50 items-center">
            <div className="font-[400] text-[13.2px] bg-white h-[100%] text-primary-500 py-3 w-fit px-12 cursor-pointer rounded-t-xl shadow-xl">
              เช่ารถขับเอง
            </div>
            <div className="font-[400] text-[13px]  h-[100%] py-3 w-fit px-12 cursor-pointer">
              เช่ารถพร้อมคนขับ
            </div>
          </div>
          <div className=" relative  w-[100%] p-5 shadow-md bg-white flex flex-col">
            <div className="flex sm:flex-col sm:gap-5">
              <div className="bg-primary-50 text-gray-400 px-5 py-[5px] rounded-md w-[100%] mr-5">
                <div className="text-[10px]">จุดรับ-คืนรถ</div>
                <div className="text-[14.2px] text-gray-700">
                  โปรดเลือกจัดรับ-คืนรถ
                </div>
              </div>
              <div className="bg-primary-50 text-gray-400 px-5 py-[5px] rounded-md w-[100%] mr-5">
                <div className="text-[10px] ">ช่วงเวลาเช่ารถ</div>
                <div className="text-[14.2px] text-gray-700">
                  โปรดเลือก วัน-เวลาในการเช่า
                </div>
              </div>
              <button className="w-[380px] text-sm bg-primary-500 text-white rounded-md sm:h-[46.3px] sm:w-[100%]">
                ค้นหารถเช่า
              </button>
            </div>
            <div className="mt-5 w-[100%]">
              <div>
                <div className="flex items-center text-[12.5px] w-fit text-primary-800 px-3 py-2 rounded-lg">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    name="different-place-return"
                    onChange={() => {}}
                    checked={true}
                    className=" w-[15px] h-[15px] mr-2 text-primary-800 bg-gray-100 border-gray-300 rounded focus:ring-[#ffffff00] focus:ring-2"
                  />
                  คืนรถต่างสถานที่
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;

import Wrapper from "../../assets/wrappers/pages/Landing";
import { Footer, Navbar } from "../../components";
import Wallpaper from "../../assets/images/4-Reasons-why-a-Car-Rental-is-better-for-a-Family-Road-Trip-1.jpeg";
import { FaTags } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Fade } from "react-awesome-reveal";
import Headroom from "react-headroom";

function Landing() {

  return (
    <Wrapper>
      <Headroom>
        <Navbar />
      </Headroom>

      <div className="relative h-[550px] w-[100%] flex justify-center bg-blue-500">
        <div className="bg-[#0000007a] w-[100%] absolute h-[100%]"></div>
        <div className="absolute text-white w-[60%] justify-left top-[11rem] xl:w-[70%] lg:w-[80%] md:w-[90%] sm:w-[91%]">
          <Fade direction="up">
            <div className="w-[480px] md:w-[90%] sm:w-[91%]">
              <div className="text-[31px] font-[400]">
                ยินดีต้อนรับ' เข้าสู่ Carental
              </div>
              <div className="text-[14.x] mt-4 text-[#d6d6d6]">
                มีรถให้เช่ามากกว่า 50 คนทั่วประเทศไทย รับประกันความปลอดภัย
                เปิดให้บริการมาเเล้วกว่า 5 ปี ถ้าคุณต้องการรถไม่ว่าจะอยู่ที่ไหน
                นึกถึง Carental
              </div>
            </div>
          </Fade>
        </div>
        <img src={Wallpaper} className=" object-cover w-[100%]"></img>
      </div>

      {/*  Form Rent car*/}
      <Fade direction="up">
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
      </Fade>
      {/*  */}

      {/*  Why choose carental*/}

      <div className="w-[100%] flex justify-center relative top-[-5rem] sm:top-[-7rem]">
        <div className="w-[60%] font-bold text-primary-800 xl:w-[70%] lg:w-[80%] md:w-[90%] sm:w-[91%]">
          <Fade direction="up">
            <div className="font-[400] text-primary-800 text-lg ">
              นี่คือเหตุผลที่ผู้เดินทางเลือก Carental
            </div>
            <div className="text-[12px] mt-1 mb-6">เช่ารถกับเราดียังไง</div>
          </Fade>

          <div className="flex gap-8 sm:flex-col">
            <Fade direction="up">
              <div className="bg-white p-4 shadow-md w-[100%] rounded-lg">
                <div className="flex items-center gap-3 text-[13.3px]">
                  <div className="bg-primary-50 p-3 w-fit rounded-lg">
                    <FaTags className="text-lg" />
                  </div>
                  ประหยัดสูงสุดถึง 43%
                </div>
                <div className="text-[13.2px] mt-2 text-gray-500">
                  เปรียบเทียบเว็บไซต์การเดินทางหลายแห่งด้วยการค้นหาเพียงครั้งเดียว
                </div>
              </div>
            </Fade>
            <Fade direction="up">
              <div className="bg-white p-4 shadow-md w-[100%] rounded-lg">
                <div className="flex items-center gap-3 text-[13.3px]">
                  <div className="bg-primary-50 p-3 w-fit rounded-lg">
                    <HiLightBulb className="text-lg" />
                  </div>
                  ใช้งานได้ฟรี
                </div>
                <div className="text-[13.2px] mt-2 text-gray-500">
                  ไม่มีค่าใช้จ่ายหรือค่าธรรมเนียมแอบแฝง
                </div>
              </div>
            </Fade>
            <Fade direction="up">
              <div className="bg-white p-4 shadow-md w-[100%] rounded-lg">
                <div className="flex items-center gap-3 text-[13.3px]">
                  <div className="bg-primary-50 p-3 w-fit rounded-lg">
                    <RiArrowGoBackLine className="text-lg" />
                  </div>
                  จองและปรับเปลี่ยนได้
                </div>
                <div className="text-[13.2px] mt-2 text-gray-500">
                  ใช้ตัวกรอง "ยกเลิกฟรี"
                  ของเราเพื่อความยืดหยุ่นสูงสุดโดยไม่มีค่าใช้จ่ายเพิ่มเติม
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <Footer />

      {/*  */}
    </Wrapper>
  );
}

export default Landing;

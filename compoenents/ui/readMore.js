import { mdiArrowRight } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import translations from "../../locales/translation";

const ReadMore = ({ url, dir, test, changeDesign }) => {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block">
        <div className="w-full flex justify-center items-center h-[50px] mt-6">
          <Link
            href={"/" + url || ""}
            className={`
        inline-flex items-center px-4 py-2 rounded transition font-semibold
        ${
          changeDesign
            ? "bg-white text-[#244B9C] border border-[#244B9C] hover:text-white  hover:bg-[#244B9C]"
            : "border border-white text-blac hover:bg-white hover:text-black"
        }
      `}
            prefetch={false}
          >
            {translations?.readMore}
          </Link>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden">
        <div
          className="w-full flex justify-end items-center h-[50px] mt-4 sm:mt-6"
          dir={dir}
        >
          <Link
            href={"/" + url}
            className="inline-flex items-center text-[#1D589F] px-4 py-2 rounded-full text-sm sm:text-base gap-2"
          >
            <p>{translations?.readMore}</p>
            <Icon
              path={mdiArrowRight}
              size={1}
              className={dir === "rtl" ? "rotate-180" : ""}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ReadMore;

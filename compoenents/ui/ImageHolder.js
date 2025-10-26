import Image from "next/image";

const ImagePlaceholder = ({ color, lang }) => (
  <div
    className="w-full h-full flex items-center justify-center text-gray-400 bg-blue-50"
    //style={{ backgroundColor: color }}
  >
    {/* <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg> */}
    <Image
      src={`/${lang}/logoo.png`}
      alt="placeholder"
      width={130}
      height={100}
      // style={{ opacity: 0.8 }}
    />
  </div>
);

export default ImagePlaceholder;

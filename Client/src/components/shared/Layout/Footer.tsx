import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-950 sticky top-[100vh] w-full">
      <div className="px-5 py-2 mx-auto flex items-center sm:flex-row flex-col">
        <div className="flex flex-shrink-0 items-center">
          <span className="text-white text-xl">Shop</span>
          <span className="text-red-700  text-xl">Zolo</span>
        </div>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 ShopZolo —
          <a
            href="https://github.com/Shahidaktar"
            className="text-gray-600 ml-1"
            target="_blank"
          >
            @shahid
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-gray-500 hover:text-white " href="https://github.com/Shahidaktar" target="_blank">
          <AiFillGithub className="h-6 w-6" />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

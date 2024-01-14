"use client";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchAtom } from "../variable";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useAtom(searchAtom);
  const { data: session } = useSession();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-10 mx-10 flex items-center justify-between gap-4">
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search Here"
          className="border-2 border-black rounded-md p-2 outline-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      <div
        className="flex items-center justify-center gap-5 cursor-pointer relative"
        onClick={toggleDropdown}
      >
        <div className="flex items-center justify-center gap-2">
          <div className="border-black border-2 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z" />
            </svg>
          </div>
          <p className="text-xl">{session?.user?.name}</p>
        </div>
        {/* Dropdown */}
        <div
          className={
            "origin-top absolute mx-auto top-10 right-0 left-0 mt-2 w-full rounded-md shadow-lg backdrop-blur bg-white/70 focus:outline-none transition-all duration-500 " +
            (isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0")
          }
        >
          <div className="py-1">
            <button
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  window.location.href = "/";
                });
              }}
              className="w-full text-left px-2 py-2 text-sm text-[#000] hover:bg-[#000]/20 flex items-center gap-2 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221c1.004-.456 2.115-.716 3.288-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2c1.451.82 3.124 1.294 4.911 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
              </svg>
              <p>Logout</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [server, setServer] = useState<"kr" | "jp" | "na" | "eun" | "euw" | "">(
    ""
  );
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(false);
  const doneStyle = done
    ? "w-fit bg-[#3333FF] px-6 pt-[8px] pb-[9px] rounded-full place-self-end mr-4 mt-[40px]"
    : "w-fit bg-[#A8AFBC] px-6 pt-[8px] pb-[9px] rounded-full place-self-end mr-4 mt-[40px]";
  const dropbox = show
    ? "absolute top-0 left-0 w-full rounded-lg border-[1px] border-[#EAEDF1] bg-[#F7F8FC] overflow-hidden"
    : "hidden";

  useEffect(() => {
    setDone(name.trim() != "" && server != "");
  }, [server, name]);
  const handleDone = () => {
    if (done) router.push(`/gameProfile?name=${name}&server=${server}`);
  };
  return (
    <div className="w-screen flex flex-col">
      <div className="pt-[13px] pb-[14px] place-self-center">
        <p className="text-[19px] text-[#1A1B27] font-pop_sb">
          Add Game Profile
        </p>
      </div>
      <p className="text-[15px] text-[#1A1B27] pt-[8px] px-[16px]">
        Enter your summoner name.
      </p>
      <div className="mx-[16px] px-[16px] py-[8px] border-[1px] border-[#EAEDF1] bg-[#F7F8FC] rounded-lg mt-4">
        <input
          type="text"
          className="bg-transparent focus:ring-none focus:outline-none w-full text-[16px] text-[#1A1B27] placeholder:text-[#A8AFBC]"
          placeholder="Summoner Name"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
      </div>
      <p className="text-[15px] text-[#1A1B27] pt-[8px] px-[16px] mt-8">
        Select a game server.
      </p>
      <div className="mx-[16px] px-[16px] py-[8px] border-[1px] border-[#EAEDF1] bg-[#F7F8FC] rounded-lg mt-4 relative">
        {server == "" ? (
          <p
            className="w-full text-[16px] text-[#A8AFBC] select-none"
            onClick={() => {
              setShow(true);
            }}
          >
            Select
          </p>
        ) : (
          <p
            className="w-full text-[16px] text-[#1A1B27] select-none"
            onClick={() => {
              setShow(true);
            }}
          >
            {server == "kr"
              ? "Korea"
              : server == "jp"
              ? "Japan"
              : server == "na"
              ? "North America"
              : server == "eun"
              ? "Europe Nordic & East"
              : "Europe West"}
          </p>
        )}
        <Image
          src="/img/input_chevrondown.svg"
          width={14}
          height={9}
          className="absolute right-[10px] top-[15px]"
          alt="img"
        />
        <div className={dropbox}>
          <ul className="text-[16px] text-[#1A1B27]">
            <li
              className="block px-4 py-2 active:bg-[#3333FF] active:text-white select-none"
              onClick={() => {
                setServer("kr");
                setShow(false);
              }}
            >
              Korea
            </li>
            <li
              className=" block px-4 py-2 active:bg-[#3333FF] active:text-white select-none"
              onClick={() => {
                setServer("jp");
                setShow(false);
              }}
            >
              Japan
            </li>
            <li
              className="block px-4 py-2 active:bg-[#3333FF] active:text-white select-none"
              onClick={() => {
                setServer("na");
                setShow(false);
              }}
            >
              North America
            </li>
            <li
              className="block px-4 py-2 active:bg-[#3333FF] active:text-white select-none"
              onClick={() => {
                setServer("eun");
                setShow(false);
              }}
            >
              Europe Nordic & East
            </li>
            <li
              className="block px-4 py-2 active:bg-[#3333FF] active:text-white select-none"
              onClick={() => {
                setServer("euw");
                setShow(false);
              }}
            >
              Europe West
            </li>
          </ul>
        </div>
      </div>

      <div className={doneStyle} onClick={handleDone}>
        <p className="font-pop_sb text-[15px] text-white">Done</p>
      </div>
    </div>
  );
}

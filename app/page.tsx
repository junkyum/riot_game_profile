"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type DataType = {
  gameName: string;
  tagLine: string;
  competitiveTier: string;
  rankedRating: number;
  numberOfWins: number;
};

export default function Home() {
  const getData = (episode: string, act: string) => {
    axios
      .get<DataType[]>(
        `https://o0t5nlwp2i.execute-api.ap-northeast-2.amazonaws.com/game-api/valorant/rankingBoard/${episode}/${act}`
      )
      .then((res) => {
        setData(res.data);
      });
  };
  const [data, setData] = useState<DataType[]>([]);
  const [cur, setCur] = useState("1");
  const Radio = ({
    label,
    name,
    value,
  }: {
    label: string;
    value: string[];
    name: string;
  }) => {
    return (
      <label className="flex-none">
        <input
          type="radio"
          name={name}
          className="peer hidden"
          value={value}
          defaultChecked={cur === value[2]}
        />
        <div
          className="w-fit px-4 py-1.5 text-14 text-text-black bg-gray-200 peer-checked:bg-black peer-checked:text-white rounded-full"
          onClick={() => {
            setCur(value[2]);
            getData(value[0], value[1]);
          }}
        >
          {label}
        </div>
      </label>
    );
  };
  const FieldSet = ({ data }: { data: DataType }) => {
    return (
      <div className="flex gap-x-2 px-4">
        <p className="w-2/5 line-clamp-1 text-14 font-semibold">
          {data.gameName === "Secret Agent"
            ? data.gameName
            : `${data.gameName}#${data.tagLine}`}
        </p>
        <p className="w-1/5 text-14">{data.competitiveTier}</p>
        <p className="w-1/5 text-14">{data.rankedRating}</p>
        <p className="w-1/5 text-14">{data.numberOfWins}</p>
      </div>
    );
  };
  useEffect(() => {
    getData("7", "3");
  }, []);
  return (
    <div className="w-screen flex flex-col">
      <div className="relative h-[56px]">
        <div className="px-4 pt-5 pb-[21px]">
          <Image
            src="/img/header_close.png"
            alt="close"
            width={15}
            height={15}
          />
        </div>
        <p className="absolute top-[13px] left-1/2 -translate-x-1/2 font-pop_sb text-19 text-black">
          Leaderboard
        </p>
      </div>
      <p className="mt-2 mx-4">Check out the VALORANT leadboard.</p>
      <div className="flex gap-x-2 px-4 mt-2 overflow-x-scroll py-4">
        <Radio label={`Episode7 - Act3`} name="ep" value={["7", "3", "1"]} />
        <Radio label={`Episode7 - Act2`} name="ep" value={["7", "2", "2"]} />
        <Radio label={`Episode7 - Act1`} name="ep" value={["7", "1", "3"]} />
        <Radio label={`Episode6 - Act3`} name="ep" value={["6", "3", "4"]} />
        <Radio label={`Episode6 - Act2`} name="ep" value={["6", "2", "5"]} />
        <Radio label={`Episode6 - Act1`} name="ep" value={["6", "1", "6"]} />
        <Radio label={`Episode5 - Act3`} name="ep" value={["5", "3", "7"]} />
        <Radio label={`Episode5 - Act2`} name="ep" value={["5", "2", "8"]} />
        <Radio label={`Episode5 - Act1`} name="ep" value={["5", "1", "9"]} />
        <Radio label={`Episode4 - Act3`} name="ep" value={["4", "3", "10"]} />
        <Radio label={`Episode4 - Act2`} name="ep" value={["4", "2", "11"]} />
        <Radio label={`Episode4 - Act1`} name="ep" value={["4", "1", "12"]} />
        <Radio label={`Episode3 - Act3`} name="ep" value={["3", "3", "13"]} />
        <Radio label={`Episode3 - Act2`} name="ep" value={["3", "2", "14"]} />
        <Radio label={`Episode3 - Act1`} name="ep" value={["3", "1", "15"]} />
        <Radio label={`Episode2 - Act3`} name="ep" value={["2", "3", "16"]} />
        <Radio label={`Episode2 - Act2`} name="ep" value={["2", "2", "17"]} />
        <Radio label={`Episode2 - Act1`} name="ep" value={["2", "1", "18"]} />
      </div>
      <div className="flex gap-x-2 px-4 mt-2">
        <p className="w-2/5 text-12 font-semibold">Player Name</p>
        <p className="w-1/5 text-12 font-semibold">Tier</p>
        <p className="w-1/5 text-12 font-semibold">Rating</p>
        <p className="w-1/5 text-12 font-semibold">Wins</p>
      </div>
      <div className="mx-4 h-[1px] bg-[#D9D9D9] mt-2 mb-4" />
      <div className="flex flex-col pb-4">
        {data.map((item, i) => (
          <FieldSet data={item} key={`${item.gameName}${i}`} />
        ))}
      </div>
    </div>
  );
}

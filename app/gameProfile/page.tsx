"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

interface LeagueInfoDTO {
  createdAtL: number;
  id: string;
  leaguePoint: number;
  loseCount: number;
  profile: string;
  rank: string;
  region: string;
  tier: string;
  userIcon: string;
  userId: string;
  winCount: number;
}
interface MatchInfoDTO {
  assists: number;
  champAvatar: string;
  champLevel: string;
  champName: string;
  createdAtL: number;
  deaths: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameMode: string;
  id: string;
  kills: number;
  lane: string;
  profile: string;
  region: string;
  totalKills: number;
  userId: string;
  win: boolean;
}

interface TotalCount {
  kills: number;
  assists: number;
  deaths: number;
  totalKills: number;
}

interface ChampScore {
  img: string;
  win: number;
  lose: number;
  kills: number;
  assists: number;
  deaths: number;
}

const ChampScore = ({ img, win, lose, kills, assists, deaths }: ChampScore) => {
  return (
    <div className="flex items-center">
      <Image
        src={img}
        width={24}
        height={24}
        className="object-cover object-center aspect-square rounded-full"
        alt="Img"
      />
      <p className="ml-[10px] text-[12px] text-[#1A1B27] ">
        {win}W {lose}L&nbsp;&nbsp;&nbsp;&nbsp;
        {deaths == 0 ? "Perfact" : ((kills + assists) / deaths).toFixed(2)} KDA
      </p>
    </div>
  );
};

const MatchScore = ({ item }: { item: MatchInfoDTO }) => {
  let win = item.win
    ? "flex-none relative rounded-full bg-[#FF4A5566] p-[3px]"
    : "flex-none relative rounded-full bg-[#ADC9FF] p-[3px]";
  let duration = moment.utc(
    moment.duration(item.gameDuration, "seconds").asMilliseconds()
  );
  return (
    <div className="flex items-center">
      <div className={win}>
        <Image
          src={item.champAvatar}
          width={48}
          height={48}
          className="object-cover object-center aspect-square rounded-full"
          alt="Img"
        />
      </div>
      <div className="flex-1 ml-[12px]">
        <div className=" flex justify-between">
          <p className="text-[14px] text-[#1A1B27]">
            <b>
              {item.deaths == 0
                ? "Perfact"
                : ((item.kills + item.assists) / item.deaths).toFixed(2)}
              :1 KDA
            </b>
            &nbsp; &nbsp;
            {item.kills} / {item.deaths} / {item.assists}
          </p>
          <p className="flex-none text-[14px] text-[#1A1B27] font-pretend font-semibold ">
            KP{" "}
            {Math.floor(((item.kills + item.assists) / item.totalKills) * 100)
              .toString()
              .padStart(2, "0")}
            %
          </p>
        </div>

        <p className="text-[12px] text-[#1A1B2799]">
          {item.win ? "Win" : "Lose"} · {duration.minutes()}m{" "}
          {duration.seconds()}s · {moment(item.gameEndTimestamp).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default function Index() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const server = searchParams.get("server");
  const [leagueInfo, setLeagueInfo] = useState<LeagueInfoDTO>();
  const [matchInfo, setMatchInfo] = useState<MatchInfoDTO[]>([]);
  const [totalCnt, setTotalCnt] = useState<TotalCount>({
    kills: 0,
    assists: 0,
    deaths: 0,
    totalKills: 0,
  });
  const [champScore, setchampScore] = useState<ChampScore[]>([]);
  const getLeagueInfo = async () => {
    axios
      .get<LeagueInfoDTO>("http://localhost:3000/api/league", {
        params: { name: name, server: server },
      })
      .then((res) => {
        setLeagueInfo(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getMatchInfo = async () => {
    axios
      .get<MatchInfoDTO[]>("http://localhost:3000/api/match", {
        params: { name: name, server: server },
      })
      .then((res) => {
        setMatchInfo(res.data);
        let champ: ChampScore[] = [];
        let kills = 0;
        let assists = 0;
        let deaths = 0;
        let totalKills = 0;
        res.data.map((item) => {
          kills += item.kills;
          assists += item.assists;
          deaths += item.deaths;
          totalKills += item.totalKills;
          if (champ.find((t) => t.img == item.champAvatar)) {
            let temp = champ.find((t) => t.img == item.champAvatar);
            temp!!.deaths += item.deaths;
            temp!!.assists += item.assists;
            temp!!.kills += item.kills;
            item.win ? temp!!.win++ : temp!!.lose++;
          } else {
            champ.push({
              img: item.champAvatar,
              win: item.win ? 1 : 0,
              lose: item.win ? 0 : 1,
              kills: item.kills,
              assists: item.assists,
              deaths: item.deaths,
            });
          }
        });
        setchampScore(champ);
        setTotalCnt({
          kills: kills,
          assists: assists,
          deaths: deaths,
          totalKills: totalKills,
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getLeagueInfo();
    getMatchInfo();
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-y-scroll pb-10">
      <div className="w-full max-h-[360px] aspect-square bg-black relative flex justify-center">
        <Image
          src="/img/LoL.png"
          width={720}
          height={390}
          alt="Img"
          className="h-[360px] object-center object-cover"
        />
        <div className="flex w-full justify-between absolute top-0 left-0 px-4 pt-4">
          <Image
            src="/img/header_close_rw.svg"
            width={24}
            height={24}
            alt="Img"
          />
          <p className="font-pop_sb text-[16px] text-white">Game Profile</p>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/img/btn_refresh.svg"
          width={26}
          height={26}
          alt="Img"
          className="absolute top-[12px] right-[16px]"
        />
        <div className="flex mt-[37px] pt-[2px] ml-[16px]">
          <Image src="/img/LoL-profile.png" width={64} height={64} alt="Img" />
          <div className="ml-[12px]">
            <p className="text-[19px] text-[#1A1B27] font-semibold underline underline-offset-2 decoration-[1px] leading-[1.3]">
              {name}
            </p>
            <p className="mt-[2px] text-[12px] text-[#1A1B2799]">
              League of Legends
              <br />
              Updated on 2021.03.20
            </p>
          </div>
        </div>
      </div>
      <p className="px-[16px] mt-[24px] text-[15px] text-[#1A1B27]">
        Ranked solo in-game data of League of Legends
      </p>
      <div className="mx-[16px] mt-[32px] flex px-[16px] py-[9px] rounded-xl bg-[#F7F8FC] items-center">
        <Image src="/img/platinum.png" width={48} height={48} alt="Img" />
        <div className="ml-[16px]">
          <p className="text-[14px] text-[#1A1B27]">
            <b>
              {leagueInfo?.tier} {leagueInfo?.rank}
            </b>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {leagueInfo?.leaguePoint}LP
          </p>
          <p className="text-[12px] text-[#1A1B2799]">
            {leagueInfo?.winCount}W {leagueInfo?.loseCount}L - Win Rate{" "}
            {(
              ((leagueInfo?.winCount || 0) /
                ((leagueInfo?.winCount || 0) + (leagueInfo?.loseCount || 0))) *
              100
            ).toFixed(0)}
            %
          </p>
        </div>
      </div>
      <p className="mt-[32px] ml-[16px] text-[12px] text-[#1A1B27]">Overview</p>
      <p className="mt-[16px] ml-[16px] text-[12px] text-[#1A1B27]">
        5 Games -{" "}
        <b>
          {matchInfo.filter((item) => item.win).length}W{" "}
          {matchInfo.filter((item) => !item.win).length}L
        </b>
      </p>
      <div className="h-[1px] bg-[#EAEDF1] mx-[16px] mt-[12px]" />
      <div className="flex justify-between">
        <p className="mt-[16px] ml-[16px] text-[14px] text-[#1A1B27]">
          <b>
            {((totalCnt.kills + totalCnt.assists) / totalCnt.deaths).toFixed(2)}{" "}
            KDA
          </b>
          &nbsp;&nbsp;&nbsp;&nbsp;{(totalCnt.kills / 5).toFixed(1)} /{" "}
          {(totalCnt.deaths / 5).toFixed(1)} /{" "}
          {(totalCnt.assists / 5).toFixed(1)}
        </p>
        <p className="mt-[16px] mr-[16px] text-[14px] text-[#1A1B27] font-semibold">
          KP{" "}
          {Math.floor(
            ((totalCnt.kills + totalCnt.assists) / totalCnt.totalKills) * 100
          )}
          %
        </p>
      </div>
      <div className="h-[1px] bg-[#EAEDF1] mx-[16px] mt-[12px]" />
      <div className="flex flex-wrap justify-between gap-y-[10px] px-4 py-3">
        {champScore.map((item) => (
          <ChampScore
            img={item.img}
            win={item.win}
            lose={item.lose}
            kills={item.kills}
            assists={item.assists}
            deaths={item.deaths}
            key={item.img}
          />
        ))}
      </div>
      <div className="h-[1px] bg-[#EAEDF1] mx-[16px]" />
      <div className="flex flex-col gap-y-[10px] px-4 py-3">
        {matchInfo.map((item) => (
          <MatchScore item={item} key={item.gameEndTimestamp} />
        ))}
      </div>
    </div>
  );
}

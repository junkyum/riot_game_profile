import { NextResponse } from "next/server";
import axios from "axios";

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const server = searchParams.get("server");
  let result = await axios.patch<MatchInfoDTO[]>(
    "https://devapp.zeat.me/gameApi/lol/match",
    undefined,
    {
      params: { profile: name, region: server },
    }
  );
  return NextResponse.json(result.data);
}

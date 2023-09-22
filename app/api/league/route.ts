import { NextResponse } from "next/server";
import axios from "axios";

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const server = searchParams.get("server");
  let result = await axios.patch<LeagueInfoDTO>(
    "https://devapp.zeat.me/gameApi/lol/league",
    undefined,
    {
      params: { profile: name, region: server },
    }
  );
  return NextResponse.json(result.data);
}

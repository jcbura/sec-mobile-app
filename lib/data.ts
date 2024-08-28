import { getDecodedName } from "./scripts";
import { Game, NextGame, SortEnum, Team, TeamEnum } from "./types";

export const fetchTeams = async (sort?: SortEnum) => {
  try {
    const res = await fetch(
      `https://sec-web-backend-production.up.railway.app/api/teams${
        sort ? `?sort=${sort}` : ""
      }`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo: Team[] = await res.json();
    return repo;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch teams.");
  }
};

export const fetchTeam = async (team: TeamEnum) => {
  try {
    const res = await fetch(
      `https://sec-web-backend-production.up.railway.app/api/teams/${team}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo: Team = await res.json();
    return repo;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch team.");
  }
};

export const fetchGames = async () => {
  try {
    const res = await fetch(
      "https://sec-web-backend-production.up.railway.app/api/games"
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo: Game[] = await res.json();
    return repo;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch games.");
  }
};

export const fetchNextGame = async (team: TeamEnum) => {
  try {
    const res = await fetch(
      `https://sec-web-backend-production.up.railway.app/api/games/${team}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo: NextGame = await res.json();
    return repo;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch game.");
  }
};

export const fetchNextGames = async (sort: SortEnum) => {
  const teams = await fetchTeams(sort);
  const nextGames: NextGame[] = await Promise.all(
    teams.map(async (team) => {
      const nextGame = await fetchNextGame(
        getDecodedName(team.name) as TeamEnum
      );
      return nextGame;
    })
  );
  return nextGames;
};

export const fetchSECCGame = async () => {
  try {
    const res = await fetch(
      `https://sec-web-backend-production.up.railway.app/api/games/sec`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo: Game = await res.json();
    return repo;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch game.");
  }
};

export const searchTeam = async (team: string) => {
  try {
    const res = await fetch(
      `https://sec-web-backend-production.up.railway.app/api/teams/search?name=${team}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo: Team[] = await res.json();
    return repo;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to find teams.");
  }
};

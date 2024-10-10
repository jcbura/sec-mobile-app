import { View } from "react-native";

import GameCard from "./GameCard";
import { Game, Team } from "@/lib/types";

interface Props {
  team: Team;
}

const GameList = ({ team }: Props) => {
  const games: Game[] = team.games || [];

  return (
    <View className="w-full flex flex-col gap-6 justify-center items-center">
      {games.map((game) => (
        <GameCard key={game.id} game={game} team={team} />
      ))}
    </View>
  );
};

export default GameList;

import { View } from "react-native";

import Countdown from "./Countdown";
import GameList from "./GameList";
import Record from "./Record";
import { NextGame, Team } from "@/lib/types";

interface Props {
  nextGame: NextGame;
  team: Team;
}

const Schedule = ({ nextGame, team }: Props) => {
  return (
    <View className="w-full px-6 flex flex-col justify-center items-center">
      <View className="w-full py-6 flex flex-col gap-6 justify-center items-center">
        <Countdown nextGame={nextGame} team={team} />
        <Record team={team} />
        <GameList team={team} />
      </View>
    </View>
  );
};

export default Schedule;

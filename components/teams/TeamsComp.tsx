import { View } from "react-native";

import { TeamProvider } from "./Context";
import Countdown from "./Countdown";
import SortBar from "./SortBar";
import TeamList from "./TeamList";
import { Game, NextGame, OOCRecord } from "@/lib/types";

interface Props {
  game: Game;
  alpha: NextGame[];
  rank: NextGame[];
  record: NextGame[];
  oocRecord: OOCRecord;
}

const TeamsComp = ({ game, alpha, rank, record, oocRecord }: Props) => {
  return (
    <View className="w-full px-6 flex flex-col justify-center items-center">
      <View className="w-full py-6 flex flex-col gap-6 justify-center items-center">
        <TeamProvider defaultTeams={alpha}>
          <Countdown game={game} />
          <SortBar
            alpha={alpha}
            rank={rank}
            record={record}
            oocRecord={oocRecord}
          />
          <TeamList />
        </TeamProvider>
      </View>
    </View>
  );
};

export default TeamsComp;

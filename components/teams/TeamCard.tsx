import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import { secImages, teamImages, teamName } from "@/lib/mapping";
import { NextGame, TeamEnum } from "@/lib/types";
import { getDecodedName, formatDate, formatTime } from "@/lib/scripts";

interface Props {
  nextGame: NextGame;
}

const TeamCard = ({ nextGame }: Props) => {
  const decodedTeam = getDecodedName(nextGame.name);
  const game = nextGame.next_game;

  const [date, day] = formatDate(game?.game_date || "", "short");
  const time = formatTime(game?.game_time || "");

  return (
    <View className="w-full flex flex-col justify-center items-center border border-neutral-350 dark:border-neutral-700 dark:bg-neutral-700">
      <View className="w-full px-6 py-2 flex flex-col gap-3 justify-center items-center">
        <Link
          href={`/${decodedTeam}`}
          asChild
          className="flex flex-col justify-center items-center"
        >
          <Pressable className="flex flex-col justify-center items-center">
            <Image
              source={teamImages[decodedTeam as teamName]}
              className="w-16 h-16"
            />
            <View className="flex flex-col justify-center items-center">
              <Text
                style={{ fontFamily: "Raj-Medium" }}
                className="text-2xl uppercase text-black dark:text-white"
              >
                {nextGame.team_rank ? `${nextGame.team_rank} ` : null}
                <Text style={{ fontFamily: "Raj-Bold" }}>{nextGame.name}</Text>
              </Text>
              <Text
                style={{ fontFamily: "Raj-Medium" }}
                className="text-lg uppercase text-black dark:text-white"
              >
                {nextGame.mascot}
              </Text>
            </View>
          </Pressable>
        </Link>
        <Text
          style={{ fontFamily: "Raj-Bold" }}
          className="text-2xl text-black dark:text-white"
        >
          {nextGame.total_wins} - {nextGame.total_losses}
        </Text>
      </View>
      <View className="w-full h-12 px-6 flexe flex-row justify-between items-center bg-neutral-350 dark:bg-neutral-800">
        <Text
          style={{ fontFamily: "Raj-Medium" }}
          className="text-2xl text-white uppercase"
        >
          <Text style={{ fontFamily: "Raj-Bold" }}>{time}</Text> {day}, {date}
        </Text>
        <Image
          source={secImages[decodedTeam as TeamEnum]}
          className="w-8 h-8"
        />
      </View>
    </View>
  );
};

export default TeamCard;

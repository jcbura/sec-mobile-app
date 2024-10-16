import { Image, Text, View } from "react-native";

import { teamImages, teamName } from "@/lib/mapping";
import {
  getDecodedName,
  getTimeUntil,
  formatDate,
  formatTime,
} from "@/lib/scripts";
import { NextGame, Team } from "@/lib/types";
import { useEffect, useState } from "react";

interface Props {
  nextGame: NextGame;
  team: Team;
}

const Countdown = ({ nextGame, team }: Props) => {
  const [date, day] = formatDate(nextGame.next_game?.game_date || "", "short");
  const time = formatTime(nextGame.next_game?.game_time || "");

  const homeGame = nextGame.next_game?.home_team === team.name;
  const opponent = homeGame
    ? nextGame.next_game?.away_team
    : nextGame.next_game?.home_team;
  const opponentRank = homeGame
    ? nextGame.next_game?.away_rank
    : nextGame.next_game?.home_rank;

  const decodedTeam = getDecodedName(team.name);
  const decodedOpponent = getDecodedName(opponent || "");

  const [timeLeft, setTimeLeft] = useState(
    getTimeUntil(
      nextGame.next_game?.game_date || "",
      nextGame.next_game?.game_time || "00:00:00"
    )
  );

  useEffect(() => {
    setTimeLeft(
      getTimeUntil(
        nextGame.next_game?.game_date || "",
        nextGame.next_game?.game_time || "00:00:00"
      )
    );

    const interval = setInterval(() => {
      setTimeLeft(
        getTimeUntil(
          nextGame.next_game?.game_date || "",
          nextGame.next_game?.game_time || "00:00:00"
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [nextGame.next_game?.game_date, nextGame.next_game?.game_time]);

  return (
    <View className="w-full flex flex-col justify-center items-center border border-neutral-350 dark:border-neutral-700 dark:bg-neutral-700">
      <View className="w-full pt-2 flex flex-col gap-3 justify-center items-center">
        <View className="w-full px-6 flex flex-row justify-center items-center">
          <View className="flex-[2_2_0%] flex flex-col justify-center items-center">
            <Image
              source={
                homeGame
                  ? teamImages[decodedOpponent as teamName]
                  : teamImages[decodedTeam as teamName]
              }
              className="w-16 h-16"
            />
          </View>
          <View className="flex-1 flex flex-col justify-center items-center">
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl font-bold uppercase text-black dark:text-white"
            >
              {nextGame.next_game?.neutral_site ? "vs" : homeGame ? "vs" : "at"}
            </Text>
          </View>
          <View className="flex-[2_2_0%] flex flex-col justify-center items-center">
            <Image
              source={
                homeGame
                  ? teamImages[decodedTeam as teamName]
                  : teamImages[decodedOpponent as teamName]
              }
              className="w-16 h-16"
            />
          </View>
        </View>
        <View className="w-full flex flex-row justify-center items-center border-neutral-350 dark:border-neutral-800 border-t border-b-0 border-l-0 border-r-0">
          <View className="flex-1 py-2 flex flex-col justify-center items-center border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl text-black dark:text-white"
            >
              {timeLeft.days}
            </Text>
            <Text
              style={{ fontFamily: "Raj-Medium" }}
              className="text-lg uppercase text-black dark:text-white"
            >
              days
            </Text>
          </View>
          <View className="flex-1 py-2 flex flex-col justify-center items-center border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl text-black dark:text-white"
            >
              {timeLeft.hours}
            </Text>
            <Text
              style={{ fontFamily: "Raj-Medium" }}
              className="text-lg uppercase text-black dark:text-white"
            >
              hours
            </Text>
          </View>
          <View className="flex-1 py-2 flex flex-col justify-center items-center border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl text-black dark:text-white"
            >
              {timeLeft.minutes}
            </Text>
            <Text
              style={{ fontFamily: "Raj-Medium" }}
              className="text-lg uppercase text-black dark:text-white"
            >
              minutes
            </Text>
          </View>
          <View className="flex-1 py-2 flex flex-col justify-center items-center">
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl text-black dark:text-white"
            >
              {timeLeft.seconds}
            </Text>
            <Text
              style={{ fontFamily: "Raj-Medium" }}
              className="text-lg uppercase text-black dark:text-white"
            >
              seconds
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full h-12 px-6 flex flex-row justify-start items-center bg-neutral-350 dark:bg-neutral-800">
        <Text
          style={{ fontFamily: "Raj-Medium" }}
          className="text-2xl text-white uppercase"
        >
          <Text style={{ fontFamily: "Raj-Bold" }}>{time}</Text> {day}, {date}
        </Text>
      </View>
    </View>
  );
};

export default Countdown;

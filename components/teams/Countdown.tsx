import { Image, Text, View } from "react-native";

import {
  getTimeUntil,
  formatDate,
  formatTime,
  getDecodedName,
} from "@/lib/scripts";
import { Game } from "@/lib/types";
import { useEffect, useState } from "react";
import { teamImages, teamName } from "@/lib/mapping";

interface Props {
  game: Game;
}

const Countdown = ({ game }: Props) => {
  const [date, day] = formatDate(game.game_date || "", "short");
  const time = formatTime(game.game_time || "");

  const [timeLeft, setTimeLeft] = useState(
    getTimeUntil(game.game_date || "", game.game_time || "00:00:00")
  );

  useEffect(() => {
    setTimeLeft(
      getTimeUntil(game.game_date || "", game.game_time || "00:00:00")
    );

    const interval = setInterval(() => {
      setTimeLeft(
        getTimeUntil(game.game_date || "", game.game_time || "00:00:00")
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [game.game_date, game.game_time]);

  const homeTeam = getDecodedName(game.home_team);
  const awayTeam = getDecodedName(game.away_team);

  const winningRank =
    game.game_played && (game?.home_score || 0) > (game?.away_score || 0)
      ? game.home_rank
      : game.away_rank;
  const winningTeam =
    game.game_played && (game?.home_score || 0) > (game?.away_score || 0)
      ? game.home_team
      : game.away_team;
  const winningMascot =
    game.game_played && (game?.home_score || 0) > (game?.away_score || 0)
      ? game.home_mascot
      : game.away_mascot;

  if (game.home_team !== "PLACEHOLDER" && game.away_team !== "PLACEHOLDER")
    return (
      <View className="w-full flex flex-col justify-center items-center border border-neutral-350 dark:border-neutral-700 dark:bg-neutral-700">
        <View className="w-full pt-2 flex flex-col gap-3 justify-center items-center">
          <View className="w-full px-6 flex flex-row justify-center items-center">
            <View className="flex-[2_2_0%] flex flex-col justify-center items-center">
              <Image
                source={teamImages[awayTeam as teamName]}
                className="w-16 h-16"
              />
            </View>
            <View className="flex-1 flex flex-col justify-center items-center">
              <Text
                style={{ fontFamily: "Raj-Bold" }}
                className="text-2xl font-bold uppercase text-black dark:text-white"
              >
                vs
              </Text>
            </View>
            <View className="flex-[2_2_0%] flex flex-col justify-center items-center">
              <Image
                source={teamImages[homeTeam as teamName]}
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
            className="flex-1 text-2xl text-white uppercase"
          >
            <Text style={{ fontFamily: "Raj-Bold" }}>{time}</Text> {day}, {date}
          </Text>
          <Text
            style={{ fontFamily: "Raj-Medium" }}
            className="text-2xl text-white uppercase"
          >
            <Text style={{ fontFamily: "Raj-Bold" }}>SEC</Text>CG
          </Text>
        </View>
      </View>
    );

  return (
    <View className="w-full flex flex-col justify-center items-center border border-neutral-350 dark:border-neutral-700 dark:bg-neutral-700">
      <View className="w-full pt-2 flex flex-col gap-3 justify-center items-center">
        <View className="w-full px-6 flex flex-row justify-center items-center">
          <View className="flex flex-col justify-center items-center">
            <Image
              source={require("@/assets/images/sec/sec.png")}
              className="w-16 h-16"
            />
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl uppercase text-black dark:text-white"
            >
              sec championship game
            </Text>
          </View>
        </View>
        <View className="w-full flex flex-row justify-center items-center border-neutral-350 dark:border-neutral-800 border-t border-b-0 border-l-0 border-r-0">
          <View className="flex-1 py-2 flex flex-col justify-center items-center border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl uppercase text-black dark:text-white"
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
              className="text-2xl uppercase text-black dark:text-white"
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
              className="text-2xl uppercase text-black dark:text-white"
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
              className="text-2xl uppercase text-black dark:text-white"
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

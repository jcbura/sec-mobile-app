import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import clsx from "clsx";
import { secImages, teamImages, teamName } from "@/lib/mapping";
import { Game, Team, TeamEnum } from "@/lib/types";
import { getDecodedName, formatDate, formatTime } from "@/lib/scripts";

interface Props {
  game: Game;
  team: Team;
}

const GameCard = ({ game, team }: Props) => {
  const [date, day] = formatDate(game.game_date);
  const time = formatTime(game.game_time || "");

  const homeGame = game.home_team === team.name;
  const opponent = homeGame ? game.away_team : game.home_team;
  const opponentMascot = homeGame ? game.away_mascot : game.home_mascot;
  const opponentRank = homeGame ? game.away_rank : game.home_rank;

  const teamScore = homeGame ? game.home_score : game.away_score;
  const opponentScore = homeGame ? game.away_score : game.home_score;
  const gameResult: "W" | "L" | null =
    teamScore != null && opponentScore != null
      ? teamScore > opponentScore
        ? "W"
        : "L"
      : null;

  const decodedTeam = getDecodedName(team.name);
  const decodedOpponent = getDecodedName(opponent);

  return (
    <View className="w-full flex flex-col justify-center items-center border border-neutral-350 dark:border-neutral-700 dark:bg-neutral-700">
      <View className="w-full px-6 py-2 flex flex-col gap-3 justify-center items-center">
        {game.conference_game ? (
          <Link
            href={`/${getDecodedName(opponent)}`}
            asChild
            className="flex flex-col justify-center items-center"
          >
            <Pressable>
              <Image
                source={teamImages[decodedOpponent as teamName]}
                className="w-16 h-16"
              />
              <View className="flex flex-col justify-center items-center">
                <Text
                  style={{ fontFamily: "Raj-Medium" }}
                  className="text-2xl uppercase text-black dark:text-white"
                >
                  {opponentRank ? `${opponentRank} ` : null}
                  <Text style={{ fontFamily: "Raj-Bold" }}>{opponent}</Text>
                </Text>
                <Text
                  style={{ fontFamily: "Raj-Medium" }}
                  className="text-lg uppercase text-black dark:text-white"
                >
                  {opponentMascot}
                </Text>
              </View>
            </Pressable>
          </Link>
        ) : (
          <View className="flex flex-col justify-center items-center">
            <Image
              source={teamImages[decodedOpponent as teamName]}
              className="w-16 h-16"
            />
            <View className="flex flex-col justify-center items-center">
              <Text
                style={{ fontFamily: "Raj-Medium" }}
                className="text-2xl uppercase text-black dark:text-white"
              >
                {opponentRank ? `${opponentRank} ` : null}
                <Text style={{ fontFamily: "Raj-Bold" }}>{opponent}</Text>
              </Text>
              <Text
                style={{ fontFamily: "Raj-Medium" }}
                className="text-lg uppercase text-black dark:text-white"
              >
                {opponentMascot}
              </Text>
            </View>
          </View>
        )}
        <View className="flex flex-col justify-center items-center">
          <Text
            style={{ fontFamily: "Raj-Bold" }}
            className="text-2xl uppercase text-black dark:text-white"
          >
            {game.neutral_site ? "neutral" : homeGame ? "home" : "away"}
          </Text>
          <Text
            style={{ fontFamily: "Raj-Medium" }}
            className="text-lg text-center uppercase text-black dark:text-white"
          >
            {game.stadium}
          </Text>
        </View>
      </View>
      <View className="w-full h-12 px-6 flex flex-row justify-between items-center bg-neutral-350 dark:bg-neutral-800">
        {game.game_played ? (
          <Text
            style={{ fontFamily: "Raj-Medium" }}
            className="text-2xl text-white uppercase"
          >
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className={clsx("", {
                "text-red-600 dark:text-red-400": gameResult === "L",
                "text-green-600 dark:text-green-400": gameResult === "W",
              })}
            >
              {gameResult}
            </Text>{" "}
            {teamScore} - {opponentScore}
          </Text>
        ) : (
          <Text
            style={{ fontFamily: "Raj-Medium" }}
            className="text-2xl text-white uppercase"
          >
            <Text style={{ fontFamily: "Raj-Bold" }}>{time}</Text> {day}, {date}
          </Text>
        )}
        {game.conference_game ? (
          <Image
            source={secImages[decodedTeam as TeamEnum]}
            className="w-8 h-8"
          />
        ) : null}
      </View>
    </View>
  );
};

export default GameCard;

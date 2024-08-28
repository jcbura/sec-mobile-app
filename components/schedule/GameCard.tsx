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
  let gameResult: "W" | "L" | undefined = undefined;
  if (teamScore && opponentScore && teamScore > opponentScore) {
    gameResult = "W";
  } else {
    gameResult = "L";
  }

  const decodedTeam = getDecodedName(team.name);
  const decodedOpponent = getDecodedName(opponent);

  return (
    <View className="w-[95%] flex flex-col justify-center items-center">
      <View
        className={clsx(
          "w-full flex flex-row justify-center items-center border border-transparent border-t border-b-0 border-l border-r",
          {
            "bg-alabama": team.name === "Alabama",
            "bg-arkansas": team.name === "Arkansas",
            "bg-auburn-primary": team.name === "Auburn",
            "bg-florida-primary": team.name === "Florida",
            "bg-georgia": team.name === "Georgia",
            "bg-kentucky": team.name === "Kentucky",
            "bg-lsu-primary": team.name === "LSU",
            "bg-mississippi-state": team.name === "Mississippi State",
            "bg-missouri": team.name === "Missouri",
            "bg-oklahoma": team.name === "Oklahoma",
            "bg-ole-miss-primary": team.name === "Ole Miss",
            "bg-south-carolina": team.name === "South Carolina",
            "bg-tennessee-primary": team.name === "Tennessee",
            "bg-texas": team.name === "Texas",
            "bg-texas-a&m": team.name === "Texas A&M",
            "bg-vanderbilt": team.name === "Vanderbilt",
          }
        )}
      >
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[25%] text-center tracking-widest py-2 text-white"
        >{`${day.toUpperCase()} ${date.toUpperCase()}`}</Text>
      </View>
      <View className="w-full p-2 flex flex-col gap-2 justify-center items-center bg-white border border-neutral-300 border-t-0 border-b-0 border-l border-r">
        <View className="flex flex-col gap-2 justify-center items-center">
          {game.conference_game ? (
            <Link
              href={`/${getDecodedName(opponent)}`}
              asChild
              className="flex flex-row justify-center items-center"
            >
              <Pressable className="flex flex-col gap-2 justify-center items-center">
                <Image
                  source={teamImages[decodedOpponent as teamName]}
                  className="w-16 h-16"
                />
                <View className="flex flex-col justify-center items-center">
                  <View className="flex flex-row gap-2 justify-center items-center">
                    {opponentRank && (
                      <Text
                        style={{ fontFamily: "Teko" }}
                        className="text-[25%] text-center tracking-widest text-black/50"
                      >
                        {opponentRank}
                      </Text>
                    )}
                    <Text
                      style={{ fontFamily: "Teko" }}
                      className="text-[25%] text-center tracking-widest"
                    >
                      {opponent.toUpperCase()}
                    </Text>
                  </View>
                  <Text
                    style={{ fontFamily: "Teko" }}
                    className="text-[20%] text-center tracking-widest text-black/50"
                  >
                    {opponentMascot.toUpperCase()}
                  </Text>
                </View>
              </Pressable>
            </Link>
          ) : (
            <View className="flex flex-row justify-center items-center">
              <View className="flex flex-col gap-2 justify-center items-center">
                <Image
                  source={teamImages[decodedOpponent as teamName]}
                  className="w-16 h-16"
                />
                <View className="flex flex-col justify-center items-center">
                  <View className="flex flex-row gap-2 justify-center items-center">
                    {opponentRank && (
                      <Text
                        style={{ fontFamily: "Teko" }}
                        className="text-[25%] text-center tracking-widest text-black/50"
                      >
                        {opponentRank}
                      </Text>
                    )}
                    <Text
                      style={{ fontFamily: "Teko" }}
                      className="text-[25%] text-center tracking-widest"
                    >
                      {opponent.toUpperCase()}
                    </Text>
                  </View>
                  <Text
                    style={{ fontFamily: "Teko" }}
                    className="text-[20%] text-center tracking-widest text-black/50"
                  >
                    {opponentMascot.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          )}
          <View className="flex flex-col justify-center items-center">
            <Text
              style={{ fontFamily: "Teko" }}
              className="text-[25%] text-center tracking-widest"
            >
              {game.neutral_site ? "NEUTRAL" : homeGame ? "HOME" : "AWAY"}
            </Text>
            <Text
              style={{ fontFamily: "Teko" }}
              className="text-[20%] text-center tracking-widest text-black/50"
            >
              {game.stadium.toUpperCase()}
            </Text>
          </View>
          <View className="flex flex-col justify-center items-center">
            {game.game_played ? (
              <>
                <View className="flex flex-row gap-2 justify-center items-center">
                  <Text
                    style={{ fontFamily: "Teko" }}
                    className={clsx("text-[30%] text-center tracking-widest", {
                      "text-alabama":
                        game.away_score === teamScore &&
                        team.name === "Alabama",
                      "text-arkansas":
                        game.away_score === teamScore &&
                        team.name === "Arkansas",
                      "text-auburn-primary":
                        game.away_score === teamScore && team.name === "Auburn",
                      "text-florida-primary":
                        game.away_score === teamScore &&
                        team.name === "Florida",
                      "text-georgia":
                        game.away_score === teamScore &&
                        team.name === "Georgia",
                      "text-kentucky":
                        game.away_score === teamScore &&
                        team.name === "Kentucky",
                      "text-lsu-primary":
                        game.away_score === teamScore && team.name === "LSU",
                      "text-mississippi-state":
                        game.away_score === teamScore &&
                        team.name === "Mississippi State",
                      "text-missouri":
                        game.away_score === teamScore &&
                        team.name === "Missouri",
                      "text-oklahoma":
                        game.away_score === teamScore &&
                        team.name === "Oklahoma",
                      "text-ole-miss-primary":
                        game.away_score === teamScore &&
                        team.name === "Ole Miss",
                      "text-south-carolina":
                        game.away_score === teamScore &&
                        team.name === "South Carolina",
                      "text-tennessee-primary":
                        game.away_score === teamScore &&
                        team.name === "Tennessee",
                      "text-texas":
                        game.away_score === teamScore && team.name === "Texas",
                      "text-texas-a&m":
                        game.away_score === teamScore &&
                        team.name === "Texas A&M",
                      "text-vanderbilt":
                        game.away_score === teamScore &&
                        team.name === "Vanderbilt",
                    })}
                  >
                    {game.away_score}
                  </Text>
                  <Text
                    style={{ fontFamily: "Teko" }}
                    className={clsx(
                      "text-[30%] text-center tracking-widest",
                      {}
                    )}
                  >
                    -
                  </Text>
                  <Text
                    style={{ fontFamily: "Teko" }}
                    className={clsx("text-[30%] text-center tracking-widest", {
                      "text-alabama":
                        game.home_score === teamScore &&
                        team.name === "Alabama",
                      "text-arkansas":
                        game.home_score === teamScore &&
                        team.name === "Arkansas",
                      "text-auburn-primary":
                        game.home_score === teamScore && team.name === "Auburn",
                      "text-florida-primary":
                        game.home_score === teamScore &&
                        team.name === "Florida",
                      "text-georgia":
                        game.home_score === teamScore &&
                        team.name === "Georgia",
                      "text-kentucky":
                        game.home_score === teamScore &&
                        team.name === "Kentucky",
                      "text-lsu-primary":
                        game.home_score === teamScore && team.name === "LSU",
                      "text-mississippi-state":
                        game.home_score === teamScore &&
                        team.name === "Mississippi State",
                      "text-missouri":
                        game.home_score === teamScore &&
                        team.name === "Missouri",
                      "text-oklahoma":
                        game.home_score === teamScore &&
                        team.name === "Oklahoma",
                      "text-ole-miss-primary":
                        game.home_score === teamScore &&
                        team.name === "Ole Miss",
                      "text-south-carolina":
                        game.home_score === teamScore &&
                        team.name === "South Carolina",
                      "text-tennessee-primary":
                        game.home_score === teamScore &&
                        team.name === "Tennessee",
                      "text-texas":
                        game.home_score === teamScore && team.name === "Texas",
                      "text-texas-a&m":
                        game.home_score === teamScore &&
                        team.name === "Texas A&M",
                      "text-vanderbilt":
                        game.home_score === teamScore &&
                        team.name === "Vanderbilt",
                    })}
                  >
                    {game.home_score}
                  </Text>
                </View>
                <Text
                  style={{ fontFamily: "Teko" }}
                  className="text-[20%] text-center tracking-widest text-black/50"
                >
                  {gameResult}
                </Text>
              </>
            ) : (
              <Text
                style={{ fontFamily: "Teko" }}
                className="text-[30%] text-center tracking-widest"
              >
                {time}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View className="w-full p-2 flex flex-row justify-center items-center bg-neutral-300 border border-transparent border-t-0 border-b border-l border-r">
        {game.conference_game ? (
          <Link href="/" asChild>
            <Pressable>
              <Image
                source={secImages[decodedTeam as TeamEnum]}
                className="w-8 h-8"
              />
            </Pressable>
          </Link>
        ) : (
          <View className="w-8 h-8"></View>
        )}
      </View>
    </View>
  );
};

export default GameCard;

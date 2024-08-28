import { Link, usePathname } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import clsx from "clsx";
import { fetchTeams } from "@/lib/data";
import { getClasses, getDecodedName, getHeaderTitle } from "@/lib/scripts";
import { Team } from "@/lib/types";
import useSWR, { preload } from "swr";

preload("teams", () => fetchTeams());
const Header = () => {
  const pathname = usePathname();

  const { data: teams } = useSWR<Team[]>("teams", () => fetchTeams());

  if (!teams) return null;

  const [title, rank] = getHeaderTitle(pathname, teams);

  return (
    <View className="w-full flex flex-col justify-center items-center bg-white border border-neutral-300 border-t-0 border-b border-l-0 border-r-0">
      <View className="h-16"></View>
      <View className="flex flex-row gap-2 justify-center items-center">
        {rank ? (
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[25%] text-center tracking-widest text-black/50"
          >
            {rank}
          </Text>
        ) : null}
        <Text
          style={{ fontFamily: "Teko" }}
          className={clsx("text-[25%] text-center tracking-widest", {
            "text-sec-primary": pathname === "/",
            "text-alabama": pathname === "/alabama",
            "text-arkansas": pathname === "/arkansas",
            "text-auburn-primary": pathname === "/auburn",
            "text-florida-primary": pathname === "/florida",
            "text-georgia": pathname === "/georgia",
            "text-kentucky": pathname === "/kentucky",
            "text-lsu-primary": pathname === "/lsu",
            "text-mississippi-state": pathname === "/mississippi_state",
            "text-missouri": pathname === "/missouri",
            "text-oklahoma": pathname === "/oklahoma",
            "text-ole-miss-primary": pathname === "/ole_miss",
            "text-south-carolina": pathname === "/south_carolina",
            "text-tennessee-primary": pathname === "/tennessee",
            "text-texas": pathname === "/texas",
            "text-texas-a&m": pathname === "/texas_a&m",
            "text-vanderbilt": pathname === "/vanderbilt",
          })}
        >
          {title}
        </Text>
      </View>
      <ScrollView horizontal>
        <Link
          href="/"
          asChild
          className={clsx("p-2 border-t-0 border-l-0 border-0", {
            "border-b-0": pathname !== "/",
            "border-sec-primary border-b-2": pathname === "/",
          })}
        >
          <Pressable>
            <Text
              style={{ fontFamily: "Teko" }}
              className="text-[20%] text-center tracking-widest"
            >
              SEC
            </Text>
          </Pressable>
        </Link>
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/${getDecodedName(team.name)}`}
            asChild
            className={clsx("p-2 border-t-0 border-l-0 border-0", {
              "border-b-0": pathname === "/",
              "border-alabama border-b-2":
                pathname === "/alabama" && team.id === 1,
              "border-arkansas border-b-2":
                pathname === "/arkansas" && team.id === 2,
              "border-auburn-primary border-b-2":
                pathname === "/auburn" && team.id === 3,
              "border-florida-primary border-b-2":
                pathname === "/florida" && team.id === 4,
              "border-georgia border-b-2":
                pathname === "/georgia" && team.id === 5,
              "border-kentucky border-b-2":
                pathname === "/kentucky" && team.id === 6,
              "border-lsu-primary border-b-2":
                pathname === "/lsu" && team.id === 7,
              "border-mississippi-state border-b-2":
                pathname === "/mississippi_state" && team.id === 8,
              "border-missouri border-b-2":
                pathname === "/missouri" && team.id === 9,
              "border-oklahoma border-b-2":
                pathname === "/oklahoma" && team.id === 10,
              "border-ole-miss-primary border-b-2":
                pathname === "/ole_miss" && team.id === 11,
              "border-south-carolina border-b-2":
                pathname === "/south_carolina" && team.id === 12,
              "border-tennessee-primary border-b-2":
                pathname === "/tennessee" && team.id === 13,
              "border-texas border-b-2":
                pathname === "/texas" && team.id === 14,
              "border-texas-a&m border-b-2":
                pathname === "/texas_a&m" && team.id === 15,
              "border-vanderbilt border-b-2":
                pathname === "/vanderbilt" && team.id === 16,
            })}
          >
            <Pressable>
              <Text
                style={{ fontFamily: "Teko" }}
                className="text-[20%] text-center tracking-widest"
              >
                {team.name.toUpperCase()}
              </Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

export default Header;

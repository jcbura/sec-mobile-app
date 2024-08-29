import { Team } from "./types";

export const getClasses = (type: string, team: string) => {
  const classes: { [key: string]: string } = {
    sec: `${type}-sec-primary`,
    alabama: `${type}-alabama`,
    arkansas: `${type}-arkansas`,
    auburn: `${type}-auburn-primary`,
    florida: `${type}-florida-primary`,
    georgia: `${type}-georgia`,
    kentucky: `${type}-kentucky`,
    lsu: `${type}-lsu-primary`,
    mississippi_state: `${type}-mississippi-state`,
    missouri: `${type}-missouri`,
    oklahoma: `${type}-oklahoma`,
    ole_miss: `${type}-ole-miss-secondary`,
    south_carolina: `${type}-south-carolina`,
    tennessee: `${type}-tennessee-primary`,
    texas: `${type}-texas`,
    "texas_a&m": `${type}-texas-a&m`,
    vanderbilt: `${type}-vanderbilt`,
  };

  return classes[team];
};

export const getDecodedName = (team: string) => {
  return team.replace(/\s+/g, "_").toLowerCase();
};

export const getHeaderTitle = (path: string, teams?: Team[]) => {
  if (path === "/") {
    return ["SOUTHEASTERN CONFERENCE", null];
  }

  const decodedPath = path.replace(/^\//, "");
  const matchedTeam = teams?.find(
    (team) => getDecodedName(team.name) === decodedPath
  );

  if (matchedTeam) {
    const { name, mascot, team_rank } = matchedTeam;
    return [`${name.toUpperCase()} ${mascot.toUpperCase()}`, team_rank];
  }

  return [null, null];
};

export const getTimeUntil = (date: string, time: string) => {
  const currentDate = new Date();
  const targetDateTime = new Date(`${date}T${time}`);

  const differenceInMillis = targetDateTime.getTime() - currentDate.getTime();

  if (differenceInMillis <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;

  const days = Math.floor(differenceInMillis / millisecondsPerDay);
  const hours = Math.floor(
    (differenceInMillis % millisecondsPerDay) / millisecondsPerHour
  );
  const minutes = Math.floor(
    (differenceInMillis % millisecondsPerHour) / millisecondsPerMinute
  );
  const seconds = Math.floor(
    (differenceInMillis % millisecondsPerMinute) / millisecondsPerSecond
  );

  return { days, hours, minutes, seconds };
};

export const formatDate = (
  sqlDate: string,
  length: "short" | "long" = "short"
) => {
  const dateParts = sqlDate.split("-").map(Number);
  const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));

  const optionsDate: Intl.DateTimeFormatOptions = {
    month: length,
    day: "numeric",
    timeZone: "UTC",
  };

  const optionsDay: Intl.DateTimeFormatOptions = {
    weekday: length,
    timeZone: "UTC",
  };

  const formattedDate = date.toLocaleDateString("en-US", optionsDate);
  const formattedDay = date.toLocaleDateString("en-US", optionsDay);

  return [formattedDate, formattedDay];
};

export const formatTime = (sqlTime: string) => {
  if (sqlTime === "") return "TBD";

  const [hours, minutes, seconds] = sqlTime.split(":");
  const date = new Date();
  date.setHours(
    parseInt(hours, 10),
    parseInt(minutes, 10),
    parseInt(seconds, 10)
  );
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: undefined,
    hour12: true,
  };
  return date.toLocaleTimeString("en-US", options);
};

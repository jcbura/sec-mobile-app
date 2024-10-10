/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        alabama: "#9e1c33",
        arkansas: "#a12338",
        "auburn-primary": "#002b5c",
        "auburn-secondary": "#f26522",
        "florida-primary": "#003087",
        "florida-secondary": "#fa4616",
        georgia: "#cc0000",
        kentucky: "#00339f",
        "lsu-primary": "#461d7c",
        "lsu-secondary": "#fdd023",
        "mississippi-state": "#5d1725",
        missouri: "#f1b82d",
        oklahoma: "#880000",
        "ole-miss-primary": "#14213d",
        "ole-miss-secondary": "#ce1126",
        "south-carolina": "#73000a",
        "tennessee-primary": "#ff8200",
        "tennessee-secondary": "#373a36",
        texas: "#c15d26",
        "texas-a&m": "#6a1e2d",
        vanderbilt: "#cfae70",
        "sec-primary": "#002d74",
        "sec-secondary": "#ffd24f",
        "neutral-350": "#bcbcbc",
      },
    },
  },
  plugins: [],
};

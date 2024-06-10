/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontSize: {
				xxs: "0.625rem", // Custom smaller font size
			},
		},
	},
	plugins: [],
};

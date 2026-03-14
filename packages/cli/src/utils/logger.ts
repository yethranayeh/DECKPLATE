// DECKPLATE v0.0.0
const ansi = {
	reset: "\x1b[0m",
	bold: "\x1b[1m",
	orange: "\x1b[38;2;255;94;0m",
	yellow: "\x1b[38;2;255;214;0m",
	red: "\x1b[38;2;255;34;0m",
	green: "\x1b[38;2;0;255;102m",
	dim: "\x1b[38;2;102;102;96m",
	white: "\x1b[38;2;237;232;220m",
};

function tag(color: string, label: string): string {
	return `${color}${ansi.bold}[${label}]${ansi.reset}`;
}

export const log = {
	info: (msg: string) =>
		console.log(`${tag(ansi.orange, "DECKPLATE")} ${ansi.white}${msg}${ansi.reset}`),
	success: (msg: string) =>
		console.log(`${tag(ansi.green, "+")}         ${ansi.white}${msg}${ansi.reset}`),
	warn: (msg: string) =>
		console.warn(`${tag(ansi.yellow, "!")}         ${ansi.yellow}${msg}${ansi.reset}`),
	error: (msg: string) =>
		console.error(`${tag(ansi.red, "x")}         ${ansi.red}${msg}${ansi.reset}`),
	dim: (msg: string) => console.log(`${ansi.dim}${msg}${ansi.reset}`),
	divider: () => console.log(`${ansi.dim}${"─".repeat(50)}${ansi.reset}`),
};

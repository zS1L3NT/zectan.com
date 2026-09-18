// ─────────────────────────────────────────────────────────────
// ALL static site content lives here. Edit this file to change
// copy, links, images, particles, tags, or which projects appear.
// ─────────────────────────────────────────────────────────────

// ── Site metadata (used in app/layout.tsx) ──
export const SITE_URL = "https://www.zectan.com/"
export const SITE_TITLE = "Zechariah Tan"
export const SITE_DESCRIPTION = "Zechariah's Portfolio Website"
export const SITE_PROFILE_IMAGE = "/assets/images/profile.jpg"

// ── GitHub ──
export const GITHUB_USERNAME = "zS1L3NT"

// Repo + branch powering the "Last updated on ..." footer
export const LAST_UPDATED_REPO = "zectan.com"
export const LAST_UPDATED_BRANCH = "main"

// ── Hero section ──
export const HERO_GREETING = "Hello, I'm"
export const HERO_NAME = "Zechariah Tan"

export const TYPEWRITER_PREFIX = "and I'm a "
export const TYPEWRITER_WORDS = [
	"WorldSkills Bronze Medallist",
	"TP Diploma Course Valedictorian",
	"NUS Computer Science Student",
	"Full Stack Web Developer",
]

// ── Social links (hero section) ──
export const SOCIAL_LINKS = {
	github: "https://www.github.com/zS1L3NT",
	linkedin: "https://www.linkedin.com/in/zectan",
	stackoverflow: "https://www.stackoverflow.com/users/7544646/zs1l3nt",
	leetcode: "https://leetcode.com/zs1l3nt",
} as const

// ── About section ──
export const ABOUT_PARAGRAPHS = [
	"Hello! My name is Zechariah, and I'm a Web Developer from Singapore. I specialize in Full-Stack Development and DevOps, and I love solving programming challenges. I also enjoy working on side projects, especially those that help me learn new skills or address real-world problems.",
	"I won a Bronze Medal in the WorldSkills Championship 2024 in Lyon, France, in the Web Development skill trade. Preparing for this competition pushed me to master a broad range of tools in the Web Development space, which was both intellectually demanding and rewarding.",
	"Outside schoolwork, I am usually either watching Korean Dramas or working on a side project. Most of the side projects I build use either TypeScript or Rust as they are the languages I am most comfortable using.",
]

// ── Projects ──
export type ProjectTier = 1 | 2 | 3

export const TIER_META: { tier: ProjectTier; heading: string; blurb: string }[] = [
	{
		tier: 1,
		heading: "Best work",
		blurb: "My best projects — the ones I'd proudly show off.",
	},
	{
		tier: 2,
		heading: "Solid builds",
		blurb: "Took real time to build, but not portfolio highlights.",
	},
	{
		tier: 3,
		heading: "Archive",
		blurb: "Tiny, simple, or just for fun — completeness over quality.",
	},
	// {
	// 	tier: 4,
	// 	heading: "Not Displayed",
	// 	blurb: "Projects I don't even want shown"
	// }
]

// ── Projects ──
// Canonical tier lists. Order within each tier = display order on /projects,
// so reorder these arrays for a full custom sort.
export const TIER_1_IDS = [
	"ts-npm-ytmusic-api",
	"finpoint",
	"therook",
	"soundroid-v2",
	"nus-canvas-archive",
	"ts-discord-soundroid",
	"ts-discord-reminder",
	"web-monetary",
	"web-next-markex",
	"web-formby",
	"thepawn",
	"deskpower",
	"soundroid-v1",
	"web-next-statify",
	"mldp",
] as const

export const TIER_2_IDS = [
	"zectan.com",
	"ts-burp-accelerator",
	"web-youtubedl",
	"ts-npm-nova-bot",
	"ts-discord-polling",
	"ts-discord-vcsessions",
	"py-pyautogui-thetower",
	"rs-cli-nova",
	"ts-telegram-walletsync",
	"ts-spotify-to-youtube",
	"web-next-diffiehellman",
	"web-react-rubikscube",
	"py-sudoku-solver",
	"rs-cargo-parson",
	"android-react-learnkorean",
	"lotterex",
	"whosthat",
	"alprom",
	"ts-bun-gitcache",
	"web-chess",
	"chess-online",
] as const

export const TIER_3_IDS = [
	"ts-discord-shutup",
	"ts-npm-validate-any",
	"ts-npm-after-every",
	"rs-regex-engine",
	"rs-bowling-score",
	"chatic",
	"rs-kattis-solutions",
	"rs-linkedin-practice",
	"ts-adventofcode-2023",
	"gitcat",
	"rs-impossible-tictactoe",
	"ino-arduino-reactiontest",
	"js-node-mst",
	"py-folder-sizes",
	"py-text-cryptor",
	"web-vue-graphx",
	"web-geekout-intro",
	"web-song-mago",
] as const

// export const TIER_4_IDS = [
// 	"zS1L3NT",
// 	".github",
// 	"resume",
// 	"web-cannot",
// 	"web-next-memorial",
// 	"web-vue-country-search",
// 	"cpp-interest-finder",
// 	"tmux-config",
// 	"neovim-config",
// 	"DefinitelyTyped",
// 	"tracer",
// ] as const

// Homepage "Featured Projects" section — subset of TIER_1_IDS (order = display order)
export const FEATURED_PROJECT_IDS: string[] = [
	"finpoint",
	"soundroid-v2",
	"ts-npm-ytmusic-api",
] satisfies (typeof TIER_1_IDS)[number][]

// Homepage "Other Projects" grid — subset of TIER_1_IDS (order = display order)
export const OTHER_PROJECT_IDS: string[] = [
	"therook",
	"nus-canvas-archive",
	"ts-discord-soundroid",
	"ts-discord-reminder",
	"web-monetary",
	"web-next-markex",
] satisfies (typeof TIER_1_IDS)[number][]

// Extra repo IDs that appear ONLY on the /projects page
// (Tier 1 minus homepage picks, then Tiers 2–3)
export const EXTRA_PROJECT_IDS: string[] = [
	...TIER_1_IDS.filter(
		id => !FEATURED_PROJECT_IDS.includes(id) && !OTHER_PROJECT_IDS.includes(id),
	),
	...TIER_2_IDS,
	...TIER_3_IDS,
]

const TIER_1_SET = new Set<string>(TIER_1_IDS)
const TIER_2_SET = new Set<string>(TIER_2_IDS)

export const getProjectTier = (id: string): ProjectTier => {
	if (TIER_1_SET.has(id)) return 1
	if (TIER_2_SET.has(id)) return 2
	return 3
}

if (process.env.NODE_ENV !== "production") {
	for (const id of [...FEATURED_PROJECT_IDS, ...OTHER_PROJECT_IDS]) {
		if (!TIER_1_SET.has(id)) {
			console.warn(`"${id}" is on the homepage but missing from TIER_1_IDS`)
		}
	}
}

// Full list fetched from GitHub (live metadata) for the /projects page.
// To add/remove a project site-wide, edit the TIER_*_IDS arrays above.
export const PROJECT_IDS = [...new Set<string>([...TIER_1_IDS, ...TIER_2_IDS, ...TIER_3_IDS])]

// ── Contact section ──
export const CONTACT_TEXT =
	"If you have any questions for me, feel free to reach out to me via email! I'll get back to you as soon as I can :D"
export const CONTACT_EMAIL = "dev@zectan.com"

// ── Images (Cloudinary) ──
export const CLOUDINARY_BASE = "https://res.cloudinary.com/zs1l3nt/image/upload"
export const REPO_BANNER_URL = (repo: string) => `${CLOUDINARY_BASE}/repositories/${repo}.png`
export const TAG_ICON_URL = (tag: string) => `${CLOUDINARY_BASE}/icons/${tag}.svg`

export const PARTICLES = {
	SCREEN_WIDTH_DIVISOR: 8,
	COLOR: "204, 214, 246",
	OPACITY: 0.1,
	MAX_SIZE: 3,
	MAX_SPEED_X: 0.5,
	MAX_SPEED_Y: 1,
	MAX_NEIGHBOUR_DISTANCE: 200,
	MAX_MOUSE_DISTANCE: 400,
	NEIGHBOUR_LINE_OPACITY: 0.075,
	MOUSE_LINE_OPACITY: 0.15,
} as const

export const HIDDEN_TAGS = [
	"special",
	"hackathon",
	"unfinished",
	"deprecated",
	"broken",
	"solutions",
]

export const SPECIAL_TAGS: [string, string, string][] = [
	["special", "⭐", "This is a special repository!"],
	["hackathon", "🧑‍💻", "This project was a hackathon project and most likely won't be updated"],
	["unfinished", "🚧", "This project has yet to be completed..."],
	["deprecated", "⚠️", "This project is not getting any further updates!"],
	["broken", "💥", "This project does not work!"],
]

export const TAG_CATEGORIES: [string, string[]][] = [
	[
		"Languages & Runtimes",
		[
			"rust",
			"typescript",
			"cpp",
			"java",
			"php",
			"javascript",
			"python",
			"nodejs",
			"bunjs",
			"dart",
			"solidity",
			"kotlin",
		],
	],
	[
		"Frameworks",
		[
			"laravel",
			"android",
			"angular",
			"arduino",
			"nextjs",
			"react",
			"chakraui",
			"materialui",
			"mantineui",
			"truffle",
			"discord",
			"express",
			"flask",
			"flutter",
			"jupyter",
			"reactnative",
			"redux",
			"tailwind",
			"tauri",
			"vue",
		],
	],
	[
		"Cloud Services",
		[
			"spotify",
			"firebase",
			"apigateway",
			"flyio",
			"dynamodb",
			"ec2",
			"postgresql",
			"mongodb",
			"rekognition",
			"s3",
			"vercel",
			"lambda",
			"sns",
			"youtube",
			"iotcore",
		],
	],
	[
		"DevOps Tools",
		[
			"phpunit",
			"jest",
			"cypress",
			"docker",
			"githubactions",
			"githubpages",
			"npm",
			"cargo",
			"notion",
		],
	],
]

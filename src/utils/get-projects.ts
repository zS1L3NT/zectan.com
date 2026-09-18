import { GITHUB_USERNAME, PROJECT_IDS, type ProjectTier, getProjectTier } from "@/constants"

export type Project = {
	title: string
	description: string
	tags: string[]
	updated: number
	tier: ProjectTier
}

type GitHubRepo = {
	name?: unknown
	description?: unknown
	topics?: unknown
	pushed_at?: unknown
}

// Fetches live metadata from GitHub for a static list of repo IDs.
// Pass custom IDs or defaults to PROJECT_IDS from "@/constants".
// No Next.js cache tags — always fresh (`cache: "no-store"`).
// Set GITHUB_TOKEN to raise the API rate limit; works without it.
export default async function getProjects(ids: string[] = PROJECT_IDS): Promise<Project[]> {
	const headers: Record<string, string> = { Accept: "application/vnd.github+json" }
	if (process.env.GITHUB_TOKEN) {
		headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
	}

	const settled = await Promise.all(
		ids.map(async (id): Promise<Project | null> => {
			try {
				const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${id}`, {
					headers,
					cache: "no-store",
				})
				if (!res.ok) {
					console.warn(`getProjects: failed to fetch "${id}" (${res.status})`)
					return null
				}
				const repo = (await res.json()) as GitHubRepo
				return {
					title: typeof repo.name === "string" ? repo.name : id,
					description: typeof repo.description === "string" ? repo.description : "",
					tags: Array.isArray(repo.topics)
						? repo.topics.filter((t): t is string => typeof t === "string")
						: [],
					updated:
						typeof repo.pushed_at === "string" &&
						!Number.isNaN(Date.parse(repo.pushed_at))
							? new Date(repo.pushed_at).getTime()
							: Date.now(),
					tier: getProjectTier(id),
				}
			} catch (err) {
				console.warn(`getProjects: failed to fetch "${id}"`, err)
				return null
			}
		}),
	)

	return settled.filter((p): p is Project => p !== null)
}

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
// Uses ONE batched request for all repos (instead of one per repo) and caches
// it for an hour, so page loads don't burn through the GitHub rate limit.
// Set GITHUB_TOKEN to raise the API rate limit; works without it.
export default async function getProjects(ids: string[] = PROJECT_IDS): Promise<Project[]> {
	const headers: Record<string, string> = { Accept: "application/vnd.github+json" }
	if (process.env.GITHUB_TOKEN) {
		headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
	}

	try {
		const res = await fetch(
			`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
			{ headers, next: { revalidate: 3600 } },
		)
		if (!res.ok) {
			console.warn(`getProjects: failed to list repos (${res.status})`)
			return []
		}
		const repos = (await res.json()) as GitHubRepo[]
		if (!Array.isArray(repos)) {
			console.warn("getProjects: unexpected GitHub response shape")
			return []
		}
		const byName = new Map(
			repos
				.filter((r): r is GitHubRepo & { name: string } => typeof r.name === "string")
				.map(r => [r.name, r] as const),
		)

		return ids.flatMap(id => {
			const repo = byName.get(id)
			if (!repo) {
				console.warn(`getProjects: repo "${id}" not found`)
				return []
			}
			return [
				{
					title: repo.name,
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
				},
			]
		})
	} catch (err) {
		console.warn("getProjects: failed to fetch repos", err)
		return []
	}
}

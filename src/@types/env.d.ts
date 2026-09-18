declare namespace NodeJS {
	interface ProcessEnv {
		readonly NEXT_PUBLIC_POSTHOG_KEY: string
		readonly NEXT_PUBLIC_POSTHOG_HOST: string
		// Optional: raises the GitHub API rate limit for project metadata
		readonly GITHUB_TOKEN?: string
	}
}

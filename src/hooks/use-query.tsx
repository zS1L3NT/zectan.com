import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

export type MatchMode = "all" | "any"

export default (projectsTags: string[]) => {
	const search = useSearchParams()

	return useMemo(() => {
		const match = search.get("match")
		return {
			tags: (search.get("tags")?.split(",") ?? []).filter(t => projectsTags.includes(t)),
			match: (match === "any" ? "any" : "all") as MatchMode,
		}
	}, [search, projectsTags])
}

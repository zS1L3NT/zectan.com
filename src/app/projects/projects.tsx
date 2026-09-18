"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

import TagImage from "@/components/tag-image"
import { GITHUB_USERNAME, HIDDEN_TAGS, SPECIAL_TAGS, TIER_META } from "@/constants"
import useQuery from "@/hooks/use-query"
import cn from "@/utils/cn"
import type { Project } from "@/utils/get-projects"

function ProjectCard({ project, muted }: { project: Project; muted: boolean }) {
	return (
		<motion.div
			key={project.title}
			layoutId={project.title}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			whileHover={{ scale: 1.05 }}
			exit={{ opacity: 0 }}
			className={cn(
				"flex flex-col justify-between h-full gap-4 transition-shadow shadow-md no-transition shadow-slate-100 bg-slate-100 hover:shadow-slate-300",
				muted && "opacity-80 saturate-50 hover:opacity-100 hover:saturate-100",
			)}
		>
			<Link
				href={`https://github.com/${GITHUB_USERNAME}/${project.title}`}
				target="_blank"
				className="flex flex-col justify-between gap-4 xs:p-4 sm:p-5 lg:p-6 size-full"
			>
				<div>
					<h1 className="xs:text-md sm:text-lg lg:text-xl font-montserrat-bold">
						{project.title}
						{SPECIAL_TAGS.filter(t => project.tags.includes(t[0])).map(
							([tag, emoji, message]) => (
								<span
									key={tag}
									title={message}
									className="inline-block ms-1 hover:scale-125"
								>
									{emoji}
								</span>
							),
						)}
					</h1>
					<p
						className={cn(
							"mt-1 font-montserrat-regular",
							muted
								? "xs:text-xs sm:text-sm lg:text-base"
								: "xs:text-sm sm:text-base lg:text-md",
						)}
					>
						{project.description}
					</p>
				</div>
				<div className="flex flex-wrap xs:gap-1 sm:gap-2 lg:gap-3">
					{project.tags
						.filter(t => !HIDDEN_TAGS.includes(t))
						.map(t => (
							<TagImage key={t} tag={t} />
						))}
				</div>
			</Link>
		</motion.div>
	)
}

export default function Projects({
	projects,
	projectsTags,
}: {
	projects: Project[]
	projectsTags: string[]
}) {
	const { tags } = useQuery(projectsTags)

	// `projects` arrives in constants.ts order (manual curation) — never re-sort.
	const filtered = projects.filter(p => tags.every(t => p.tags.includes(t)))
	const sections = TIER_META.map(meta => ({
		...meta,
		items: filtered.filter(p => p.tier === meta.tier),
	})).filter(section => section.items.length > 0)

	if (sections.length === 0) {
		return (
			<p className="xs:text-sm sm:text-base lg:text-md font-montserrat-regular">
				No projects match the selected filters.
			</p>
		)
	}

	return (
		<div className="flex flex-col xs:gap-10 sm:gap-12 lg:gap-16">
			{sections.map(section => (
				<section key={section.tier} aria-label={`Tier ${section.tier}: ${section.heading}`}>
					<div className="flex items-center xs:gap-2 sm:gap-3 lg:gap-4 xs:mb-1 sm:mb-2">
						<span
							className={cn(
								"shrink-0 rounded-full font-montserrat-bold xs:text-xs sm:text-sm xs:px-3 sm:px-4 xs:py-1 sm:py-1.5",
								section.tier === 1 && "bg-primary-400 text-white",
								section.tier === 2 && "bg-slate-800 text-white",
								section.tier === 3 && "bg-slate-300 text-slate-700",
							)}
						>
							Tier {section.tier}
						</span>
						<h2 className="shrink-0 xs:text-lg sm:text-xl lg:text-2xl font-montserrat-bold">
							{section.heading}
							<span className="ml-2 font-montserrat-regular opacity-60">
								({section.items.length})
							</span>
						</h2>
						<div aria-hidden className="flex-1 h-px bg-slate-300" />
					</div>
					<p className="xs:mb-4 sm:mb-6 xs:text-sm sm:text-base font-montserrat-regular opacity-70">
						{section.blurb}
					</p>
					<div className="grid xs:gap-8 sm:gap-10 lg:gap-12 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						<AnimatePresence>
							{section.items.map(project => (
								<ProjectCard
									key={project.title}
									project={project}
									muted={section.tier === 3}
								/>
							))}
						</AnimatePresence>
					</div>
				</section>
			))}
		</div>
	)
}

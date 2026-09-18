"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import TagImage from "@/components/tag-image"
import { HIDDEN_TAGS, TAG_CATEGORIES, TAG_ICON_URL } from "@/constants"
import useQuery from "@/hooks/use-query"
import cn from "@/utils/cn"

const Checkbox = ({
	tag,
	checked,
	onChange,
}: {
	tag: string
	checked: boolean
	onChange: () => void
}) => {
	return (
		<label key={tag} htmlFor={`${tag}-checkbox`} className="flex items-center cursor-pointer">
			<input
				id={`${tag}-checkbox`}
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className="hidden"
			/>
			<div
				className={cn(
					"rounded mr-2 size-[18px] leading-[1.2] text-center text-white",
					checked ? "bg-primary-400" : "bg-white",
				)}
			>
				&#10003;
			</div>
			<TagImage tag={tag} />
			<p className="ml-2 xs:text-sm sm:text-base lg:text-md font-montserrat-regular">
				{tag[0]?.toUpperCase() + tag.slice(1)}
			</p>
		</label>
	)
}

export default function Query({ projectsTags }: { projectsTags: string[] }) {
	const { tags } = useQuery(projectsTags)

	const [isOpen, setIsOpen] = useState(false)
	const [selectedTags, setSelectedTags] = useState<string[]>(tags)

	useEffect(() => {
		setSelectedTags(tags)
	}, [tags])

	const getLink = ({ tags }: { tags: string[] }) => {
		const search = new URLSearchParams()

		if (tags.length > 0) {
			search.set("tags", tags.join(","))
		}

		const query = `${search}`.replaceAll("%2C", ",")
		return query ? `/projects?${query}` : "/projects"
	}

	const OTHER_TAGS = projectsTags.filter(
		t => !TAG_CATEGORIES.flatMap(c => c[1]).includes(t) && !HIDDEN_TAGS.includes(t),
	)

	return (
		<div className="container mx-auto xs:my-6 sm:my-9 md:my-14">
			<div className="flex xs:gap-2 sm:gap-3 lg:gap-4 xs:mb-2 sm:mb-3 lg:mb-4">
				<button
					className="shadow-md cursor-pointer hover:scale-105 xs:p-2 sm:p-3 hover:shadow-slate-300 shadow-slate-200 bg-slate-200"
					type="button"
					onClick={() => setIsOpen(true)}
				>
					<Image src="/assets/images/filter.svg" alt="Filter" width={20} height={20} />
				</button>
			</div>

			<div className="flex flex-wrap xs:gap-2 sm:gap-3 lg:gap-4">
				{tags.map(t => (
					<div
						key={t}
						className="flex items-center gap-2 shadow-md xs:text-xs sm:text-sm xs:py-2 sm:py-3 xs:px-3 sm:px-4 font-montserrat-regular bg-slate-200"
					>
						<Image
							title={t[0]?.toUpperCase() + t.slice(1)}
							className="inline-block"
							src={TAG_ICON_URL(t)}
							alt={`${t} icon`}
							width={16}
							height={16}
						/>
						{t[0]?.toUpperCase() + t.slice(1)}
						<Link href={getLink({ tags: tags.filter(t_ => t !== t_) })}>
							<Image
								className="ml-1 cursor-pointer hover:scale-105"
								src="/assets/images/close.svg"
								alt="Close"
								width={16}
								height={16}
							/>
						</Link>
					</div>
				))}
			</div>

			<div
				className={cn(
					"fixed inset-0 backdrop-brightness-75 backdrop-blur-sm size-full",
					isOpen ? "opacity-100 z-[1000]" : "opacity-0 -z-[1]",
				)}
			>
				<AnimatePresence>
					{isOpen ? (
						<motion.div
							initial={{ y: -20 }}
							animate={{ y: 0 }}
							exit={{ y: -20 }}
							className="size-full xs:p-4 sm:p-6 md:p-8 no-transition"
							onClick={() => setIsOpen(false)}
						>
							<div
								className="flex flex-col max-w-3xl mx-auto shadow-md bg-slate-200 size-full xs:p-4 sm:p-5 lg:p-6"
								onClick={e => e.stopPropagation()}
								onKeyDown={e => e.stopPropagation()}
							>
								<h1 className="xs:text-xl sm:text-2xl lg:text-3xl w-fit font-montserrat-bold">
									Filters
								</h1>

								<div className="flex flex-col flex-1 overflow-x-hidden overflow-y-scroll xs:mt-4 sm:mt-6 lg:mt-8 xs:gap-4 sm:gap-5 lg:gap-6">
									{[...TAG_CATEGORIES, ["Other", OTHER_TAGS] as const].map(
										([name, tags]) => (
											<div key={name}>
												<h1 className="xs:mb-1 sm:mb-1.5 lg:mb-2 xs:text-sm sm:text-base lg:text-md font-montserrat-bold">
													{name}
												</h1>
												<div className="grid xs:gap-2 sm:gap-3 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
													{[...tags].sort().map(t => (
														<Checkbox
															key={t}
															tag={t}
															checked={selectedTags.includes(t)}
															onChange={() =>
																setSelectedTags(st =>
																	st.includes(t)
																		? st.filter(
																				tag => tag !== t,
																			)
																		: [...st, t],
																)
															}
														/>
													))}
												</div>
											</div>
										),
									)}
								</div>

								<div className="flex justify-end gap-4 px-4 mt-6">
									<button
										type="button"
										className="block px-3 py-2 border text-primary-400 xs:text-sm sm:text-base lg:text-md font-montserrat-regular hover:scale-105 border-primary-400"
										onClick={() => setIsOpen(false)}
									>
										Cancel
									</button>
									<Link
										href={getLink({ tags: selectedTags })}
										onClick={() => setIsOpen(false)}
										className="block px-3 py-2 text-white xs:text-sm sm:text-base lg:text-md font-montserrat-regular hover:scale-105 hover:shadow-primary-400 bg-primary-400"
									>
										Save
									</Link>
								</div>
							</div>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
		</div>
	)
}

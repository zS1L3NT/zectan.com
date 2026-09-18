import Image from "next/image"
import Link from "next/link"

import TagImage from "@/components/tag-image"
import {
	ABOUT_PARAGRAPHS,
	CONTACT_EMAIL,
	CONTACT_TEXT,
	FEATURED_PROJECT_IDS,
	GITHUB_USERNAME,
	HERO_GREETING,
	HERO_NAME,
	LAST_UPDATED_BRANCH,
	LAST_UPDATED_REPO,
	OTHER_PROJECT_IDS,
	REPO_BANNER_URL,
	SITE_PROFILE_IMAGE,
	SOCIAL_LINKS,
} from "@/constants"
import cn from "@/utils/cn"
import getProjects from "@/utils/get-projects"

import Particles from "./particles"
import Typewriter from "./typewriter"

const svgClassName =
	"fill-white cursor-pointer hover:fill-primary-500 hover:scale-125 pointer-events-auto"

export default async function Page() {
	const projects = await getProjects()
	const updated = await fetch(
		`https://api.github.com/repos/${GITHUB_USERNAME}/${LAST_UPDATED_REPO}/commits/${LAST_UPDATED_BRANCH}`,
		{ cache: "no-store" },
	)
		.then(res => res.json())
		.then(res => res.commit.author.date)
		.catch(() => null)
	const date = new Date(updated ?? Date.now())

	return (
		<>
			<section className="relative size-full bg-bgcolor">
				<Particles />

				<div className="absolute flex items-center justify-center pointer-events-none size-full">
					<div className="text-center xs:mx-2 sm:mx-1">
						<h1 className="text-white select-none xs:text-3xl sm:text-4xl md:text-6xl font-montserrat-regular">
							{HERO_GREETING} <span className="text-primary-400">{HERO_NAME}</span>
						</h1>
						<Typewriter />

						<div className="flex items-center justify-center size-full">
							<div className="flex xs:mt-8 sm:mt-12 md:mt-16 w-fit">
								<Link
									className="z-0 block"
									href={SOCIAL_LINKS.github}
									target="_blank"
									rel="noreferrer"
								>
									<svg
										className={cn(
											svgClassName,
											"p-1 my-1 xs:mx-2 xs:w-12 xs:h-12 sm:mx-3 sm:w-14 sm:h-14 md:mx-4 md:w-16 md:h-16",
										)}
										viewBox="0 0 50 50"
									>
										<title>GitHub</title>
										<path d="M 25 2 C 12.311335 2 2 12.311335 2 25 C 2 37.688665 12.311335 48 25 48 C 37.688665 48 48 37.688665 48 25 C 48 12.311335 37.688665 2 25 2 z M 25 4 C 36.607335 4 46 13.392665 46 25 C 46 25.071371 45.994849 25.141688 45.994141 25.212891 C 45.354527 25.153853 44.615508 25.097776 43.675781 25.064453 C 42.347063 25.017336 40.672259 25.030987 38.773438 25.125 C 38.843852 24.634651 38.893205 24.137377 38.894531 23.626953 C 38.991361 21.754332 38.362521 20.002464 37.339844 18.455078 C 37.586913 17.601352 37.876747 16.515218 37.949219 15.283203 C 38.031819 13.878925 37.910599 12.321765 36.783203 11.269531 L 36.494141 11 L 36.099609 11 C 33.416539 11 31.580023 12.12321 30.457031 13.013672 C 28.835529 12.386022 27.01222 12 25 12 C 22.976367 12 21.135525 12.391416 19.447266 13.017578 C 18.324911 12.126691 16.486785 11 13.800781 11 L 13.408203 11 L 13.119141 11.267578 C 12.020956 12.287321 11.919778 13.801759 11.988281 15.199219 C 12.048691 16.431506 12.321732 17.552142 12.564453 18.447266 C 11.524489 20.02486 10.900391 21.822018 10.900391 23.599609 C 10.900391 24.111237 10.947969 24.610071 11.017578 25.101562 C 9.2118173 25.017808 7.6020996 25.001668 6.3242188 25.046875 C 5.3845143 25.080118 4.6454422 25.135713 4.0058594 25.195312 C 4.0052628 25.129972 4 25.065482 4 25 C 4 13.392665 13.392665 4 25 4 z M 14.396484 13.130859 C 16.414067 13.322043 17.931995 14.222972 18.634766 14.847656 L 19.103516 15.261719 L 19.681641 15.025391 C 21.263092 14.374205 23.026984 14 25 14 C 26.973016 14 28.737393 14.376076 30.199219 15.015625 L 30.785156 15.273438 L 31.263672 14.847656 C 31.966683 14.222758 33.487184 13.321554 35.505859 13.130859 C 35.774256 13.575841 36.007486 14.208668 35.951172 15.166016 C 35.883772 16.311737 35.577304 17.559658 35.345703 18.300781 L 35.195312 18.783203 L 35.494141 19.191406 C 36.483616 20.540691 36.988121 22.000937 36.902344 23.544922 L 36.900391 23.572266 L 36.900391 23.599609 C 36.900391 26.095064 36.00178 28.092339 34.087891 29.572266 C 32.174048 31.052199 29.152663 32 24.900391 32 C 20.648118 32 17.624827 31.052192 15.710938 29.572266 C 13.797047 28.092339 12.900391 26.095064 12.900391 23.599609 C 12.900391 22.134903 13.429308 20.523599 14.40625 19.191406 L 14.699219 18.792969 L 14.558594 18.318359 C 14.326866 17.530484 14.042825 16.254103 13.986328 15.101562 C 13.939338 14.14294 14.166221 13.537027 14.396484 13.130859 z M 8.8847656 26.021484 C 9.5914575 26.03051 10.40146 26.068656 11.212891 26.109375 C 11.290419 26.421172 11.378822 26.727898 11.486328 27.027344 C 8.178972 27.097092 5.7047309 27.429674 4.1796875 27.714844 C 4.1152068 27.214494 4.0638483 26.710021 4.0351562 26.199219 C 5.1622058 26.092262 6.7509972 25.994233 8.8847656 26.021484 z M 41.115234 26.037109 C 43.247527 26.010033 44.835728 26.108156 45.962891 26.214844 C 45.934234 26.718328 45.883749 27.215664 45.820312 27.708984 C 44.24077 27.41921 41.699674 27.086688 38.306641 27.033203 C 38.411945 26.739677 38.499627 26.438219 38.576172 26.132812 C 39.471291 26.084833 40.344564 26.046896 41.115234 26.037109 z M 11.912109 28.019531 C 12.508849 29.215327 13.361516 30.283019 14.488281 31.154297 C 16.028825 32.345531 18.031623 33.177838 20.476562 33.623047 C 20.156699 33.951698 19.86578 34.312595 19.607422 34.693359 L 19.546875 34.640625 C 19.552375 34.634325 19.04975 34.885878 18.298828 34.953125 C 17.547906 35.020374 16.621615 35 15.800781 35 C 14.575781 35 14.03621 34.42121 13.173828 33.367188 C 12.696283 32.72356 12.114101 32.202331 11.548828 31.806641 C 10.970021 31.401475 10.476259 31.115509 9.8652344 31.013672 L 9.7832031 31 L 9.6992188 31 C 9.2325521 31 8.7809835 31.03379 8.359375 31.515625 C 8.1485707 31.756544 8.003277 32.202561 8.0976562 32.580078 C 8.1920352 32.957595 8.4308563 33.189581 8.6445312 33.332031 C 10.011254 34.24318 10.252795 36.046511 11.109375 37.650391 C 11.909298 39.244315 13.635662 40 15.400391 40 L 18 40 L 18 44.802734 C 10.967811 42.320535 5.6646795 36.204613 4.3320312 28.703125 C 5.8629338 28.414776 8.4265387 28.068108 11.912109 28.019531 z M 37.882812 28.027344 C 41.445538 28.05784 44.08105 28.404061 45.669922 28.697266 C 44.339047 36.201504 39.034072 42.31987 32 44.802734 L 32 39.599609 C 32 38.015041 31.479642 36.267712 30.574219 34.810547 C 30.299322 34.368135 29.975945 33.949736 29.615234 33.574219 C 31.930453 33.11684 33.832364 32.298821 35.3125 31.154297 C 36.436824 30.284907 37.287588 29.220424 37.882812 28.027344 z M 23.699219 34.099609 L 26.5 34.099609 C 27.312821 34.099609 28.180423 34.7474 28.875 35.865234 C 29.569577 36.983069 30 38.484177 30 39.599609 L 30 45.398438 C 28.397408 45.789234 26.72379 46 25 46 C 23.27621 46 21.602592 45.789234 20 45.398438 L 20 39.599609 C 20 38.508869 20.467828 37.011307 21.208984 35.888672 C 21.950141 34.766037 22.886398 34.099609 23.699219 34.099609 z M 12.308594 35.28125 C 13.174368 36.179258 14.222525 37 15.800781 37 C 16.579948 37 17.552484 37.028073 18.476562 36.945312 C 18.479848 36.945018 18.483042 36.943654 18.486328 36.943359 C 18.36458 37.293361 18.273744 37.645529 18.197266 38 L 15.400391 38 C 14.167057 38 13.29577 37.55443 12.894531 36.751953 L 12.886719 36.738281 L 12.880859 36.726562 C 12.716457 36.421191 12.500645 35.81059 12.308594 35.28125 z" />
									</svg>
								</Link>
								<Link
									className="z-0 block"
									href={SOCIAL_LINKS.linkedin}
									target="_blank"
									rel="noreferrer"
								>
									<svg
										className={cn(
											svgClassName,
											"p-1 xs:mx-2 xs:w-14 xs:h-14 sm:mx-3 sm:w-16 sm:h-16 md:mx-4 md:w-18 md:h-18",
										)}
										viewBox="0 0 80 80"
									>
										<title>LinkedIn</title>
										<path d="M 15 9 C 12.25 9 10 11.25 10 14 L 10 64 C 10 66.75 12.25 69 15 69 L 65 69 C 67.75 69 70 66.75 70 64 L 70 14 C 70 11.25 67.75 9 65 9 Z M 15 11 L 65 11 C 66.667969 11 68 12.332031 68 14 L 68 64 C 68 65.667969 66.667969 67 65 67 L 15 67 C 13.332031 67 12 65.667969 12 64 L 12 14 C 12 12.332031 13.332031 11 15 11 Z M 23.902344 16.984375 C 20.601563 16.984375 17.90625 19.679688 17.90625 22.972656 C 17.90625 26.269531 20.601563 28.964844 23.902344 28.964844 C 27.195313 28.964844 29.886719 26.269531 29.886719 22.972656 C 29.886719 19.679688 27.195313 16.984375 23.902344 16.984375 Z M 36 17 C 35.449219 17 35 17.449219 35 18 C 35 18.550781 35.449219 19 36 19 C 36.550781 19 37 18.550781 37 18 C 37 17.449219 36.550781 17 36 17 Z M 40 17 C 39.449219 17 39 17.449219 39 18 C 39 18.550781 39.449219 19 40 19 C 40.550781 19 41 18.550781 41 18 C 41 17.449219 40.550781 17 40 17 Z M 44 17 C 43.449219 17 43 17.449219 43 18 C 43 18.550781 43.449219 19 44 19 C 44.550781 19 45 18.550781 45 18 C 45 17.449219 44.550781 17 44 17 Z M 48 17 C 47.449219 17 47 17.449219 47 18 C 47 18.550781 47.449219 19 48 19 C 48.550781 19 49 18.550781 49 18 C 49 17.449219 48.550781 17 48 17 Z M 52 17 C 51.449219 17 51 17.449219 51 18 C 51 18.550781 51.449219 19 52 19 C 52.550781 19 53 18.550781 53 18 C 53 17.449219 52.550781 17 52 17 Z M 56 17 C 55.449219 17 55 17.449219 55 18 C 55 18.550781 55.449219 19 56 19 C 56.550781 19 57 18.550781 57 18 C 57 17.449219 56.550781 17 56 17 Z M 60 17 C 59.449219 17 59 17.449219 59 18 C 59 18.550781 59.449219 19 60 19 C 60.550781 19 61 18.550781 61 18 C 61 17.449219 60.550781 17 60 17 Z M 23.902344 18.984375 C 26.109375 18.984375 27.886719 20.761719 27.886719 22.972656 C 27.886719 25.1875 26.109375 26.964844 23.902344 26.964844 C 21.679688 26.964844 19.90625 25.1875 19.90625 22.972656 C 19.90625 20.761719 21.679688 18.984375 23.902344 18.984375 Z M 50.101563 30.058594 C 46.9375 30.058594 44.507813 31.289063 42.84375 32.867188 L 42.84375 30.746094 L 32.597656 30.746094 L 32.597656 60.421875 L 43.191406 60.421875 L 43.191406 45.734375 C 43.191406 43.992188 43.390625 42.359375 43.96875 41.308594 C 44.550781 40.253906 45.375 39.625 47.351563 39.625 C 49.246094 39.625 49.851563 40.289063 50.3125 41.453125 C 50.773438 42.621094 50.824219 44.363281 50.824219 45.960938 L 50.824219 60.421875 L 60.421875 60.421875 L 60.421875 58.421875 L 61.421875 59.421875 L 61.421875 44.242188 C 61.421875 40.441406 61.046875 36.972656 59.375 34.324219 C 57.703125 31.671875 54.675781 30.058594 50.101563 30.058594 Z M 18.59375 30.746094 L 18.59375 60.421875 L 29.203125 60.421875 L 29.203125 30.746094 Z M 50.101563 32.058594 C 54.238281 32.058594 56.371094 33.308594 57.683594 35.390625 C 58.996094 37.46875 59.421875 40.585938 59.421875 44.242188 L 59.421875 58.421875 L 52.824219 58.421875 L 52.824219 45.960938 C 52.824219 44.351563 52.84375 42.417969 52.171875 40.71875 C 51.503906 39.023438 49.871094 37.625 47.351563 37.625 C 44.851563 37.625 43.097656 38.742188 42.21875 40.34375 C 41.339844 41.941406 41.191406 43.863281 41.191406 45.734375 L 41.191406 58.421875 L 34.597656 58.421875 L 34.597656 32.746094 L 40.84375 32.746094 L 40.84375 36.527344 L 42.566406 36.527344 L 42.847656 35.996094 C 43.820313 34.15625 46.28125 32.058594 50.101563 32.058594 Z M 20.59375 32.746094 L 27.203125 32.746094 L 27.203125 58.421875 L 20.59375 58.421875 Z" />
									</svg>
								</Link>
								<Link
									className="z-0 block"
									href={SOCIAL_LINKS.stackoverflow}
									target="_blank"
									rel="noreferrer"
								>
									<svg
										className={cn(
											svgClassName,
											"p-1 my-1 xs:mx-2 xs:w-12 xs:h-12 sm:mx-3 sm:w-14 sm:h-14 md:mx-4 md:w-16 md:h-16",
										)}
										viewBox="0 0 50 50"
									>
										<title>StackOverflow</title>
										<path d="M 40.34375 1.960938 L 37.859375 2.417969 L 41.1875 20.625 L 43.171875 20.324219 Z M 29.0625 6.664063 L 27.101563 8.078125 L 37.300781 23.035156 L 39.046875 21.796875 Z M 20.351563 15.507813 L 19.113281 17.703125 L 34.5 27 L 35.664063 25.003906 Z M 16.164063 25.171875 L 15.628906 27.402344 L 33.359375 31.894531 L 34 29.921875 Z M 9 29 L 9 47.984375 L 38.902344 48 L 38.902344 47.984375 C 38.933594 47.984375 39 29 39 29 L 37 29 L 37 46 L 11 46 L 11 29 Z M 15.171875 33.375 L 14.902344 35.339844 L 33 37 L 33.203125 35.035156 Z M 15 40 L 15 42 L 33 41.929688 L 33 40 Z" />
									</svg>
								</Link>
								<Link
									className="z-0 block"
									href={SOCIAL_LINKS.leetcode}
									target="_blank"
									rel="noreferrer"
								>
									<svg
										className={cn(
											svgClassName,
											"p-1 my-1 xs:mx-2 xs:w-12 xs:h-12 sm:mx-3 sm:w-14 sm:h-14 md:mx-4 md:w-16 md:h-16",
										)}
										viewBox="0 0 16 16"
									>
										<title>LeetCode</title>
										<path d="M 10.447266 0.265625 A 0.50005 0.50005 0 0 0 10.103516 0.41796875 L 5.65625 4.8671875 L 3.0957031 7.4257812 A 0.50005 0.50005 0 0 0 2.9785156 7.6035156 C 1.769869 8.9739016 1.7865696 11.063913 3.0957031 12.373047 L 5.65625 14.933594 C 7.0176322 16.294976 9.242133 16.294976 10.603516 14.933594 L 12.853516 12.683594 A 0.50063809 0.50063809 0 1 0 12.144531 11.976562 L 9.8945312 14.226562 C 8.9159134 15.20518 7.3418991 15.20518 6.3632812 14.226562 L 3.8027344 11.666016 C 2.8241166 10.687398 2.8241166 9.1114303 3.8027344 8.1328125 L 6.3632812 5.5742188 C 7.3418991 4.5956009 8.9159135 4.5956009 9.8945312 5.5742188 L 12.144531 7.8242188 A 0.50063784 0.50063784 0 1 0 12.853516 7.1171875 L 10.603516 4.8671875 C 9.9106907 4.174363 8.9943718 3.8431189 8.0820312 3.8554688 L 10.8125 1.125 A 0.50005 0.50005 0 0 0 10.447266 0.265625 z M 7.328125 9.4003906 A 0.50005 0.50005 0 1 0 7.328125 10.400391 L 14.228516 10.400391 A 0.50005 0.50005 0 1 0 14.228516 9.4003906 L 7.328125 9.4003906 z" />
									</svg>
								</Link>
							</div>
						</div>

						<div className="w-[26px] h-[40px] absolute left-1/2 -translate-x-1/2 bottom-8 border-[1.5px] border-white rounded-[15px]">
							<div className="animate-roll w-[3px] h-[3px] absolute left-1/2 ml-[-1.5px] translate-y-[10px] bg-white rounded-full z-[2]" />
							<div className="animate-roll-shadow w-[3px] h-[3px] absolute left-1/2 ml-[-1.5px] translate-y-[10px] bg-[#aaa] rounded-full" />
						</div>
					</div>
				</div>
			</section>

			<main className="flex flex-col xs:my-8 sm:my-12 lg:my-16 xs:gap-8 sm:gap-12 lg:gap-16">
				<section className="w-full bg-white">
					<h1 className="mx-auto text-center xs:text-3xl sm:text-4xl lg:text-5xl w-fit font-montserrat-bold">
						About Me
					</h1>
					<div className="container flex flex-col mx-auto xs:gap-8 sm:gap-12 lg:gap-16 xs:my-6 sm:my-9 md:my-14 lg:flex-row">
						<Image
							className="m-auto rounded-full xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64"
							src={SITE_PROFILE_IMAGE}
							alt="Profile Picture"
							width={512}
							height={512}
						/>
						<div className="flex flex-col gap-4 flex-2 xs:px-6 sm:px-10 lg:px-0 font-montserrat-regular xs:text-sm md:text-lg">
							{ABOUT_PARAGRAPHS.map(paragraph => (
								<p key={paragraph.slice(0, 32)}>{paragraph}</p>
							))}
						</div>
					</div>
				</section>

				<section className="w-100">
					<h1 className="mx-auto text-center xs:text-3xl sm:text-4xl lg:text-5xl w-fit font-montserrat-bold">
						Featured Projects
					</h1>
					<div className="container flex flex-col mx-auto xs:gap-4 sm:gap-8 lg:gap-16 xs:px-6 sm:px-10 lg:px-0 xs:my-6 sm:my-9 md:my-14">
						{projects
							.filter(p => FEATURED_PROJECT_IDS.includes(p.title))
							.map(project => (
								<div
									key={project.title}
									className="container flex flex-col items-center group even:lg:text-end even:lg:flex-row-reverse sm:gap-4 md:gap-8 lg:gap-12 lg:h-72 lg:flex-row"
								>
									<Image
										className="sm:w-full md:w-full lg:w-fit lg:h-72"
										src={REPO_BANNER_URL(project.title)}
										alt={`Banner for ${project.title}`}
										width={1600}
										height={900}
										priority
									/>

									<div className="flex flex-col justify-center flex-1 xs:px-2 xs:py-4 sm:p-4 lg:p-0">
										<Link
											href={`https://github.com/${GITHUB_USERNAME}/${project.title}`}
											target="_blank"
											className="font-montserrat-bold xs:text-xl sm:text-2xl lg:text-3xl hover:text-secondary-400"
										>
											{project.title}
										</Link>
										<div className="flex flex-wrap mt-2 group-even:lg:justify-end gap-x-3 gap-y-1 xs:mb-4 sm:mb-5 lg:mb-6">
											{project.tags.map(t => (
												<TagImage key={t} tag={t} />
											))}
										</div>
										<p className="xs:text-sm sm:text-base lg:text-lg font-montserrat-regular">
											{project.description}
										</p>
									</div>
								</div>
							))}
					</div>
				</section>

				<section className="relative w-full bg-white">
					<div id="projects" className="absolute xs:-top-4 sm:-top-6 lg:-top-8" />
					<h1 className="mx-auto text-center xs:text-3xl sm:text-4xl lg:text-5xl w-fit font-montserrat-bold">
						Other Projects
					</h1>
					<div className="container grid mx-auto xs:gap-8 sm:gap-10 lg:gap-12 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xs:px-6 sm:px-10 lg:px-0 xs:my-6 sm:my-9 md:my-14">
						{projects
							.filter(p => OTHER_PROJECT_IDS.includes(p.title))
							.map(project => (
								<Link
									key={project.title}
									href={`https://github.com/${GITHUB_USERNAME}/${project.title}`}
									target="_blank"
									className="flex flex-col justify-between h-full gap-4 shadow-md hover:scale-105 hover:shadow-slate-300 xs:p-4 sm:p-5 lg:p-6 shadow-slate-100 bg-slate-100 "
								>
									<div>
										<h1 className="xs:text-md sm:text-lg lg:text-xl font-montserrat-bold">
											{project.title}
										</h1>
										<p className="mt-1 font-montserrat-regular xs:text-sm sm:text-base lg:text-md">
											{project.description}
										</p>
									</div>
									<div className="flex flex-wrap gap-3">
										{project.tags.map(t => (
											<TagImage key={t} tag={t} />
										))}
									</div>
								</Link>
							))}
					</div>
					<Link
						href="/projects"
						className="block px-4 py-3 m-auto border w-fit hover:scale-105 text-primary-400 font-montserrat-regular border-primary-400"
					>
						View More
					</Link>
				</section>

				<section className="w-100">
					<div className="container flex flex-col items-center mx-auto xs:my-6 sm:my-9 md:my-14">
						<h1 className="w-fit font-montserrat-bold xs:text-md sm:text-lg lg:text-xl">
							Interested in working with me?
						</h1>
						<p className="mt-2 text-center xs:w-10/12 sm:w-8/12 lg:w-1/2 font-montserrat-regular xs:text-base sm:text-md lg:text-lg">
							{CONTACT_TEXT}
						</p>
						<Link
							href={`mailto:${CONTACT_EMAIL}`}
							className="px-4 py-3 mt-8 text-white font-montserrat-regular hover:scale-105 hover:shadow-primary-400 bg-primary-400"
						>
							Contact Me
						</Link>
					</div>
				</section>

				<footer className="flex items-center justify-center h-20 bg-slate-100 w-100">
					<h1 className="opacity-50 w-fit font-montserrat-regular xs:text-sm sm:text-base lg:text-md">
						{updated ? (
							<>
								{"Last updated on "}
								{date.toLocaleDateString("en-SG", {
									timeZone: "Asia/Singapore",
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
								{" at "}
								{date.toLocaleTimeString("en-SG", {
									timeZone: "Asia/Singapore",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</>
						) : (
							"Failed to fetch last updated"
						)}
					</h1>
				</footer>
			</main>
		</>
	)
}

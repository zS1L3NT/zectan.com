"use client"

import { useEffect, useState } from "react"

import { TYPEWRITER_PREFIX, TYPEWRITER_WORDS } from "@/constants"
import cn from "@/utils/cn"

const time = (ms: number) => new Promise(res => setTimeout(res, ms))

export default function Typewriter() {
	const [blink, setBlink] = useState(false)
	const [message, setMessage] = useState("")

	useEffect(() => {
		const words = TYPEWRITER_WORDS

		let cancelled = false
		time(500).then(async () => {
			if (cancelled) return

			for (const letter of TYPEWRITER_PREFIX) {
				setMessage(message => message + letter)
				await time(40)
				if (cancelled) return
			}

			while (!cancelled) {
				for (const word of words) {
					for (const letter of `${word} `) {
						setMessage(message => message + letter)
						await time(40)
						if (cancelled) return
					}

					setBlink(true)
					await time(2000)
					if (cancelled) return
					setBlink(false)

					for (const _ of `${word} `) {
						setMessage(message => message.slice(0, -1))
						await time(20)
						if (cancelled) return
					}

					setBlink(true)
					await time(500)
					if (cancelled) return
					setBlink(false)
				}
			}
		})

		return () => {
			cancelled = true
			setMessage("")
			setBlink(false)
		}
	}, [])

	return (
		<h1 className="flex mx-auto text-white select-none sm:mt-2 md:mt-4 xs:text-3xl sm:text-4xl md:text-6xl w-fit font-montserrat-regular">
			<div>
				{message.split("").map((letter, i) => (
					<span key={`${letter}${i}`} className="text-white">
						{letter}
					</span>
				))}
				<div
					className={cn("text-white inline-block -ml-1", {
						"animate-cursor-blink": blink,
					})}
				>
					|
				</div>
			</div>
		</h1>
	)
}

"use client"

import Image from "next/image"
import { useState } from "react"

import { TAG_ICON_URL } from "@/constants"
import cn from "@/utils/cn"

export default function TagName({ tag }: { tag: string }) {
	const [error, setError] = useState(false)

	return (
		<Image
			key={tag}
			title={tag[0]?.toUpperCase() + tag.substring(1)}
			className={cn("inline-block xs:scale-75 sm:scale-90", error ? "opacity-20" : "")}
			src={TAG_ICON_URL(error ? "unknown" : tag)}
			alt={`${tag} icon`}
			width={25}
			height={25}
			onError={() => setError(true)}
		/>
	)
}

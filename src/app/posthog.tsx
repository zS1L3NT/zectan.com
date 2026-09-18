"use client"

import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { PostHogProvider, usePostHog } from "posthog-js/react"
import { type PropsWithChildren, Suspense, useEffect } from "react"

if (typeof window !== "undefined") {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
	})
}

export function Provider({ children }: PropsWithChildren) {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

export default function PageView(): null {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const posthog = usePostHog()

	useEffect(() => {
		if (pathname && posthog) {
			let url = window.origin + pathname
			if (searchParams.toString()) {
				url = `${url}?${searchParams.toString()}`
			}

			posthog.capture("$pageview", {
				$current_url: url,
			})
		}
	}, [pathname, searchParams, posthog])

	return null
}

// Suspense boundary required around useSearchParams for static prerendering
export function SuspendedPageView() {
	return (
		<Suspense fallback={null}>
			<PageView />
		</Suspense>
	)
}

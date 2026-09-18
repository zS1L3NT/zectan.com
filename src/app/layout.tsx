import type { Metadata } from "next"
import type { PropsWithChildren } from "react"

import { Analytics as VercelAnalytics } from "@vercel/analytics/next"
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next"

import { SuspendedPageView as PostHogPageView, Provider as PostHogProvider } from "./posthog"

import { SITE_DESCRIPTION, SITE_PROFILE_IMAGE, SITE_TITLE, SITE_URL } from "@/constants"
// @ts-ignore
import "@/style.scss"

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<PostHogProvider>
					<PostHogPageView />
					<VercelAnalytics />
					<VercelSpeedInsights />
					{children}
				</PostHogProvider>
			</body>
		</html>
	)
}

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	icons: {
		icon: "/favicon.ico",
		apple: "/favicon.ico",
	},
	manifest: "/manifest.json",
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	openGraph: {
		type: "profile",
		url: SITE_URL,
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		images: [SITE_PROFILE_IMAGE],
	},
}

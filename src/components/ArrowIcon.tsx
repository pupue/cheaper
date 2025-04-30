import React from 'react'
import clsx from 'clsx'

type Props = {
	dirction?: "bottom" | "right"
}

export const ArrowIcon = ({ dirction }: Props) => {
	return (
		<svg className={clsx(
			dirction === "bottom" ? "rotate-90" : "",
		)} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3" /></svg>
	)
}

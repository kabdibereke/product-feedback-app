import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface IRatingButton
	extends Omit<
		DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		"onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"
	> {
	children: ReactNode;
	upvote: () => void;
	upvoted: boolean;
}

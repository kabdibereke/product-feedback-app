import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface IButton
	extends Omit<
		DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		"onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"
	> {
	children: ReactNode;
	types: "edit" | "add" | "cancel" | "delete";
}

import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ITab
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	item: string;
}

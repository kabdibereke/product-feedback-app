import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IMenu
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSelected: React.Dispatch<React.SetStateAction<string>>;
	selected: string;
	arr: string[];
}

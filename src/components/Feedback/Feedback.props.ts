import { IProductRequests } from "@/interface/interface";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IFeedback
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	item: IProductRequests;
	click?: boolean;
}

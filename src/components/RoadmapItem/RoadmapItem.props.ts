import { IProductRequests } from "@/interface/interface";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IRoadmap
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	item: IProductRequests;
	color: "planned" | "inProgress" | "live";
}

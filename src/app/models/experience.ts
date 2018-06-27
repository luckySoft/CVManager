import { Period } from "./period";

export class Experience {
    period: Period;
    job: string;
    company: string;
    address: string;
    url?: string;
    type: string;
    technologies: Array<string>;
    responsibilities: Array<string>;
    projectIds: Array<string>;
}
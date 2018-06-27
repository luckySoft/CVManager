import { Experience } from "./experience";
import { Education } from "./education";
import { SocialSkill } from "./social-skill";
import { Skill } from "./skill";
import { Language } from "./language";
import { AsyncValidator } from "@angular/forms";
import { Avatar } from './avatar';

export class User {
    id: number;
    name: string;
    lastName: string;
    mainProfiles: Avatar[];
    description: string;
    jobTitle: string;
    location: string;
    email: string;
    videoId: string;
    password: string;
    facebook?: string;
    twitter?: string;
    linkedIn?: string;
    favTechnologies: string[];
    languages: Language[];
    experience: Experience[];
    education: Education[];
    socialSkills: SocialSkill[];
    devSkills: Skill[];
}
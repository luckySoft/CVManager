import { User } from 'src/app/models/user';
import { Language } from './language';
import { Experience } from './experience';
import { Education } from './education';
import { SocialSkill } from './social-skill';
import { Skill } from './skill';
import { Avatar } from './avatar';
import { Period } from './period';
import { FormControl } from '@angular/forms';

const LANGUAGES: Language[] = [
    {
        name: "English",
        level: "Intermediate"
    },
    {
        name: 'Bulgarian',
        level: 'Expert'
    }
];

let period = new Period();
period.from = new Date('05/09/2016');
let period1 = new Period();
period1.from = new Date('01/01/2015');
period1.to = new Date('05/09/2016');
const EXPERIENCE: Experience[] = [
    {
        period: period,
        job: 'Integration Developer',
        company: 'Scalefocus AD',
        address: "Sofia, Bulgaria",
        url: 'http://scalefocus.com',
        type: 'Full Time',
        responsibilities: [
            'Developing Web applications',
            'Developing E-Comm sites',
            'Integrating web apps with API'
        ],
        technologies: [
            'Enterprise Solutions',
            'Middleware Integration Development',
            'System Transformations',
            'UI Development',
            'Web Apps Building & Deployment'
        ],
        projectIds: [
            'Ch163VfHtvA', 'BAqtdefeGrQ', 's7wmiS2mSXY', 'btOyCT3BqOY'
        ]
    },
    {
        period: period1,
        job: 'Junior Software Engineer',
        company: 'Faculty of Mathematics and Informatics at Sofia University',
        address: "Sofia, Bulgaria",
        url: 'http://fmi.uni-sofia.bg',
        type: 'Part Time',
        responsibilities: [
            'Developing Web applications',
            'Developing E-Comm sites',
        ],
        technologies: [
            'Camel', 'Java', 'Tibco', 'Angular', 'MuleSoft', 'Spring Integration', 'String Boot', 'Spring Framework'
        ],
        projectIds: [
            'NrHpXvDXVrw', 'fTvIb5LcUUU', 'qaIROwHUm54', 'hugJHCHvWJ8'
        ]
    }
];

let period2 = new Period();
period2.from = new Date('10/09/2014');
period2.to = new Date('09/10/2018');
let period3 = new Period();
period3.from = new Date('09/15/2009');
period3.to = new Date('05/15/2014');
const EDUCATION: Education[] = [
    {
        period: period2,
        specialty: 'Software Engineering',
        institution: 'Faculty of Mathematics and Informatics at Sofia University',
        address: "Sofia, Bulgaria",
        url: 'http://fmi.uni-sofia.bg'
    },
    {
        period: period3,
        specialty: 'Informatics and Mathematics',
        institution: 'Higher Secondary School in mathematics and science',
        address: "Smolyan, Bulgaria",
        url: 'http://www.pmg-smolyan.org/'
    }
];

export const EMPTY_SOCIAL_SKILLS: SocialSkill[] = [
    {
        title: "Design & Development",
        theme: "success",
        percentage: 0
    },
    {
        title: "Communication",
        theme: "info",
        percentage: 0
    },
    {
        title: "Planning & Progressing",
        theme: "danger",
        percentage: 0
    },
    {
        title: "Problem Solving & Decision Making",
        theme: "warning",
        percentage: 0
    },
    {
        title: "Loyal & Dedication",
        theme: "success",
        percentage: 0
    },
    {
        title: "Fun & Friendly",
        theme: "info",
        percentage: 0
    },
    {
        title: "Lazy & Sleepy",
        theme: "warning",
        percentage: 0
    }
]; 

const SOCIAL_SKILLS: SocialSkill[] = [
    {
        title: "Design & Development",
        theme: "success",
        percentage: 80
    },
    {
        title: "Communication",
        theme: "info",
        percentage: 83
    },
    {
        title: "Planning & Progressing",
        theme: "danger",
        percentage: 75
    },
    {
        title: "Problem Solving & Decision Making",
        theme: "warning",
        percentage: 85
    },
    {
        title: "Loyal & Dedication",
        theme: "success",
        percentage: 100
    },
    {
        title: "Fun & Friendly",
        theme: "info",
        percentage: 95
    },
    {
        title: "Lazy & Sleepy",
        theme: "warning",
        percentage: 40
    }
];

const DEV_SKILLS: Skill[] = [
    {
        software: "Mongo DB",
        percentage: "80",
        theme: "success",
        image: "mongodb"
    },
    {
        software: "Express JS",
        percentage: "75",
        theme: "info",
        image: "express"
    },
    {
        software: "Angular JS",
        percentage: "85",
        theme: "warning",
        image: "angular-js"
    },
    {
        software: "Node JS",
        percentage: "83",
        theme: "danger",
        image: "node"
    },
    {
        software: "Javascript",
        percentage: "80",
        theme: "success",
        image: "javascript"
    },
    {
        software: "Type Script",
        percentage: "70",
        theme: "info",
        image: "typescript"
    },
    {
        software: "jQuery",
        percentage: "80",
        theme: "warning",
        image: "jquery"
    },
    {
        software: "Joomla",
        percentage: "85",
        theme: "danger",
        image: "joomla"
    },
    {
        software: "HTML 5",
        percentage: "90",
        theme: "success",
        image: "html5"
    },
    {
        software: "CSS 3",
        percentage: "83",
        theme: "info",
        image: "css3"
    },
    {
        software: "SAAS",
        percentage: "72",
        theme: "warning",
        image: "saas"
    },
    {
        software: "Bootstrap",
        percentage: "85",
        theme: "danger",
        image: "bootstrap"
    },
    {
        software: "PhotoShop",
        percentage: "90",
        theme: "success",
        image: "photoshop"
    },
    {
        software: "Corel Draw",
        percentage: "95",
        theme: "info",
        image: "coreldraw"
    },
    {
        software: "Flash",
        percentage: "65",
        theme: "warning",
        image: "flash"
    },
    {
        software: "Java",
        percentage: "100",
        theme: "success",
        image: "java",
    },
    {
        software: "SQL",
        percentage: "70",
        theme: "info",
        image: "sql"
    },
    {
        software: "Hardware",
        percentage: "87",
        theme: "warning",
        image: "hardware"
    },
    {
        software: "Cloud Computing",
        percentage: "72",
        theme: "danger",
        image: "cloud"
    }
];

let avatar1 = new Avatar();
avatar1.main = true;
avatar1.img = 'assets/home/photo1.jpg';
let avatar2 = new Avatar();
avatar2.main = false;
avatar2.img = 'assets/home/photo2.jpg';
let avatar3 = new Avatar();
avatar3.main = false;
avatar3.img = 'assets/home/photo3.jpg';

export const users: User[] = [
    {
        id: 1,
        name: 'Evgeni',
        lastName: 'Stoykov',
        mainProfiles: new Array(avatar1, avatar2, avatar3),
        description: 'I am Casual But not Usual',
        jobTitle: 'Integration Developer',
        location: 'Bulgaria, Sofia',
        email: "evgeni.stoykov@scalefocus.com",
        videoId: 'zEtIntNEYZk',
        password: "12345678",
        facebook: "https://www.facebook.com/evgeni.stoikov.5",
        twitter: "https://www.twitter.com/evgeni.stoykov",  
        linkedIn: "https://www.linkedin.com/evgeni.stoykov",
        favTechnologies: new Array('angular', 'mongodb', 'node', 'java'),
        languages: LANGUAGES,
        experience: EXPERIENCE,
        education: EDUCATION,
        socialSkills: SOCIAL_SKILLS,
        devSkills: DEV_SKILLS
    },
    {
        id: 2,
        name: 'John',
        lastName: "Doe",
        mainProfiles: new Array(),
        description: 'The Java Expert',
        jobTitle: 'Software Engineer',
        location: 'Bulgaria, Sofia',
        email: 'john.doe@abv.bg',
        videoId: 'zEtIntNEYZk',
        password: "12345678",
        facebook: "https://www.facebook.com/evgeni.stoikov.5",
        favTechnologies: new Array('angular', 'mongodb', 'node', 'java'),
        languages: LANGUAGES,
        experience: EXPERIENCE,
        education: EDUCATION,
        socialSkills: SOCIAL_SKILLS,
        devSkills: DEV_SKILLS
    },
    {
        id: 3,
        name: 'Mike',
        lastName: 'Brown',
        mainProfiles: new Array(),
        description: 'Google Type Person',
        jobTitle: 'Software Engineer',
        location: 'Bulgaria, Sofia',
        email: 'mike.brown@dir.bg',
        videoId: 'zEtIntNEYZk',
        password: "12345678",
        facebook: "https://www.facebook.com/evgeni.stoikov.5",
        favTechnologies: new Array('angular', 'mongodb', 'node', 'java'),
        languages: LANGUAGES,
        experience: EXPERIENCE,
        education: EDUCATION,
        socialSkills: SOCIAL_SKILLS,
        devSkills: DEV_SKILLS
    },
    {
        id: 4,
        name: 'Tommy',
        lastName: 'Hanson',
        mainProfiles: new Array(),
        description: 'Google Type Person',
        jobTitle: 'Software Engineer',
        location: 'Bulgaria, Sofia',
        email: 'tom.han@abv.bg',
        videoId: 'zEtIntNEYZk',
        password: "12345678",
        facebook: "https://www.facebook.com/evgeni.stoikov.5",
        favTechnologies: new Array('angular', 'mongodb', 'node', 'java'),
        languages: LANGUAGES,
        experience: EXPERIENCE,
        education: EDUCATION,
        socialSkills: SOCIAL_SKILLS,
        devSkills: DEV_SKILLS
    }
];


export class Technology {
    constructor(private techValue: string, private viewValue: string) { }

    public getTechValue() {
        return this.techValue;
    }
    
    public getViewValue() {
        return this.viewValue;
    }
}
export const SUPPORTED_TECHNOLOGIES: Technology[] = [
    new Technology("java", "Java"),
    new Technology("node", "Node JS"),
    new Technology("typescript", "Type Script"),
    new Technology("javascript", "Javascript"),
    new Technology("angular", "Angular"),
    new Technology("mongodb", "Mongo DB"),
    new Technology("angular-js", "Angular JS"),
    new Technology("bootstrap", "Bootstrap"),
    new Technology("cloud", "Cloud"),
    new Technology("css3", "CSS 3"),
    new Technology("coreldraw", "Corel Draw"),
    new Technology("express", "Express"),
    new Technology("expressjs", "Express JS"),
    new Technology("flash", "Flash"),
    new Technology("hardware", "Hardware"),
    new Technology("html5", "HTML 5"),
    new Technology("joomla", "Joomla"),
    new Technology("jquery", "jQuery"),
    new Technology("saas", "SAAS"),
    new Technology("sql", "SQL"),
    new Technology("photoshop", "Photo Shop"),
    new Technology("camel", "Apache Camel"),
    new Technology("spring-boot", "Spring Boot"),
    new Technology("mulesoft", "MuleSoft")
];

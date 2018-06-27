import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MENU_ITEMS } from './../models/menu-items';
import { users } from './../models/mock-users';
import { User } from '../models/user';
import { Avatar } from './../models/avatar';
import { SUPPORTED_TECHNOLOGIES, Technology } from './../models/technologies';
import { Experience } from '../models/experience';
import { Language } from './../models/language';
import { Location } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { LANGUAGE_LEVELS } from './../models/mock-languages';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from './../user.service';
import { Skill } from '../models/skill';
import { THEMES } from '../models/themes';
import { Education } from '../models/education';
import { JOB_TYPES } from './../models/job-types';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Period } from '../models/period';
import { tap, map } from 'rxjs/operators';
import { AlertService } from '../alert.service';
import { SocialSkill } from './../models/social-skill';
import { Router } from '@angular/router';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  private id;
  user: User;
  private avatars$: Observable<Avatar[]>;
  languageLevels = LANGUAGE_LEVELS;
  technologies = SUPPORTED_TECHNOLOGIES;
  themes = THEMES;
  jobTypes = JOB_TYPES;
  separatorKeysCodes = [ENTER, COMMA];
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  profileForm: FormGroup;
  submitted = false;
  favTechnologies: Array<string>;

  constructor(private location: Location,
    private userService: UserService,
    private alert: AlertService,
    private formBuilder: FormBuilder,
    private router: Router) {

  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("currentUser"));

    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      description: ['', Validators.required],
      jobTitle: ['', Validators.required],
      location: ['', Validators.required],
      videoId: [''],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      facebook: ['', Validators.required],
      twitter: ['', Validators.required],
      linkedIn: ['', Validators.required],
      favTechnologies: this.formBuilder.array([Validators.required]),
      languages: this.formBuilder.array([this.createLanguage()]),
      experience: this.formBuilder.array([this.createExperience()]),
      education: this.formBuilder.array([this.createEducation()]),
      socialSkills: this.formBuilder.array([this.createSocialSkill()]),
      devSkills: this.formBuilder.array([this.createSkill()])
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      this.addImage(item);
      alert('File uploaded successfully');
    };
    this.profileForm.patchValue(this.user);
    const languagesFGs = this.user.languages.map(lang => this.formBuilder.group(lang));
    const languagesFormArray = this.formBuilder.array(languagesFGs);
    this.profileForm.setControl('languages', languagesFormArray);
    const skillsFGs = this.user.devSkills.map(skill => this.formBuilder.group(skill));
    const skillsFormArray = this.formBuilder.array(skillsFGs);
    this.profileForm.setControl('devSkills', skillsFormArray);
    const educationFGs = this.user.education.map(education => this.createComplexEducation(education));
    const educationFormArray = this.formBuilder.array(educationFGs);
    this.profileForm.setControl('education', educationFormArray);
    const experienceFGs = this.user.experience.map(experience => this.createComplexExperience(experience));
    const experienceFormArray = this.formBuilder.array(experienceFGs);
    this.profileForm.setControl('experience', experienceFormArray);
    const socialSkillsFGs = this.user.socialSkills.map(skill => this.formBuilder.group(skill));
    const socialSkillsFormArray = this.formBuilder.array(socialSkillsFGs);
    this.profileForm.setControl('socialSkills', socialSkillsFormArray);
    this.id = this.user.id;
    this.favTechnologies = this.user.favTechnologies;
    this.avatars$ = of(this.user.mainProfiles);
  }

  ngAfterViewInit() {
  }

  createLanguage(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      level: ['A1', Validators.required]
    });
  }

  createEducation(): FormGroup {
    return this.formBuilder.group({
      period: this.formBuilder.group({
        from: ['', Validators.required],
        to: ['']
      }),
      specialty: ['', Validators.required],
      institution: ['', Validators.required],
      address: ['', Validators.required],
      url: ['']
    });
  }

  createExperience(): FormGroup {
    return this.formBuilder.group({
      period: this.formBuilder.group({
        from: ['', Validators.required],
        to: ['']
      }),
      job: ['', Validators.required],
      company: ['', Validators.required],
      address: ['', Validators.required],
      url: [''],
      type: ['', Validators.required],
      responsibilities: this.formBuilder.array([]),
      technologies: this.formBuilder.array([]),
      projectIds: this.formBuilder.array([])
    });
  }

  createComplexEducation(edu: Education) {
    return this.formBuilder.group({
      period: this.formBuilder.group({
        from: [edu.period.from, Validators.required],
        to: [edu.period.to]
      }),
      specialty: [edu.specialty, Validators.required],
      institution: [edu.institution, Validators.required],
      address: [edu.address, Validators.required],
      url: [edu.url]
    });
  }

  createComplexExperience(exp: Experience): FormGroup {
    return this.formBuilder.group({
      period: this.formBuilder.group({
        from: [exp.period.from, Validators.required],
        to: exp.period.to
      }),
      job: [exp.job, Validators.required],
      company: [exp.company, Validators.required],
      address: [exp.address, Validators.required],
      url: [exp.url],
      type: [exp.type, Validators.required],
      responsibilities: this.formBuilder.array(exp.responsibilities),
      technologies: this.formBuilder.array(exp.technologies),
      projectIds: this.formBuilder.array(exp.projectIds)
    });
  }

  createSkill(): FormGroup {
    return this.formBuilder.group({
      software: ['', Validators.required],
      percentage: ['0', Validators.required],
      theme: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  createSocialSkill(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      theme: ['', Validators.required],
      percentage: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  addLanguage() {
    let languages = this.profileForm.get('languages') as FormArray;
    languages.push(this.createLanguage());

  }

  removeLanguage(langIndex: number) {
    let languages = this.profileForm.get('languages') as FormArray;
    languages.removeAt(langIndex);
  }

  addSkill() {
    let devSkills = this.profileForm.get("devSkills") as FormArray;
    devSkills.push(this.createSkill());
  }

  removeSkill(skillIndex: number) {
    let devSkills = this.profileForm.get('devSkills') as FormArray;
    devSkills.removeAt(skillIndex);
  }

  addEducation() {
    let education = this.profileForm.get("education") as FormArray;
    education.push(this.createEducation());
  }

  removeEducation(eduIndex: number) {
    let education = this.profileForm.get('education') as FormArray;
    education.removeAt(eduIndex);
  }

  addExperience() {
    let experience = this.profileForm.get("experience") as FormArray;
    experience.push(this.createExperience());
  }

  removeExperience(expIndex: number) {
    let experience = this.profileForm.get('experience') as FormArray;
    experience.removeAt(expIndex);
  }

  addResponsibility(expIndex: number) {
    let expArray = this.profileForm.get('experience') as FormArray;
    let responsibilities = expArray.controls[expIndex].get("responsibilities") as FormArray;
    responsibilities.push(new FormControl(''));
  }

  removeResponsibility(respIndex: number, expIndex: number) {
    let expArray = this.profileForm.get('experience') as FormArray;
    let responsibilities = expArray.controls[expIndex].get("responsibilities") as FormArray;
    responsibilities.removeAt(respIndex);
  }

  addTechnology(event: MatChipInputEvent, expIndex: number) {
    let input = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      let expArray = this.profileForm.get('experience') as FormArray;
      let technologies = expArray.controls[expIndex].get("technologies") as FormArray;
      technologies.push(this.formBuilder.group({
        tech: value
      }))
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTechnology(respIndex: number, expIndex: number) {
    let expArray = this.profileForm.get('experience') as FormArray;
    let technologies = expArray.controls[expIndex].get("technologies") as FormArray;
    technologies.removeAt(respIndex);
  }

  addVideo(event: MatChipInputEvent, expIndex: number) {
    let input = event.input;
    let value = event.value;
    let regex = new RegExp("https://www.youtube.com/watch?v=\\w+");
    if ((value || '').trim().length > 0 && regex.test(value)) {
      let videoUrl = value.split("=", 2);
      let id = videoUrl[1];
      let expArray = this.profileForm.get('experience') as FormArray;
      let projectIds = expArray.controls[expIndex].get("projectIds") as FormArray;
      projectIds.push(this.formBuilder.group({
        projectId: id
      }));
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeVideo(idIndex: number, expIndex: number) {
    let expArray = this.profileForm.get('experience') as FormArray;
    let projectIds = expArray.controls[expIndex].get("projectIds") as FormArray;
    projectIds.removeAt(idIndex);
  }

  addImage(image: any) {
    let avatar = new Avatar();
    avatar.main = false;
    avatar.img = image;
    this.avatars$.subscribe(avatars => avatars.push(avatar));
  }

  removeImage(avatar: Avatar): void {
    this.avatars$.subscribe(avatars => avatars = avatars.splice(avatars.indexOf(avatar), 1));
  }

  getMainProfile(): string {
    return this.user.mainProfiles.filter(profile => profile.main)[0].img;
  }

  changeMainProfile(main: Avatar) {
    this.user.mainProfiles.forEach(profile => profile.main = false);
    let mainAvatarIndex = this.user.mainProfiles.indexOf(main);
    this.user.mainProfiles[mainAvatarIndex].main = !this.user.mainProfiles[mainAvatarIndex].main;
    this.avatars$.subscribe(avatars => avatars = this.user.mainProfiles);
  }

  checkUserTechnologies(tech: string): boolean {
    return this.favTechnologies.includes(tech);
  }

  changeFavouriteTechnologies(tech: string) {
    if (this.checkUserTechnologies(tech)) {
      let techIndex = this.user.favTechnologies.indexOf(tech);
      this.favTechnologies.splice(techIndex, 1);
    } else {
      this.favTechnologies.push(tech);
    }
  }

  save() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    
    this.user = this.profileForm.getRawValue() as User;
    this.avatars$.subscribe(avatars => this.user.mainProfiles = avatars);
    this.user.videoId = this.user.videoId.split("=")[0];
    this.user.id = this.id;
    this.user.favTechnologies = this.favTechnologies;
    this.userService.updateUser(this.user).subscribe();
    sessionStorage.setItem("currentUser", JSON.stringify(this.user));
    this.router.navigate(["/users/" + this.id + "/dashboard"])
  }

  goBack() {
    this.location.back();
  }
}
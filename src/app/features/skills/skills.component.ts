import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

 expandedSection: 'languages' | 'tools' | null = null;

  languages = [
    { name: 'Java', icon: 'https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png' },
    { name: 'Python', icon: 'https://img.icons8.com/color/48/000000/python.png' },
    { name: 'Oracle', icon: 'https://img.icons8.com/?size=100&id=39913&format=png&color=000000' },
    { name: 'SQL', icon: 'https://img.icons8.com/color/48/000000/mysql-logo.png' },
    { name: 'Angular', icon: 'https://img.icons8.com/?size=100&id=dSnah6CSCxRG&format=png&color=000000' },
    { name: 'Spring Boot', icon: 'https://img.icons8.com/?size=100&id=90519&format=png&color=000000' },
    { name: 'Node Js', icon: 'https://img.icons8.com/color/48/000000/nodejs.png' },
    { name: 'C', icon: 'https://img.icons8.com/?size=100&id=39913&format=png&color=000000'},
    { name: 'C++', icon: 'https://img.icons8.com/color/48/000000/c-plus-plus-logo.png'},
    { name: 'html', icon: 'https://img.icons8.com/color/48/000000/html-5.png'},
    
  ];

  tools = [
    { name: 'Talend', icon: 'https://logowik.com/content/uploads/images/talend5625.jpg' },
    { name: 'Informatica cloud', icon: 'https://companieslogo.com/img/orig/INFA-c4767c1c.png?t=1720244492' },
    { name: 'Snowflake', icon: 'https://img.icons8.com/?size=100&id=GlN24LRjUhww&format=png&color=000000' },
    { name: 'IntelliJ', icon: 'https://img.icons8.com/?size=100&id=61466&format=png&color=000000' },
    { name: 'Vs Code', icon: 'https://img.icons8.com/color/48/000000/visual-studio-code-2019.png' },
    { name: 'Py charm ', icon: 'https://img.icons8.com/color/48/000000/pycharm.png' },
    { name: 'git', icon: 'https://img.icons8.com/color/50/000000/git.png' },
    { name: 'Eclipse', icon: 'https://img.icons8.com/officel/480/null/java-eclipse.png' },
    { name: 'Anaconda', icon: 'https://img.icons8.com/dusk/64/000000/anaconda.png' },
    { name: 'Docker', icon: 'https://img.icons8.com/?size=100&id=cdYUlRaag9G9&format=png&color=000000' },
  ];

  toggle(section: 'languages' | 'tools') {
    this.expandedSection = this.expandedSection === section ? null : section;
  }
}

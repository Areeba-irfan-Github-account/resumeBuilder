// index.js

// DOM elements
const builderForm = document.getElementById('builder-form');
const generatedResume = document.getElementById('generatedResume');
const editResumeBtn = document.getElementById('editResume');
const backToFormBtn = document.getElementById('backToForm');
const shareResumeBtn = document.getElementById('shareResume');
const downloadResumeBtn = document.getElementById('downloadResume');

// Form data
let resumeData = {
  fullName: '',
  ProfName:'',
  photo: null,
  about: '',
  phone: '',
  website: '',
  address: '',
  education: [],
  experience: [],
  skills: [],
  languages: [],
};

// Helper functions
const addEducationField = () => {
  const educationFields = document.getElementById('educationFields');
  const newField = document.createElement('div');
  newField.classList.add('education-entry');
  newField.innerHTML = `
    <div class="form-group">
      <label>Degree</label>
      <input type="text" class="degree">
    </div>
    <div class="form-group">
      <label>Institution</label>
      <input type="text" class="institution">
    </div>
    <div class="form-group">
      <label>Year</label>
      <input type="text" class="year">
    </div>
  `;
  educationFields.appendChild(newField);
};

const addExperienceField = () => {
  const experienceFields = document.getElementById('experienceFields');
  const newField = document.createElement('div');
  newField.classList.add('experience-entry');
  newField.innerHTML = `
    <div class="form-group">
      <label>Position</label>
      <input type="text" class="position">
    </div>
    <div class="form-group">
      <label>Company</label>
      <input type="text" class="company">
    </div>
    <div class="form-group">
      <label>Duration</label>
      <input type="text" class="duration">
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea class="description" rows="3"></textarea>
    </div>
  `;
  experienceFields.appendChild(newField);
};

const addLanguageField = () => {
  const languageFields = document.getElementById('languageFields');
  const newField = document.createElement('div');
  newField.classList.add('language-entry');
  newField.innerHTML = `
    <div class="form-group">
      <label>Language</label>
      <input type="text" class="language">
    </div>
    <div class="form-group">
      <label>Proficiency</label>
      <select class="proficiency">
        <option value="Basic">Basic</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
        <option value="Native">Native</option>
      </select>
    </div>
  `;
  languageFields.appendChild(newField);
};

const addSkill = (skill) => {
  const skillTags = document.getElementById('skillTags');
  const skillTag = document.createElement('div');
  skillTag.classList.add('skill-tag');
  skillTag.textContent = skill;
  skillTags.appendChild(skillTag);
};

const generateResume = () => {
  // Collect form data
  resumeData.fullName = document.getElementById('fullName').value;
  resumeData.ProfName = document.getElementById('ProfName').value;
  resumeData.photo = document.getElementById('photo').files[0] || null;
  resumeData.about = document.getElementById('about').value;
  resumeData.phone = document.getElementById('phone').value;
  resumeData.website = document.getElementById('website').value;
  resumeData.address = document.getElementById('address').value;

  // Education
  const educationEntries = document.querySelectorAll('.education-entry');
  resumeData.education = Array.from(educationEntries).map((entry) => ({
    degree: entry.querySelector('.degree').value,
    institution: entry.querySelector('.institution').value,
    year: entry.querySelector('.year').value,
  }));

  // Experience
  const experienceEntries = document.querySelectorAll('.experience-entry');
  resumeData.experience = Array.from(experienceEntries).map((entry) => ({
    position: entry.querySelector('.position').value,
    company: entry.querySelector('.company').value,
    duration: entry.querySelector('.duration').value,
    description: entry.querySelector('.description').value,
  }));

  // Skills
  const skillInput = document.getElementById('skillInput');
  const skillTags = document.getElementById('skillTags').children;
  resumeData.skills = Array.from(skillTags).map((tag) => tag.textContent);
  skillInput.value = '';

  // Languages
  const languageEntries = document.querySelectorAll('.language-entry');
  resumeData.languages = Array.from(languageEntries).map((entry) => ({
    language: entry.querySelector('.language').value,
    proficiency: entry.querySelector('.proficiency').value,
  }));

  // Render the generated resume
  renderResume();
  generatedResume.classList.remove('hidden');
  builderForm.classList.add('hidden');
};

const renderResume = () => {
  // Render the resume content based on resumeData
  document.getElementById('nameSection').textContent = resumeData.fullName;
  document.getElementById('profSection').textContent = resumeData.ProfName;
  document.getElementById('aboutInfo').textContent = resumeData.about;
  document.getElementById('contactInfo').innerHTML = `
    <p>${resumeData.phone}</p>
    <p>${resumeData.website}</p>
    <p>${resumeData.address}</p>
  `;

  const educationInfo = document.getElementById('educationInfo');
  educationInfo.innerHTML = '';
  resumeData.education.forEach((edu) => {
    const eduElement = document.createElement('div');
    eduElement.innerHTML = `
      <h3>${edu.degree}</h3>
      <p>${edu.institution}</p>
      <p>${edu.year}</p>
    `;
    educationInfo.appendChild(eduElement);
  });

  const experienceInfo = document.getElementById('experienceInfo');
  experienceInfo.innerHTML = '';
  resumeData.experience.forEach((exp) => {
    const expElement = document.createElement('div');
    expElement.innerHTML = `
      <h3>${exp.position}</h3>
      <p>${exp.company}</p>
      <p>${exp.duration}</p>
      <p>${exp.description}</p>
    `;
    experienceInfo.appendChild(expElement);
  });

  const skillsInfo = document.getElementById('skillsInfo');
  skillsInfo.innerHTML = '';
  resumeData.skills.forEach((skill) => {
    const skillElement = document.createElement('div');
    skillElement.classList.add('skill-tag');
    skillElement.textContent = skill;
    skillsInfo.appendChild(skillElement);
  });

  const languageInfo = document.getElementById('languageInfo');
  languageInfo.innerHTML = '';
  resumeData.languages.forEach((lang) => {
    const langElement = document.createElement('div');
    langElement.innerHTML = `
      <h3>${lang.language}</h3>
      <p>${lang.proficiency}</p>
    `;
    languageInfo.appendChild(langElement);
  });

  // Display the profile image if available
  const profileImage = document.getElementById('profileImage');
  if (resumeData.photo) {
    profileImage.style.backgroundImage = `url(${URL.createObjectURL(resumeData.photo)})`;
  } else {
    profileImage.style.backgroundImage = '';
  }
};

const editResume = () => {
  // Populate the form with the current resume data
  document.getElementById('fullName').value = resumeData.fullName;
  document.getElementById('ProfName').value = resumeData.ProfName;
  document.getElementById('photo').value = '';
  document.getElementById('about').value = resumeData.about;
  document.getElementById('phone').value = resumeData.phone;
  document.getElementById('website').value = resumeData.website;
  document.getElementById('address').value = resumeData.address;

  // Populate the education, experience, and language fields
  const educationFields = document.getElementById('educationFields');
  educationFields.innerHTML = '';
  resumeData.education.forEach((edu) => {
    addEducationField();
    const educationEntries = document.querySelectorAll('.education-entry');
    const lastEntry = educationEntries[educationEntries.length - 1];
    lastEntry.querySelector('.degree').value = edu.degree;
    lastEntry.querySelector('.institution').value = edu.institution;
    lastEntry.querySelector('.year').value = edu.year;
  });

  const experienceFields = document.getElementById('experienceFields');
  experienceFields.innerHTML = '';
  resumeData.experience.forEach((exp) => {
    addExperienceField();
    const experienceEntries = document.querySelectorAll('.experience-entry');
    const lastEntry = experienceEntries[experienceEntries.length - 1];
    lastEntry.querySelector('.position').value = exp.position;
    lastEntry.querySelector('.company').value = exp.company;
    lastEntry.querySelector('.duration').value = exp.duration;
    lastEntry.querySelector('.description').value = exp.description;
  });

  const languageFields = document.getElementById('languageFields');
  languageFields.innerHTML = '';
  resumeData.languages.forEach((lang) => {
    addLanguageField();
    const languageEntries = document.querySelectorAll('.language-entry');
    const lastEntry = languageEntries[languageEntries.length - 1];
    lastEntry.querySelector('.language').value = lang.language;
    lastEntry.querySelector('.proficiency').value = lang.proficiency;
  });

  const skillTags = document.getElementById('skillTags');
  skillTags.innerHTML = '';
  resumeData.skills.forEach((skill) => {
    addSkill(skill);
  });

  generatedResume.classList.add('hidden');
  builderForm.classList.remove('hidden');
};

const shareResume = () => {
   // Generate a unique and short resume link
   const resumeLink = generateShortLink();
   // Display the resume link to the user (e.g., copy to clipboard, show in a modal)
   navigator.clipboard.writeText(resumeLink);
   alert(`Resume link copied to clipboard: ${resumeLink}`);
};

const downloadResume = () => {
  // Create a new HTML element to hold the resume content
  const resumeElement = document.createElement('div');
  resumeElement.innerHTML = generatedResume.innerHTML;

  // Convert the HTML to a PDF using html2pdf
  html2pdf()
    .from(resumeElement)
    .save('resume.pdf');
};

const generateShortLink = () => {
  // Generate a short, unique link for sharing the resume
  return `https://myresumesite.com/r/${Math.random().toString(36).substring(2, 8)}`;
};

// Event listeners
builderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  generateResume();
});

document.getElementById('addEducation').addEventListener('click', addEducationField);
document.getElementById('addExperience').addEventListener('click', addExperienceField);
document.getElementById('addLanguage').addEventListener('click', addLanguageField);
document.getElementById('skillInput').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addSkill(e.target.value.trim());
    e.target.value = '';
  }
});

editResumeBtn.addEventListener('click', editResume);
backToFormBtn.addEventListener('click', editResume);
shareResumeBtn.addEventListener('click', shareResume);
downloadResumeBtn.addEventListener('click', downloadResume);
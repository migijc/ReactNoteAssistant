import React from 'react';

export default async function promptGenerator(inputData) {
    console.log(inputData)
  let initialPrompt =
    intro(inputData.userFirstName, inputData.userLastName) +
    applyingFor(inputData.futureJobTitle, inputData.futureCompanyName) +
    relaventSkills(inputData.relevantSkills);
  if (inputData.relevantJobRoles && inputData.yearsOfRelevantExperience) {
    initialPrompt =
      initialPrompt +
      relevantRoles(
        inputData.relevantJobRoles,
        inputData.yearsOfRelevantExperience,
      );
  } else if (inputData.education && inputData.degreeEarned) {
    initialPrompt =
      initialPrompt + education(inputData.education, inputData.degreeEarned);
  }
  return initialPrompt;
}

const intro = (userFirstName, userLastName) =>
  `Write a cover letter for ${userFirstName} ${userLastName}.`;

const applyingFor = (futureRoleTitle, futureComapnanyName) =>
  `They are applying to the role of ${futureRoleTitle} at ${futureComapnanyName}.`;

const relaventSkills = stringOfSkills => {
  let arrFromString = stringOfSkills.split(',');
  let promptFragment = `Some of their skills include ${stringOfSkills}.`;
  return promptFragment;
};

const relevantRoles = (relevantTitles, yearsOfRelevantExperience) =>
  `In their ${yearsOfRelevantExperience} year(s) of experience they have had the following roles ${relevantTitles}.`;

const education = (userFirstName, educationName, degreeEarned) =>
  `${userFirstName} recieved an education from ${educationName} and acquired a degree in ${degreeEarned}.`;

/// <reference types="cypress" />
import LoginPage from "../PageObjects/LoginPage";
import DashboardPage from "../PageObjects/DashboardPage";
import RecruitmentPage from "../PageObjects/RecruitmentPage";

const loginPage = new LoginPage();
const dasboardPage = new DashboardPage();
const recruitmentPage = new RecruitmentPage();

describe('Recruitment Management - OrangeHRM', () => {
  var userInput;

  beforeEach(() => {
    cy.visit('');
    cy.fixture('OrangeFixtures/userInputs').then((data)=>{
      userInput = data
    })
  })
  it('Should Add a recruitment candidate ', () => {
    //Login
    cy.url().should('contain','/web/index.php/auth/login') // Assert login page URL domain
    loginPage.getUsernameField().type(userInput.username);
    loginPage.getPasswordField().type(userInput.password);
    loginPage.getLoginButton().click();
    dasboardPage.getSidepanel().should('be.visible'); // Assert sidepanel is visible to validate successful login

   // Add a recruitment candidate
   dasboardPage.getSidepanelTab('Recruitment').click();
   recruitmentPage.getAddButton().click();
   cy.wait(1000);
   recruitmentPage.getFirstNameField().type(userInput.candidateFirstName);
   recruitmentPage.getLastNameField().type(userInput.candidateLasttName);
   recruitmentPage.getEmailField().type('Email@example.com');
   recruitmentPage.getSaveButton().click();
   cy.wait(1000);
  })
  
})
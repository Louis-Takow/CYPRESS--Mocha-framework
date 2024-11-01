/// <reference types="cypress" />
import LoginPage from "../PageObjects/LoginPage";
import DashboardPage from "../PageObjects/DashboardPage";
import LeavePage from "../PageObjects/LeavePage";

const loginPage = new LoginPage();
const dasboardPage = new DashboardPage();
const leavePage = new LeavePage();

describe('Leave Management - OrangeHRM', () => {
  var userInput;

  beforeEach(() => {
    cy.visit('');
    cy.fixture('OrangeFixtures/userInputs').then((data)=>{
      userInput = data
    })
  })
  it('Should Apply for leave', () => {
    //Login
    cy.url().should('contain','/web/index.php/auth/login') // Assert login page URL domain
    loginPage.getUsernameField().type(userInput.username);
    loginPage.getPasswordField().type(userInput.password);
    loginPage.getLoginButton().click();
    dasboardPage.getSidepanel().should('be.visible'); // Assert sidepanel is visible to validate successful login

     //Apply for leave
     dasboardPage.getSidepanelTab('Leave').click();
     leavePage.getApplySubsection().click();
     leavePage.getLeaveTypeDropdown().click({force: true});
     leavePage.selectLeaveTypeOption('FMLA');

     leavePage.enterFromDate('2024-20-12'); //Date format: year-Day-Month
     leavePage.enterToDate('2024-26-12')   //Date format: year-Day-Month
     leavePage.getApplyButton().click();
     cy.wait(1000);
     leavePage.getMyLeaveSubsection().click(); 
     cy.wait(1000);
     leavePage.getlatestLeaveRecord().scrollIntoView().should('be.visible'); // Assert leave application has been added to records

  })
  
})
/// <reference types="cypress" />
import LoginPage from "../PageObjects/LoginPage";
import DashboardPage from "../PageObjects/DashboardPage";
import ClaimPage from "../PageObjects/ClaimPage";

const loginPage = new LoginPage();
const dasboardPage = new DashboardPage();
const claimPage = new ClaimPage();

describe('Payroll Processing - OrangeHRM', () => {
  var userInput;

  beforeEach(() => {
    cy.visit('');
    cy.fixture('OrangeFixtures/userInputs').then((data)=>{
      userInput = data
    })
  })
  it('Should Assign claim ', () => {
    //Login
    cy.url().should('contain','/web/index.php/auth/login') // Assert login page URL domain
    loginPage.getUsernameField().type(userInput.username);
    loginPage.getPasswordField().type(userInput.password);
    loginPage.getLoginButton().click();
    dasboardPage.getSidepanel().should('be.visible'); // Assert sidepanel is visible to validate successful login

   //Assign claim
   dasboardPage.getSidepanelTab('Claim').click();
   claimPage.getAssignClaimButton().click();
   claimPage.getEmployeeNameField().type('Joh');
   claimPage.selectDropdownOption(userInput.fisrtName);
   claimPage.getEventDropdown().click();
   claimPage.selectEventOption('Medical');
   claimPage.getCurrencyDropdown().click();
   claimPage.selectCurrencyOption('United States Dollar');
   claimPage.getCreateButton().click();
   claimPage.getSubmitButton().click();

  })
  
})
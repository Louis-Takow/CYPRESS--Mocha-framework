/// <reference types="cypress" />
import LoginPage from "../PageObjects/LoginPage";
import DashboardPage from "../PageObjects/DashboardPage";

const loginPage = new LoginPage();
const dasboardPage = new DashboardPage();

describe('User Authentication - OrangeHRM', () => {
  var userInput;

  beforeEach(() => {
    cy.visit('');
    cy.fixture('OrangeFixtures/userInputs').then((data)=>{
      userInput = data
    })
  })
  it('Should Login and Logout ', () => {
    //Login
    cy.url().should('contain','/web/index.php/auth/login') // Assert login page URL domain
    loginPage.getUsernameField().type(userInput.username);
    loginPage.getPasswordField().type(userInput.password);
    loginPage.getLoginButton().click();

    dasboardPage.getSidepanel().should('be.visible'); // Assert sidepanel is visible to validate successful login

    //Logout
    cy.wait(1000);
    dasboardPage.getUserDropdownButton().click({ force: true });
    dasboardPage.selectLoginOption().click();
  })
  
})
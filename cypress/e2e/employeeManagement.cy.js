/// <reference types="cypress" />
import LoginPage from "../PageObjects/LoginPage";
import DashboardPage from "../PageObjects/DashboardPage";
import PIMPage from "../PageObjects/PIMPage";
import AdminPage from "../PageObjects/AdminPage";

const loginPage = new LoginPage();
const dasboardPage = new DashboardPage();
const pimPage = new PIMPage();
const adminPage = new AdminPage();

describe('Employee management - OrangeHRM', () => {
  var userInput;
  var randomUsername;
  // generate random five letter name
  function getRandomName() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let name = '';
    for (let i = 0; i < 5; i++) {
        name += letters[Math.floor(Math.random() * letters.length)];
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}
  beforeEach(() => {
    cy.visit('');
    cy.fixture('OrangeFixtures/userInputs').then(function (data) {
      userInput = data;
    });
  })
  it('Should Create a new User account ', () => {
    //Login
    cy.url().should('contain','/web/index.php/auth/login') // Assert login page URL domain
    loginPage.getUsernameField().type(userInput.username);
    loginPage.getPasswordField().type(userInput.password);
    loginPage.getLoginButton().click();
    dasboardPage.getSidepanel().should('be.visible'); // Assert sidepanel is visible to validate successful login

    //Create new User account
    cy.wait(1000);
    dasboardPage.getSidepanelTab('PIM').click();
    pimPage.getAddButton().click();
    pimPage.getFirstNameField().type(userInput.fisrtName);
    pimPage.getLastNameField().type(userInput.lastName);
    pimPage.getCreateLoginDetailsToogleButton().click();

    randomUsername = getRandomName(); // Assign a random number to a variable to be used accross script
    pimPage.getUsernameField().type(randomUsername);
    pimPage.getPasswordField().type(userInput.newPassword);
    pimPage.getConfirmPasswordField().type(userInput.newPassword);
    pimPage.getSaveButton().click();
    cy.wait(1000);
    pimPage.getSaveButton().first().click();
    
  })

  it('Should Search and edit System user details', () => {
    //Login
    cy.url().should('contain','/web/index.php/auth/login') // Assert login page URL domain
    loginPage.getUsernameField().type(userInput.username);
    loginPage.getPasswordField().type(userInput.password);
    loginPage.getLoginButton().click();
    dasboardPage.getSidepanel().should('be.visible'); // Assert sidepanel is visible to validate successful login

    //Search/edit System Users
    dasboardPage.getSidepanelTab('Admin').click();
    adminPage.getUsernameField().type(randomUsername);
    adminPage.getSearchButton().click({ force: true });
    cy.wait(1000);
    adminPage.getEditIconofFirstRecordFound().click({ force: true });
    cy.wait(1000);
    adminPage.selectUserRole('Admin');
    adminPage.getSaveButton().click({force:true});
    cy.wait(1000);
  })
  
  it('Should Search and delete System user', () => {
    //Login
    cy.url().should('contain','/web/index.php/auth/login') // Assert login page URL domain
    loginPage.getUsernameField().type(userInput.username);
    loginPage.getPasswordField().type(userInput.password);
    loginPage.getLoginButton().click();
    dasboardPage.getSidepanel().should('be.visible'); // Assert sidepanel is visible to validate successful login

    //Search and delete System user
    dasboardPage.getSidepanelTab('Admin').click();
    adminPage.getUsernameField().type(randomUsername);
    adminPage.getSearchButton().click({ force: true });
    cy.wait(1000);
    adminPage.getDeleteIconofFirstRecordFound().click({ force: true });
    cy.wait(1000);
    adminPage.getYesDeleteButton().click();
  })
})
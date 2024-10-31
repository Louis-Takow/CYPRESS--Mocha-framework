import OrangePageObjects from "../PageObjects/PageObjectModel1";

const pageObject1 = new OrangePageObjects();

describe('OrangeHRM', () => {
  var userDetails;
  beforeEach(() => {
    cy.visit('');
    cy.fixture('OrangeFixtures/keyInfos').then(function (data) {
      userDetails = data;
    });
  })
  it('Login and Logout ', () => {
    //Login
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    //Logout
    pageObject1.logout();
  })
  it('Unsuccesfull Login Trials', () => {
    pageObject1.unsuccessfulLogin1();
    pageObject1.unsuccessfulLogin2();
    pageObject1.unsuccessfulLogin3();
    pageObject1.unsuccessfulLogin4();
    pageObject1.unsuccessfulLogin5();
  })
  it('Password Reset', () => {
    pageObject1.getPasswordResetLink();
    pageObject1.passwordReset(userDetails.defaultUsername);
  })
  it('Unsuccessful Password Reset Trial', () => {
    pageObject1.getPasswordResetLink();
    cy.get('button').contains('Reset Password').should('be.visible').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[1]/div[1]/form[1]/div[1]/div[1]/span[1]")
      .should('be.visible').and('contain', 'Required');
  })
  it('Create new User account', () => {
    //Create new User account
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    pageObject1.accessSidepanel('PIM', 'PIM')
    pageObject1.createNewUser(userDetails.fisrtName, userDetails.lastName, userDetails.createdUsername, userDetails.createdPassword);
    //Assertion that created profile User name = firstname + lastname
    var firstName = '';
    var lastName = '';
    cy.wait(2000);
    cy.get('.orangehrm-edit-employee-name > .oxd-text').then($value => {
      var newusername = $value.text();
      newusername = newusername.split(' ');
      firstName = newusername[0];
      lastName = newusername[1];
    });
    cy.wait(2000);
    cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').then($value => {
      var val = $value.val()
      expect(val).to.eq(firstName);
    });
    cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').then($value => {
      var val = $value.val()
      expect(val).to.eq(lastName)
    })
    pageObject1.logout();
  })
  it('Create User as Admin', () => {
    //Create New User as Admin
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    pageObject1.accessSidepanel('Admin', 'Admin')
    pageObject1.createNewUserasAdmin('Lou', userDetails.fisrtName, userDetails.createdAdminUsername, userDetails.createdPassword);
    pageObject1.logout();
  })
  it('Login using Created User account credentials', () => {
    pageObject1.login(userDetails.createdUsername, userDetails.createdPassword);
    pageObject1.logout();
  })
  it('Login using Created Admin account credentials', () => {
    pageObject1.login(userDetails.createdAdminUsername, userDetails.createdPassword);
    pageObject1.logout();
  })
  it('Search/edit & Search/delete System Users', () => {
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    //Search/edit System Users
    pageObject1.accessSidepanel('Admin', 'Admin');
    pageObject1.searchandEditSystemUsers(userDetails.lastName, 'ESS', 'Admin');

    // Search/delete System Users
    pageObject1.searchandDeleteSystemUsers(userDetails.lastName);

  })
  it(' Search/edit & Search/delete Admin System Users', () => {
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword)
    // Search/edit Admin System Users
    pageObject1.accessSidepanel('Admin', 'Admin')
    pageObject1.searchandEditSystemUsers('LouisTT', 'Admin', 'ESS');

    //Search/delete Admin System Users
    pageObject1.searchandDeleteSystemUsers(userDetails.createdAdminUsername);
  })
  it.only('Assign Leave trial with 0 leave balance', () => {
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    pageObject1.accessSidepanel('PIM', 'PIM');
    pageObject1.createNewUser(userDetails.fisrtName, userDetails.lastName, userDetails.createdUsername, userDetails.createdPassword);
    pageObject1.accessSidepanel('Leave', 'Leave');
    pageObject1.assignLeaveTrial('Lou', userDetails.fisrtName, 'Personal')
  })
  it('Add Customer', () => {
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    pageObject1.accessSidepanel('Time', 'Time');
    pageObject1.addCustomer(userDetails.customerName, userDetails.customerDescription);
  })
  it('Edit Customer and Delete created Customer', () => {
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    pageObject1.accessSidepanel('Time', 'Time');
    pageObject1.editCustomerandDeleteCustomer(userDetails.editedCustomerName);
  })
  it('Add recruitment candidate', () => {
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    pageObject1.accessSidepanel('Recruitment', 'Recruitment');
    pageObject1.addRecruitmentCandidate(userDetails.candidateFirstName, userDetails.candidateLasttName);
  })
  it('Unsuccesful trails to Access Maintenance page trial)', () => {
    //Unsuccessful access trial 1
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    cy.get('nav[aria-label="Sidepanel"]').contains('Maintenance').click();
    cy.get('button').contains('Confirm').should('be.visible').click();
    cy.get('.oxd-input-group > .oxd-text').should('be.visible').and('contain', 'Required');
    //unsuccesful access trial 2
    pageObject1.maintenancePagePasswordEntry('1234')
    cy.get('.oxd-alert').should('be.visible').and('contain', 'Invalid credentials');
  })
  it('Access Maintenance page ', () => {
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    cy.get('nav[aria-label="Sidepanel"]').contains('Maintenance').click();
    pageObject1.maintenancePagePasswordEntry('admin123');
    cy.wait(1000);
    cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Maintenance');
  })
  it('Post new Buzz Newsfeed', () => {
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    pageObject1.accessSidepanel('Buzz', 'Buzz');
    pageObject1.postNewBuzzNewsfeed('New Buzz');
  })
  it('Edit and Delete new Buzz Newsfeed', () => {
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    pageObject1.accessSidepanel('Buzz', 'Buzz');
    pageObject1.editandDeleteNewsBuzzfeed('Edit Buzz');
  })
  it('Comment on post', () => {
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    pageObject1.accessSidepanel('Buzz', 'Buzz');
    pageObject1.commentOnPost('Great!!!!');
  })
  it('Edit and Delete posted comment', () => {
    pageObject1.login(userDetails.defaultUsername, userDetails.defaultPassword);
    pageObject1.accessSidepanel('Buzz', 'Buzz');
    pageObject1.editandDeletePostedComment('Edited Comment');
  })
})


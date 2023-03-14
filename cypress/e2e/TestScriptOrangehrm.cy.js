import OrangePageObjects from "../PageObjects/PageObjectModel1";

const pageObject1 = new OrangePageObjects();

describe('OrangeHRM', () => {
  beforeEach(() => {
    cy.visit('');
  })
  it('Login and Logout ', () => {
    //Login
    pageObject1.login('Admin','admin123');
    //Logout
    pageObject1.logout();
  })
  it('Unsuccesfull Login Trials',()=>{
    pageObject1.unsuccessfulLogin1();
    pageObject1.unsuccessfulLogin2();
    pageObject1.unsuccessfulLogin3();
    pageObject1.unsuccessfulLogin4();
    pageObject1.unsuccessfulLogin5();
  })
  it('Password Reset',()=>{
    cy.get('.orangehrm-login-forgot > .oxd-text').should('be.visible').click();
    cy.get('form[action="/web/index.php/auth/requestResetPassword"]').should('be.visible')
    .and('contain','Reset Password');
    cy.get('input[name="username"]').type('Admin');
    cy.get('button').contains('Reset Password').should('be.visible').click();
    cy.get('.orangehrm-card-container').should('be.visible').and('contain','Reset Password link sent successfully')
  })
  it('Unsuccessful Password Reset Trial',()=>{
    cy.get('.orangehrm-login-forgot > .oxd-text').should('be.visible').click();
    cy.get('form[action="/web/index.php/auth/requestResetPassword"]').should('be.visible')
    .and('contain','Reset Password');
    cy.get('button').contains('Reset Password').should('be.visible').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[1]/div[1]/form[1]/div[1]/div[1]/span[1]")
    .should('be.visible').and('contain','Required');
  })
  it('Create new User account and Create User as Admin',()=>{
    //Create new User account
    pageObject1.login('Admin','admin123');
    pageObject1.accessSidepanel('PIM','PIM')
    cy.get('button').contains(' Add ').click();
    cy.get('input[name="firstName"]').type('Louis');
    cy.get('input[name="lastName"]').type('Takow');
    cy.get('.oxd-switch-input').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/input[1]")
    .type('Takow');
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[4]/div[1]/div[1]/div[1]/div[2]/input[1]")
    .type('#Correct123');
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[4]/div[1]/div[2]/div[1]/div[2]/input[1]")
    .type('#Correct123');
    cy.get('button').contains('Save').should('be.visible').click();
    cy.wait(3000);
    cy.url().should('contain','pim/viewPersonalDetails');
    cy.get('.orangehrm-card-container').should('contain','Personal Details');
  //Assertion that created profile User name = firstname + lastname
 var firstName = '';
 var lastName = '';
cy.wait(3000);
cy.get('.orangehrm-edit-employee-name > .oxd-text').then($value =>{
  var newusername = $value.text();
  newusername = newusername.split(' ');
  firstName = newusername[0];
  lastName = newusername[1];
});
 cy.wait(1000);
 cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').then($value => {
  var val = $value.val()
  expect(val).to.eq(firstName);
});
cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').then($value => {
  var val = $value.val()
  expect(val).to.eq(lastName)
    })
//Create New User as Admin
    cy.reload();
    pageObject1.accessSidepanel('Admin','Admin')
    cy.get('button').contains(' Add ').click();
    cy.get('nav[aria-label="Sidepanel"]').contains('Admin').click();
    cy.get('.oxd-topbar-header-breadcrumb').should('contain','Admin');
    cy.get('button').contains(' Add ').click();
    cy.get('div[class="oxd-select-text-input"]').contains('Select').click({force:true});
    cy.get('div[role="listbox"]').contains('Admin').click();
    cy.get('.oxd-autocomplete-text-input > input').type('Lou');
    cy.get('div[role = "listbox"]').contains('Louis').click();
    cy.get('div[class="oxd-select-text-input"]').contains('Select').click({ force: true });
    cy.get('div[role = "listbox"]').contains('Enabled').click();
    cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type('LouisTT');
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('#Correct123');
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('#Correct123');
    cy.get('button').contains('Save').should('be.visible').click();
    cy.wait(1000);
    cy.url().should('contain','admin/viewSystemUser');

    pageObject1.logout();
  })
  it('Login using Created User account credentials',()=>{
    pageObject1.login('Takow','#Correct123');
    pageObject1.logout();
  })
  it('Login using Created Admin account credentials',()=>{
    pageObject1.login('LouisTT','#Correct123');
    pageObject1.logout();
  })
  it('Search/edit & Search/delete System Users',()=>{
    pageObject1.login('Admin','admin123');
    //Search/edit System Users
    pageObject1.accessSidepanel('Admin','Admin');
    pageObject1.searchandEditSystemUsers('Takow','ESS', 'Admin');
    
   // Search/delete System Users
   pageObject1.searchandDeleteSystemUsers('Takow');
    
  })
  it(' Search/edit & Search/delete Admin System Users',()=>{
   pageObject1.login('Admin','admin123')
   // Search/edit Admin System Users
   pageObject1.accessSidepanel('Admin','Admin')
   pageObject1.searchandEditSystemUsers('LouisTT','Admin', 'ESS');
    
    //Search/delete Admin System Users
    pageObject1.searchandDeleteSystemUsers('LouisTT');
  })
  it('Assign Leave trial with 0 leave balance',()=>{
    pageObject1.login('Admin','admin123');
    pageObject1.accessSidepanel('Leave','Leave');
    cy.get(':nth-child(6) > .oxd-topbar-body-nav-tab-item > .oxd-icon').click({force:true});
    cy.get(':nth-child(2) > li > .oxd-topbar-body-nav-tab-link').click({force:true})
    cy.get('.oxd-autocomplete-text-input > input').type('Pet');
    cy.get('div[role = "listbox"]').contains('Peter').click();
    cy.get('div[class="oxd-select-text-input"]').contains('Select').click({force: true});
    cy.get('div[role = "listbox"]').contains('Personal').click();
    cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').click({force:true})
    .type('2023-03-12');
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').click({force:true})
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[5]/div[1]/div[1]/div[1]/div[2]/textarea[1]").click({force:true}).type('personal');
    cy.get('.oxd-button').click();
    cy.get('div[role="document"]').should('be.visible');
    cy.get('button').contains('Ok').click();
  })
  it.only('Add Customer',()=>{
    pageObject1.login('Admin','admin123');
    pageObject1.accessSidepanel('Time','Time');
    cy.get('.oxd-topbar-body-nav-tab-item').contains('Project Info ').click();
    cy.get('ul[role="menu"]').contains('Customers').click();
    cy.url().should('contain','time/viewCustomers');
    cy.get('.orangehrm-header-container').should('be.visible').and('contain','Customers');
    cy.get('.oxd-button').click();
    cy.get(':nth-child(2) > .oxd-input').type('AAAAA');
    cy.get('textarea[placeholder="Type description here"]').type('contractor');
    cy.get('.oxd-button--secondary').contains('Save').click({force:true});
    cy.wait(1000);
    // cy.url().should('contain','time/viewCustomer');
 })
 it('Edit Customer and Delete created Customer',()=>{
    
 })
 it('Add recruitment candidate',()=>{
    pageObject1.login('Admin','admin123');
    pageObject1.accessSidepanel('Recruitment','Recruitment');
    cy.get('button').contains(' Add ').click();
    cy.wait(1000);
    cy.url().should('contain','recruitment/addCandidate');
    cy.get('.orangehrm-card-container').should('contain','Add Candidate');
    cy.get('input[name="firstName"]').type('Paul');
    cy.get('input[name="lastName"]').type('Ddddd');
    cy.get('div[class="oxd-select-text-input"]').contains('Select').click({ force: true });
    cy.get('div[role = "listbox"]').contains('IT').click();
    cy.get(':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type('PD@mail.com');
    cy.get('.oxd-grid-3 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('123456');
    cy.get('.oxd-checkbox-input > .oxd-icon').click();
    cy.get('.oxd-button--secondary').contains('Save').click();
    cy.wait(1000);
    cy.get('.orangehrm-card-container').should('contain','Application Stage');
    })
    it('Unsuccesful trails to Access Maintenance page trial)',()=>{
    //Unsuccessful access trial 1
     pageObject1.login('Admin','admin123');
     cy.get('nav[aria-label="Sidepanel"]').contains('Maintenance').click();
     cy.get('button').contains('Confirm').should('be.visible').click();
     cy.get('.oxd-input-group > .oxd-text').should('be.visible').and('contain','Required');
     //unsuccesful access trial 2
     cy.get('input[name="password"]').type('1234');
     cy.get('button').contains('Confirm').should('be.visible').click();
     cy.get('.oxd-alert').should('be.visible').and('contain','Invalid credentials');
 })
  it('Access Maintenance page ',()=>{
    pageObject1.login('Admin','admin123');
    cy.get('nav[aria-label="Sidepanel"]').contains('Maintenance').click();
    cy.get('input[name="password"]').type('admin123');
    cy.get('button').contains('Confirm').should('be.visible').click();
    cy.wait(1000);
    cy.get('.oxd-topbar-header-breadcrumb').should('contain','Maintenance');
  })
  it('Post new Buzz Newsfeed',()=>{
    pageObject1.login('Admin','admin123');
    pageObject1.accessSidepanel('Buzz','Buzz');
    cy.get('.oxd-buzz-post-input').type('New Buzz');
    cy.get('button').contains('Post').should('be.visible').click();
    cy.get('.oxd-grid-1 > :nth-child(1) > .oxd-sheet').should('be.visible');
  })
  it('Edit and Delete new Buzz Newsfeed',()=>{
    pageObject1.login('Admin','admin123');
    pageObject1.accessSidepanel('Buzz','Buzz');
    //Edit new Buzz Newsfeed
    cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-buzz-post > .orangehrm-buzz-post-header > .orangehrm-buzz-post-header-config > li > .oxd-icon-button > .oxd-icon')
    .click({force:true});
    cy.get('.oxd-dropdown-menu > :nth-child(2)').click();
    cy.get('.oxd-dialog-container-default--inner > .oxd-sheet').should('be.visible').and('contain','Edit');
    cy.get('.orangehrm-buzz-post-modal-header-text > .oxd-buzz-post > .oxd-buzz-post-input').clear().type('Edit Buzz');
    cy.get('.oxd-form-actions > .oxd-button').should('be.visible').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/p[1]").should('be.visible');
    //Delete new Buzz Newsfeed
    cy.wait(1000);
    cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-buzz-post > .orangehrm-buzz-post-header > .orangehrm-buzz-post-header-config > li > .oxd-icon-button > .oxd-icon')
    .click({force:true});
    cy.get('.oxd-dropdown-menu > :nth-child(1)').click();
    cy.get('.oxd-dialog-container-default--inner > .oxd-sheet').should('be.visible');
    cy.get('.oxd-button--label-danger').click();
  })
  it('Comment on post',()=>{
    pageObject1.login('Admin','admin123');
    pageObject1.accessSidepanel('Buzz','Buzz');
    cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-buzz-post-footer > .orangehrm-buzz-post-actions > :nth-child(2) > .oxd-icon')
    .click({force:true});
    cy.get('input[placeholder="Write your comment..."]').type('Great!!!!').type('{enter}');
  })
  it('Edit and Delete posted comment',()=>{
    pageObject1.login('Admin','admin123');
    pageObject1.accessSidepanel('Buzz','Buzz');
    //Edit Posted Comment
    cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-buzz-post-footer > .orangehrm-buzz-post-actions > :nth-child(2) > .oxd-icon')
    .click({force:true});
    cy.get('.orangehrm-post-comment-action-area > :nth-child(2)').first().click({force:true});
    cy.get('.orangehrm-post-comment > .oxd-form > .oxd-input-group > :nth-child(2) > .oxd-input')
    .clear().type('Edited comment').type('{enter}');
    //Delete Posted Comment
    cy.get(':nth-child(3) > .orangehrm-post-comment > .orangehrm-post-comment-action-area > :nth-child(3)')
    .first().click({force:true});
    cy.get('.oxd-dialog-container-default--inner > .oxd-sheet').should('be.visible');
    cy.get('.oxd-button--label-danger').click();
  })
})


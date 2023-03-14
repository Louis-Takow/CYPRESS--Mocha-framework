describe('OrangeHRM', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  })
  it('Login and Logout ', () => {
    //Login
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('nav[aria-label="Sidepanel"]').should('be.visible');
    //Logout
    cy.wait(1000);
    cy.get('.oxd-userdropdown-tab > .oxd-icon').click({ force: true });
    cy.get(':nth-child(4) > .oxd-userdropdown-link').click();
  })
  it('Unsuccesfull Login Trials',()=>{
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/form[1]/div[1]/div[1]/span[1]")
    .should('be.visible').and('contain','Required');
    cy.xpath("//body/div[@id='app']/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/form[1]/div[2]/div[1]/span[1]")
    .should('be.visible').and('contain','Required');;
    cy.reload();
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/form[1]/div[2]/div[1]/span[1]")
    .should('be.visible').and('contain','Required');;
    cy.reload();
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/form[1]/div[1]/div[1]/span[1]")
    .should('be.visible').and('contain','Required');;
    cy.reload();
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('123');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('div[role="alert"]').should('be.visible').and('contain','Invalid credentials');
    cy.reload();
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('div[role="alert"]').should('be.visible').and('contain','Invalid credentials');
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
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('nav[aria-label="Sidepanel"]').should('be.visible');
    cy.get('nav[aria-label="Sidepanel"]').contains('PIM').click();
    cy.get('.oxd-topbar-header-breadcrumb').should('contain','PIM');
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
    // 
    // cy.get('nav[aria-label="Sidepanel"]').contains('My Info').click();
    cy.get('.orangehrm-card-container').should('contain','Personal Details');

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
    cy.get('nav[aria-label="Sidepanel"]').contains('Admin').click();
    cy.get('.oxd-topbar-header-breadcrumb').should('contain','Admin');
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

    cy.wait(1000);
    cy.get('.oxd-userdropdown-tab > .oxd-icon').click({ force: true });
    cy.get(':nth-child(4) > .oxd-userdropdown-link').click();
  })
  it('Login using Created User account credentials',()=>{
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('Takow');
    cy.get('input[name="password"]').type('#Correct123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('nav[aria-label="Sidepanel"]').should('be.visible');
    cy.wait(1000);
    cy.get('.oxd-userdropdown-tab > .oxd-icon').click({ force: true });
    cy.get(':nth-child(4) > .oxd-userdropdown-link').click();  
  })
  it('Login using Created Admin account credentials',()=>{
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('LouisTT');
    cy.get('input[name="password"]').type('#Correct123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('nav[aria-label="Sidepanel"]').should('be.visible');
    cy.wait(1000);
    cy.get('.oxd-userdropdown-tab > .oxd-icon').click({ force: true });
    cy.get(':nth-child(4) > .oxd-userdropdown-link').click();  
  })
  it('Search/edit & Search/delete System Users',()=>{
    //Search/edit System Users
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('nav[aria-label="Sidepanel"]').should('be.visible');
    cy.get('nav[aria-label="Sidepanel"]').contains('Admin').click();
    cy.get('.oxd-topbar-header-breadcrumb').should('contain','Admin');

    cy.get(':nth-child(2) > .oxd-input').type('Takow');
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(2000);
    cy.get('.oxd-table-cell-actions > :nth-child(2) > .oxd-icon').first().click({ force: true });
    cy.wait(1000);
    cy.url().should('contain','admin/saveSystemUser');
    cy.get('.orangehrm-card-container').should('be.visible').and('contain','Edit User');
    cy.get('div[class="oxd-select-text-input"]').contains('ESS').click({force:true});
    cy.get('div[role="listbox"]').contains('Admin').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[2]/button[2]").click({force:true});
    cy.wait(3000);
   // Search/delete System Users
    cy.get('nav[aria-label="Sidepanel"]').contains('Admin').click();
    cy.get(':nth-child(2) > .oxd-input').type('Takow');
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(2000);
    cy.get('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon').first().click({ force: true });
    cy.wait(2000);
    cy.get('.oxd-sheet').should('be.visible');
    cy.get('.oxd-button--label-danger').click();
  })
  it(' Search/edit & Search/delete Admin System Users',()=>{
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('nav[aria-label="Sidepanel"]').should('be.visible');
   // Search/edit Admin System Users
    cy.get('nav[aria-label="Sidepanel"]').contains('Admin').click();
    cy.get('.oxd-topbar-header-breadcrumb').should('contain','Admin');

    cy.get(':nth-child(2) > .oxd-input').type('LouisTT');
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(2000);
    cy.get('.oxd-table-cell-actions > :nth-child(2) > .oxd-icon').first().click({ force: true });
    cy.wait(1000);
    cy.url().should('contain','admin/saveSystemUser');
    cy.get('.orangehrm-card-container').should('be.visible').and('contain','Edit User');
    cy.get('div[class="oxd-select-text-input"]').contains('Admin').click({force:true});
    cy.get('div[role="listbox"]').contains('ESS').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[2]/button[2]").click({force:true});
    cy.wait(3000);
    //Search/delete Admin System Users
    cy.get('nav[aria-label="Sidepanel"]').contains('Admin').click();
    cy.get(':nth-child(2) > .oxd-input').type('LouisTT');
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(2000);
    cy.get('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon').first().click({ force: true });
    cy.wait(2000);
    cy.get('.oxd-sheet').should('be.visible');
    cy.get('.oxd-button--label-danger').click();
  })
  it('Assign Leave trial with 0 leave balance',()=>{
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('nav[aria-label="Sidepanel"]').should('be.visible');
    cy.get('nav[aria-label="Sidepanel"]').contains('Leave').click();
    cy.get('.oxd-topbar-header-breadcrumb').should('contain','Leave');
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
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('nav[aria-label="Sidepanel"]').should('be.visible');
    cy.get('nav[aria-label="Sidepanel"]').contains('Time').click();
    cy.get('.oxd-topbar-header-breadcrumb').should('contain','Time');
    cy.get('.oxd-topbar-body-nav-tab-item').contains('Project Info ').click();
    cy.get('ul[role="menu"]').contains('Customers').click();
    cy.url().should('contain','time/viewCustomers');
    cy.get('.orangehrm-header-container').should('be.visible').and('contain','Customers');
    cy.get('.oxd-button').click();
    cy.get(':nth-child(2) > .oxd-input').type('CustomerA');
    cy.get('textarea[placeholder="Type description here"]').type('contractor');
    cy.get('.oxd-button--secondary').click();
    cy.wait(1000);
    cy.url().should('contain','time/viewCustomer');

  })
})

// createNewUser(Firstname, Lastname, username, password, cnfrmpassword) {
//   cy.get('.orangehrm-header-container > .oxd-button').click();
//   cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').type(Firstname);
//   cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').type(Lastname);
//   cy.get('.oxd-switch-input').click();
//   cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type(username);
//   cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type(password);
//   cy.get('.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(cnfrmpassword);
//   cy.get('button').contains('Save').click();
//   cy.get('.oxd-toast').should('be.visible').and('contain', 'Success');//assertion
// }

// class Example1{

//   getsidePanel(){
//       return cy.get('[aria-label="Sidepanel"]')
//   }
//   getpageHeading(){
//       return cy.get('.oxd-topbar-header-breadcrumb')
//   }
  
// }

// export default Example1;

// var firstName = '';
// var lastName = '';
// cy.wait(3000);
// cy.get('.orangehrm-edit-employee-name > .oxd-text').then($value =>{
//   var newusername = $value.text();
//   newusername = newusername.split(' ');
//   firstName = newusername[0];
//   lastName = newusername[1];
// });
// cy.wait(3000);
// cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').then($value => {
//   var val = $value.val()
//   expect(val).to.eq(firstName);
// });

// cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').then($value => {
//   var val = $value.val()
//   expect(val).to.eq(lastName);
// });

// createNewUserAsADMIN(hint, option, username, password, cnfrmpassword) {
//   cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/button[1]").click({ force: true });
//   cy.get('div[class="oxd-select-text-input"]').contains('Select').click({ force: true });
//   cy.get('div[role = "listbox"]').contains('Admin').click();
//   cy.get('.oxd-autocomplete-text-input > input').type(hint);
//   cy.get('div[role = "listbox"]').contains(option).click();
//   cy.get('div[class="oxd-select-text-input"]').contains('Select').click({ force: true });
//   cy.get('div[role = "listbox"]').contains('Enabled').click();
//   cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(username);
//   cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type(password);
//   cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(cnfrmpassword);
//   cy.get('.oxd-button--secondary').click();
// }

// SearchandDeleteAdminorUser(username) {
//   cy.get(':nth-child(2) > .oxd-input').type(username);
//   cy.get('button[type="submit"]').click({ force: true });
//   cy.wait(2000);
//   // cy.get('.oxd-table-card > .oxd-table-row').should('be.visible');//assertion
//   cy.get('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon').first().click({ force: true });
//   cy.wait(3000);
//   cy.get('.oxd-sheet').should('be.visible');
//   cy.get('.oxd-button--label-danger').click();

// }

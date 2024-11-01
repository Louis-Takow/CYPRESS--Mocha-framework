# Web UI Automation CYPRESS

This project focuses on developing automated API tests using Cypress.io. For additional details about Cypress, visit [Cypress.io](https://www.cypress.io).

## Prerequisites

- **Node.js:** Ensure you have the latest version installed. You can download it from [Node.js](https://nodejs.org/).
- **IDE:** It is recommended to use Visual Studio Code as your Integrated Development Environment (IDE) for this project.

## Setup Instructions

1. **Clone this repository** using your preferred command line tool.
2. Navigate to the project directory after cloning by executing cd GOZEM-Technical-Assessment in your terminal or PowerShell.
   
''' command line terminal
Copy code
git clone <repository-url>
cd CYPRESS--Mocha-framework

3.	Install all necessary dependencies and Cypress by running the following commands:

''' command line terminal
Copy code
npm install
npx cypress install
npx cypress open

## Running the Tests
1.	On the Cypress dashboard, you will be greeted with options for E2E Testing and Component Testing. Since we are focusing on functional automation, select E2E Testing.
2.	The default browser will be Chrome. It is not necessary to choose a different browser; simply click on Start E2E Testing in Chrome.
3.	A new browser window will open with the test dashboard. Locate and click a spec file (*****.cy.js) to run the tests.
4.	You can monitor the execution results by clicking on the steps listed on the left side of the dashboard to check which tests passed or failed.

## Test Details
### Overview
This automation assessment focuses on validating the positive path UI testing for core functionalities in the OrangeHRM open-source HR application. Functionalities tested include **User Authentication**, **Employee Management**, **Recruitment Management**, **Leave Management**, and **Payroll Management**. 
•	**Reference Types:** The directive /// <reference types="cypress" /> at the top of the file ensures Cypress types are available for IntelliSense and type checking.
•	**Describe Block:** The describe block organizes all tests suits.
•	**BeforeEach Hook:**  The `beforeEach` hook sets up the necessary context for each test:
   - It visits the OrangeHRM homepage to prepare for subsequent actions.
   - It loads user input data from the `OrangeFixtures/userInputs` fixture file, making login credentials and other necessary details available for seamless navigation and interaction within the application.

### Test Scenarios

1. **User Authentication**
   - **Login Test:**
     - Navigate to the login page.
     - Enter valid credentials in the username and password fields.
     - Click the "Login" button.
     - Assert that the user is redirected to the dashboard page, verifying successful login.
   - **Logout Test:**
     - From the dashboard, click on the user profile or logout option.
     - Confirm that the user is logged out and redirected to the login page.

2. **Employee Management**
   - **Create New User Account:**
     - Navigate to the "Employee Management" section and select "Add Employee."
     - Fill in required details (e.g., First Name, Last Name, Employee ID).
     - Submit the form to create a new employee.
     - Assert that the success message appears and the new employee is listed.
   - **Search and Edit User Details:**
     - Navigate to the employee list and search for a specific employee by name or ID.
     - Verify that the employee details are displayed.
     - Click "Edit," update necessary fields, and save changes.
     - Assert that changes are saved and reflect in the employee list.
   - **Delete System User:**
     - Search for a specific employee in the list.
     - Select the employee and delete.
     - Confirm the deletion and verify that the employee is no longer listed.

3. **Recruitment Management**
   - **Add a Candidate:**
     - Go to the "Recruitment" section and select "Add Candidate."
     - Fill in candidate details (e.g., Name, Position).
     - Assert that the candidate is added to the recruitment list.

4. **Leave Management**
   - **Apply for Leave:**
     - Navigate to the "Leave Management" section and select "Apply for Leave."
     - Select leave type, start date, and end date.
     - Submit the leave application.
     - Assert that the leave is successfully applied and shows in the "My Leave" section.

5. **Payroll Management**
   - **Assign a Claim:**
     - Go to the "Payroll Management" section and select "Claims."
     - Choose an employee and enter claim details.
     - Submit the claim.
     - Assert that the claim is listed under the employee’s payroll records.

## Best Practices
• **Page Object Model (POM):** Implemented to centralize locators and operations within dedicated classes, improving organization and reusability across tests for automated UI functionality.
• **Separation of Concerns:** Each test case is designed to focus on a specific functionality, which enhances readability and maintainability of the codebase.
• **Response Validation:** Each UI interaction is followed by assertions to verify the correctness of UI elements, including their visibility and state, ensuring a consistent user experience.
• **Data Management:** Test data is separated from the test scripts by utilizing fixtures for data-driven testing and creating a base URL as a global variable in the `cypress.config.js` file. This promotes reusability of test data throughout the testing suite.





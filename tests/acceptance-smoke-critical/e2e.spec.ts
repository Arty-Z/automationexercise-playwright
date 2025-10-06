import {test, expect} from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { LoginSignUpPage } from '../../pages/loginSignUpPage';
import {fa, faker} from '@faker-js/faker';
import { SignUpPage } from '../../pages/signUpPage';
import { AccountCreatedPage } from '../../pages/accountCreatedPage';
import { AccountDeletedPage } from '../../pages/accountDeletedPage';


test.describe('End to end test cases.', async () => {
    let homePage: HomePage;
    let loginSignUpPage: LoginSignUpPage;
    let signUpPage: SignUpPage;
    let accountCreatedPage: AccountCreatedPage;
    let accountDeletedPage: AccountDeletedPage;
   

    test.beforeEach('Setting up precondition',async ({ page }) => {
        loginSignUpPage = new LoginSignUpPage(page);
        homePage = new HomePage(page);
        signUpPage = new SignUpPage(page);
        accountCreatedPage = new AccountCreatedPage(page);
        accountDeletedPage = new AccountDeletedPage(page);

        await page.goto('/');

    })



    test('End to end account create and delete flow', async ({page}) => {

        await homePage.verifyHomePage();
        //await homePage.clickOnNavLink('Signup / Login');
        await loginSignUpPage.clickOnNavLink('Signup / Login');
        await loginSignUpPage.validateSignUpTitle();

        const fullName = faker.person.firstName() + ' ' + faker.person.lastName();
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const address1 = faker.location.streetAddress();
        const address2 = faker.location.secondaryAddress();
        const city = faker.location.city();
        const state = faker.location.state();
        const zipcode = faker.location.zipCode();
        const mobileNumber = faker.phone.number();
        
        await loginSignUpPage.signUpWithNameAndEmail(fullName, email);
        await signUpPage.fillAccountDetails('Mr.', 'Password123', '10', '5', '1990');
        await signUpPage.checkNewsLetterCheckbox();
        await signUpPage.checkSpecialOffersCheckbox();
        await signUpPage.fillAddressDetails(firstName, lastName, 'My Company', address1, address2, 'Canada', state, city, zipcode, mobileNumber);    
        await signUpPage.clickCreateAccountButton();
        await accountCreatedPage.validateAccountCreatedText();
        await accountCreatedPage.clickContinueButton();
        await homePage.verifyLoggedInAsUser(fullName);
        await homePage.clickOnNavLink('Delete Account');
        await accountDeletedPage.validateAccountDeletedText();
        await accountDeletedPage.clickContinueButton();
    })
})


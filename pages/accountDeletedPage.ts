import {Page, Locator} from '@playwright/test';
import { BasePage } from './basePage';

export class AccountDeletedPage extends BasePage{
    private accountDeletedText: Locator;
    private continueButton: Locator;
    constructor(page: Page) {
        super(page);
        this.accountDeletedText = page.locator('h2[data-qa="account-deleted"]');
        this.continueButton = page.getByText('Continue');
    }
    async validateAccountDeletedText(): Promise<void> {
        await (this.accountDeletedText).isVisible();
        await (this.accountDeletedText).textContent()   === 'ACCOUNT DELETED!';
    }
    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }
}
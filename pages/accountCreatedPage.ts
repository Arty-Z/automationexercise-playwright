import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import {Page , expect} from '@playwright/test';

export class AccountCreatedPage extends BasePage{
    private accountCreatedText: Locator;
    private continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountCreatedText = page.locator('h2[data-qa="account-created"]');
        this.continueButton = page.getByText('Continue');
    }

    async validateAccountCreatedText(): Promise<void> {
        await expect(this.accountCreatedText).toBeVisible();
        await expect(this.accountCreatedText).toHaveText('Account Created!');
    }
    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }
}
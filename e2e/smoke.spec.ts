import { test, expect } from '@playwright/test';

test('Land on the Atelier home page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page.locator('.lta-logo')).toBeVisible();
});

test('Find out who is sponsoring the Atelier', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Sponsor Us' }).click();
    let sponsorText = 'Check out our fabulous sponsors! They pay for your learning, beer and swag!';
    await expect(page.locator('#amazingsponsors > h2')).toContainText(sponsorText);
});

test('Head to the Call for Papers submission form', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Call for Papers' }).click();
    let callForPapersText = 'We are looking for speakers to help us provide an action packed, one day in-person conference!';
    await expect(page.locator('#speakerguidance > h3')).toContainText(callForPapersText);
    await page.getByRole('button', { name: 'Submit an idea!' }).click();
    await expect(page).toHaveURL('https://docs.google.com/forms/d/e/1FAIpQLSfNJpuL6aJHWQCmedv9XYcLbwrcXHADKEsWPUS-OlhR58gKUQ/viewform')
});

test('Check out the fun had at Previous Ateliers', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Previous Ateliers' }).click();
    let previousAteliersText = 'Check out our illustrious history! Such learning!';
    await expect(page.locator('body > div > div:nth-child(1) > h2')).toContainText(previousAteliersText);
});
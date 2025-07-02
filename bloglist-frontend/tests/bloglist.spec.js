import { test, expect } from '@playwright/test'
const { beforeEach, describe } = test

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginBtn = await page.getByRole('button', { name: 'Login' })
    const usernameInput = await page.getByText('Username')
    const passwordInput = await page.getByText('Password')

    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginBtn).toBeVisible()
  })
})
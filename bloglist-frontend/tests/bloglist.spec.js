import { test, expect } from '@playwright/test'
const { beforeEach, describe } = test
import { loginWith } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        username: 'root',
        name: 'Superuser',
        password: 'password'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginBtn = await page.getByRole('button', { name: 'Login' })
    const usernameInput = await page.getByTestId('username')
    const passwordInput = await page.getByTestId('password')

    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginBtn).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'password')

      const notification = await page.locator('.success')
      await expect(notification).toBeVisible()
      await expect(notification).toHaveText('root logged correctly')
      await expect(notification).toHaveCSS('border-style', 'solid')
      await expect(notification).toHaveCSS('color', 'rgb(0, 128, 0)')
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrongpassword')

      const notification = await page.locator('.error')
      await expect(notification).toBeVisible()
      await expect(notification).toHaveText('Wrong credentials')
      await expect(notification).toHaveCSS('border-style', 'solid')
      await expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })
})
import { test, expect } from '@playwright/test'
const { beforeEach, describe } = test
import { loginWith, createBlog } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'root',
        name: 'Superuser',
        password: 'password'
      }
    })

    await page.goto('/')
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

      const notification = await page.locator('.success', { hasText: 'root logged correctly' })
      await expect(notification).toBeVisible()
      await expect(notification).toHaveCSS('border-style', 'solid')
      await expect(notification).toHaveCSS('color', 'rgb(0, 128, 0)')
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrongpassword')

      const notification = await page.locator('.error', { hasText: 'Wrong credentials' })
      await expect(notification).toBeVisible()
      await expect(notification).toHaveCSS('border-style', 'solid')
      await expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Blog de prueba', 'Autor de prueba', 'http://testblog.com')

      await page.waitForTimeout(2000)

      const notification = await page.locator('.success', { hasText: 'Blog added correctly' })
      await expect(notification).toBeVisible()
      await expect(notification).toHaveCSS('border-style', 'solid')
      await expect(notification).toHaveCSS('color', 'rgb(0, 128, 0)')

      const createdBlog = await page.getByText('Blog de prueba - Autor de prueba').locator('..')
      await expect(createdBlog).toBeVisible()

      const viewDetails = await createdBlog.getByRole('button', { name: 'View' })
      await viewDetails.click()
      await expect(viewDetails).not.toBeVisible()

      const hideDetails = await createdBlog.getByRole('button', { name: 'Hide' })
      await expect(hideDetails).toBeVisible()

      await expect(page.getByText('http://testblog.com')).toBeVisible()
      await expect(page.getByText('Likes: 0')).toBeVisible()
      await expect(page.getByText('root')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'Blog de prueba', 'Autor de prueba', 'http://testblog.com')

      const createdBlog = await page.getByText('Blog de prueba - Autor de prueba').locator('..')
      const viewDetails = await createdBlog.getByRole('button', { name: 'View' })
      await viewDetails.click()

      const likeButton = await page.getByRole('button', { name: 'Like' })
      await likeButton.click()

      const likesText = await page.getByText('Likes: 1')
      await expect(likesText).toBeVisible()
    })
  })
})
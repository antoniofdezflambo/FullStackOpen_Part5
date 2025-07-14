import { test, expect } from '@playwright/test'
const { beforeEach, describe } = test
import { loginWith, createBlog, likeBlog } from './helper'

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

      const notification = await page.locator('.success', { hasText: 'Blog added correctly' })
      await expect(notification).toBeVisible()
      await expect(notification).toHaveCSS('border-style', 'solid')
      await expect(notification).toHaveCSS('color', 'rgb(0, 128, 0)')

      const createdBlog = await page.getByText('Blog de prueba - Autor de prueba').locator('..')
      await expect(createdBlog).toBeVisible()

      const viewDetails = await createdBlog.getByRole('button', { name: 'View' })
      await viewDetails.click()
      await expect(viewDetails).not.toBeVisible()

      await expect(createdBlog.getByRole('button', { name: 'Hide' })).toBeVisible()
      await expect(page.getByText('http://testblog.com')).toBeVisible()
      await expect(page.getByText('Likes: 0')).toBeVisible()
      await expect(page.getByText('root')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Blog de prueba', 'Autor de prueba', 'http://testblog.com')
      })

      test('a blog can be liked', async ({ page }) => {
        const createdBlog = await page.getByText('Blog de prueba - Autor de prueba').locator('..')
        const viewDetails = await createdBlog.getByRole('button', { name: 'View' })
        await viewDetails.click()

        const likeButton = await page.getByRole('button', { name: 'Like' })
        await likeButton.click()

        const likesText = await page.getByText('Likes: 1')
        await expect(likesText).toBeVisible()
      })

      test('a blog can be removed by the user who created it', async ({ page }) => {
        const createdBlog = await page.getByText('Blog de prueba - Autor de prueba').locator('..')
        const viewDetails = await createdBlog.getByRole('button', { name: 'View' })
        await viewDetails.click()

        await page.on('dialog', async (dialog) => {
          expect(dialog.type()).toBe('confirm')
          expect(dialog.message()).toBe('Remove blog "Blog de prueba" by Autor de prueba?')
          await dialog.accept()
        })

        const removeButton = await page.getByRole('button', { name: 'Remove' })
        await removeButton.click()

        const notification = await page.locator('.success', { hasText: 'Blog deleted correctly' })
        await expect(notification).toBeVisible()
        await expect(notification).toHaveCSS('border-style', 'solid')
        await expect(notification).toHaveCSS('color', 'rgb(0, 128, 0)')

        const deletedBlog = await page.getByText('Blog de prueba - Autor de prueba').locator('..')
        await expect(deletedBlog).not.toBeVisible()
      })

      test('a blog cannot be removed by another user', async ({ page, request }) => {
        await page.getByRole('button', { name: 'Logout' }).click()

        await request.post('/api/users', {
          data: {
            username: 'anotherUser',
            name: 'Another User',
            password: 'password'
          }
        })

        await loginWith(page, 'anotherUser', 'password')

        const createdBlog = await page.getByText('Blog de prueba - Autor de prueba').locator('..')
        const viewDetails = await createdBlog.getByRole('button', { name: 'View' })
        await viewDetails.click()

        const removeButton = await page.getByRole('button', { name: 'Remove' })
        await expect(removeButton).not.toBeVisible()
      })
    })

    describe('and multiple blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Blog A', 'Author A', 'http://blogA.com')
        await page.waitForTimeout(500)
        await createBlog(page, 'Blog B', 'Author B', 'http://blogB.com')
        await page.waitForTimeout(500)
        await createBlog(page, 'Blog C', 'Author C', 'http://blogC.com')
        await page.waitForTimeout(500)
      })

      test.only('blogs are sorted by likes in descending order', async ({ page }) => {
        const blogs = await page.locator('.blog')

        await expect(page.getByText('Blog A - Author A').locator('..')).toBeVisible()
        await expect(page.getByText('Blog B - Author B').locator('..')).toBeVisible()
        await expect(page.getByText('Blog C - Author C').locator('..')).toBeVisible()

        let blogTitles = await blogs.allTextContents()
        expect(blogTitles).toEqual([
          'Blog A - Author A View',
          'Blog B - Author B View',
          'Blog C - Author C View'
        ])

        await likeBlog(page, 'Blog C')

        await page.waitForTimeout(500)

        blogTitles = await blogs.allTextContents()
        expect(blogTitles).toEqual([
          'Blog C - Author C View',
          'Blog A - Author A View',
          'Blog B - Author B View'
        ])

        await likeBlog(page, 'Blog B')
        await likeBlog(page, 'Blog B')

        blogTitles = await blogs.allTextContents()
        expect(blogTitles).toEqual([
          'Blog B - Author B View',
          'Blog C - Author C View',
          'Blog A - Author A View'
        ])
      })
    })
  })
})
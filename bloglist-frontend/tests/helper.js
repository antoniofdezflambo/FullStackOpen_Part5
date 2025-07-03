const loginWith = async (page, username, password) => {
  const usernameInput = await page.getByTestId('username')
  const passwordInput = await page.getByTestId('password')
  const loginBtn = await page.getByRole('button', { name: 'Login' })

  await usernameInput.fill(username)
  await passwordInput.fill(password)
  await loginBtn.click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'New blog' }).click()

  const createButton = await page.getByRole('button', { name: 'Create new blog' })

  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await createButton.click()
}

export { loginWith, createBlog }
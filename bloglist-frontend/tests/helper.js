const loginWith = async (page, username, password) => {
  const usernameInput = await page.getByTestId('username')
  const passwordInput = await page.getByTestId('password')
  const loginBtn = await page.getByRole('button', { name: 'Login' })

  await usernameInput.fill(username)
  await passwordInput.fill(password)
  await loginBtn.click()
}

export { loginWith }
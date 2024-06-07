import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  let blog, container

  beforeEach(() => {
    blog = {
      title: 'Title for testing',
      author: 'Anonymous',
      url: 'https://testing.com',
      likes: 0,
      user: ''
    }

    container = render(<Blog blog={blog} updateBlogs={() => {}} notifications={{}} />).container
  })

  test('blow shows title and author, but not shows url and likes by default', () => {
    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('Title for testing - Anonymous')
    expect(element).not.toHaveTextContent('https://testing.com')
    expect(element).not.toHaveTextContent('Likes: 0')
  })

  test('when details button is clicked, blog shows url and likes', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('View')
    await user.click(button)

    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('https://testing.com')
    expect(element).toHaveTextContent('Likes: 0')
  })
})
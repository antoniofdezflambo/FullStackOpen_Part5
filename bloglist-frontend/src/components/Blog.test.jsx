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
      user: '663e73429fde5bd911f444a5'
    }
  })

  test('blow shows title and author, but not shows url and likes by default', () => {
    container = render(<Blog blog={blog} updateBlogs={() => {}} notifications={{}} />).container

    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('Title for testing - Anonymous')
    expect(element).not.toHaveTextContent('https://testing.com')
    expect(element).not.toHaveTextContent('Likes: 0')
  })

  test('when details button is clicked, blog shows url and likes', async () => {
    container = render(<Blog blog={blog} updateBlogs={() => {}} notifications={{}} />).container

    const user = userEvent.setup()

    const button = screen.getByText('View')
    await user.click(button)

    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('https://testing.com')
    expect(element).toHaveTextContent('Likes: 0')
  })

  test('if like button is clicked twice, event controller is called twice', async () => {
    const mockHandler = vi.fn()

    container = render(<Blog blog={blog} updateBlogs={() => {}} notifications={{}} onLikeTest={mockHandler} />)

    const user = userEvent.setup()

    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {
  let container

  test('form works correctly', async () => {
    const mockHandler = vi.fn()

    container = render(<CreateBlog blogs={[]} setBlogs={() => {}} notifications={{}} blogList={{}} createBlogTest={mockHandler} />)

    const user = userEvent.setup()

    screen.debug()
    const title = await screen.findByPlaceholderText('write title here')
    const author = await screen.findByPlaceholderText('write author here')
    const url = await screen.findByPlaceholderText('write url here')
    const submitButton = screen.getByText('Create new blog')

    await user.type(title, 'Title')
    await user.type(author, 'Author')
    await user.type(url, 'URL')
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler).toHaveBeenCalledWith({
      title: 'Title',
      author: 'Author',
      url: 'URL',
    })
  })

})
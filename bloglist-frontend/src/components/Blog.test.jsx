import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  test('blow shows title and author, but not shows url and likes by default', () => {
    const blog = {
      title: 'Title for testing',
      author: 'Anonymous',
      url: 'https://testing.com',
      likes: 0
    }

    const { container } = render(<Blog blog={blog} />)

    screen.debug()

    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('Title for testing - Anonymous')
    expect(element).not.toHaveTextContent('https://testing.com')
    expect(element).not.toHaveTextContent('Likes: 0')
  })

})
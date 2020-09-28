import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogCreation from './BlogCreation'

test('should display title and author ', () => {
  const blog = { title: 'test', author: 'tester', url: 'url', likes: 0 }
  const component = render(<Blog blog={blog}></Blog>)
  expect(component.container).toHaveTextContent('test tester')
})

test('should display title, author, url likes when clicked open ', () => {
  const blog = { title: 'test', author: 'tester', url: 'url', likes: 0 }
  const component = render(<Blog blog={blog}></Blog>)
  const button = component.getByText('Show')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('Title: test')
  expect(component.container).toHaveTextContent('URL: url')
  expect(component.container).toHaveTextContent('Likes: 0')
  expect(component.container).toHaveTextContent('Author: tester')
})

test('clicking likes twice calls the handler twice', async() => {
  const blog = { title: 'test', author: 'tester', url: 'url', likes: 0 }
  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} likeBlog={mockHandler}></Blog>)
  const button = component.getByText('Show')
  fireEvent.click(button)
  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('calls handler with the right info', () => {
  const createNewBlog = jest.fn()
  const component = render(<BlogCreation createNewBlog={createNewBlog}></BlogCreation>)
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author,{
    target: { value: 'Tester Testaaja' }
  })
  fireEvent.change(title,{
    target: { value: 'Näin testaillaan' }
  })
  fireEvent.change(url,{
    target: { value: 'testi.com' }
  })
  fireEvent.submit(form)
  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0]).toStrictEqual({ author: 'Tester Testaaja', title: 'Näin testaillaan', url: 'testi.com' })



})

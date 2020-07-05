import React, { useRef } from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { ReactWindowScroller } from './index'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useRef: jest.fn()
  }
})

describe('ReactWindowScroller', () => {
  let children

  beforeEach(() => {
    children = jest.fn().mockReturnValue(null)
    useRef.mockReturnValue({ current: 'ref' })
  })

  it('calls children with the correct props', () => {
    shallow(<ReactWindowScroller>{children}</ReactWindowScroller>)

    expect(children).toHaveBeenCalledWith({
      onScroll: expect.any(Function),
      ref: { current: 'ref' },
      style: {
        display: 'inline-block',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
      }
    })
  })

  it('sets width to auto when isGrid is true', () => {
    shallow(<ReactWindowScroller isGrid>{children}</ReactWindowScroller>)

    expect(children.mock.calls[0][0].style.width).toEqual('auto')
  })

  describe('when isGrid is true', () => {
    it('calls scrollTo on window when scrollTop is different than document scrollTop', () => {
      shallow(<ReactWindowScroller isGrid>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollLeft: 0,
        scrollTop: 100,
        scrollUpdateWasRequested: true
      })

      expect(document.documentElement.scrollTop).toEqual(0)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 100)
    })

    it('calls scrollTo on window when scrollLeft is different than document scrollLeft', () => {
      shallow(<ReactWindowScroller isGrid>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollLeft: 100,
        scrollTop: 0,
        scrollUpdateWasRequested: true
      })

      expect(document.documentElement.scrollLeft).toEqual(0)
      expect(window.scrollTo).toHaveBeenCalledWith(100, 0)
    })

    it('does not call scrollTo on window when both scrollTop and scrollLeft are the same as document scrollTop and scrollLeft', () => {
      shallow(<ReactWindowScroller isGrid>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollLeft: 0,
        scrollTop: 0,
        scrollUpdateWasRequested: true
      })

      expect(document.documentElement.scrollLeft).toEqual(0)
      expect(document.documentElement.scrollTop).toEqual(0)
      expect(window.scrollTo).not.toHaveBeenCalledWith()
    })

    it('does not call scrollTo on window is scrollUpdateWasRequested is false', () => {
      shallow(<ReactWindowScroller isGrid>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollLeft: 0,
        scrollTop: 100,
        scrollUpdateWasRequested: false
      })

      expect(window.scrollTo).not.toHaveBeenCalled()
    })
  })

  describe('when isGrid is false', () => {
    it('calls scrollTo on window when scrollOffset is different than document scrollTop', () => {
      shallow(<ReactWindowScroller>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollOffset: 100,
        scrollUpdateWasRequested: true
      })

      expect(window.scrollTo).toHaveBeenCalledWith(0, 100)
    })

    it('does not call scrollTo on window when scrollOffset is the same as document scrollTop', () => {
      shallow(<ReactWindowScroller>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollOffset: 0,
        scrollUpdateWasRequested: true
      })

      expect(document.documentElement.scrollTop).toEqual(0)
      expect(window.scrollTo).not.toHaveBeenCalled()
    })

    it('does not call scrollTo on window is scrollUpdateWasRequested is false', () => {
      shallow(<ReactWindowScroller>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollOffset: 100,
        scrollUpdateWasRequested: false
      })

      expect(window.scrollTo).not.toHaveBeenCalled()
    })
  })

  describe('on window scroll', () => {
    const scrollTo = jest.fn()

    beforeEach(() => {
      useRef.mockReturnValue({ current: { scrollTo } })
    })

    it.todo('throttles the event handlers')

    it('calls scrollTo on the ref with document scrollLeft and scrollTop if isGrid is true', () => {
      mount(<ReactWindowScroller isGrid>{children}</ReactWindowScroller>)

      window.dispatchEvent(new Event('scroll'))

      expect(document.documentElement.scrollLeft).toEqual(0)
      expect(document.documentElement.scrollTop).toEqual(0)
      expect(scrollTo).toHaveBeenCalledWith({ scrollLeft: 0, scrollTop: 0 })
    })

    it('calls scrollTo on the ref with document scrollTop if isGrid is false', () => {
      mount(<ReactWindowScroller>{children}</ReactWindowScroller>)

      window.dispatchEvent(new Event('scroll'))

      expect(document.documentElement.scrollTop).toEqual(0)
      expect(scrollTo).toHaveBeenCalledWith(0)
    })
  })
})

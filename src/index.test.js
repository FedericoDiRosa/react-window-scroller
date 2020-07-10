import React, { useRef } from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import { ReactWindowScroller } from './index'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useRef: jest.fn()
  }
})

const clock = sinon.useFakeTimers()

describe('ReactWindowScroller', () => {
  const children = jest.fn().mockReturnValue(null)
  const scrollTo = jest.fn()

  beforeEach(() => {
    useRef.mockReturnValueOnce({ current: { scrollTo } })
    useRef.mockReturnValueOnce({ current: { offsetTop: 20, offsetLeft: 10 } })
    document.documentElement.scrollTop = 30
    document.documentElement.scrollLeft = 20
  })

  afterEach(() => {
    children.mockClear()
    scrollTo.mockClear()
  })

  it('calls children with the correct props', () => {
    shallow(<ReactWindowScroller>{children}</ReactWindowScroller>)

    expect(children).toHaveBeenCalledWith({
      onScroll: expect.any(Function),
      ref: { current: { scrollTo } },
      outerRef: { current: { offsetTop: 20, offsetLeft: 10 } },
      style: {
        display: 'inline-block',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
      }
    })
  })

  describe('when isGrid is true', () => {
    it('sets width to auto', () => {
      shallow(<ReactWindowScroller isGrid>{children}</ReactWindowScroller>)

      expect(children.mock.calls[0][0].style.width).toEqual('auto')
    })

    it('calls scrollTo on window when scrollTop is different than calculated scrollTop', () => {
      shallow(<ReactWindowScroller isGrid>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollLeft: 0,
        scrollTop: 100,
        scrollUpdateWasRequested: true
      })

      expect(document.documentElement.scrollTop).toEqual(30)
      expect(window.scrollTo).toHaveBeenCalledWith(10, 120)
    })

    it('calls scrollTo on window when scrollLeft is different than calculated scrollLeft', () => {
      shallow(<ReactWindowScroller isGrid>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollLeft: 100,
        scrollTop: 0,
        scrollUpdateWasRequested: true
      })

      expect(document.documentElement.scrollLeft).toEqual(20)
      expect(window.scrollTo).toHaveBeenCalledWith(110, 20)
    })

    it('does not call scrollTo on window when both scrollTop and scrollLeft are the same as calculated scrollTop and scrollLeft', () => {
      shallow(<ReactWindowScroller isGrid>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollLeft: 10,
        scrollTop: 10,
        scrollUpdateWasRequested: true
      })

      expect(document.documentElement.scrollLeft).toEqual(20)
      expect(document.documentElement.scrollTop).toEqual(30)
      expect(window.scrollTo).not.toHaveBeenCalled()
    })

    it('does not call scrollTo on window if scrollUpdateWasRequested is false', () => {
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
    it('calls scrollTo on window when scrollOffset is different than calculated scrollTop', () => {
      shallow(<ReactWindowScroller>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollOffset: 100,
        scrollUpdateWasRequested: true
      })

      expect(window.scrollTo).toHaveBeenCalledWith(0, 120)
    })

    it('does not call scrollTo on window when scrollOffset is the same as calculated scrollTop', () => {
      shallow(<ReactWindowScroller>{children}</ReactWindowScroller>)
      window.scrollTo = jest.fn()

      children.mock.calls[0][0].onScroll({
        scrollOffset: 10,
        scrollUpdateWasRequested: true
      })

      expect(document.documentElement.scrollTop).toEqual(30)
      expect(window.scrollTo).not.toHaveBeenCalled()
    })

    it('does not call scrollTo on window if scrollUpdateWasRequested is false', () => {
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
    it('throttles the event handler', () => {
      mount(
        <ReactWindowScroller isGrid throttleTime={10}>
          {children}
        </ReactWindowScroller>
      )

      window.dispatchEvent(new Event('scroll'))
      clock.tick(5)
      window.dispatchEvent(new Event('scroll'))
      clock.tick(5)
      window.dispatchEvent(new Event('scroll'))

      expect(scrollTo).toHaveBeenCalledTimes(2)
    })

    it('calls scrollTo on the ref with calculated scrollLeft and scrollTop positions if isGrid is true', () => {
      mount(<ReactWindowScroller isGrid>{children}</ReactWindowScroller>)

      window.dispatchEvent(new Event('scroll'))

      expect(document.documentElement.scrollLeft).toEqual(20)
      expect(document.documentElement.scrollTop).toEqual(30)
      expect(scrollTo).toHaveBeenCalledWith({ scrollLeft: 10, scrollTop: 10 })
    })

    it('calls scrollTo on the ref with calculated scrollTop position if isGrid is false', () => {
      mount(<ReactWindowScroller>{children}</ReactWindowScroller>)

      window.dispatchEvent(new Event('scroll'))

      expect(document.documentElement.scrollTop).toEqual(30)
      expect(scrollTo).toHaveBeenCalledWith(10)
    })
  })
})

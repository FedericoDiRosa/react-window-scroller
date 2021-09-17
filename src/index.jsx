import { useRef, useEffect, useCallback } from 'react'
import throttle from 'lodash/throttle'

const windowScrollPositionKey = {
  y: 'pageYOffset',
  x: 'pageXOffset'
}

const documentScrollPositionKey = {
  y: 'scrollTop',
  x: 'scrollLeft'
}

const elementScrollPositionKey = documentScrollPositionKey

const getScrollPositionWindow = (axis) =>
  window[windowScrollPositionKey[axis]] ||
  document.documentElement[documentScrollPositionKey[axis]] ||
  document.body[documentScrollPositionKey[axis]] ||
  0

const getScrollPositionElement = (ref, axis) =>
  ref[elementScrollPositionKey[axis]]

const getScrollPosition = (ref, axis) => {
  if (ref === window) {
    return getScrollPositionWindow(axis)
  }
  return getScrollPositionElement(ref, axis)
}

export const ReactWindowScroller = ({
  children,
  throttleTime = 10,
  isGrid = false,
  scrollElementRef = window
}) => {
  const ref = useRef()
  const outerRef = useRef()

  useEffect(() => {
    const handleWindowScroll = throttle(() => {
      const { offsetTop = 0, offsetLeft = 0 } = outerRef.current || {}

      const scrollTop = getScrollPosition(scrollElementRef, 'y') - offsetTop
      const scrollLeft = getScrollPosition(scrollElementRef, 'x') - offsetLeft
      if (isGrid) ref.current && ref.current.scrollTo({ scrollLeft, scrollTop })
      if (!isGrid) ref.current && ref.current.scrollTo(scrollTop)
    }, throttleTime)

    scrollElementRef.addEventListener('scroll', handleWindowScroll)
    return () => {
      handleWindowScroll.cancel()
      scrollElementRef.removeEventListener('scroll', handleWindowScroll)
    }
  }, [isGrid, scrollElementRef, throttleTime])

  const onScroll = useCallback(
    ({
      scrollLeft = 0, // This is not provided by react-window
      scrollTop = 0, // This is not provided by react-window
      scrollOffset,
      scrollUpdateWasRequested
    }) => {
      if (!scrollUpdateWasRequested) return
      const top = getScrollPosition(scrollElementRef, 'y')
      const left = getScrollPosition(scrollElementRef, 'x')
      const { offsetTop = 0, offsetLeft = 0 } = outerRef.current || {}

      scrollOffset += Math.min(top, offsetTop)
      scrollTop += Math.min(top, offsetTop)
      scrollLeft += Math.min(left, offsetLeft)

      if (!isGrid && scrollOffset !== top)
        scrollElementRef.scrollTo(0, scrollOffset)
      if (isGrid && (scrollTop !== top || scrollLeft !== left)) {
        scrollElementRef.scrollTo(scrollLeft, scrollTop)
      }
    },
    [isGrid, scrollElementRef]
  )

  return children({
    ref,
    outerRef,
    style: {
      width: isGrid ? 'auto' : '100%',
      height: '100%',
      display: 'inline-block'
    },
    onScroll
  })
}

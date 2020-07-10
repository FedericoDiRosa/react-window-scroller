import { useRef, useEffect, useCallback } from 'react'
import throttle from 'lodash.throttle'

export const ReactWindowScroller = ({
  children,
  throttleTime = 10,
  isGrid = false
}) => {
  const ref = useRef()
  const outerRef = useRef()

  useEffect(() => {
    const handleWindowScroll = throttle(() => {
      const { offsetTop = 0, offsetLeft = 0 } = outerRef.current || {}
      const scrollTop = document.documentElement.scrollTop - offsetTop
      const scrollLeft = document.documentElement.scrollLeft - offsetLeft
      if (isGrid) ref.current && ref.current.scrollTo({ scrollLeft, scrollTop })
      if (!isGrid) ref.current && ref.current.scrollTo(scrollTop)
    }, throttleTime)

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [isGrid])

  const onScroll = useCallback(
    ({ scrollLeft, scrollTop, scrollOffset, scrollUpdateWasRequested }) => {
      if (!scrollUpdateWasRequested) return
      const { scrollTop: top, scrollLeft: left } = document.documentElement
      const { offsetTop = 0, offsetLeft = 0 } = outerRef.current || {}

      scrollOffset += Math.min(top, offsetTop)
      scrollTop += Math.min(top, offsetTop)
      scrollLeft += Math.min(left, offsetLeft)

      if (!isGrid && scrollOffset !== top) window.scrollTo(0, scrollOffset)
      if (isGrid && (scrollTop !== top || scrollLeft !== left)) {
        window.scrollTo(scrollLeft, scrollTop)
      }
    },
    [isGrid]
  )

  return children({
    ref,
    outerRef,
    style: {
      width: isGrid ? 'auto' : '100%',
      height: '100%',
      overflow: 'hidden',
      display: 'inline-block'
    },
    onScroll
  })
}

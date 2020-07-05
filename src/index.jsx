import { useRef, useEffect, useCallback } from 'react'
import throttle from 'lodash.throttle'

export const ReactWindowScroller = ({
  children,
  throttleTime = 10,
  isGrid
}) => {
  const ref = useRef()

  useEffect(() => {
    const handleWindowScroll = throttle(() => {
      const { scrollTop, scrollLeft } = document.documentElement
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

      if (!isGrid && scrollOffset !== top) window.scrollTo(0, scrollOffset)
      if (isGrid && (scrollTop !== top || scrollLeft !== left)) {
        window.scrollTo(scrollLeft, scrollTop)
      }
    },
    [isGrid]
  )

  return children({
    ref,
    style: {
      width: isGrid ? 'auto' : '100%',
      height: '100%',
      overflow: 'hidden',
      display: 'inline-block'
    },
    onScroll
  })
}

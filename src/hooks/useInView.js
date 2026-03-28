import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.once) observer.unobserve(el)
        } else if (!options.once) {
          setInView(false)
        }
      },
      { threshold: options.threshold ?? 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.once, options.threshold])

  return [ref, inView]
}

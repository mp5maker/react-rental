import * as React from 'react'

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState<boolean>(window.matchMedia(query).matches)
  const handleChange = () => setMatches(window.matchMedia(query).matches)

  React.useEffect(() => {
    const matchMedia = window.matchMedia(query)
    matchMedia.addEventListener('change', handleChange)
    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

export default useMediaQuery

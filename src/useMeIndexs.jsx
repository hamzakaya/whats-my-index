import * as React from 'react'

const MeContext = React.createContext()
const randomId = () => Math.random().toString(36).substr(2, 9)
const noop = () => { }
const useLayout = typeof window === 'undefined' ? noop : React.useLayoutEffect

export const MeIndex = (props) => {
  props.value.reset()

  return (
    <MeContext.Provider value={props.value}>
      {props.children}
    </MeContext.Provider>
  )
}

export const useMeIndexs = () => {
  const indexCounter = React.useRef(0)
  const map = React.useRef()
  if (!map.current) map.current = {}

  const reset = () => {
    indexCounter.current = 0
    map.current = {}
  }

  const get = (id, props) => {
    const hidden = props ? props.hidden : false
    if (!map.current[id])
      map.current[id] = { index: hidden ? -1 : indexCounter.current++ }
    map.current[id].props = props
    return map.current[id].index
  }

  return { get, map, reset }
}

export function useMeIndex(props) {
  const context = React.useContext(MeContext)
  const descendantId = React.useRef()
  if (!descendantId.current) descendantId.current = randomId()
  const [index, setIndex] = React.useState(-1)

  useLayout(() => void setIndex(context?.get(descendantId.current, props)))

  return index
}
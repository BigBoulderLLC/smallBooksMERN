export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null || serializedState === undefined) {
      return {
        users:[]
      }
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return {
      users:[]
    }
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState)
  } catch (err) {

  }
}
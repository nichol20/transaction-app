export const randomNumber = (min: number, max: number) => {
  return  Math.floor(Math.random() * (max - min)) + min
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)) 
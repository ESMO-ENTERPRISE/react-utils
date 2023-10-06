import { RouterState } from './types'

type Callback = (state: RouterState & { params?: {} }) => void

export class EsmoRouterEvents {
  private listener: Callback[] = []

  dispatch(data: RouterState & { params?: {} }) {
    this.listener.forEach(callback => callback(data))
  }

  addListener(callback: Callback) {
    this.listener.push(callback)
  }

  removeListener(callback: Callback) {
    const callbackIndex = this.listener.indexOf(callback)
    if (callbackIndex > -1) {
      this.listener.splice(callbackIndex, 1)
    }
  }
}
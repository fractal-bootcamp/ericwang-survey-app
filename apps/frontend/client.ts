import { treaty } from '@elysiajs/eden'
import type { App } from '../backend/src/index'

const apiClient = treaty<App>('localhost:3000')

export default apiClient

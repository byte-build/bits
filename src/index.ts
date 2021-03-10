import env from 'dotenv'
env.config()

import { removeBits, updateBits } from './bits'

Promise.all([removeBits(), updateBits()])

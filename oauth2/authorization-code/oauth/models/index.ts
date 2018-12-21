import * as Waterline from 'waterline'

const orm: Waterline.Waterline = new Waterline()

import { model } from './user'
orm.registerModel(model)

export default orm
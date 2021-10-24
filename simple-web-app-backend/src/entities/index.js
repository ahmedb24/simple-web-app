import crypto from 'crypto'
import Id from '../Id'
import sanitizeHtml from 'sanitize-html'
import buildMakeUser from './user'
import validator from '../validators'
import jwt from 'jsonwebtoken'

const makeUser = buildMakeUser({ Id, md5, sanitize, validator, crypto, jwt })

export default makeUser

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}

function sanitize (text) {
  // TODO: allow more coding embeds
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it']
  })
}
import express from 'express';
import AuthService from './AuthService.js';
import UserService from './UserService.js';

// secret phrases to sign the access and refresh tokens
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'access-token-secret'; 
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret'; 

const userService = new UserService();
const authService = new AuthService({ accessTokenSecret, refreshTokenSecret });

// auth middleware that checks access token from request header
const authenticateMiddleware = (req, res, next) => {
  const payload = authService.authenticate(req.headers.authorization);
  if (payload) {
    req.ctx = { ...(req.ctx || {}), auth: payload };
    return next();
  }

  res.status(401).send({ message: 'Not Authorized' });
}

const app = express();

app.use(express.json());

app.get('/auth/token', (_req, res) => {
  // assume the the user with ID 1 is signed in
  const user = userService.getById(1);

  // generate access and refresh token
  const accessToken = authService.generateAccessToken(user);
  const refreshToken = authService.generateRefreshToken(user);

  // update the user with refresh token to prevent its re-usage
  userService.updateById(user.id, { refreshToken });

  res.status(200).send({ accessToken, refreshToken });
});

app.post('/auth/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (typeof refreshToken !== 'string') {
    return res.status(400).send({ message: 'Refresh Token is missing' });
  }

  const payload = authService.verifyRefreshToken(refreshToken);
  if (!payload) {
    return res.status(401).send({ message: 'Refresh Token is invalid' });
  }

  // check if match the latest captured refreshToken in the user record
  const user = userService.getById(payload.userId);
  if (user.refreshToken !== refreshToken) {
    return res.status(401).send({ message: 'Refresh Token is not matched' });
  }

  // generate a new access and refresh tokens
  const accessToken = authService.generateAccessToken(user);
  const newRefreshToken = authService.generateRefreshToken(user);

  // invalidate requested refresh token, by replacing with a new one
  userService.updateById(user.id, { refreshToken: newRefreshToken });

  res.status(200).send({ accessToken, refreshToken: newRefreshToken });
});

app.post('/auth/logout', authenticateMiddleware, (req, res) => {
  // invalidate the current refreshToken
  userService.updateById(req.ctx?.auth?.userId, { refreshToken: null });
  res.status(200).end();
});

app.get('/', authenticateMiddleware, (req, res) => {
  const auth = req.ctx?.auth || {};
  res.status(200).send({ message: `Welcome ${auth.username}! Your user ID: ${auth.userId}` });
});

app.listen(3000, () => {
  console.log('Express is listening on http://localhost:3000');
});

/*
 * The authentication flow:
 * ------------------------
 * 1. Go to "GET /" and see '401 Not Authorized'
 * 2. Go to "GET /auth/token" to get the Access and Refresh tokens
 * 3. Go to "GET /" with 'Authorization: Bearer <ACCESS_TOKEN>' header and see '200 OK'
 * 4. Wait 1 minute until ACCESS_TOKEN is expired
 * 5. Go to "POST /auth/refresh-token" with body '{ "refreshToken": "<REFRESH_TOKEN>" }' and get the new Access and Refresh tokens
 * 6. Go to "GET /" with 'Authorization: Bearer <NEW_ACCESS_TOKEN>' header and see '200 OK' again :)
 * 7. Go the "POST /auth/logout" with 'Authorization: Bearer <NEW_ACCESS_TOKEN>'
 * 8. Try to regenerate Access and Refresh token with "POST /auth/refresh-token".
 *    That will not work because you have just signed out.
 */

import jwt from 'jsonwebtoken';

export default class AuthService {

  constructor({ accessTokenSecret, refreshTokenSecret }) {
    this.accessTokenSecret = accessTokenSecret;
    this.refreshTokenSecret = refreshTokenSecret;
  }

  authenticate(authHeader) {  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }
    const [, accessToken] = authHeader.trim().split(' ');
  
    try {
      const payload = jwt.verify(accessToken, this.accessTokenSecret);
      return payload;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  verifyRefreshToken(refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, this.refreshTokenSecret);
      return payload;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  generateAccessToken(user) {
    const payload = {
      userId: user.id,
      username: user.username
    };
    const options = {
      algorithm: 'HS256',
      expiresIn: '1m', // valid for 1 minute
      issuer: 'api-server',
      audience: 'express-jwt-example'
    };
    return jwt.sign(payload, this.accessTokenSecret, options);
  }

  generateRefreshToken(user) {
    const payload = { userId: user.id };
    const options = {
      algorithm: 'HS512',
      expiresIn: '15d', // valid for 15 days
      issuer: 'api-server',
      audience: 'express-jwt-example'
    };

    return jwt.sign(payload, this.refreshTokenSecret, options);
  }
}

import { Context } from '../..';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { userInfo } from 'os';

interface SignupArgs {
  credentials: { email: string; password: string };
  name: string;
  bio: string;
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  token: string | null;
}

export const authResolvers = {
  signup: async (
    _: any,
    { credentials: { email, password }, name, bio }: SignupArgs,
    { prisma }: Context,
  ): Promise<UserPayload> => {
    const isEmail = validator.isEmail(email);

    console.log('isEmail', isEmail, process.env.JWT_SIGN);

    if (!isEmail) {
      return {
        userErrors: [
          {
            message: 'Invalid email',
          },
        ],
        token: null,
      };
    }

    const isValidPassword = validator.isLength(password, {
      min: 5,
    });

    if (!isValidPassword) {
      return {
        userErrors: [
          {
            message: 'password too short',
          },
        ],
        token: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: 'invalid name or bio',
          },
        ],
        token: null,
      };
    }
    // return prisma.user.create({
    //   data: { email, name, password },
    // });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
      },
    });

    const token = await JWT.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SIGN as string,
      {
        expiresIn: 3600000,
      },
    );

    return {
      userErrors: [],
      token,
    };
  },
  signin: async (
    _: any,
    { credentials: { email, password } }: SignupArgs,
    { prisma }: Context,
  ): Promise<UserPayload> => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });


    console.log(user)

    if (!user) {
      return {
        userErrors: [
          {
            message: 'invalid credentials',
          },
        ],
        token: null,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        userErrors: [
          {
            message: 'invalid credentials',
          },
        ],
        token: null,
      };
    }

    return {
      userErrors: [],
      token: JWT.sign({ userId: user.id, email: user.email }, process.env.JWT_SIGN as string, {
        expiresIn: 3600000,
      }),
    };
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAuth0User, getAuth0Token } from '@/utils/api';
import prisma from '@/config/prisma';

const Auth0 = async (
  req: { method: string; body: { data: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { error: any }): void; new (): any };
      end: { (arg0: string): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
  }
) => {
  if (req.method === 'POST') {
    const { data } = req.body;
    let userData;
    console.log('data.role :>> ', data.role);
    try {
      const { access_token: accessToken, token_type: tokenType } = await getAuth0Token()
        .then((resToken) => resToken)
        .catch((error) => {
          console.error('Error fetching Auth0 token:', error);
          res.status(500).json({ error: 'Failed to fetch Auth0 token' });
          return null;
        });
      data.connection = 'Username-Password-Authentication';
      userData = await createAuth0User(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          connection: data.connection,
        },
        accessToken,
        tokenType
      )
        .then((resUser) => resUser)
        .catch((error) => {
          console.error('Error creating Auth0 user:', error);
          res.status(500).json({ error: 'Failed to create Auth0 user' });
          return null;
        });
      if (!Object.keys(userData).includes('statusCode')) {
        await prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
            role: data.role,
            enabled: data.enabled === 'on' ? true : false,
            accounts: {
              create: {
                provider: userData.identities[0].provider,
                type: userData.identities[0].provider,
                providerAccountId: userData.user_id,
              },
            },
          },
        });
        res.status(200).json(userData);
      } else {
        res.status(userData.statusCode).json({ error: userData.message });
      }
    } catch (error) {
      console.error('Error in Auth0 handler:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default Auth0;

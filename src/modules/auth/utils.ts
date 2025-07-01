import { cookies as getCookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

export const generateAuthCookie = async (props: Props) => {
  const { prefix, value } = props;
  const cookies = await getCookies();
  cookies.set({
    name: `${prefix}-token`,
    value,
    httpOnly: true,
    path: "/",
    // TODO: Ensure cross-domain cookie sharing
    // sameSite:"none"
    // domain:""
    secure:process.env.NODE_ENV === 'production',
    maxAge:60*60 *24*7
  });
};

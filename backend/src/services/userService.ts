import { User } from "../db";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  picture?: string;
}

export const findOrCreateUser = async (user: IUser): Promise<IUser> => {
  const existingUser = await User.findOne({ email: user.email });

  if (existingUser) {
    return {
      id: existingUser._id.toString(),
      name: existingUser.name || "",
      email: existingUser.email,
      picture: existingUser.picture,
    };
  }

  const newUser = await User.create({
    name: user.name,
    email: user.email,
    picture: user.picture,
    password: "oauth-google", // required workaround
  });

  return {
    id: newUser._id.toString(), // map _id to id
    name: newUser.name || "",
    email: newUser.email,
    picture: newUser.picture,
  };
};

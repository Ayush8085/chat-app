interface IUser {
  id: string;
}

namespace Express {
  interface Request {
    user: IUser;
  }
}

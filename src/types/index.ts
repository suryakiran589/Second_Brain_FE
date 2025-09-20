export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}
export type AuthContextType = {
  token: string | null;
  setToken: (t: string | null) => void;
};

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Content {
  _id:string
  title: string;
  link:string;
  description:string;
  createdAt:string
  category:string
}

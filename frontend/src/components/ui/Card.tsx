import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Card = ({ children }: Props) => {
  return <div className="rounded-3xl bg-white p-10 shadow-xl">{children}</div>;
};

export default Card;

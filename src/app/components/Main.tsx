interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return <main className={`px-8 mx-auto max-w-3xl pb-6 pt-[75px]`}>{children}</main>;
}

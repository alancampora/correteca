type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <header className="py-4">
        <p className="text-3xl font-bold">Codeteca</p>
        <p className="text-xl font-bold">Start shipping in minutes</p>
      </header>
      <div>{children}</div>
    </div>
  );
}

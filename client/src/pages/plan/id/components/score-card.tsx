type Props = {
  title: string;
  content: string;
}

export default function ScoreCard({ title, content }: Props) {
  return (
    <div className="rounded p-4 text-center bg-indigo-100">
      <p className="font-semibold text-xl">{title}</p>
      <p>{content}</p>
    </div>
  )
}

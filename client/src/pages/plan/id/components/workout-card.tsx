interface WorkoutCardProps {
  workout: string
  notes: string
}

export default function WorkoutCard({ workout, notes }: WorkoutCardProps) {
  return (
    <div className="text-sm">
      <p className="font-medium">{workout}</p>
      {notes && <p className="mt-1 text-xs text-muted-foreground">{notes}</p>}
    </div>
  )
}


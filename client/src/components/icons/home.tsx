type Props = { className: string };

export default function HomeIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
    >
      <path fill="#e8eaf6" d="M42 39H6V23L24 6l18 17z" />
      <path fill="#c5cae9" d="m39 21l-5-5V9h5zM6 39h36v5H6z" />
      <path fill="#b71c1c" d="M24 4.3L4 22.9l2 2.2L24 8.4l18 16.7l2-2.2z" />
      <path fill="#d84315" d="M18 28h12v16H18z" />
      <path fill="#01579b" d="M21 17h6v6h-6z" />
      <path
        fill="#ff8a65"
        d="M27.5 35.5c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5s.5-.2.5-.5v-2c0-.3-.2-.5-.5-.5"
      />
    </svg>
  );
}

interface Props {
  style: "white" | "thunder" | "yellow"
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  children: React.ReactNode
}

function Button({ style, onClick, className, children }: Props) {
  const styleObj = {
    white: "text-gray-600 ring-1",
    thunder: "bg-thunder text-white",
    yellow: "bg-kakao_yellow",
  }
  return (
    <button className={`${className} ${styleObj[style]} `} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button

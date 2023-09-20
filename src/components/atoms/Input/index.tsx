export default function Input(id: string, type: string, placeholder: string, className: string) {
  return (
    <>
      <input id={id} type={type} placeholder={placeholder} className={className} />
    </>
  );
}

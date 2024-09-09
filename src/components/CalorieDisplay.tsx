type CalorieDisplayProps = {
    calories: number,
    text: string,
    color: string,
}

export default function CalorieDisplay({calories, text, color}: CalorieDisplayProps) {
  return (
    <p className='font-bold rounded-full grid grid-cols-1 gap-3 text-center text-white'>
    <span className={`text-4xl ${color}`}> {calories} Cal</span>
    {text}
  </p>
  )
}

/* eslint-disable prettier/prettier */
export const Button = ({ isLoading, children, loadingMessage }) => {
  return (
    <button
      type='submit'
      className='w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]'
      disabled={isLoading}>
      {isLoading ? (
        <div className='flex items-center justify-center space-x-2'>
          <div className='w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
          <span>{loadingMessage}</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

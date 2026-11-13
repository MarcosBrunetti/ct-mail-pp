type Props = React.ComponentProps<"input"> & {
    error?: string
    variant?: "dark" | "light"
    leftIcon?: React.ReactNode
}

export function Input({ error ,type = "text", variant = "dark", leftIcon, className, ...rest }: Props) {
    const base = "w-full h-12 rounded-lg border-b border-orange-ct px-4 text-sm outline-none focus:border-b-orange-500 transition ease-linear"

     const changeColor =
        variant === "light"  ? `${base} text-black-ct bg-white placeholder-black-ct/60`  : `${base} text-white-ct bg-transparent placeholder-white-ct hover:placeholder-orange-200`
           
           


    return (
        <fieldset className="relative flex flex-1 max-h-20 focus-within:text-green-100">
            {leftIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black-ct/60 z-10">
                    {leftIcon}
                </div>
            )}

            <input  type={type} className={`${changeColor} ${className ?? ""}`} {...rest} />
                
            {error && <span className="mt-1 text-sm text-red-400">{error}</span>}
        </fieldset>
    )
}

import Link from "next/link"

const NavLogo = () => {
  return (
    <Link href="/blog" className="flex items-center gap-1 text-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className={`h-9 w-9 text-teal-500`}
        stroke="currentColor"
        fill="none"
      >
        <path
          d="M20 80 
 C20 80, 30 30, 80 20
 C80 20, 60 40, 50 60
 C40 80, 20 80, 20 80
 Z"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M30 70
 C30 70, 40 40, 70 25"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M35 65
 C35 65, 45 45, 60 35"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
        Inkspire
      </span>
    </Link>
  )
}
export default NavLogo

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Vivekananda Malladi. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/vivekdev16/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400"
            >
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              GitHub
            </a>
            <a href="mailto:vivekanandamalladi9@gmail.com" className="text-gray-400 hover:text-blue-400">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


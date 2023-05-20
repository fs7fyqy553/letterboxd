import "normalize.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400"],
  style: ["italic"],
  subsets: ["latin"],
})

export const metadata = {
  title: 'Letterboxd Guessing Game',
  description: 'Game made using NextJS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}

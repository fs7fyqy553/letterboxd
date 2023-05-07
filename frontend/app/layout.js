import "normalize.css";
import "./styles/index.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400"],
  style: ["italic"],
  // TODO: revise the choice of font subset
  subsets: ["latin"],
})

// TODO: try to make sure the following (from CRA version) are implemented:
// <meta name="viewport" content="width=device-width, initial-scale=1" />
// <meta charset="utf-8" />
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

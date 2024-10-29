import { Lora } from "next/font/google";
import Providers from "./Providers";
import Header from "@/components/Header/Header";
import "./App.scss"
import 'react-loading-skeleton/dist/skeleton.css'

const font = Lora({
  weight: ['400', '500', "600", '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Nebula Blog",
  description: "Created by Lucas Cabral",
};

export default function RootLayout({ children, header }) {

  return (
    <html lang="en">
      <Providers>
        <body className={font.className}>

          {header &&
            <Header />
          }

          {children}

        </body>
      </Providers>
    </html>
  );
}

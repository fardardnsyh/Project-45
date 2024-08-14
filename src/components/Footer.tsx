import { FaHeart } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="p-6 text-center text-zinc-800">
      <p>
        {year} Made with <FaHeart className="inline" /> by{" "}
        <a
          href="https://breyr.dev"
          target="_blank"
          className="underline hover:text-bright-turquoise-500"
        >
          me
        </a>
      </p>
    </footer>
  );
}

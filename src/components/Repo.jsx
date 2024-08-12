import { FaCodeBranch, FaCopy, FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import jsicon from "../../public/javascript.svg";
import cppicon from "../../public/javascript.svg";
import csharpicon from "../../public/javascript.svg";
import cssicon from "../../public/javascript.svg";
import goicon from "../../public/javascript.svg";
import htmlicon from "../../public/javascript.svg";
import javaicon from "../../public/javascript.svg";
import pythonicon from "../../public/javascript.svg";
import swifticon from "../../public/javascript.svg";
import typeicon from "../../public/javascript.svg";
import defaultIcon from "../../public/github.svg";
import toast from "react-hot-toast";
const Repo = ({ repo }) => {
  const languageIcons = {
    JavaScript: jsicon,
    Cplusplus: cppicon,
    Csharp: csharpicon,
    CSS: cssicon,
    Go: goicon,
    HTML: htmlicon,
    Java: javaicon,
    Python: pythonicon,
    Swift: swifticon,
    TypeScript: typeicon,
    default: defaultIcon,
  };
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Show success toast
        toast.success("URL copied to clipboard!");
      },
      (err) => {
        // Show error toast
        toast.error("Failed to copy URL.");
      }
    );
  };
  return (
    <li className="mb-10 ms-7">
      <span
        className="absolute flex items-center justify-center w-6 h-6 bg-blue-100
			rounded-full -start-3 ring-8 ring-white"
      >
        <FaCodeBranch className="w-5 h-5 text-blue-800" />
      </span>
      <div className="flex gap-2 items-center flex-wrap">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          {repo.name}
        </a>
        <span
          className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5
					py-0.5 rounded-full flex items-center gap-1"
        >
          <FaRegStar /> {repo.stargazers_count}
        </span>
        <span
          className="bg-purple-100 text-purple-800 text-xs font-medium
					 px-2.5 py-0.5 rounded-full flex items-center gap-1"
        >
          <FaCodeFork /> {repo.forks}
        </span>
        <span
          className="cursor-pointer bg-green-100 text-green-800 text-xs
            font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1"
          onClick={() => handleCopy(repo.clone_url)} // Add onClick handler
        >
          <FaCopy /> Clone
        </span>
      </div>

      <time
        className="block my-1 text-xs font-normal leading-none
			 text-black"
      >
        Released on{" "}
        {new Date(repo.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </time>
      <p className="mb-4 text-base font-normal text-white">
        {repo.description}
      </p>
      <div className="flex align-middle items-center">
        {languageIcons[repo.language] && (
          <p className="text-xs">Major Language : </p>
        )}
        <img
          src={languageIcons[repo.language] || languageIcons.default}
          alt={`${repo.language} icon`}
          className="h-8"
        />
      </div>
    </li>
  );
};
export default Repo;

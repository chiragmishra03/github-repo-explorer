import SearchComponent from "../components/SearchComponent";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("default");
  const [searchUsername, setSearchUsername] = useState("");

  const fetchProfileData = async (username) => {
    if (username.length > 0) {
      try {
        setLoading(true);
        const Userres = await fetch(`https://api.github.com/users/${username}`);
        const Userresponse = await Userres.json();
        setUserProfile(Userresponse);

        const repores = await fetch(Userresponse.repos_url);
        const reposresponse = await repores.json();
        setRepos(reposresponse);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (searchUsername) {
      fetchProfileData(searchUsername);
    }
  }, [searchUsername]);

  const handleUserSearch = async (username) => {
    setSearchUsername(username);
  };

  const sortRepos = (type) => {
    let sortedRepos = [...repos];

    switch (type) {
      case "recent":
        sortedRepos.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ); // descending, recent first
        break;
      case "stars":
        sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count); // descending, most stars first
        break;
      case "forks":
        sortedRepos.sort((a, b) => b.forks_count - a.forks_count); // descending, most forks first
        break;
      default:
        break;
    }

    setSortType(type);
    setRepos(sortedRepos);
  };

  return (
    <div className="m-4">
      <div className="flex flex-col items-center mb-4">
        {" "}
        {/* Centering container */}
        <h1 className="text-2xl font-bold">GitHub Repository Explorer</h1>
      </div>
      <SearchComponent handleSearch={handleUserSearch} />
      {repos.length > 0 && <SortRepos onSort={sortRepos} sortType={sortType} />}
      {loading && <Spinner />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {searchUsername && userProfile && (
          <ProfileInfo userProfile={userProfile} />
        )}
        {searchUsername && <Repos repos={repos} />}
      </div>
    </div>
  );
};

export default HomePage;

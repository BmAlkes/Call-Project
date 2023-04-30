import { FiSettings, FiUpload } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import "./profile.css";
import avatar from "../../assets/avatar.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Profile">
          <FiSettings size={25} />
        </Title>
        <div className="container">
          <form className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" />
              <br />
              {avatarUrl === null ? (
                <img
                  src={`https://github.com/BmAlkes.png`}
                  alt="profile img"
                  width={230}
                  height={230}
                />
              ) : (
                <img src={avatarUrl} alt="profile" width={250} height={250} />
              )}
            </label>
            <label>Name</label>
            <input type="text" placeholder="Name" />
            <label>Email</label>
            <input type="text" placeholder="Email" disabled={true} />
            <button type="submit" className="submit">
              Save
            </button>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;

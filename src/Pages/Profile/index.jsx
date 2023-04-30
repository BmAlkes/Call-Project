import { FiSettings } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import "./profile.css";

const Profile = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Profile">
          <FiSettings size={25} />
        </Title>
      </div>
      <h1>Perfil</h1>
    </div>
  );
};

export default Profile;

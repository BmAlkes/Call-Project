import { FiSettings, FiUpload } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import "./profile.css";
import avatar from "../../assets/avatar.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../config/dbfirebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Profile = () => {
  const { user, storageUser, setUser } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);
  const [name, setName] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);

  const handleFile = (e) => {
    const img = e.target.files[0];

    if (img.type === "image/jpeg" || img.type === "image/png") {
      setImageAvatar(img);
      setAvatarUrl(URL.createObjectURL(img));
    } else {
      toast.error("Send a image type png or jpeg");
      setImageAvatar(null);
      return;
    }
  };

  async function handleUpload() {
    const currentUid = user.uid;
    const uploadRef = ref(storage, `image/${currentUid}/${imageAvatar.name}`);
    const uploadTask = uploadBytes(uploadRef, imageAvatar).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        let urlPicture = downloadURL;
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          avatarUrl: urlPicture,
          nome: name,
        }).then(() => {
          let data = {
            ...user,
            nome: name,
            avatarUrl: urlPicture,
          };
          setUser(data);
          storageUser(data);
          toast.success("Success Updated");
        });
      });
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageAvatar === null && name !== "") {
      // update only name
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        nome: name,
      }).then(() => {
        let data = {
          ...user,
          nome: name,
        };
        setUser(data);
        storageUser(data);
        toast.success("Success Updated");
      });
    } else if (name !== "" && imageAvatar !== null) {
      // update name and picture
      handleUpload();
    }
  };
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Profile">
          <FiSettings size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
              <br />
              {avatarUrl === null ? (
                <img src={avatar} alt="profile img" width={230} height={230} />
              ) : (
                <img src={avatarUrl} alt="profile" width={250} height={250} />
              )}
            </label>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input type="text" disabled={true} value={email} />
            <button type="submit" className="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

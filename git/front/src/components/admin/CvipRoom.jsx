import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { IoMdClose } from "react-icons/io";

export default function CvipRoom() {
  const [vipRooms, setVipRooms] = useState([]);
  const [editData, setEditData] = useState({
    idRoom: "", // Change to idRoom to match the property used in handleEdit function
    name: "",
    price: "",
    photo: null,
  });
  const [showEditForm, setShowEditForm] = useState(false); // Состояние для отображения формы редактирования

  useEffect(() => {
    const fetchVipRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/viproom");
        setVipRooms(response.data);
      } catch (error) {
        console.error("Error fetching VIP rooms:", error);
      }
    };
    fetchVipRooms();
  }, []);
  

  const handleEdit = (id) => {
    const selectedVipRoom = vipRooms.find((vipRoom) => vipRoom.idRoom === id);
    if (selectedVipRoom) {
      setEditData({
        idRoom: selectedVipRoom.idRoom, // Change to idRoom
        name: selectedVipRoom.name,
        price: selectedVipRoom.price,
        photo: selectedVipRoom.photo,
      });
      setShowEditForm(true); // Показать форму редактирования при нажатии на кнопку "Редактировать"
    }
  };

  const handleInputChange = (event) => {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditData({
        ...editData,
        photo: file,
      });
    }
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("idRoom", editData.idRoom);
      formData.append("name", editData.name);
      formData.append("price", editData.price);
      if (editData.photo) {
        formData.append("photo", editData.photo);
      }
      await axios.put(
        `http://localhost:3000/viproom/${editData.idRoom}`,
        formData
      );
      // Перезагрузить страницу после успешного редактирования
      window.location.reload();
    } catch (error) {
      console.error("Error editing VIP room:", error);
    }
  };

  const handleCloseModal = () => {
    setShowEditForm(false); // Закрыть модальное окно при нажатии на кнопку "Закрыть"
  };

  const handleModalClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      setShowEditForm(false); // Закрыть модальное окно при нажатии вне его
    }
  };

  const decodeBase64Image = (base64Image) => {
    const decodedImage = Buffer.from(base64Image, "base64").toString("binary");
    return decodedImage;
  };

  return (
    <div className="admin_card">
      <h3 className="">Вип-комнаты:</h3>
      <ul>
        {vipRooms &&
          vipRooms.map((vipRoom) => (
            <li className="admin_list" key={vipRoom.idRoom}>
              <img
                className="admin_list_img"
                src={`http://localhost:3000/${decodeBase64Image(
                  vipRoom.photo.data
                )}`}
                alt=""
              />
              <h4 className="admin_list_sp">{vipRoom.name}</h4>
              <p className="admin_list_sp">Цена: {vipRoom.price}</p>
              <button
                className="btn_edit"
                onClick={() => handleEdit(vipRoom.idRoom)}
              >
                Редактировать
              </button>
            </li>
          ))}
      </ul>

      {/* Форма редактирования VIP-комнаты */}
      {showEditForm && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={handleCloseModal}>
                Закрыть <IoMdClose />
              </button>
              <input
              className="add_form_i"
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
              />
              <input
              className="add_form_i"
                type="text"
                name="price"
                value={editData.price}
                onChange={handleInputChange}
              />
              <input className="add_form_i" type="file" name="photo" onChange={handleFileChange} />
              <button className="btn_add" onClick={handleEditSubmit}>Сохранить изменения</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

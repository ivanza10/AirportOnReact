import { Buffer } from "buffer";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

export default function Cshopcard() {
  const [shopData, setShopData] = useState([]);
  const [newShopData, setNewShopData] = useState({
    name: "",
    signature: "",
    photo: null,
    floor: "",
    type: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const decodeBase64Image = (base64Image) => {
    if (!base64Image) {
      return "";
    }
    const decodedImage = Buffer.from(base64Image, "base64").toString("binary");
    return decodedImage;
  };

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/service");
        setShopData(response.data);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };
    fetchShopData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/service/${id}`);
      setShopData(shopData.filter((shop) => shop.id !== id));
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  const handleEdit = async (id, newData) => {
    try {
      const formData = new FormData();
      formData.append("name", newData.name);
      formData.append("signature", newData.signature);
      formData.append("floor", newData.floor);
      formData.append("type", newData.type);
      if (newData.photo) {
        formData.append("photo", newData.photo);
      }
      await sendEditRequest(id, formData);
    } catch (error) {
      console.error("Error editing shop:", error);
    }
  };

  const sendEditRequest = async (id, formData) => {
    try {
      await axios.put(`http://localhost:3000/service/${id}`, formData);
      const updatedData = shopData.map((shop) => {
        if (shop.id === id) {
          return { ...shop, ...newShopData };
        }
        return shop;
      });
      setShopData(updatedData);
      setIsEditFormVisible(false);
      window.location.reload(); // Перезагрузка страницы
    } catch (error) {
      console.error("Error editing shop:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", newShopData.photo);
      formData.append("name", newShopData.name);
      formData.append("signature", newShopData.signature);
      formData.append("floor", newShopData.floor);
      formData.append("type", newShopData.type);
      await axios.post("http://localhost:3000/service", formData);
      const updatedResponse = await axios.get("http://localhost:3000/service");
      setShopData(updatedResponse.data);
      setNewShopData({
        name: "",
        signature: "",
        photo: null,
        floor: "",
        type: "",
      });
    } catch (error) {
      console.error("Error adding new shop:", error);
    }
  };

  const handleInputChange = (event) => {
    setNewShopData({
      ...newShopData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewShopData({
        ...newShopData,
        photo: file,
      });
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setIsEditFormVisible(false);
  };

  const toggleEditFormVisibility = () => {
    setIsEditFormVisible(!isEditFormVisible);
    setIsFormVisible(false);
  };

  const handleCloseModal = () => {
    setIsFormVisible(false);
    setIsEditFormVisible(false);
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const renderEditForm = () => {
    if (!isEditFormVisible) {
      return null;
    }
    return (
      <div className="modal-overlay">
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              Закрыть <IoMdClose />
            </button>
            <input
              className="add_form_i"
              type="text"
              name="name"
              value={newShopData.name}
              onChange={handleInputChange}
              placeholder="New Name"
            />
            <input
              className="add_form_i"
              type="text"
              name="signature"
              value={newShopData.signature}
              onChange={handleInputChange}
              placeholder="New Signature"
            />
            <input
              className="add_form_i"
              type="text"
              name="floor"
              value={newShopData.floor}
              onChange={handleInputChange}
              placeholder="New Floor"
            />
            <input
              className="add_form_i"
              type="text"
              name="type"
              value={newShopData.type}
              onChange={handleInputChange}
              placeholder="New Type"
            />
            <input
              className="add_form_i"
              type="file"
              name="photo"
              onChange={handleFileChange}
            />
            <button
              className="btn_add"
              onClick={() => handleEdit(newShopData.id, newShopData)}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAddForm = () => {
    if (!isFormVisible) {
      return null;
    }
    return (
      <div className="modal-overlay">
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              Закрыть
              <IoMdClose />
            </button>
            <div className="add_form">
              <input
                className="add_form_i"
                type="text"
                name="name"
                value={newShopData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                className="add_form_i"
                type="text"
                name="signature"
                value={newShopData.signature}
                onChange={handleInputChange}
                placeholder="Signature"
              />
              <input
                className="add_form_i"
                type="text"
                name="floor"
                value={newShopData.floor}
                onChange={handleInputChange}
                placeholder="Floor"
              />
              <input
                className="add_form_i"
                type="text"
                name="type"
                value={newShopData.type}
                onChange={handleInputChange}
                placeholder="Type"
              />
              <input
                className="add_form_i"
                type="file"
                name="photo"
                onChange={handleFileChange}
              />
              <button className="btn_add" onClick={handleAdd}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin_card">
      <h3>Магазины и кафе:</h3>
      <button className="btn_add" onClick={toggleFormVisibility}>
        Добавить
      </button>
      <ul>
        {shopData.map((shop) => (
          <li className="admin_list" key={shop.id}>
            <img
              className="admin_list_img"
              src={`http://localhost:3000/${decodeBase64Image(
                shop.photo.data
              )}`}
              alt=""
            />
            <h4 className="admin_list_sp">{shop.name}</h4>
            <h4 className="admin_list_sp">{shop.signature}</h4>
            <h4 className="admin_list_sp">{shop.floor}</h4>
            <h4 className="admin_list_sp">{shop.type}</h4>
            <button className="btn_exit" onClick={() => handleDelete(shop.id)}>
              Удалить
            </button>
            <button
              className="btn_edit"
              onClick={() => {
                toggleEditFormVisibility();
                setNewShopData({
                  id: shop.id,
                  name: shop.name,
                  signature: shop.signature,
                  photo: shop.photo,
                  floor: shop.floor,
                  type: shop.type,
                });
              }}
            >
              Редактировать
            </button>
          </li>
        ))}
      </ul>
      {renderAddForm()}
      {renderEditForm()}
    </div>
  );
}

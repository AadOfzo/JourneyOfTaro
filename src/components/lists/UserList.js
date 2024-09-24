import React, { useState, useEffect, useRef } from "react";
import ApiService from "../../configs/utilities/axios/ApiService";
import UserDetails from "../../configs/users/UserDetails";
import {
  UserSelect,
  CenteredH2,
  UserListContainer,
  UserDetailsContainer,
  UserListInnerContainer,
  AddAdminButton,
  UserDeleteButton,
  ButtonsContainer,
  UserSelectList,
  UserSelectItem,
  UserSelectHeader,
} from "./styles.UserList";

function UserList() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [setErrorUsers] = useState(null);
  const [file, setFile] = useState(null);
  const [buttonText, setButtonText] = useState("Upload Image");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const usersResponse = await ApiService.fetchUsers();
      setUsers(usersResponse);

      // Fetch the image for the selected user
      if (selectedUserId) {
        await fetchUserImage(selectedUserId);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorUsers("Error fetching users. Please try again later.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchUserImage = async (userId) => {
    try {
      const imageResponse = await ApiService.getUserImage(userId);
      setImageUrl(URL.createObjectURL(imageResponse.data));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // No image found, set URL to null
        setImageUrl(null);
      } else {
        // Handle other errors
        console.error("Error fetching user image:", error);
        setImageUrl(null); // Fallback if there's an error
      }
    }
  };

  const handleNoImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setButtonText("Add Image");
  };

  const handleUploadClick = async () => {
    if (file && selectedUserId) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await ApiService.addUserImage(selectedUserId, file);
        setFile(null);
        setButtonText("Upload Image");
        fetchUsers(); // Refresh user list and image
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    }
  };

  const toggleExpand = async (userId) => {
    setExpandedUserId((prevState) => (prevState === userId ? null : userId));
    const selectedUser = users.find((u) => u.userId === userId);
    setUser(selectedUser);
    setSelectedUserId(userId); // Set the selected user's ID

    // Fetch and set the user image
    await fetchUserImage(userId);
  };

  const grantAdminPrivilege = async (username) => {
    try {
      await ApiService.grantAdminPrivilege(username);
      fetchUsers(); // Refresh user list after updating privileges
    } catch (error) {
      console.error("Error granting admin privilege:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await ApiService.deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <UserListContainer>
      <CenteredH2>User List</CenteredH2>
      {loadingUsers ? (
        <p>Loading...</p>
      ) : (
        <UserListInnerContainer>
          <UserSelect>
            <UserSelectHeader>Users</UserSelectHeader>
            <UserSelectList as="table">
              <tbody>
                {users.map((user) => (
                  <UserSelectItem
                    as="tr"
                    key={user.userId}
                    onClick={() => toggleExpand(user.userId)}
                    isActive={expandedUserId === user.userId}
                  >
                    <td>{user.userId}</td>
                    <td>{user.username}</td>
                  </UserSelectItem>
                ))}
              </tbody>
            </UserSelectList>
          </UserSelect>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {user && (
              <>
                <UserDetailsContainer>
                  <UserDetails user={user} imageUrl={imageUrl} />
                </UserDetailsContainer>
                <ButtonsContainer>
                  <AddAdminButton
                    onClick={() => grantAdminPrivilege(user.username)}
                  >
                    Grant Admin Rights
                  </AddAdminButton>
                  <UserDeleteButton onClick={() => deleteUser(user.userId)}>
                    Delete User
                  </UserDeleteButton>
                </ButtonsContainer>
                <NoImageContainer
                  hasImage={!!file}
                  imageUrl={file ? URL.createObjectURL(file) : null}
                  onClick={handleNoImageClick}
                >
                  {!file && <NoImageIcon />}
                  <p>{!file ? "No user image" : ""}</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <UploadButton file={file} onClick={handleUploadClick}>
                    {buttonText}
                  </UploadButton>
                </NoImageContainer>
              </>
            )}
          </div>
        </UserListInnerContainer>
      )}
    </UserListContainer>
  );
}

export default UserList;

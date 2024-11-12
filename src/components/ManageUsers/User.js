import { useEffect, useState } from "react";
import "./User.css";
import { getUserByUsername, deleteUser } from "../../services/userService";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  // modal delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let response = await getUserByUsername("");

    if (response && response.status === 200) {
      setListUsers(response.users);
    }
  };

  const handleDeleteUser = async (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };

  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModal);
    if (response && +response.status === 200) {
      toast.success(response.message);
      await fetchUsers();
      setIsShowModalDelete(false);
    } else {
      toast.error(response.message);
    }
  };

  const handleRefresh = async () => {
    await fetchUsers();
  };

  return (
    <>
      <div className="container">
        <div className="manage-user-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>Manage Users</h3>
            </div>
            <div className="actions my-3">
              <button
                className="btn btn-success refresh"
                onClick={() => handleRefresh()}
              >
                <i class="fa fa-refresh"></i>
                Refresh
              </button>
            </div>
          </div>

          <div class="user-body mt-5">
            <table class="table table-borderless table-responsive table-hover card-1 p-4">
              <thead>
                <tr class="border-bottom">
                  <th>
                    <span class="ml-2">#</span>
                  </th>
                  <th>
                    <span class="ml-2">ID</span>
                  </th>
                  <th>
                    <span class="ml-2">Username</span>
                  </th>
                  <th>
                    <span class="ml-2">Email</span>
                  </th>
                  <th>
                    <span class="ml-4">Is_admin</span>
                  </th>
                  <th>
                    <span class="ml-4">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr class="border-bottom" key={`row-${index}`}>
                          <td>
                            <div class="p-2">{index + 1}</div>
                          </td>
                          <td>
                            <div class="p-2 d-flex flex-row align-items-center mb-2">
                              {item.id}
                            </div>
                          </td>
                          <td>
                            <div class="p-2">{item.username}</div>
                          </td>
                          <td>
                            <div class="p-2 d-flex flex-column">
                              {item.email}
                            </div>
                          </td>
                          <td>
                            <div class="p-2">
                              {item.is_admin === true ? "True" : "False"}
                            </div>
                          </td>
                          <td>
                            <div class="p-2 icons">
                              <span
                                title="Delete"
                                className="delete"
                                onClick={() => handleDeleteUser(item)}
                              >
                                <i class="fa fa-trash"></i>
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Not Found User</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />
    </>
  );
};

export default Users;

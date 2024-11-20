import { useEffect, useState } from "react";
import { deletePostAdmin, getPosts } from "../../services/userService";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";

const Posts = (props) => {
  const [listPosts, setListPosts] = useState([]);
  // modal delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let response = await getPosts();

    if (response && response.status === 200) {
      setListPosts(response.posts);
      console.log(response.posts);
    }
  };

  const handleDeletePost = async (post) => {
    setDataModal(post);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };

  const confirmDeletePost = async () => {
    let response = await deletePostAdmin(dataModal.id);
    if (response && +response.status === 200) {
      toast.success(response.message);
      await fetchPosts();
      setIsShowModalDelete(false);
    } else {
      toast.error(response.message);
    }
  };

  const handleRefresh = async () => {
    await fetchPosts();
  };

  return (
    <>
      <div className="container">
        <div className="manage-user-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>Manage Posts</h3>
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
                    <span class="ml-2">Content</span>
                  </th>
                  <th>
                    <span class="ml-2">Author</span>
                  </th>
                  <th>
                    <span class="ml-4">Toxic</span>
                  </th>
                  <th>
                    <span class="ml-4">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listPosts && listPosts.length > 0 ? (
                  <>
                    {listPosts.map((item, index) => {
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
                            <div class="p-2">{item.content}</div>
                          </td>
                          <td>
                            <div class="p-2 d-flex flex-column">
                              {item.author}
                            </div>
                          </td>
                          <td>
                            <div class="p-2">{item.toxic === true ? "True" : "False"}</div>
                          </td>
                          <td>
                            <div class="p-2 icons">
                              <span
                                title="Delete"
                                className="delete"
                                onClick={() => handleDeletePost(item)}
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
                      <td>Not Found Post</td>
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
        confirmDeletePost={confirmDeletePost}
        dataModal={dataModal}
      />
    </>
  );
};

export default Posts;

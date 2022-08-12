import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import api from "../api";
import _ from "lodash";

import Pagination from "./pagination";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import DynamicLoading from "./DynamicLoading";
import NavBar from "./navBar";
import Main from "./main";
import Login from "./login";
import UserPage from "./userPage";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [users, setUsers] = useState();

  const pageSize = 8; // сколько человек хотим отобразить на странице

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  // удаление элемента при 'клике' на button
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  // разрезали кол-во человек на массив по 4 человека
  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    // Условие добавил для устранения бага который не отображал пользователей если удалены все пользователи на последней странице у выбранной профессии.
    if (userCrop.length === 0 && currentPage > -1) {
      setCurrentPage((prevState) => prevState - 1);
    }
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <>
        <NavBar />
        <Switch>
          <Route path="/users/:userId" component={UserPage} />
          <Route path="/users">
            <div className="d-flex">
              {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                  <GroupList
                    selectedItem={selectedProf}
                    items={professions}
                    onItemSelect={handleProfessionSelect}
                  />
                  <button
                    className="btn btn-secondary mt-2"
                    onClick={clearFilter}
                  >
                    Очистить
                  </button>
                </div>
              )}
              <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count !== 0 && (
                  <UsersTable
                    userCrop={userCrop}
                    handleDelete={handleDelete}
                    handleToggleBookMark={handleToggleBookMark}
                    onSort={handleSort}
                    selectedSort={sortBy}
                  />
                )}
                <div className="d-flex justify-content-center">
                  <Pagination
                    itemsCount={count} // длинна массива кол-во юзеров
                    pageSize={pageSize}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/" component={Main} />
        </Switch>
      </>
    );
  }
  return (
    <>
      <DynamicLoading>
        <h2>Loading...</h2>
      </DynamicLoading>
    </>
  );
};

export default Users;

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth/auth";
import { useUserContext } from "../context/users/userState";
// import { Navigate } from 'react-router-dom';
import { Button, Table } from "@radix-ui/themes";
import { RiDeleteBin5Fill } from "react-icons/ri";

export const Dashboard = () => {
  const { fetchAllUsers, deleteUser } = useAuth();
  const UserState = useUserContext();
  const { realUser } = UserState;
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchAllUsers().then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      {realUser?.isAdmin && (
        <section className="text-gray-600 body-font w-full">
          <div className="container lg:px-5 lg:py-24 p-0 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                Users Dashboard
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Manage User Account
              </p>
            </div>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
              <Table.Root size="3" variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell
                      justify="start"
                      style={{ padding: "20px" }}
                    >
                      UserId
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      justify="start"
                      style={{ padding: "20px" }}
                    >
                      Name
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      justify="start"
                      style={{ padding: "20px" }}
                    >
                      Username
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      justify="start"
                      style={{ padding: "20px" }}
                    >
                      Email
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      justify="start"
                      style={{ padding: "20px" }}
                    >
                      Action
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {user &&
                    user.map((elm) => {
                      return (
                        <Table.Row key={elm._id}>
                          <Table.RowHeaderCell
                            justify="start"
                            style={{ padding: "20px" }}
                          >
                            {elm._id}
                          </Table.RowHeaderCell>
                          <Table.Cell align="start" style={{ padding: "20px" }}>
                            {elm.name}
                          </Table.Cell>
                          <Table.Cell align="start" style={{ padding: "20px" }}>
                            {elm.username}
                          </Table.Cell>
                          <Table.Cell align="start" style={{ padding: "20px" }}>
                            {elm.email}
                          </Table.Cell>
                          <Table.Cell align="start" style={{ padding: "20px" }}>
                            <Button
                              size="4"
                              variant="soft"
                              color="red"
                              onClick={() => deleteUser(elm._id)}
                            >
                              <RiDeleteBin5Fill />
                              Delete
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
              </Table.Root>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

<></>;

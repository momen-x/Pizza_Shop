import { prisma } from "@/lib/prisma";
import React from "react";
import {  MdPerson, MdEmail } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "@/app/_components/Link/Link";

interface IUser {
  name: string;
  email: string;
  id: string;
}

const ShowUsersPage = async () => {
  const users: IUser[] = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="min-h-scree p-6 w-full ">
      <div className="md:w-xl lg:w-4xl  mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold  flex items-center gap-2">
              <FiUsers className="w-8 h-8" />
              User Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all registered users in the system
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Input placeholder="Search users..." className="w-full md:w-64" />
          </div>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Total Users</p>
                  <h3 className="text-2xl font-bold mt-1">{users.length}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FiUsers className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length > 0 ? (
              <div className="overflow-x-auto justify-center items-center">
                <table className=" m-auto md:w-xs lg:w-full ">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-300">
                        User
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-300">
                        Status
                      </th>
                      <th className="py-3 px-4 text-right font-medium text-gray-700 dark:text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <MdPerson className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                ID: {user.id.substring(0, 8)}...
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <MdEmail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {user.email}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            Active
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-2">
                            <Link href={`/Admin/user/${user.id}`}>
                              <h5 className="text-sky-400">Details</h5>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                  <FiUsers className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No users found
                </h3>
                <p className="text-gray-500">
                  There are no users registered in the system yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* <DialogToConfirmDeleteUserByAdmin id={}/> */}
    </div>
  );
};

export default ShowUsersPage;
//  <Button
//                                 variant="outline"
//                                 size="sm"
//                                 className="gap-1"
//                               >
//                                 <MdOutlineEdit className="w-4 h-4" />
//                                 Edit
//                               </Button>
                        

//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="gap-1 text-red-600 border-red-200 hover:bg-red-50"
//                               >
//                               <MdDelete className="w-4 h-4" />
//                               Delete
//                             </Button>
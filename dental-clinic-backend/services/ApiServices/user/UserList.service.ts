import prisma from "../../../prisma";

const UserListService = async () => {
  const account = await prisma.account.findMany({
    include: {
      user: true,
    },
  });
  return account;
};

export default UserListService;

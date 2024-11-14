import { createNewUser, getUser } from "../services/user.service";

export async function createAdminUser() {
  const user = await getUser('admin');
  if (!user) {
    createNewUser('admin');
  }
} 
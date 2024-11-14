import { createNewUser, getUser } from "../services/user.service";

export function createAdminUser() {
  getUser('admin').then(user => {
    if (!user) {
      createNewUser('admin');
    }
  });
} 
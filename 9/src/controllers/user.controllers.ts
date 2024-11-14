import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { createNewUser, getUser } from "../services/user.service";
import { User } from "../postgresql/entities/user";

export async function createUser(req, res) {
  const { email, password, role } = req.body;

  if (!(email && password && role)) {
    res.status(400).send("All inputs are required");
  }

  const oldUser = await getUser(email);

  if (oldUser) {
    return res.status(400).send({
      data: null,
      error: {
        message: "Email is not valid"
      }
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = await createNewUser(email, encryptedPassword, role) as User;
  const responceData = {
    id: newUser.uuid,
    email: newUser.mail,
    role: newUser.role
  }

  res.status(200).send({
      data: responceData,
      error: null
    });
}

export async function getToken(req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send("All inputs are required");
  }

  const user = await getUser(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { user_id: user.uuid, email, role: user.role },
      process.env.TOKEN_KEY!,
      { expiresIn: "2h" }
    );

    return res.status(200).send({
      data: { token },
      error: null
    });
  }
  res.status(400).send({
    data: null,
    error: {
      message: "No user with such email or password"
    }
  });
}

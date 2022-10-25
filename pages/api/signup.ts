// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    const { firstName, lastName, email, password } = req.body;

    const bodyObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      mobile: 123456,
      country: "France",
    };

    const url = "https://myfakeapi.com/api/signup";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObject),
      });
      const data = await response.json();

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(400).json({ message: `Error - ${error}` });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
    return;
  }
}

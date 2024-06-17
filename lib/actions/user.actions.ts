'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

// With server actions we can do some kind of 
// Mutation /Database / make fetch

export const signIn = async () => {
    try {
        
    } catch (error) {
        console.error('Error',error)
    }
}

export const signUp = async (userData: SignUpParams) => {
    
    const { email, password, first, last } = userData;
    
    try {

        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
           `${first} ${last}`
        );

        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        
        // runs json.parse and json.stringify on newUserObj
        // next.js does not allow us to pass entire object through
        // server actions so therefore we must stringify it!
        return parseStringify(newUserAccount);

    } catch (error) {
        console.error('Error',error)
    }
}

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
      return null;
    }
  }
  
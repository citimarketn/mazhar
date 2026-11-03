import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
} from "firebase/auth";

// تكوينات مشروع فايربيز الخاص بك mazhar-aa9e0
export const firebaseConfig = {
  apiKey: "AIzaSyBZey9a2xcYi41PNOuW_pXCqwL_8wVAftY",
  authDomain: "mazhar-aa9e0.firebaseapp.com",
  projectId: "mazhar-aa9e0",
  storageBucket: "mazhar-aa9e0.firebasestorage.app",
  messagingSenderId: "52415042595",
  appId: "1:52415042595:web:45105fedac3e7ab1364d96",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
  isSimulated?: boolean;
}

// بريد الأدمن الأساسي المحدد من قبلك
export const PRIMARY_ADMIN_EMAIL = "abdeenali520@gmail.com";
const ADMIN_EMAILS_KEY = "difa_admin_emails_eg";

export function getAdminEmails(): string[] {
  try {
    const raw = localStorage.getItem(ADMIN_EMAILS_KEY);
    if (raw) {
      const list = JSON.parse(raw);
      if (!list.includes(PRIMARY_ADMIN_EMAIL)) list.push(PRIMARY_ADMIN_EMAIL);
      return list;
    }
  } catch {}
  return [PRIMARY_ADMIN_EMAIL];
}

export function saveAdminEmails(emails: string[]) {
  try {
    const set = new Set([...emails.map(e => e.trim().toLowerCase()), PRIMARY_ADMIN_EMAIL.toLowerCase()]);
    localStorage.setItem(ADMIN_EMAILS_KEY, JSON.stringify(Array.from(set)));
  } catch {}
}

export function isEmailAdmin(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  const list = getAdminEmails().map((e) => e.trim().toLowerCase());
  return list.includes(clean);
}

export async function signInWithGoogle(asAdmin = false): Promise<AppUser> {
  const res = await signInWithPopup(auth, googleProvider);
  const fbUser = res.user;
  const userEmail = fbUser.email || "";

  let isAdmin = isEmailAdmin(userEmail);
  if (asAdmin && !isAdmin) {
    const list = getAdminEmails();
    if (!list.includes(userEmail)) {
      saveAdminEmails([...list, userEmail]);
      isAdmin = true;
    }
  }

  const appUser: AppUser = {
    uid: fbUser.uid,
    email: fbUser.email,
    displayName: fbUser.displayName,
    photoURL: fbUser.photoURL,
    isAdmin,
  };
  saveStoredUser(appUser);
  return appUser;
}

export function signInWithCustomEmail(
  email: string,
  name?: string,
  asAdmin = false
): AppUser {
  const cleanEmail = email.trim().toLowerCase();
  let isAdmin = isEmailAdmin(cleanEmail) || asAdmin;
  if (asAdmin) {
    const list = getAdminEmails();
    if (!list.includes(cleanEmail)) saveAdminEmails([...list, cleanEmail]);
    isAdmin = true;
  }

  const user: AppUser = {
    uid: "user_" + Math.random().toString(36).slice(2, 9),
    email: cleanEmail,
    displayName: name || cleanEmail.split("@")[0],
    photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}`,
    isAdmin,
    isSimulated: true,
  };
  saveStoredUser(user);
  return user;
}

const STORED_USER_KEY = "difa_current_user_eg";

export function getStoredUser(): AppUser | null {
  try {
    const raw = localStorage.getItem(STORED_USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function saveStoredUser(user: AppUser | null) {
  try {
    if (user) {
      localStorage.setItem(STORED_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORED_USER_KEY);
    }
  } catch {}
}

export async function signOutUser() {
  try {
    await fbSignOut(auth);
  } catch {}
  saveStoredUser(null);
}

export function listenToAuth(onChange: (user: AppUser | null) => void) {
  return onAuthStateChanged(auth, (fbUser) => {
    if (fbUser) {
      const email = fbUser.email || "";
      const appUser: AppUser = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: fbUser.displayName,
        photoURL: fbUser.photoURL,
        isAdmin: isEmailAdmin(email),
      };
      saveStoredUser(appUser);
      onChange(appUser);
    } else {
      const stored = getStoredUser();
      if (stored && stored.isSimulated) {
        onChange(stored);
      } else {
        onChange(null);
      }
    }
  });
}

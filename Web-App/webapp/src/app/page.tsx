"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// Read the admin key from the environment
const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY;

export default function login() {
  const router = useRouter(); // initialize router

  const handleSubmit = () => {
    const inputElement = document.getElementById("login") as HTMLInputElement | null;

    if (inputElement) {
      const inputValue = inputElement.value.toLowerCase(); // convert input to lowercase

      if (inputValue === adminKey?.toLowerCase()) {
        console.log(1);
        router.push("./Homepage"); // ✅ redirect to /admin
      } else {
        alert("Access denied.");
        console.log(0);
      }
    } else {
      alert("Input field not found.");
      console.log(0);
    }
  };

  return (
    <div className={styles.page}>
      <input type="text" id="login" placeholder="Enter The Key" className={styles.Textfeild} autoComplete="off" />
      <br />
      <button className={styles.Submit} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

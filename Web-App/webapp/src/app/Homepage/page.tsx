"use client";
import styles from "./page.module.css";
import { useVisibility } from "../Components/page"; // ⚠️ Ensure this is the correct path to the hook
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { isVisible, toggleVisibility, setIsVisible } = useVisibility();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [users, setUsers] = useState<{ id: number; firstName: string; lastName: string }[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedUser, setSelectedUser] = useState<string>("None"); // Default selected user is "None"

  const [challenges, setChallenges] = useState<{ id: number; challengeName: string; challengeDescription: string }[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<string>("None"); // Default selected challenge is "None"
  const [selectedChallengeDescription, setSelectedChallengeDescription] = useState<string>(""); // To display the description
  const [challengeName, setChallengeName] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");

  // Fetch users from the backend API
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3005/api/users"); // Call the backend API
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch challenges from the backend API
  const fetchChallenges = async () => {
    try {
      const response = await fetch("http://localhost:3005/api/getChallenges"); // Call the backend API
      if (!response.ok) {
        throw new Error("Failed to fetch challenges");
      }
      const data = await response.json();
      setChallenges(data.data); // Use the `data` field from the response
    } catch (error) {
      console.error("Error fetching challenges:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchChallenges();
  }, []);

  // Function to handle adding a user
  const handleAddUser = async () => {
    if (!firstName || !lastName) {
      alert("Please enter both first name and last name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3005/api/Addauser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

   
      
      setFirstName(""); // Clear the input fields
      setLastName("");

      // Re-fetch the user list
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Function to handle deleting a user
  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3005/api/deleteUser/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }


      // Re-fetch the user list
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to handle adding a challenge
  const handleAddChallenge = async () => {
    if (!challengeName || !challengeDescription) {
      alert("Please enter both challenge name and description.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3005/api/addChallenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ challengeName, challengeDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to add challenge");
      }

    
      setChallengeName(""); // Clear the input fields
      setChallengeDescription("");

      // Re-fetch the challenge list
      fetchChallenges();
    } catch (error) {
      console.error("Error adding challenge:", error);
    }
  };

  // Function to handle deleting a challenge
  const handleDeleteChallenge = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3005/api/removeChallenge/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete challenge");
      }

      // Re-fetch the challenge list
      fetchChallenges();
    } catch (error) {
      console.error("Error deleting challenge:", error);
    }
  };

  // Function to handle selecting a user
  const handleSelectUser = (user: { id: number; firstName: string; lastName: string }) => {
    setSelectedUser(`${user.firstName} ${user.lastName} (ID: ${user.id})`);
  };

  // Function to handle selecting a challenge
  const handleSelectChallenge = (challenge: { id: number; challengeName: string; challengeDescription: string }) => {
    setSelectedChallenge(`${challenge.challengeName} (ID: ${challenge.id})`);
    setSelectedChallengeDescription(challenge.challengeDescription); // Set the description
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Welcome to the Admin Page</h1>
        <img
          src="/Menu.png"
          alt="Three Bars"
          className={styles.Menu}
          onClick={toggleVisibility}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Dropdown menu */}
      {isVisible && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <li><a href="/">Logout</a></li>
        </div>
      )}

      <div className={styles.body}>
        {/* User Section */}
        <div className={styles.UserLIST}>
          <h2>
            All Users: <span>{selectedUser}</span>
          </h2>
          <div className={styles.addUserForm}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.inputField}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.inputField}
            />
            <button onClick={handleAddUser} className={styles.addButton}>
              Add User
            </button>
          </div>
          <ul className={styles.userList}>
            {users.map((user) => (
              <li
                key={user.id}
                className={styles.userItem}
                onClick={() => handleSelectUser(user)}
                style={{ cursor: "pointer" }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the select user event
                    handleDeleteUser(user.id);
                  }}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
                {user.firstName} {user.lastName} (ID: {user.id})
              </li>
            ))}
          </ul>
        </div>

        {/* Challenge Section */}
        <div className={styles.Challanges}>
          <h2>
            All Challenges: <span>{selectedChallenge}</span>
          </h2>
          <div className={styles.addChallengeForm}>
            <input
              type="text"
              placeholder="Challenge Name"
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
              className={styles.inputField}
            />
            <input
              type="text"
              placeholder="Challenge Description"
              value={challengeDescription}
              onChange={(e) => setChallengeDescription(e.target.value)}
              className={styles.inputField}
            />
            <button onClick={handleAddChallenge} className={styles.addButton}>
              Add Challenge
            </button>
          </div>
          <ul className={styles.challengeList}>
  {challenges.map((challenge) => (
    <li
      key={challenge.id}
      className={styles.challengeItem}
      onClick={() => handleSelectChallenge(challenge)}
      style={{ cursor: "pointer" }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the select challenge event
          handleDeleteChallenge(challenge.id);
        }}
        className={styles.deleteButton}
      >
        Delete
      </button>
      {challenge.challengeName} (ID: {challenge.id})
      {/* Conditionally render the description below the challenge name */}
      {selectedChallenge === `${challenge.challengeName} (ID: ${challenge.id})` && (
        <div className={styles.challengeDescription}>
          <p>{challenge.challengeDescription}</p>
        </div>
      )}
    </li>
  ))}
</ul>



            </div>
        </div>
      </div>
  );
}